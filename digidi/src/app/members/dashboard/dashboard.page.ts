import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { element } from 'protractor';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/_helpers/auth/authentication.service';
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
  constructor(
    private authService: AuthenticationService,
    private navCtrl: NavController,
    private fb: FormBuilder,
    private apiService: ApiService
  ) { 
    // if(!this.authService.currentUserValue) {
    //   this.exitApp();
    // }

    this.prifleItems = this.apiService.postItems;
    this.initForm();
    this.updateCompanyFields();
  }

  updateCompanyFields() {
    let toEnable = this.accountForm.get('representCompany').value;
    if(!toEnable) {
      this.accountForm.get('companyName').enable();
      this.accountForm.get('companyRegNo').enable();
      this.accountForm.get('companyAddress').enable();
      this.accountForm.get('companyPhone').enable();
      this.accountForm.get('companyZipcode').enable();
      this.accountForm.get('companyCountry').enable();
    } else {
      this.accountForm.get('companyName').disable();
      this.accountForm.get('companyRegNo').disable();
      this.accountForm.get('companyAddress').disable();
      this.accountForm.get('companyPhone').disable();
      this.accountForm.get('companyZipcode').disable();
      this.accountForm.get('companyCountry').disable();
    }
  }
  initForm() {
    this.accountForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [''],
        addressLine1: [''],
        addressLine2: [''],
        author: [''],
        phone: [''],
        country: [''],
        zipcode: [''],
        city: [''],
        bankAccount: [],
        representCompany: [null],
        companyName: ['', [Validators.required] ],
        companyRegNo: ['', [Validators.required] ],
        companyAddress: ['', [Validators.required] ],
        companyPhone: ['', [Validators.required] ],
        companyZipcode: ['', [Validators.required] ],
        companyCountry: ['', [Validators.required] ],
      }
    )
  }

  get accFrm () {
    return this.accountForm.controls
  }
  ngOnInit() {
  }

  navigaterNow(item:ProfileItems) {
    if(item) {
      if(item.route){
        // this.navCtrl.navigateForward(item.route);
      }
    }
  }

  gotoPost() {
    this.navCtrl.navigateForward('/create-post');
  }
  
  exitApp() {
    this.authService.logout();
  }

  logScrolling(event:any) {
    this.fixHeader = (event && event.detail && event.detail.currentY > 100);
  }

}


export class ProfileItems {
  name: string; icon: string; route?:string;  subscribers?:any; dkk?:any; total_dkk?:any;
}