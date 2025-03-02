import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import ThemeProvider from '@/context/ThemeProvider';
import { cookies } from 'next/headers';
import clsx from 'clsx';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import 'react-tooltip/dist/react-tooltip.css';
import { LanguageProvider } from '@/context/LanguageProvider';
import { UserProvider } from '@/context/userProvider';
import { ToastProvider } from '@/context/toastProvider';
import { SWRConfig } from 'swr';
import swrMiddleware from '@/middlewares/swr/loading';
import { LoadingProvider } from '@/context/LoadingProvider';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });

  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: '/favicon/favicon.ico',
      apple: '/favicon/apple-touch-icon.png',
      other: [
        { rel: 'icon', url: '/favicon/favicon-32x32.png', sizes: '32x32' },
        {
          rel: 'icon',
          url: '/favicon/android-chrome-192x192.png',
          sizes: '192x192',
        },
        {
          rel: 'icon',
          url: '/favicon/android-chrome-512x512.png',
          sizes: '512x512',
        },
      ],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  const cookieStore = cookies();

  const theme = (await cookieStore).get('theme');
  const messages = await getMessages();
  return (
    <html
      lang={locale}
      className={clsx(inter.className, {
        dark: theme?.value === 'dark',
      })}
      suppressHydrationWarning
    >
      <NextIntlClientProvider messages={messages}>
        <body className="bg-white dark:bg-slate-950">
          <LoadingProvider>
            <SWRConfig
              value={{
                refreshInterval: 0,
                revalidateOnFocus: false,
                shouldRetryOnError: false,
                use: [swrMiddleware],
              }}
            >
              <LanguageProvider>
                <ThemeProvider initialTheme={theme?.value || 'dark'}>
                  <ToastProvider>
                    <UserProvider>{children}</UserProvider>
                  </ToastProvider>
                </ThemeProvider>
              </LanguageProvider>
            </SWRConfig>
          </LoadingProvider>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
