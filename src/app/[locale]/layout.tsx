import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import ThemeProvider from '@/context/ThemeProvider';
import { cookies } from 'next/headers';
import clsx from 'clsx';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import 'react-tooltip/dist/react-tooltip.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Grocery Mart | Premium Coffee, Tea, and Cacao',
  description:
    'Shop the finest selection of coffee, tea, and cacao at Grocery Mart. Discover high-quality products sourced from the best growers and roasters worldwide.',

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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await params;

  // if (!routing.locales.includes(locale as Locale)) {
  //   notFound();
  // }
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
          <ThemeProvider initialTheme={theme?.value || 'dark'}>{children}</ThemeProvider>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
