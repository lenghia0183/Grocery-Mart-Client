import images from '@/asset/images';
import Image from '@/components/Image';
import Logo from '@/components/Logo';

import React from 'react';
import SignUpForm from './SignUpForm';
import { getTranslations } from 'next-intl/server';

const SignUp: React.FC = async () => {
  const t = await getTranslations('signUp');

  return (
    <div className="relative xl:bg-[linear-gradient(to_right,_#FAF7FF_50%,_#ffffff_50%)] xl:dark:bg-[linear-gradient(to_right,_#171c28_50%,_#292e39_50%)] bg-white-100 dark:bg-dark-500">
      <div className="grid xl:grid-cols-12 grid-cols-1 h-full container">
        <div className="col-span-6  xl:flex hidden items-center justify-center h-full">
          <div className="flex flex-col items-center">
            <Image src={images.login} alt="Grocery Mart" />
            <p className="w-[70%] text-center mt-10 text-dark dark:text-white-200">{t('desc01')}</p>
          </div>
        </div>

        <div className="xl:col-span-6 col-span-full min-h-screen md:px-28 md:py-0 py-9 text-center flex flex-col  justify-center">
          <Logo className="mx-auto" />

          <h2 className="text-[30px] mt-10 dark:text-white-200 text-gray">{t('greeting')}</h2>
          <p className="text-gray-500 mt-7">{t('desc02')}</p>

          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
