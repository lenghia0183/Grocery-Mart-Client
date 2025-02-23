import * as Yup from 'yup';

export const getLoginValidationSchema = (t: (key: string) => string) =>
  Yup.object().shape({
    email: Yup.string().email(t('invalidEmail')).required(t('required')),
    password: Yup.string()
      .min(6, t('passwordMin'))
      .matches(/[A-Za-z]/, t('passwordRequireLetter'))
      .matches(/\d/, t('passwordRequireNumber'))
      .required(t('required')),
  });
