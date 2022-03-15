import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/_helpers/auth/authentication.service';
import { User } from 'src/app/_helpers/models';
import { ProfileItems } from 'src/app/_helpers/models/order';

@Component({
  selector: 'app-main-tabs',
  templateUrl: './main-tabs.page.html',
  styleUrls: ['./main-tabs.page.scss'],
})
export class MainTabsPage implements OnInit {
  fixHeader:boolean;
  loadingProfile:boolean;
  currentUser:User;
  prifleItems:ProfileItems[] = [];
  constructor(
    private authService: AuthenticationService,
    public apiService: ApiService,
  ) { 
    this.authService.currentUser.subscribe(
      res => {
        this.currentUser = res;
      }
      )
    this.currentUser = this.authService.currentUserValue;
    this.getProfiles();
  }

  ngOnInit() {
  }

  exitApp() {
    this.authService.logout();
  }

  logScrolling(event:any) {
    this.fixHeader = (event && event.detail && event.detail.currentY > 100);
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

  openSearchPage() {
    this.apiService.openSearch()
  }

}
