import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Platform } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../_helpers/auth/authentication.service';
import { EncryptionService } from '../_helpers/encryption/encryption.service';
import { Post, ProfileItems } from '../_helpers/models/order';
import { ToastService } from '../_helpers/toast-service/toast.service';
import { StaticService } from './static.service';
import  axios  from 'axios'

@Injectable({ providedIn: 'root' })
export class ApiService {
  public postItems:ProfileItems[] = []

  posttoEdit:any = null;

  /*
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  //weburls :
  createProfile = `${environment.websiteBaseUrl}profile/create`;
  searchProfile = `${environment.websiteBaseUrl}profiles`;
  
  constructor(
    private _httpClient: HttpClient,
    private encryptionService: EncryptionService,
    private toastr: ToastService,
    private staticService: StaticService,
    private platForm: Platform,
    private authService: AuthenticationService
  ) {
  }

  myDetails():Observable<any> {
    // return of(this.staticService.updateUser);
    return this._httpClient.get(`${environment.baseApiUrl}users/me`);
  }

  signUpUser(body): Observable<any> {
    // return of(this.staticService.demoRegister);
    return this._httpClient.post(`${environment.baseApiUrl}signUp`,body);
  }

  updateDetails(body):Observable<any> {
    // return of(this.staticService.updateUser);
    let user = {user: body};
    delete user.user.token;
    return this._httpClient.put(`${environment.baseApiUrl}users/me/edit`, {user:body});
  }


  loginUser(body): Observable<any> {
    // return of(this.staticService.demoUser);
    let  credentials = body
    return this._httpClient.post(`${environment.baseApiUrl}users/auth`,{credentials});
  }

  forgotPassword(body): Observable<any> {
    return this._httpClient.post(`${environment.baseApiUrl}forgotPassword`,body);
  }

  resetPassword(body): Observable<any> {
    return this._httpClient.post(`${environment.baseApiUrl}resetPassword`,body);
  }

  getProfiles(user_id): Observable<any> {
    return this._httpClient.get(`${environment.baseApiUrl}users/${user_id}/admin-maecenates`)
  }

  getSupports(): Observable<any> {
      return this._httpClient.get(`${environment.baseApiUrl}users/me/supported-maecenates`)
  }

  getFeeds(page = 1): Observable<any> {
    return this._httpClient.get(`${environment.baseApiUrl}users/me/feed?page=${page}`)
  }
  getPost(profile='test-profiless1',page): Observable<any> {
    // return of(this.staticService.posts);
    return this._httpClient.get(`${environment.baseApiUrl}maecenates/${profile.split(' ').join('-')}/posts?page=${page}`)
  }

  post(body: Post) {
    let post = body;
    if(!post.id) {
      return this._httpClient.post(`${environment.baseApiUrl}posts/create`,{post});
    } else {
      return this._httpClient.put(`${environment.baseApiUrl}posts/${post.id}/edit`,{post});
    }
  }

  uploadChunks(role:'MEDIA' | 'FILE' ='MEDIA', body, callBack, zon): Promise<any> {
    const config = {
      onUploadProgress: (progressEvent) => {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        callBack(role, percentCompleted, zon)
      },
      headers:{'Content-type':'multipart/form-data;', 'Authorization': this.authService.currentUserValue.token}
    }
    //
    return axios.post(`${environment.baseApiUrl}files/upload-by-chunk?role=${role}`,body, config);
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

  readPost(postId:any) {
    return this._httpClient.post(`${environment.baseApiUrl}posts/${postId}/read`, {});
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

  getMediaUrl(path, type = 1) {
    // type 1 = media image, 2= file image, 3 = audio, 4= video
    let name = (type == 1) ? `${path.split('.')[0]}-sc-1200.${path.split('.')[1]}` : path;
    return (path.indexOf('http://') > -1 || path.indexOf('https://') > -1) 
            ? path : `${environment.baseMediaPath}${type == 1 ? 'thumb/' :  'storage/'}${name}`
  }

  openWebsite(url = environment.websiteBaseUrl, inApp= true) {
    if(inApp && this.platForm.is('capacitor')) {
      Browser.open({ url });
    } else {
      window.open(url, '_system');
    }
    console.log(url);
  }
  
  openLinkWithToken(url, inApp=false) {
    if(url) {
      let prm = url.indexOf('?');
      let newurl = url;
      if(prm > -1) {
        newurl = `${url}&token=${this.authService.currentUserValue.token}`
      } else {
        newurl = `${url}?token=${this.authService.currentUserValue.token}`
      }
      console.log('sdd', newurl)
      this.openWebsite(newurl, inApp);
    }
  }

  openCreateProfile() {
    this.openLinkWithToken(this.createProfile);
  }

  openSearch() {
    this.openLinkWithToken(this.searchProfile);
  }
}
