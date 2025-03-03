import * as Yup from 'yup';

export const validationSchema = (t: (key: string) => string) =>
  Yup.object({
    province: Yup.object()
      .nullable()
      .required(t('required'))
      .test('is-not-empty', t('required'), (value) => {
        console.log('value', value);
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
