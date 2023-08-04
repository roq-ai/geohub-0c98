import { JobInterface } from 'interfaces/job';
import { CompanyInterface } from 'interfaces/company';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ProjectInterface {
  id?: string;
  name: string;
  description?: string;
  company_id?: string;
  admin_id?: string;
  created_at?: any;
  updated_at?: any;
  job?: JobInterface[];
  company?: CompanyInterface;
  user?: UserInterface;
  _count?: {
    job?: number;
  };
}

export interface ProjectGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  company_id?: string;
  admin_id?: string;
}
