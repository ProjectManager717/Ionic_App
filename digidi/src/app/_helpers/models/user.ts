import { Role } from './role';

export class User {
  id?: number;
  _id?: number;
  dispName?:string;
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  full_name?: string;
  avatar?: string;
  role?: Role;
  token?: string;
  phone?:string;
  google_id?:string;
  facebook_id?:string;
  country?:any;
  driving_licence?:any;
  drivingLicense?:any;
  secondaryDocument?:any;
  picWithDL?:any;
  documentStatus?:any;
  profile_pic?:any;
  rejectionMessage?:any;
}