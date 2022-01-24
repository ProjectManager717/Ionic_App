import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EncryptionService } from '../_helpers/encryption/encryption.service';
import { Post } from '../_helpers/models/order';
import { ToastService } from '../_helpers/toast-service/toast.service';
import { StaticService } from './static.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  public postItems = [
    { name: 'Profile1', id:'cf94d7a0-78fd-11ec-8f6d-49f8a47e0f45', icon: 'assets/img/profile-img.png', subscribers: 0, dkk: 0, total_dkk:0 },
    { name: 'Profile2', id:'cf94d7a0-78fd-11ec-8f6d-49f8a47e0f46', icon: 'assets/img/profile-img.png', subscribers: 0, dkk: 0, total_dkk:0 },
    { name: 'Profile3', id:'cf94d7a0-78fd-11ec-8f6d-49f8a47e0f43', icon: 'assets/img/profile-img.png', subscribers: 0, dkk: 0, total_dkk:0 },
    { name: 'Profile4', id:'cf94d7a0-78fd-11ec-8f6d-49f8a47e0f42', icon: 'assets/img/profile-img.png', subscribers: 0, dkk: 0, total_dkk:0 },
  ]

  posttoEdit:any = null;

  /*
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */

  
  constructor(
    private _httpClient: HttpClient,
    private encryptionService: EncryptionService,
    private toastr: ToastService,
    private staticService: StaticService
  ) {
  }

  myDetails():Observable<any> {
    return of(this.staticService.updateUser);
    return this._httpClient.get(`${environment.baseApiUrl}users/me`);
  }

  signUpUser(body): Observable<any> {
    // return of(this.staticService.demoRegister);
    return this._httpClient.post(`${environment.baseApiUrl}signUp`,body);
  }

  updateDetails(body):Observable<any> {
    return of(this.staticService.updateUser);
    return this._httpClient.put(`${environment.baseApiUrl}api/users/me/edit`, body);
  }


  loginUser(body): Observable<any> {
    return of(this.staticService.demoUser);
    let  credentials = body
    return this._httpClient.post(`${environment.baseApiUrl}users/auth`,{credentials});
  }

  forgotPassword(body): Observable<any> {
    return this._httpClient.post(`${environment.baseApiUrl}forgotPassword`,body);
  }

  resetPassword(body): Observable<any> {
    return this._httpClient.post(`${environment.baseApiUrl}resetPassword`,body);
  }

  getPost(page): Observable<any> {
    return of(this.staticService.posts);
    return this._httpClient.get(`${environment.baseApiUrl}maecenates/coolguy/posts?page=${page}`)
  }
  post(body: Post) {
    return this._httpClient.post(`${environment.baseApiUrl}posts/create`,body);
  }

  uploadChunks(role:'MEDIA' | 'FILE' ='MEDIA', body): Observable<any> {
    // body: { dzuuid: 1e72d07e-b200-4f5b-925d-eedbb29f5c3d dzchunkindex: 0 dztotalfilesize: 121036
    // dzchunksize: 5000000, dztotalchunkcount: 1, dzchunkbyteoffset: 0, file: (binary) }
    // {"entities":{"media":{"d13d8a10-79b7-11ec-8f6d-49f8a47e0d44":{"id":"d13d8a10-79b7-11ec-8f6d-49f8a47e0d44","type":"image/png","role":"MEDIA","filename":"image_2022_01_18T15_08_20_302Z.png","local_path":"image/6f/fcc7ce60cff2eebca937a98cde9cdc.png","file_type":"image","props":{},"img_width":512,"img_height":512}}},"result":["d13d8a10-79b7-11ec-8f6d-49f8a47e0d44"]}
    return this._httpClient.post(`${environment.baseApiUrl}files/upload-by-chunk?role=${role}`,body, { reportProgress: true});
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

  markAllDirty(form:any) {
    for (const key in form.controls) {
      if (Object.prototype.hasOwnProperty.call(form.controls, key)) {
        form.controls[key].markAsDirty(); 
      }
    }
    return form;
  }
}
