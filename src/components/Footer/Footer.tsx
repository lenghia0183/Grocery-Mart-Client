'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Logo from '@/components/Logo';
import EmailSignup from './EmailSignUp';
import Icon from '@/components/Icon';
import { generateServerQueryUrl } from '@/utils';
import { CATEGORY_ID } from '@/constants/common';
import { useQueryState } from '@/hooks/useQueryState';
import { ProductFilter } from '@/types/product';
import clsx from 'clsx';
import { PATH } from '@/constants/path';

import { usePathname } from '@/i18n/routing';

type FooterSection = {
  title: string;
  links: Array<{
    label: string;
    href?: string;
    value?: string;
    icon?: React.ReactNode;
    categoryId?: string;
  }>;
};

export default function Footer() {
  const t = useTranslations('footer');
  const { filters } = useQueryState<ProductFilter>();
  const pathname = usePathname();

  console.log('pathname', pathname);

  const footerSections: FooterSection[] = [
    {
      title: t('store.title'),
      links: [
        { label: t('store.home'), href: PATH.HOME },
        {
          label: t('store.coffee'),
          categoryId: CATEGORY_ID.COFFEE,
          href: generateServerQueryUrl('/products', {
            filters: { category: CATEGORY_ID.COFFEE },
          }),
        },
        {
          label: t('store.tea'),
          categoryId: CATEGORY_ID.TEA,
          href: generateServerQueryUrl('/products', {
            filters: { category: CATEGORY_ID.TEA },
          }),
        },
        {
          label: t('store.cocoa'),
          categoryId: CATEGORY_ID.CACAO,
          href: generateServerQueryUrl('/products', {
            filters: { category: CATEGORY_ID.CACAO },
          }),
        },
      ],
    },
    {
      title: t('help.title'),
      links: [
        { label: t('help.storeLocation'), href: 'https://maps.app.goo.gl/QdtWcvAjhXmXNqQ96' },
        { label: t('help.orderStatus'), href: '/' },
      ],
    },
    {
      title: t('company.title'),
      links: [
        { label: t('company.customerService'), href: '/' },
        { label: t('company.termsOfUse'), href: '/' },
        { label: t('company.aboutUs'), href: '/' },
      ],
    },
    {
      title: t('contact.title'),
      links: [
        {
          label: t('contact.email'),
          value: 'Lenghia0183@gmail.com',
          href: 'mailto:Lenghia0183@gmail.com',
          icon: <Icon name="email" color="inherit" strokeWidth={1.2} size={1.3} />,
        },
        {
          label: t('contact.phone'),
          value: '+84 0369 067 607',
          href: 'tel:+84369067607',
          icon: <Icon name="phone" color="inherit" strokeWidth={1.2} size={1.3} />,
        },
        {
          label: t('contact.address'),
          value: 'Liên Phương, Thường Tín, Hà Nội',
          href: '',
          icon: <Icon name="address" color="inherit" strokeWidth={1.2} size={1.3} />,
        },
        {
          label: t('contact.businessHours'),
          value: t('contact.businessHoursValue'),
          icon: <Icon name="clock" color="inherit" strokeWidth={1.5} size={1.3} />,
        },
      ],
    },
  ];

  return (
    <footer className="bg-blue-200 dark:bg-dark-400 dark:text-white-200 text-dark py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Cột Logo, mô tả, form */}
          <div className="xl:col-span-3 col-span-full">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed">{t('desc01')}</p>
            <p className="mt-10 text-sm leading-relaxed">{t('desc02')}</p>
            <EmailSignup />
          </div>

          {/* Các mục của footer */}
          {footerSections.map((section) => (
            <div key={section.title} className="xl:col-span-2 md:col-span-6 col-span-full">
              <h3 className="text-lg font-semibold border-b pb-2 mb-4">{section.title}</h3>
              <ul className="space-y-2 text-[15px]">
                {section.links.map((item, idx) => {
                  return (
                    <li key={idx}>
                      {item.value ? (
                        <div className="mt-5">
                          <div className="flex items-center gap-2">
                            {item.icon && item.icon}
                            <p>{item.label}</p>
                          </div>
                          {item.href ? (
                            item.href.startsWith('http') ? (
                              <a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={clsx('hover:text-blue mt-2', {
                                  'text-blue-500': item.categoryId && item.categoryId === filters.category,
                                  '!text-blue-500':
                                    item.href === pathname || (item.href === PATH.HOME && pathname === '/'),
                                })}
                              >
                                {item.value}
                              </a>
                            ) : (
                              <Link
                                href={item.href}
                                className={clsx('hover:text-blue mt-2', {
                                  'text-blue-500': item.categoryId && item.categoryId === filters.category,
                                  '!text-blue-500':
                                    item.href === pathname || (item.href === PATH.HOME && pathname === '/'),
                                })}
                              >
                                {item.value}
                              </Link>
                            )
                          ) : (
                            <div>{item.value}</div>
                          )}
                        </div>
                      ) : item.href?.startsWith('http') ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={clsx('hover:text-blue', {
                            'text-blue-500': item.categoryId && item.categoryId === filters.category,
                          })}
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={item.href!}
                          className={clsx('hover:text-blue', {
                            'text-blue-500': item.categoryId && item.categoryId === filters.category,
                          })}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="xl:mt-12 mt-10 flex flex-col md:flex-row justify-between items-center border-t border-gray-300 pt-6 text-sm">
          <p>{t('copyright')}</p>
          <div className="flex space-x-4">
            <Link href="#" className="w-8 h-8 bg-blue-300 flex items-center justify-center rounded-lg">
              <Icon name="facebook" />
            </Link>
            <Link
              href="#"
              className="w-8 h-8 bg-blue-500 flex items-center justify-center rounded-lg"
              style={{
                backgroundColor: '#2134af',
                backgroundImage:
                  'linear-gradient(214deg, #2134af 0%, #515bd4 11%, #dd2a7b 62%, #feda77 72%, #f58529 91%)',
              }}
            >
              <Icon name="instagram" />
            </Link>
            <Link href="#" className="w-8 h-8 bg-blue-300 flex items-center justify-center rounded-lg">
              <Icon name="zalo" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
