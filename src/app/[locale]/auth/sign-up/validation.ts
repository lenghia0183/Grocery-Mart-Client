import * as Yup from 'yup';

export const getSignUpValidationSchema = (t: (key: string) => string) =>
  Yup.object().shape({
    email: Yup.string().email(t('invalidEmail')).required(t('required')),
    fullName: Yup.string().required(t('required')),
    password: Yup.string()
      .min(6, t('passwordMin'))
      .matches(/[A-Za-z]/, t('passwordRequireLetter'))
      .matches(/\d/, t('passwordRequireNumber'))
      .required(t('required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], t('passwordMismatch'))
      .required(t('required')),
  });
