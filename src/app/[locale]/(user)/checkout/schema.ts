import * as Yup from 'yup';

export const validationSchema = (t: (key: string) => string) =>
  Yup.object({
    buyerName: Yup.string().required(t('required')),
    buyerEmail: Yup.string().email(t('invalidEmail')).required(t('required')),
    buyerPhone: Yup.string()
      .required(t('required'))
      .matches(/^\+?[0-9]{10,15}$/, t('invalidPhone')),
    recipientName: Yup.string().required(t('required')),
    recipientPhone: Yup.string()
      .required(t('required'))
      .matches(/^\+?[0-9]{10,15}$/, t('invalidPhone')),
    paymentMethod: Yup.string().required(t('required')),
    note: Yup.string().required(t('required')),
    province: Yup.object()
      .nullable()
      .required(t('required'))
      .test('is-not-empty', t('required'), (value) => {
        return value !== null && Object.keys(value).length > 0;
      }),
    district: Yup.object()
      .nullable()
      .required(t('required'))
      .test('is-not-empty', t('required'), (value) => value !== null && Object.keys(value).length > 0),
    ward: Yup.object()
      .nullable()
      .required(t('required'))
      .test('is-not-empty', t('required'), (value) => value !== null && Object.keys(value).length > 0),
    street: Yup.string().trim().required(t('required')),
  });
