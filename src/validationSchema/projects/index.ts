import * as yup from 'yup';

export const projectValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().nullable(),
  company_id: yup.string().nullable(),
  admin_id: yup.string().nullable(),
});
