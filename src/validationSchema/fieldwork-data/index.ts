import * as yup from 'yup';

export const fieldworkDataValidationSchema = yup.object().shape({
  coordinates: yup.string().required(),
  elevation: yup.number().integer().required(),
  soil_profile: yup.string().required(),
  penetrometer_results: yup.number().integer().required(),
  job_id: yup.string().nullable(),
});
