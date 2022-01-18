import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, Role } from '../models';
import { EncryptionService } from '../encryption/encryption.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/_helpers/toast-service/toast.service';
import { NavController } from '@ionic/angular';


const TOKEN_KEY = 'digidi-user-auth-token';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;
  public loginModal = new  BehaviorSubject<string>(null);

  //private
  private currentUserSubject: BehaviorSubject<User>;
  public profilePicUpdate = new BehaviorSubject<boolean>(false);

  loggedOut: boolean;
  tempToken: string = '';
  subsAll:any=[];
  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   * @param {UserBalanceService} _userBalanceService
   */
  constructor(
    private encryptionService: EncryptionService,
    private navCrtl: NavController,
    public toastr: ToastService,
  ) {
    this.checkToken();
  }

  checkToken() {
    let locToken = this.encryptionService.decode(localStorage.getItem(TOKEN_KEY));
    if (locToken) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(locToken));
      this.currentUser = this.currentUserSubject.asObservable();
    } else {
      this.currentUserSubject = new BehaviorSubject<User>(null);
      this.currentUser = this.currentUserSubject.asObservable();
    }
  }

  updateTokenValue(updatedUser: any) {
    if (updatedUser && updatedUser.token) {
      localStorage.setItem(TOKEN_KEY, this.encryptionService.encode(JSON.stringify(updatedUser)));
      this.currentUserSubject.next(updatedUser);
    }
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }  
  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(TOKEN_KEY);
    // notify
    this.currentUserSubject.next(null);
    // set logout flag
    this.loggedOut = true;
    this.navCrtl.navigateRoot(['/','public','login']);

  }

  setLogin(user) {
    if (user && user.token) {
      localStorage.setItem(TOKEN_KEY, this.encryptionService.encode(JSON.stringify(user)));
      this.currentUserSubject.next(user);
      this.loggedOut = false;
    }
  }

  SetSocialLogin(socialuser, user) {
    if (user && user.token) {
      user.social_user = socialuser;
      localStorage.setItem(TOKEN_KEY, this.encryptionService.encode(JSON.stringify(user)));
      localStorage.setItem(TOKEN_KEY, this.encryptionService.encode(JSON.stringify(user)));
      this.currentUserSubject.next(user);
      this.loggedOut = false;
    }
  }

  errorToaster(data: any, toToast = true) {
    if (data.error && data.msg) {
      if (data.auth == false) {
        if (!this.loggedOut) {
          // show toaster for session out;
          if (toToast) {
            this.toastr.presentToast('Your session is expired, please login again.', 'danger');
            this.logout();
          }
        }
        this.loggedOut = true;
      } else {
        // show default retuned error;
        if (toToast) {
          this.toastr.presentToast(data.msg, 'danger');
        }
      }
    }
  }

  markFormAsDirty(from) {
    for (const key in from.controls) {
      if (Object.prototype.hasOwnProperty.call(from.controls, key)) {
        from.controls[key].markAsDirty();
      }
    }
  }
}
