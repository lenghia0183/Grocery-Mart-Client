'use client';

import { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';

import Logo from '@/components/Logo';
import Button from '@/components/Button';
import Icon from './Icon';

type FooterSection = {
  title: string;
  links: Array<{
    label: string;
    href: string;
    value?: string;
  }>;
};

const footerSections: FooterSection[] = [
  {
    title: 'Store',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Coffee', href: '/' },
      { label: 'Tea', href: '/' },
      { label: 'Cocoa', href: '/' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Store location', href: '/' },
      { label: 'Order status', href: '/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Customer service', href: '/' },
      { label: 'Terms of use', href: '/' },
      { label: 'About us', href: '/' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Email', value: 'Lenghia0183@gmail.com', href: 'mailto:Lenghia0183@gmail.com' },
      { label: 'Phone', value: '+84 0369 067 607', href: 'tel:+84369067607' },
      { label: 'Address', value: 'Liên Phương, Thường Tín, Hà Nội', href: '' },
      { label: 'Business hours', value: 'Thứ Hai - Thứ Bảy 08:00 sáng - 06:00 chiều', href: '' },
    ],
  },
];

export default function Footer() {
  const [emailValue, setEmailValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const emailRegex = useMemo(() => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, []);

  const handleValidationEmail = useCallback(() => {
    setIsDisabled(!emailRegex.test(emailValue));
  }, [emailValue, emailRegex]);

  return (
    <footer className="bg-blue-200 text-dark py-12 mt-16">
      <div className="container mx-auto px-4">
        {/* Grid layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Cột đầu tiên (Logo, mô tả, form) */}
          <div className="col-span-3">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed">
              We strongly believe that the online shopping experience should be simple, easy and enjoyable. This belief
              inspires and motivates us every day.
            </p>
            <p className="mt-10 text-sm leading-relaxed">
              We strongly believe that the online shopping experience should be simple, easy and enjoyable. This belief
              inspires and motivates us every day.
            </p>
            {/* Form đăng ký email */}
            <form className="mt-6 flex space-x-2">
              <input
                value={emailValue}
                onChange={(e) => {
                  setEmailValue(e.target.value);
                  handleValidationEmail();
                }}
                className="w-full px-3 py-2 border rounded-lg text-gray-900"
                placeholder="Email address"
              />
              <Button disabled={isDisabled} className="bg-yellow-400 px-4 py-2 rounded-lg flex items-center">
                SEND <Icon name="send" className="ml-2" />
              </Button>
            </form>
          </div>

          {/* Các cột còn lại (Store, Help, Company, Contact) */}
          {footerSections.map((section) => (
            <div key={section.title} className="col-span-2">
              <h3 className="text-lg font-semibold border-b pb-2 mb-4">{section.title}</h3>
              <ul className="space-y-2 text-[15px]">
                {section.links.map((item, idx) => (
                  <li key={idx}>
                    {item.value ? (
                      <div className="mt-5">
                        <p>{item.label}</p>
                        <Link href={item.href} className="hover:text-blue mt-2">
                          {item.value}
                        </Link>
                      </div>
                    ) : (
                      <Link href={item.href} className="hover:text-blue">
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Phần cuối */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center border-t border-gray-300 pt-6 text-sm">
          <p>© 2021 - 2025 Grocery Mart. All rights reserved.</p>
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
              <Icon name="linkedin" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
