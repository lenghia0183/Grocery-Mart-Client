import images from '@/asset/images';
import Image from '@/components/Image';
import Logo from '@/components/Logo';

import React from 'react';
import SignUpForm from './SignUpForm';

const SignUp: React.FC = () => {
  return (
    <div className="h-screen relative bg-[linear-gradient(to_right,_#FAF7FF_50%,_#ffffff_50%)] dark:bg-[linear-gradient(to_right,_#171c28_50%,_#292e39_50%)]">
      <div className="grid grid-cols-12 h-full container">
        <div className="col-span-6 flex items-center justify-center h-full">
          <div>
            <Image src={images.login} alt="Grocery Mart" />
            <p className="w-[70%] text-center mt-10 text-dark dark:text-white">
              Experience the best shopping experience with Grocery Mart, offering high-quality products and innovative
              services tailored for you.
            </p>
          </div>
        </div>

        <div className="col-span-6 h-full p-24 pt-0 text-center flex flex-col  justify-center">
          <Logo className="mx-auto" />

          <h2 className="text-[30px] mt-10 dark:text-white text-gray">Hello Again!</h2>
          <p className="text-gray-500 mt-7">
            Sign up for your Grocery Mart account to unlock exclusive deals, save your favorite items, and enjoy a
            seamless shopping experience. Join now for personalized recommendations and special offers!
          </p>

          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
