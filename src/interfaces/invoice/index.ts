import { CompanyInterface } from 'interfaces/company';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface InvoiceInterface {
  id?: string;
  amount: number;
  status: string;
  company_id?: string;
  finance_manager_id?: string;
  created_at?: any;
  updated_at?: any;

  company?: CompanyInterface;
  user?: UserInterface;
  _count?: {};
}

export interface InvoiceGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  company_id?: string;
  finance_manager_id?: string;
}
