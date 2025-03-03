import * as Yup from 'yup';

export const validationSchema = (t: (key: string) => string) =>
  Yup.object().shape({
    email: Yup.string().email(t('invalidEmail')).required(t('required')),
    name: Yup.string().required(t('required')),
    phone: Yup.string()
      .required(t('required'))
      .matches(/^\+?[0-9]{10,15}$/, t('invalidPhone')),
  });
