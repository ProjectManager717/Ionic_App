import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
    name: 'safeurl'
  })
  export class SafeurlPipe implements PipeTransform {
    constructor(private domSanitizer: DomSanitizer) {}
    transform(url, toremote = true) {
      // let mainurl = !toremote ? url : (url.indexOf('://') == -1) ? url : url;
      return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }