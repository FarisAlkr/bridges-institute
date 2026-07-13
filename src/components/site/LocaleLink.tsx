import { Link, useRouterState } from "@tanstack/react-router";
import { type ComponentProps } from "react";
import { localeFromPath, withLocale } from "@/i18n/routing";

type ToProp = ComponentProps<typeof Link>["to"];

// A <Link> that keeps you in the active locale: it prefixes the given (unprefixed,
// EN-style) path with /he or /ar when appropriate. On EN it renders an identical href.
export function LocaleLink({
  to,
  ...props
}: { to: string } & Omit<ComponentProps<typeof Link>, "to">) {
  const locale = useRouterState({ select: (s) => localeFromPath(s.location.pathname) });
  return <Link to={withLocale(to, locale) as ToProp} {...props} />;
}
