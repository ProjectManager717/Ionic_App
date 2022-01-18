import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { element } from 'protractor';
import { AuthenticationService } from 'src/app/_helpers/auth/authentication.service';
// import { App } from '@capacitor/app';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  dashItems: DashItem[] = []
  fixHeader: boolean;
  constructor(
    private authService: AuthenticationService,
    private navCtrl: NavController
  ) { 
    if(!this.authService.currentUserValue) {
      this.exitApp();
    }
  }

  ngOnInit() {
  }

  navigaterNow(item:DashItem) {
    if(item) {
      if(item.route){
        this.navCtrl.navigateForward(item.route);
      } else if(item.click) {
        item.click(); 
      }
    }
  }

  exitApp() {
    this.authService.logout();
  }

  logScrolling(event:any) {
    this.fixHeader = (event && event.detail && event.detail.currentY > 100);
  }

}


export class DashItem {
  title: string; icon: string; route?:string; click?:any;
}