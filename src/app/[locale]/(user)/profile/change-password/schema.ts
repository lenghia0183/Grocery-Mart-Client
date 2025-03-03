import * as Yup from 'yup';

export const validationSchema = (t: (key: string) => string) =>
  Yup.object({
    currentPassword: Yup.string().required(t('required')),
    newPassword: Yup.string()
      .min(6, t('passwordMin'))
      .matches(/[A-Za-z]/, t('passwordRequireLetter'))
      .matches(/\d/, t('passwordRequireNumber'))
      .required(t('required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], t('passwordMismatch'))
      .required(t('required')),
  });
