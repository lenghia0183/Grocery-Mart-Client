import * as Yup from 'yup';

export const validationSchema = (t: (key: string) => string) =>
  Yup.object({
    rating: Yup.object()
      .nullable()
      .required(t('required'))
      .test('is-not-empty', t('required'), (value) => {
   
        return value !== null && Object.keys(value).length > 0;
      }),
   
    content: Yup.string().trim().required(t('required')),
  });
