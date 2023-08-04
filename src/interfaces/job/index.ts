import { FieldworkDataInterface } from 'interfaces/fieldwork-data';
import { ProjectInterface } from 'interfaces/project';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface JobInterface {
  id?: string;
  name: string;
  description?: string;
  project_id?: string;
  technician_id?: string;
  created_at?: any;
  updated_at?: any;
  fieldwork_data?: FieldworkDataInterface[];
  project?: ProjectInterface;
  user?: UserInterface;
  _count?: {
    fieldwork_data?: number;
  };
}

export interface JobGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  project_id?: string;
  technician_id?: string;
}
