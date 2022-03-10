import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/_helpers/auth/authentication.service';
import { User } from 'src/app/_helpers/models';
import { FileItem, Post, ProfileItems } from 'src/app/_helpers/models/order';
import { ToastService } from 'src/app/_helpers/toast-service/toast.service';
import { environment } from 'src/environments/environment';
import { Pagination } from 'src/app/_helpers/models/pagination';
// import { App } from '@capacitor/app';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.page.html',
  styleUrls: ['./feeds.page.scss'],
})
export class FeedsPage implements OnInit {
  posts: Post[] = []
  fixHeader: boolean;
  isLoading:boolean;
  currentUser: User;
  loadingProfile: boolean;
  loading: boolean;
  pagination:Pagination =new Pagination();

  constructor(
    private authService: AuthenticationService,
    private navCtrl: NavController,
    public apiService: ApiService,
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
    this.getFeeds();
  }

  ngOnInit() {
  }

  navigaterNow(item:ProfileItems) {
    if(item) {
      // if(item.route){
        // this.navCtrl.navigateForward(item.route);
      // }
    }
  }

  getFeeds() {
    this.loading = true;
    this.apiService.getFeeds(1).subscribe(
      res => {
        if(res.entities && res.entities.supports) {
          if(!Object.keys(res.entities.supports).length) {
            this.gotoInAppSearch()
          }
        }
        if(res.result && res.result.length) {
          res.result.forEach(item => {
            res.entities.posts[item].poster = res.entities.maecenates[res.entities.posts[item].maecenate];
            this.posts.push(res.entities.posts[item]);
          });
        }
        if(res.pagination) {
          this.pagination = res.pagination;
        }
        this.loading = false;
      }, error => {
        this.toastService.errorReponseToast(error);
        this.loading =false;
      }
    )
  }
  
  exitApp() {
    this.authService.logout();
  }

  logScrolling(event:any) {
    this.fixHeader = (event && event.detail && event.detail.currentY > 100);
  }

  getMediaUrl(path, type=1) 
  {
    return path ? this.apiService.getMediaUrl(path, type) : '';
  }

  openWebsite() {
    window.open(environment.websiteBaseUrl, '_system');
  }
  
  gotoInAppSearch() {
    this.apiService.openLinkWithToken(`${environment.websiteBaseUrl}profiles`, true)
  }

  gotoProfile(type = false) {
    if(type){
      this.navCtrl.navigateForward(['/member/dashboard'])
    } else {
      this.navCtrl.navigateRoot(['/member/dashboard'])
    }
  }

}
