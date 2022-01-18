import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/_helpers/toast-service/toast.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {
  timeLeft: number;
  timeInter: any;
  codeSent: boolean;
  sendingCode: boolean;
  otp:any = '';
  @Input("email") email: string;
  @Output() closed = new EventEmitter<boolean>();
  verifyingOTP: boolean;
  constructor(
    private apiService: ApiService,
    private toastr: ToastService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.resetTiming();
  }

  resetTiming() {
    if (this.timeInter) {
      clearInterval(this.timeInter);
    }
    this.codeSent = true;
    this.timeLeft = 59;
    this.timeInter = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.codeSent = false;
        clearInterval(this.timeInter);
      }
    }, 1000)
  }

  resendOTP() {
    this.sendingCode = true;
    this.apiService.resendEmailConfirmation({ email: this.email}).subscribe(
      res => {
        if(!res.error) {
          this.toastr.presentToast(res.msg, 'success')
          this.resetTiming();
        } else {
          this.toastr.presentToast(res.msg, 'danger');
        }
        this.sendingCode = false;
      }, error => {
        this.sendingCode = false;
        this.toastr.presentToast('Oops! something went wrong while regenrating OTP, please try again later.', 'danger');
      }
    );
  }

  verifyOTP() {
    if(!this.otp || this.otp.toString().length < 5 || isNaN(parseInt(this.otp)) ) {
      this.toastr.presentToast('Please enter a valid otp', 'danger');
      return;
    }
    this.verifyingOTP = true;
    this.apiService.emailConfirmation({ email: this.email, code: this.otp}).subscribe(
      res => {
        if(!res.error) {
          this.toastr.presentToast(res.msg, 'success');
          this.close();
        } else {
          this.toastr.presentToast(res.msg, 'danger');
        }
        this.verifyingOTP = false;
      }, error => {
        this.verifyingOTP = false;
        this.toastr.presentToast('Oops! something went wrong while regenrating OTP, please try again later.', 'danger');
      }
    );
  }

  close() {
    clearInterval(this.timeInter);
    // this.navCtrl.back();
    this.closed.emit(true);
  }

}
