export class User {
  id?:string;
  first_name?:string;
  last_name?:string;
  email?:string;
  alias?:string;
  phone_number?:any;
  country?:any;
  zip_code?:string;
  epay_subscription_id?:any;
  payment_card?:any;
  language?:string;
  payment_card_issuer?:string;
  bank_account?:any;
  vat?:any;
  roles?:any[] = [];
  auth_key?:any;
  economic_id?:number;
  created_at:string;
  address_1?:string;
  address_2?:string;
  is_company?:boolean;
  city?:string;
  country_id?:any;
  payout?:any;
  quickpay_subscription_id?:any;
  password?:string;
  company: Company;
  token?:any;
}

export class Company {
  company_name?: string;
  company_reg_no?: string;
  company_address?: string;
  company_phone?: string;
  company_zip_code?: string;
  company_country?: string;
}