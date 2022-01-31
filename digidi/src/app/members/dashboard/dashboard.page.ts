import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { element } from 'protractor';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/_helpers/auth/authentication.service';
import { User } from 'src/app/_helpers/models';
import { FileItem, ProfileItems } from 'src/app/_helpers/models/order';
import { ToastService } from 'src/app/_helpers/toast-service/toast.service';
import { Browser } from '@capacitor/browser';
import { environment } from 'src/environments/environment';
// import { App } from '@capacitor/app';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  prifleItems: ProfileItems[] = []
  fixHeader: boolean;
  accountForm: FormGroup;
  isLoading:boolean;
  currentUser: User;
  loadingProfile: boolean;
  constructor(
    private authService: AuthenticationService,
    private navCtrl: NavController,
    private fb: FormBuilder,
    private apiService: ApiService,
    private toastService: ToastService,
  ) { 
    // if(!this.authService.currentUserValue) {
    //   this.exitApp();
    // }

    this.authService.currentUser.subscribe(
      res => {
        this.currentUser = res;
      }
    )
    this.currentUser = this.authService.currentUserValue;

    // this.prifleItems = this.apiService.postItems;
    this.getUserDetails();
    this.getProfiles();
  }

  getUserDetails() {
   this.isLoading = true;
   this.apiService.myDetails().subscribe(res => {
    if(res.result && res.entities && res.entities.users) {
      this.updateUser(res.entities.users[res.result[0]]);
    }
    this.isLoading = false;
   }) 
  }

  updateCompanyFields() {
    let toEnable = this.accountForm.get('is_company').value;
    if(!toEnable) {
      this.accountForm.get('company_name').enable();
      this.accountForm.get('company_reg_no').enable();
      this.accountForm.get('company_address').enable();
      this.accountForm.get('company_phone').enable();
      this.accountForm.get('company_zip_code').enable();
      this.accountForm.get('company_country').enable();
    } else {
      this.accountForm.get('company_name').disable();
      this.accountForm.get('company_reg_no').disable();
      this.accountForm.get('company_address').disable();
      this.accountForm.get('company_phone').disable();
      this.accountForm.get('company_zip_code').disable();
      this.accountForm.get('company_country').disable();
    }
  }

  initForm() {
    this.accountForm = this.fb.group(
      {
        first_name: [this.currentUser?.first_name || '', [Validators.required]],
        last_name: [this.currentUser?.last_name || '', [Validators.required]],
        email: [this.currentUser?.email || '', [Validators.required, Validators.email]],
        password: [''],
        address_1: [this.currentUser?.address_1 || ''],
        address_2: [this.currentUser?.address_2 || ''],
        alias: [this.currentUser?.alias || ''],
        phone_number: [this.currentUser?.phone_number || ''],
        country: [this.currentUser?.country || ''],
        zip_code: [this.currentUser?.zip_code || ''],
        city: [this.currentUser?.zip_code || ''],
        bank_account: [this.currentUser?.bank_account || ''],
        is_company: [this.currentUser?.is_company || false],
        company_name: [this.currentUser?.company?.company_name || '', [Validators.required] ],
        company_reg_no: [this.currentUser?.company?.company_reg_no || '', [Validators.required] ],
        company_address: [this.currentUser?.company?.company_address || '', [Validators.required] ],
        company_phone: [this.currentUser?.company?.company_phone || '', [Validators.required] ],
        company_zip_code: [this.currentUser?.company?.company_zip_code || '', [Validators.required] ],
        company_country: [this.currentUser?.company?.company_country || '', [Validators.required] ],
      }
    )
  }

  get accFrm () {
    return this.accountForm.controls
  }
  ngOnInit() {
    this.initForm();
    this.updateCompanyFields();
  }

  navigaterNow(item:ProfileItems) {
    if(item) {
      // if(item.route){
        // this.navCtrl.navigateForward(item.route);
      // }
    }
  }

  submit() {
    this.apiService.markAllDirty(this.accountForm);
    if(!this.accountForm.value.is_company) {
      if(
        this.accountForm.get('first_name').invalid 
        || this.accountForm.get('last_name').invalid
        || this.accountForm.get('email').invalid
      ) {
        return;
      }
    } else if(this.accountForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.apiService.updateDetails(this.mapUser()).subscribe(
      res => {
        if(res.result && res.entities && res.entities.users) {
          this.updateUser(res.entities.users[res.result[0]]);
          this.toastService.presentToast('Account Updated', 'success')
        }
      }, error => {
        this.toastService.errorReponseToast(error);
        this.isLoading =false;
      }
    );

  }

  getProfiles() {
    this.loadingProfile = true;
    this.apiService.getProfiles(this.currentUser.id).subscribe(
      res => {
        if(res && res.maecenates) {
          this.prifleItems = res.maecenates;
          this.apiService.postItems = this.prifleItems;
        }
        this.loadingProfile = false;
      }, error => {
        this.loadingProfile = false;
      }
    )
  }

  updateUser(newUser) {
    let user:User = this.authService.currentUserValue;
    Object.assign(user, newUser);
    this.authService.updateTokenValue(user);
    this.currentUser = this.authService.currentUserValue;
    console.log(user, 'up')
    this.initForm();
    this.updateCompanyFields();
  }

  mapUser():User {
    let user:User = JSON.parse(JSON.stringify(this.currentUser));
    user.first_name = this.accountForm.value.first_name;
    user.last_name = this.accountForm.value.last_name;
    user.email = this.accountForm.value.email;
    user.address_1 = this.accountForm.value.address_1;
    user.address_2 = this.accountForm.value.address_2;
    user.alias = this.accountForm.value.alias;
    user.phone_number = this.accountForm.value.phone_number;
    user.country = this.accountForm.value.country;
    user.zip_code = this.accountForm.value.zip_code;
    user.city = this.accountForm.value.city;
    user.bank_account = this.accountForm.value.bank_account;
    user.is_company = this.accountForm.value.is_company;
    if(user.is_company) {
      user.company = {
        company_address: this.accountForm.value.company_address,
        company_country: this.accountForm.value.company_country,
        company_name: this.accountForm.value.company_name,
        company_phone: this.accountForm.value.company_phone,
        company_reg_no: this.accountForm.value.company_reg_no,
        company_zip_code: this.accountForm.value.company_zip_code,
      }
    } else {
      user.company = null; 
    }
    return user;
  }

  gotoPost() {
    this.navCtrl.navigateForward('/member/create-post');
  }
  
  exitApp() {
    this.authService.logout();
  }

  logScrolling(event:any) {
    this.fixHeader = (event && event.detail && event.detail.currentY > 100);
  }

  getMediaUrl(path, type=1) {
    return path ? this.apiService.getMediaUrl(path, type) : '';
  }

  

  openWebsite() {
    window.open(environment.websiteBaseUrl, '_system');
    // const openCapacitorSite = async () => {
    //   await Browser.open({ url: environment.websiteBaseUrl });
    // };
    
    // Browser.addListener('browserFinished', () => {
    //   console.log('browserClosed');
    //   Browser.removeAllListeners();
    // });
  }  

}
