import { Component, QueryList, ViewChildren } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
// import { Network } from '@capacitor/network';
import { environment } from 'src/environments/environment';
import { ToastService } from './_helpers/toast-service/toast.service';
import { AuthenticationService } from './_helpers/auth/authentication.service';
import { ApiService } from './services/api.service';
// import { App } from '@capacitor/app';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  previousNetworkStatus:boolean;

  constructor(
    private platform: Platform,
    private router: Router,
    private toasservice: ToastService,
    private authenticationService: AuthenticationService,
    public apiService: ApiService,
  ) {
    this.initializeApp();
    this.backButtonEvent();

    this.authenticationService.currentUser.subscribe(state => {
      if (state) {
        //logged true;
      } else {
        //login false;
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('ready');
      this.addNetworkListner();
    })
  }

  async addNetworkListner() {
    // Network.addListener('networkStatusChange', status => {
    //   if(this.previousNetworkStatus !== status.connected) {
    //     console.log('status-changed');
    //     if (status.connected) {
    //       // this.apiService.doLogin();
    //     }
    //   }
    //   this.previousNetworkStatus = status.connected;
    //   // this.apiService.newtworkStatus.next(this.previousNetworkStatus)
    // });
    // let status = await Network.getStatus();
    // this.previousNetworkStatus = status.connected;
    // // this.apiService.newtworkStatus.next(this.previousNetworkStatus)
  }

  backButtonEvent() {
    console.log(this.router.url)
    this.platform.backButton.subscribe(async () => {
        this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
            let lastUrls = ['/'];
            if (lastUrls.includes(this.router.url)) {
                if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
                    // this.platform.exitApp(); // Exit from app
                    // navigator['app'].exitApp();
                    // App.exitApp();
                } else {
                    this.toasservice.presentToast(`Press back again to exit App.`,'medium'),
                    this.lastTimeBackPress = new Date().getTime();
                }
            } else if (outlet && outlet.canGoBack()) {
              outlet.pop();
            }
        });
      });
    }

    ngOnDestroy() {
      // Network.removeAllListeners()
    }
}
