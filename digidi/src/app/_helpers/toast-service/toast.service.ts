import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  loading: HTMLIonLoadingElement;

  constructor(
    public toast: ToastController,
    public loadingController: LoadingController
  ) { }

  async presentToast(title: string, color: string = 'success', position:any = 'top', duration:number=2000 ) {
    const toast = await this.toast.create({
      message: title,
      position:position,
      duration: duration,
      color: color,
    });
    toast.present();
  }

  async presentLoading(message:string = 'loading...', backdropDismiss:boolean = false, customclass:string="") {
    if(!this.loading) {
      this.loading = await this.loadingController.create({
        spinner: 'lines',
        message: message,
        translucent: true,
        cssClass: `fineline-loader ${customclass}`,
        backdropDismiss: backdropDismiss
      });
      await this.loading.present();
    }
  }

  dismissLoader() {
    if(this.loading) {
      this.loading.dismiss();
    }
    this.loading = null;
  }

  errorReponseToast(error) {
    if(error.error.errors) {
      let t = error.error.errors;
      this.presentToast(`${Object.keys(t)[0]} - ${t[Object.keys(t)[0]]}`, 'danger', 'bottom')
    } else {
      this.presentToast('Oops! something went wrong, please try again later.', 'danger', 'bottom')
    }
  }
}
