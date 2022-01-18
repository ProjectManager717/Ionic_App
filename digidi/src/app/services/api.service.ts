import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EncryptionService } from '../_helpers/encryption/encryption.service';
import { ToastService } from '../_helpers/toast-service/toast.service';

@Injectable({ providedIn: 'root' })
export class ApiService {


  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(
    private _httpClient: HttpClient,
    private encryptionService: EncryptionService,
    private toastr: ToastService,
  ) {
  }

  signUpUser(body): Observable<any> {
    return this._httpClient.post(`${environment.baseApiUrl}signUp`,body);
  }

  loginUser(body): Observable<any> {
    return this._httpClient.post(`${environment.baseApiUrl}login`,body);
  }

  forgotPassword(body): Observable<any> {
    return this._httpClient.post(`${environment.baseApiUrl}forgotPassword`,body);
  }

  resetPassword(body): Observable<any> {
    return this._httpClient.post(`${environment.baseApiUrl}resetPassword`,body);
  }
  
  socialMediaLogin(body): Observable<any> {
    return this._httpClient.post(`${environment.baseApiUrl}socialMediaLogin`,body);
  }

  getUser(id): Observable<any>  {
    return this._httpClient.get(`${environment.baseApiUrl}getUser/${id}`);
  }

  userDetail(id): Observable<any>  {
    return this._httpClient.get(`${environment.baseApiUrl}userDetail/${id}`);
  }

  updatePassword(body): Observable<any> {
    return this._httpClient.post(`${environment.baseApiUrl}updatePassword`,body);
  }

  updatePersonalInfo(body): Observable<any> {
    return this._httpClient.post(`${environment.baseApiUrl}updatePersonalInfo`,body);
  }

  uploadProfilePic(body): Observable<any> {
    return this._httpClient.post(`${environment.baseApiUrl}uploadProfilePic`,body);
  }

  createOrder(body): Observable<any> {
    return this._httpClient.post(`${environment.baseApiUrl}createOrder`,body);
  }

  getAllOrder(userID): Observable<any> {
    return this._httpClient.get(`${environment.baseApiUrl}getOrder/${userID}`);
  }

  resendEmailConfirmation(data): Observable<any> {
    return this._httpClient.post(`${environment.baseApiUrl}resendEmailConfirmation`, data);
  }

  emailConfirmation(data): Observable<any> {
    return this._httpClient.post(`${environment.baseApiUrl}emailConfirmation`, data);
  }

  showTranlateToaster(val,type = 'danger') {
    this.toastr.presentToast(val, type )
  }

  gotoExternal(link: string) {
    window.open(link, "_blank");
  }

  toastNow(text,type = 'error') {
    switch(type) {
      case 'error':
        this.toastr.presentToast(text, 'danger');
       break;
      case 'success':
        this.toastr.presentToast(text, 'success');
       break;
      case 'warn':
        this.toastr.presentToast(text, 'warning');
       break;
      case 'info':
        this.toastr.presentToast(text, 'primary');
       break;
    }
  }
}
