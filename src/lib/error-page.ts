// Last-resort 500 page, rendered when SSR itself failed. The strings are inlined
// rather than read from the i18next catalogs on purpose: this page has to render even
// when the app (i18next included) is the thing that broke, so it must not depend on
// anything that can throw. Keep the wording in sync with `errorPage.*` in
// src/i18n/<locale>/common.json.

type ErrorPageLocale = "en" | "he" | "ar";

const COPY: Record<ErrorPageLocale, Record<"title" | "body" | "retry" | "home", string>> = {
  en: {
    title: "This page didn't load",
    body: "Something went wrong on our end. You can try refreshing or head back home.",
    retry: "Try again",
    home: "Go home",
  },
  he: {
    title: "הדף לא נטען",
    body: "משהו השתבש אצלנו. אפשר לרענן את הדף או לחזור לדף הבית.",
    retry: "נסו שוב",
    home: "לדף הבית",
  },
  ar: {
    title: "تعذّر تحميل الصفحة",
    body: "حدث خطأ لدينا. يمكنك تحديث الصفحة أو العودة إلى الرئيسية.",
    retry: "حاول مرة أخرى",
    home: "إلى الرئيسية",
  },
};

const RTL: ErrorPageLocale[] = ["he", "ar"];

// EN lives at "/", the other locales under their prefix.
const homeHref = (locale: ErrorPageLocale) => (locale === "en" ? "/" : `/${locale}`);

// Derive the locale from a request URL without importing the routing helpers — same
// no-dependencies rule as the copy above.
export function errorPageLocaleFromUrl(url: string): ErrorPageLocale {
  try {
    const seg = new URL(url).pathname.split("/")[1];
    return seg === "he" || seg === "ar" ? seg : "en";
  } catch {
    return "en";
  }
}

export function renderErrorPage(locale: ErrorPageLocale = "en"): string {
  const t = COPY[locale] ?? COPY.en;
  const dir = RTL.includes(locale) ? "rtl" : "ltr";
  return `<!doctype html>
<html lang="${locale}" dir="${dir}">
  <head>
    <meta charset="utf-8" />
    <title>${t.title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>${t.title}</h1>
      <p>${t.body}</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">${t.retry}</button>
        <a class="secondary" href="${homeHref(locale)}">${t.home}</a>
      </div>
    </div>
  </body>
</html>`;
}
