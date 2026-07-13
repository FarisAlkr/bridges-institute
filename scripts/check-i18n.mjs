// Build gate: fail if any user-facing string is hard-coded in the UI instead of
// going through i18next (t()/<Trans>). Scans JSX text nodes AND translatable
// attributes (aria-label, alt, title, placeholder — plus this codebase's text
// props) so English strings can't silently ship on the HE/AR site.
//
// Runs automatically before `npm run build` via the "prebuild" script, so a
// hard-coded string blocks the build (and any Vercel deploy).

import ts from "typescript";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const DIRS = ["src/pages", "src/components/site"];
const TEXT_ATTRS = new Set([
  "aria-label",
  "alt",
  "title",
  "placeholder",
  // text-bearing component props used in this codebase
  "label",
  "note",
  "eyebrow",
  "intro",
]);
const hasLetter = (s) => /\p{L}/u.test(s);

function tsxFiles() {
  const out = [];
  for (const dir of DIRS) {
    for (const name of readdirSync(dir)) {
      if (name.endsWith(".tsx")) out.push(join(dir, name));
    }
  }
  return out;
}

const violations = [];

for (const file of tsxFiles()) {
  const source = readFileSync(file, "utf8");
  const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  const record = (node, kind, text) => {
    const { line } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
    violations.push({
      file,
      line: line + 1,
      kind,
      text: text.replace(/\s+/g, " ").trim().slice(0, 70),
    });
  };

  const visit = (node) => {
    // Literal text between JSX tags.
    if (ts.isJsxText(node)) {
      const text = node.text.trim();
      if (text && hasLetter(text)) record(node, "jsx-text", text);
    }
    // Literal string values in translatable attributes / text props.
    if (ts.isJsxAttribute(node) && node.initializer) {
      const attr = node.name.getText(sf);
      if (
        TEXT_ATTRS.has(attr) &&
        ts.isStringLiteral(node.initializer) &&
        node.initializer.text.trim() &&
        hasLetter(node.initializer.text)
      ) {
        record(node, `attr:${attr}`, node.initializer.text);
      }
    }
    ts.forEachChild(node, visit);
  };

  visit(sf);
}

if (violations.length) {
  console.error(`\n✖ i18n check: ${violations.length} hard-coded UI string(s). Use t()/<Trans>:\n`);
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}  [${v.kind}]  "${v.text}"`);
  }
  console.error("");
  process.exit(1);
}

console.log("✓ i18n check: no hard-coded UI strings in src/pages or src/components/site");
