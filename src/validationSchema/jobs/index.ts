import * as yup from 'yup';

export const jobValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().nullable(),
  project_id: yup.string().nullable(),
  technician_id: yup.string().nullable(),
});
