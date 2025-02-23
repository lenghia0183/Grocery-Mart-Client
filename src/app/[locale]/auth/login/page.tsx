import images from '@/asset/images';
import Image from '@/components/Image';
import Logo from '@/components/Logo';

import React from 'react';
import LoginForm from './LoginForm';
import { getTranslations } from 'next-intl/server';

const LoginPage: React.FC = async () => {
  const t = await getTranslations('login');

  return (
    <div className="h-screen relative bg-[linear-gradient(to_right,_#FAF7FF_50%,_#ffffff_50%)] dark:bg-[linear-gradient(to_right,_#171c28_50%,_#292e39_50%)]">
      <div className="grid grid-cols-12 h-full container">
        <div className="col-span-6 flex items-center justify-center h-full">
          <div>
            <Image src={images.login} alt="Grocery Mart" />
            <p className="w-[70%] text-center mt-10 text-dark dark:text-white-200">{t('desc01')}</p>
          </div>
        </div>

        <div className="col-span-6 h-full p-24 pt-0 text-center flex flex-col  justify-center">
          <Logo className="mx-auto" />

          <h2 className="text-[30px] mt-10 dark:text-white-200 text-gray-300">{t('helloAgain')}</h2>
          <p className="text-gray-500 mt-7">{t('desc02')}</p>

          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
