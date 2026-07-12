import { Reveal } from "@/components/site/Reveal";
import { TodoPlaceholder } from "@/components/site/TodoPlaceholder";


export function AccessibilityStatement() {
  return (
    <>
      <section className="border-b border-border bg-cream pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-editorial max-w-4xl">
          <Reveal>
            <div className="eyebrow">Accessibility</div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 font-display text-4xl leading-[1.05] text-ink sm:text-5xl md:text-6xl">
              Accessibility Statement
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-body md:text-lg">
              Bridges Institute is committed to making its website usable for everyone, including
              people with disabilities. We treat accessibility as an ongoing responsibility, built
              into the site itself rather than added on afterwards.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-editorial max-w-3xl space-y-12">
          <div>
            <h2 className="font-display text-2xl text-ink md:text-3xl">The standard we follow</h2>
            <p className="mt-4 text-slate-body leading-relaxed">
              We aim to conform to <strong>Israeli Standard IS 5568</strong>, which is based on the
              Web Content Accessibility Guidelines (<strong>WCAG 2.0</strong>) at{" "}
              <strong>Level AA</strong>.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-ink md:text-3xl">What we have done</h2>
            <ul className="mt-4 space-y-3 text-slate-body leading-relaxed">
              <li>Semantic headings and landmark regions (header, navigation, main, footer).</li>
              <li>
                A “skip to content” link and full keyboard operability, with a visible focus
                indicator on every interactive element.
              </li>
              <li>
                Text alternatives for meaningful images; decorative images are hidden from screen
                readers.
              </li>
              <li>Form fields with real, associated labels.</li>
              <li>
                Colour contrast checked against AA thresholds, including the brand gold on light
                backgrounds.
              </li>
              <li>Respect for the operating system’s “reduce motion” preference.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl text-ink md:text-3xl">Ongoing work</h2>
            <p className="mt-4 text-slate-body leading-relaxed">
              Accessibility is never finished. We continue to test and improve, and this statement
              will be published in Hebrew and Arabic as part of the site’s multilingual rollout.
            </p>
            <div className="mt-6">
              <TodoPlaceholder
                label="Hebrew & Arabic versions of this statement"
                note="To be published alongside the multilingual rollout — reviewed by a real speaker, not machine-translated."
              />
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl text-ink md:text-3xl">
              Reporting an accessibility problem
            </h2>
            <p className="mt-4 text-slate-body leading-relaxed">
              If you come across a barrier on this site, please tell us and we will do our best to
              put it right.
            </p>
            <ul className="mt-4 space-y-2 text-slate-body leading-relaxed">
              <li>
                Email:{" "}
                <a
                  href="mailto:info@bridgesinstitute.org"
                  className="link-underline font-medium text-ink"
                >
                  info@bridgesinstitute.org
                </a>
              </li>
              <li>Address: Yehuda HaNachtom 10, Be&apos;er Sheva, Israel.</li>
            </ul>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <TodoPlaceholder
                label="Accessibility coordinator"
                note="Name and role of the person responsible for accessibility — to confirm with the client."
              />
              <TodoPlaceholder
                label="Phone for accessibility requests"
                note="Direct phone number for accessibility enquiries — to confirm with the client."
              />
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl text-ink md:text-3xl">Last reviewed</h2>
            <p className="mt-4 text-slate-body leading-relaxed">12 July 2026.</p>
          </div>
        </div>
      </section>
    </>
  );
}
