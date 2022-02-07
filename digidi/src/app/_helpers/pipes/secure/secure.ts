import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthenticationService } from "../../auth/authentication.service";


@Pipe({
  name: 'secure'
})
export class SecurePipe implements PipeTransform {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private authService: AuthenticationService) {}

  transform(url): Observable<SafeUrl> {
      const isLoggedIn = this.authService.currentUserValue?.token;
      let headers: HttpHeaders = new HttpHeaders();
      if(isLoggedIn) {

      }
      headers = headers.append('Authorization', isLoggedIn);
      return this.http
          .get(url, { responseType: 'blob', headers: headers })
          .pipe(map(val => { 
            let ul =`${URL.createObjectURL(val)}`; 
            return this.sanitizer.bypassSecurityTrustUrl(ul) 
          }))
  }

}