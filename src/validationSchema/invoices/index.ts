import * as yup from 'yup';

export const invoiceValidationSchema = yup.object().shape({
  amount: yup.number().integer().required(),
  status: yup.string().required(),
  company_id: yup.string().nullable(),
  finance_manager_id: yup.string().nullable(),
});
