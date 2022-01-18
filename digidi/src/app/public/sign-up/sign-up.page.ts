import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/_helpers/auth/authentication.service';
import { ToastService } from 'src/app/_helpers/toast-service/toast.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})

export class SignUpPage implements OnInit {
  fixHeader: boolean;
  signUpForm: FormGroup;
  showPassword:boolean;
  signingUp: boolean;
  toVerify:boolean;

  
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
    if(this.authService.currentUserValue) {
      this.navCtrl.navigateRoot(['/','member'])
    }
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      firstname: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword :  ['', Validators.compose([Validators.required])],
    });
    // this.signUpForm.statusChanges.subscribe(status => {});
  } 

  get signUp() { return this.signUpForm.controls }
 

  logScrolling(event:any) {
    this.fixHeader = (event && event.detail && event.detail.currentY > 100);
  }

  signupNow() {
    this.authService.markFormAsDirty(this.signUpForm);
    if(this.signUpForm.invalid) {
      return;
    }
    if(this.signUpForm.value.password !== this.signUpForm.value.confirmPassword) {
      this.toastr.presentToast('Confirm password isn\'t matching.', 'danger');
      return
    }
    let data = this.signUpForm.value;
    this.signingUp = true;
    this.apiService.signUpUser(data).subscribe(
      res => {
        if(!res.error) {
          this.toastr.presentToast(res.msg, 'success');
          this.toVerify = true;
        } else {
          this.toastr.presentToast(res.msg, 'danger')
        }
        this.signingUp = false;
      }, error => {
        this.signingUp = false;
        this.toastr.presentToast('Oops! something went wrong while registering, please try again later.', 'danger');
      }
    )
  }

  handleClose() {
    this.signUpForm.reset();
    this.navCtrl.back();
  }

}
