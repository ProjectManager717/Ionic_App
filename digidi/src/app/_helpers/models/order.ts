export class Post {
    author_alias?: string;
    content?: string;
    customization?: Customization;
    file?: FileItem;
    media?: FileItem;
    status?: 'HIDDEN' | 'PUBLISHED';
    publish_date?: any;
    title: string;
    notify_followers?: boolean;
    sticky?:boolean;
    maecenate?:string;
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