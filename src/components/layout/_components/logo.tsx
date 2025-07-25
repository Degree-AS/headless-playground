/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
export function Logo() {
  return (
    <a href="/">
      <img src="/img/logo_dark.webp" className="max-h-8 dark:hidden" alt="Logo" />
      <img src="/img/logo_light.webp" className="hidden max-h-8 dark:block" alt="Logo" />
    </a>
  )
}
