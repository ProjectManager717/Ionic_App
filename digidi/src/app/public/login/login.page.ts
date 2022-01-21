import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/_helpers/auth/authentication.service';
import { ToastService } from 'src/app/_helpers/toast-service/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  fixHeader: boolean;
  loginForm: FormGroup;
  showPassword:boolean;
  logging: boolean;
  toVerify: boolean;
  
  constructor(
    private authService: AuthenticationService,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private toastr: ToastService,
    private navCtrl: NavController
  ) { 
    this.initForm();
  }

  ngOnInit() {
    if(this.authService.currentUserValue) {
      this.navCtrl.navigateRoot(['/','member'])
    }
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
    // this.loginForm.statusChanges.subscribe(status => {});
  } 

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
 

  logScrolling(event:any) {
    this.fixHeader = (event && event.detail && event.detail.currentY > 100);
  }

  login() {
    this.authService.markFormAsDirty(this.loginForm);
    if(this.loginForm.invalid) {
      return;
    }
    this.navCtrl.navigateRoot(['/','member'])
    return;
    this.logging = true;
      this.apiService.loginUser(this.loginForm.value).subscribe(
        res => {
          if(res.token && res.result && res.result.length > 0) {
            try{
              let user = res.entities.users[res.result[0]];
              user.token = res.token;
              this.authService.setLogin(user);
              this.navCtrl.navigateRoot(['/','member'])
            } catch(error) {
              this.toastr.presentToast('Oops! something went wrong while login, please try again later.', 'danger');
            }
          } else {
            this.toastr.presentToast(res.msg, 'danger');
            // if(res.toVerify) {
            //   this.toVerify = true;
            // }
          }
          this.logging = false;
        }, error => {
          this.logging = false;
          this.toastr.presentToast('Oops! something went wrong while login, please try again later.', 'danger')
        }
      );
  }

  handleClose() {
    this.toVerify = false;
  }

}
