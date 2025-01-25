import { match } from '@formatjs/intl-localematcher';
import { NextRequest, NextResponse } from 'next/server';
import Negotiator from 'negotiator';

const locales = ['en-US', 'vi-VN'];
const defaultLocale = 'vi-VN';

export function getPreferredLocale(request: Request): string {
  const negotiator = new Negotiator({ headers: { 'accept-language': request.headers.get('accept-language') || '' } });
  const languages = negotiator.languages();
  return match(languages, locales, defaultLocale);
}

export function hasLocaleInPath(pathname: string): boolean {
  return locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log('pathName', pathname);

  if (hasLocaleInPath(pathname)) {
    return NextResponse.next();
  }

  const locale = getPreferredLocale(request);

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!_next|static|favicon.ico).*)'],
};
