import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Logo from '@/components/Logo';
import EmailSignup from './EmailSignUp';
import Icon from '@/components/Icon';

type FooterSection = {
  title: string;
  links: Array<{
    label: string;
    href?: string;
    value?: string;
    icon?: React.ReactNode;
  }>;
};

export default function Footer() {
  const t = useTranslations('footer');

  const footerSections: FooterSection[] = [
    {
      title: t('store.title'),
      links: [
        { label: t('store.home'), href: '/' },
        { label: t('store.coffee'), href: '/' },
        { label: t('store.tea'), href: '/' },
        { label: t('store.cocoa'), href: '/' },
      ],
    },
    {
      title: t('help.title'),
      links: [
        { label: t('help.storeLocation'), href: '/' },
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
                {section.links.map((item, idx) => (
                  <li key={idx}>
                    {item.value ? (
                      <div className="mt-5">
                        <div className="flex items-center gap-2">
                          {item.icon && item.icon}
                          <p>{item.label}</p>
                        </div>
                        {item.href ? (
                          <Link href={item.href} className="hover:text-blue mt-2">
                            {item.value}
                          </Link>
                        ) : (
                          <div>{item.value}</div>
                        )}
                      </div>
                    ) : (
                      <Link href={item.href!} className="hover:text-blue">
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
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
