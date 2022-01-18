export class Order {
  id?: number;
  user_id?:any;
  facility_name?:string = '';
  address?:string = ''
  time_arrived?:any;
  time_departed?:any;
  service_requested?:SERVICE_TYPE;
  service_call_detail?:string = '';
  service_performed?:string ='';
  parts_used?:any[]=[];
  createdAt?:any;
}

export enum SERVICE_TYPE  { 
    "AQMD R461 Testing" = 1,
    "Monitoring System Certification" = 2,
    "SB989 Secondary Containment Testing" = 3,
    "Overfill Prevention Inspection" = 4,
    "Service Call" = 5,
}