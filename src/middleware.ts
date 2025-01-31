import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import Negotiator from 'negotiator';
import { match } from '@formatjs/intl-localematcher';
import { defaultLocale, LocalesArray } from './config/locales';
import { NextRequest, NextResponse } from 'next/server';

export function getPreferredLocale(request: Request): string {
  const negotiator = new Negotiator({ headers: { 'accept-language': request.headers.get('accept-language') || '' } });
  const languages = negotiator.languages();

  return match(languages, LocalesArray, defaultLocale);
}
export function hasLocaleInPath(pathname: string): boolean {
  console.log('pathname: ', pathname);
  console.log('localesArray', LocalesArray);
  return LocalesArray.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (hasLocaleInPath(pathname)) {
    const handleI18nRouting = createMiddleware(routing);
    return handleI18nRouting(request);
  }
  const locale = getPreferredLocale(request);

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!_next|static|favicon.*).*)'],
};
