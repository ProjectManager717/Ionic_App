export class Post {
    id?:string;
    author_alias?: string;
    content?: string;
    customization?: Customization;
    file?: FileItem;
    media?: FileItem[];
    status?: 'HIDDEN' | 'PUBLISHED';
    publish_date?: any;
    created_date?: any;
    title: string;
    notify_followers?: boolean;
    sticky?:boolean;
    maecenate?:string;
    post_read_at?:any;
    isOpen?:boolean;
}

export class Customization {
    bg_color?: string;
    font?: string;
    font_color?: string;
}

export class FileItem {
  file_type?: string;
  filename?: string;
  id?: string;
  img_height?: number;
  img_width?: number;
  local_path?: string;
  props?: any;
  role?: "FILE" | "MEDIA"
  type?: string;
}

export class ProfileItems {
  logo_media?: string;
  monthly_minimum?: string;
  role?: string;
  slug?: string;
  subscriptions_qty?: string;
  subscriptions_sum?: string;
  teaser?: string;
  title?: string;
  trx_total_qty?: string;
  trx_total_sum?: string;
  logo?:FileItem;
  cover?: FileItem;
  categories?:any[];
  background?:any;
  active?:boolean;
  cover_media?: string;
  created_at?: string;
  creator?:string;
  currency?: string;
  description?: string;
  id?:string;
}