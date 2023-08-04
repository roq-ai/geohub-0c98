import { JobInterface } from 'interfaces/job';
import { GetQueryInterface } from 'interfaces';

export interface FieldworkDataInterface {
  id?: string;
  coordinates: string;
  elevation: number;
  soil_profile: string;
  penetrometer_results: number;
  job_id?: string;
  created_at?: any;
  updated_at?: any;

  job?: JobInterface;
  _count?: {};
}

export interface FieldworkDataGetQueryInterface extends GetQueryInterface {
  id?: string;
  coordinates?: string;
  soil_profile?: string;
  job_id?: string;
}
