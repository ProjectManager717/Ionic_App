import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/_helpers/auth/authentication.service';
import { ToastService } from 'src/app/_helpers/toast-service/toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  fixHeader: boolean;
  forgotForm: FormGroup;
  resetForm: FormGroup;
  showPassword:boolean;
  toReset: boolean;
  forgotting: boolean;
  resetting: boolean;

  
  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private toastr: ToastService,
    private navCtrl: NavController,
    private apiService: ApiService,
  ) { 
    this.initForm();
  }

  ngOnInit() {
    this.toReset = false;
    if(this.authService.currentUserValue) {
      this.navCtrl.navigateRoot(['/','member'])
    }
  }

  initForm() {
    this.forgotForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });

    this.resetForm = this.formBuilder.group({
      otp: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])],
    });

    // this.loginForm.statusChanges.subscribe(status => {});
  } 

  get forgot() { return this.forgotForm.controls; }
  get reset() { return this.resetForm.controls; }
 

  logScrolling(event:any) {
    this.fixHeader = (event && event.detail && event.detail.currentY > 100);
  }

  forgotSubmit() {
    this.authService.markFormAsDirty(this.forgotForm);
    if(this.forgotForm.invalid) {
      return;
    }
    this.forgotting = true;
    this.apiService.forgotPassword(this.forgotForm.value).subscribe (
      res => {
        if(!res.error) {
          this.toastr.presentToast(res.msg, 'success');
          this.toReset = true;
        } else {
          this.toastr.presentToast(res.msg, 'danger');
        }
        this.forgotting = false;
      }, error => {
        this.forgotting = false;
        this.toastr.presentToast('Oops! something went wrong while sending forgot password mail, please try again later.', 'danger');
      }
    )
  }

  resetSubmit() {
    this.authService.markFormAsDirty(this.resetForm);
    if(this.resetForm.invalid) {
      return;
    }
    if(this.resetForm.value.password !== this.resetForm.value.confirmPassword) {
      this.toastr.presentToast('Confirm password isn\'t matching.', 'danger');
      return
    }
    let data  = {
      forgotten_password_code: this.resetForm.value.otp,
      email: this.forgotForm.value.email,
      newPassword: this.resetForm.value.password,
    }
    this.resetting = true;
    this.apiService.resetPassword(data).subscribe (
      res => {
        if(!res.error) {
          this.toastr.presentToast(res.msg, 'success');
          this.toReset = false;
          this.navCtrl.back();
        } else {
          this.toastr.presentToast(res.msg, 'danger');
        }
        this.resetting = false;
      }, error => {
        this.resetting = false;
        this.toastr.presentToast('Oops! something went wrong while reset password, please try again later.', 'danger');
      }
    )
  }

}