import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import Negotiator from 'negotiator';
import { match } from '@formatjs/intl-localematcher';
import { defaultLocale, LocalesArray } from './config/locales';
import { NextRequest, NextResponse } from 'next/server';
import { protectedRoutes } from './config/path';
import { PATH } from './constants/path';
import { ERROR } from './constants/common';

export function getPreferredLocale(request: Request): string {
  const negotiator = new Negotiator({ headers: { 'accept-language': request.headers.get('accept-language') || '' } });
  const languages = negotiator.languages();

  return match(languages, LocalesArray, defaultLocale);
}
export function hasLocaleInPath(pathname: string): boolean {
  return LocalesArray.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;

  if (protectedRoutes.some((route) => pathname.includes(route)) && !accessToken) {
    const loginUrl = new URL(PATH.LOGIN, request.nextUrl.origin);
    loginUrl.searchParams.set('error', ERROR.UNAUTHENTICATED);
    return NextResponse.redirect(loginUrl);
  }

  if (hasLocaleInPath(pathname)) {
    const handleI18nRouting = createMiddleware(routing);
    return handleI18nRouting(request);
  }
  const locale = getPreferredLocale(request);

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!_next|static|favicon.*|api/.*).*)'],
};
