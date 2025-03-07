'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Formik, Form } from 'formik';

import Icon from '@/components/Icon';
import { PATH } from '@/constants/path';
import images from '@/asset/images';

import Image from '@/components/Image';
import { usePathname } from '@/i18n/routing';
import { ChangeUserDataFormValues, UserData } from '@/types/user';
import { formatRegisteredDate } from '@/utils/formatRegisteredDate';
import { useTranslations } from 'next-intl';
import Button from '@/components/Button';
import { useUser } from '@/context/userProvider';
import { useUpdateMe } from '@/services/api/https/user';
import { useToast } from '@/context/toastProvider';
import { WithLoading } from '@/hocs/withLoading';

interface SideBarProps {
  userData: UserData | null;
}

const SideBar = ({ userData }: SideBarProps): JSX.Element => {
  const { logoutUser } = useUser();
  const { trigger: updateUser, isMutating: isMutatingUpdateUser } = useUpdateMe();
  const pathname = usePathname();

  const t = useTranslations('profileSideBar');
  const tCommon = useTranslations('common');
  const { success, error } = useToast();

  const initialValues: Pick<ChangeUserDataFormValues, 'avatar'> = {
    avatar: null,
  };

  const accountLinks = [
    { name: t('userInfo'), path: PATH.PROFILE_EDIT, icon: 'account' },
    { name: t('changePassword'), path: PATH.CHANGE_PASSWORD, icon: 'password' },
    { name: t('address'), path: PATH.CHANGE_ADDRESS, icon: 'address' },
  ];

  const transactionLinks = [
    { name: t('yourOrder'), path: PATH.ORDER, icon: 'account' },
    { name: t('favoriteList'), path: PATH.FAVORITE, icon: 'heart' },
  ];

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleCancelAvatar = (resetForm: () => void) => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    resetForm();
  };

  return (
    <WithLoading isLoading={isMutatingUpdateUser}>
      <nav className="sm:pb-[40px] pb-[30px] bg-white dark:bg-dark-400 shadow-md rounded-xl overflow-hidden dark:text-white">
        <div className="mb-4 relative">
          <Image src={images.avatarCover} alt="grocery-mart" height={250} width={250} className="h-[250px] w-full" />
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center justify-center w-full">
            <Formik
              initialValues={initialValues}
              onSubmit={(values, { resetForm }) => {
                if (!values.avatar) return;
                updateUser(
                  { avatar: values.avatar },
                  {
                    onSuccess: (response) => {
                      if (response.code === 200) {
                        success(t('updateSuccessful'));
                      } else {
                        error(response.message);
                      }

                      handleCancelAvatar(resetForm);
                    },
                    onError: () => {
                      error(tCommon('hasErrorTryAgainLater'));
                      handleCancelAvatar(resetForm);
                    },
                  },
                );
              }}
            >
              {({ setFieldValue, resetForm }) => (
                <Form className="flex flex-col justify-center items-center">
                  <div className="relative group w-[100px] h-[100px] rounded-full bg-gray-300">
                    <Image
                      src={previewUrl || userData?.avatar || ''}
                      alt="grocery-mart"
                      height={100}
                      width={100}
                      className="h-[100px] w-[100px] rounded-full"
                    />
                    <label
                      htmlFor="avatarInput"
                      className="absolute bottom-0 left-0 w-full h-1/2 bg-black/60 text-white text-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer rounded-b-full"
                    >
                      {tCommon('change')}
                    </label>
                    <input
                      id="avatarInput"
                      name="avatar"
                      type="file"
                      accept="image/png, image/jpeg"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (previewUrl) {
                            URL.revokeObjectURL(previewUrl);
                          }
                          const newPreviewUrl = URL.createObjectURL(file);
                          setPreviewUrl(newPreviewUrl);
                          setFieldValue('avatar', file);
                        }
                      }}
                    />
                  </div>
                  {previewUrl && (
                    <div className="mt-2 flex space-x-2">
                      <Button
                        variant="outlined"
                        size="small"
                        textColor="red-300"
                        borderColor="red-300"
                        textHoverColor="red-400"
                        borderHoverColor="red-400"
                        bgHoverColor="red-200"
                        onClick={() => handleCancelAvatar(resetForm)}
                      >
                        {tCommon('cancel')}
                      </Button>
                      <Button variant="outlined" bgHoverColor="blue-300" size="small" type="submit">
                        {tCommon('saveChange')}
                      </Button>
                    </div>
                  )}
                  <div className="text-white-200 text-lg font-semibold mt-5 text-center">
                    {userData?.fullname || ''}
                  </div>
                  <div className="text-white-200 text-sm">{formatRegisteredDate(userData?.createdAt || '')}</div>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        <div className="mb-6 mt-7">
          <div className="flex h-fit items-stretch">
            <div className="w-[3px] bg-blue-400"></div>
            <h2 className="flex-1 font-semibold dark:text-white text-base bg-gray-100 dark:bg-dark-500 h-full flex items-center p-2 mb-0">
              {t('accountManage')}
            </h2>
          </div>
          <ul className="space-y-1 px-3">
            {accountLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`flex items-center space-x-2 p-2 text-base font-medium rounded hover:text-blue transition-all ${
                    pathname === link.path ? 'text-blue' : ''
                  }`}
                >
                  <Icon name={link.icon} size={1.3} color="inherit" />
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex h-fit items-stretch">
            <div className="w-[3px] bg-blue-400"></div>
            <h2 className="flex-1 font-semibold text-base bg-gray-100 dark:bg-dark-500 h-full flex items-center p-2 mb-0">
              {t('transactionManage')}
            </h2>
          </div>
          <ul className="space-y-2 px-3">
            {transactionLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`flex items-center space-x-2 p-2 text-base font-medium rounded hover:text-blue transition-all ${
                    pathname === link.path ? 'text-blue' : ''
                  }`}
                >
                  <Icon name={link.icon} size={1.3} color="inherit" />
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          <Button
            variant="outlined"
            textColor="blue-400"
            borderColor="blue-400"
            textHoverColor="blue-500"
            borderHoverColor="blue-500"
            className="mt-[120px] !w-[80%] mx-auto"
            onClick={logoutUser}
          >
            {tCommon('logout')}
          </Button>
        </div>
      </nav>
    </WithLoading>
  );
};

export default SideBar;
