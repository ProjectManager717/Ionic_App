import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/_helpers/auth/authentication.service';
import { Post, ProfileItems } from 'src/app/_helpers/models/order';
import { Pagination } from 'src/app/_helpers/models/pagination';
import { ToastService } from 'src/app/_helpers/toast-service/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  pagination:Pagination =new Pagination();
  posts:Post[] =[];
  profile:ProfileItems;
  fixHeader: boolean;
  loading:boolean = false;

  constructor(
    private apiService: ApiService,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private toastService: ToastService
  ) { 
    this.apiService.posttoEdit = null;
    this.activatedRoute.params.subscribe(res => {
      if(res.profile) {
        let profile = this.apiService.postItems.filter(item => item.id == res.profile)
        if(profile && profile.length) this.profile = profile[0];
        this.pagination = new Pagination();
        this.posts = [];
        this.getPosts();
      }
    }) 
  }

  logScrolling(event:any) {
    this.fixHeader = (event && event.detail && event.detail.currentY > 100);
  }

  ngOnInit() {
  }

  getPosts() {
    this.loading = true;
    this.apiService.getPost(this.profile.slug, this.pagination.page).subscribe(
      res => {
        if(res.posts && res.posts.length) {
          this.posts = res.posts;
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

  gotoPost() {
    this.navCtrl.navigateForward('/member/create-post');
  }

  getMediaUrl(path, type=1) {
    return this.apiService.getMediaUrl(path, type)
  }

  openEdit(post) {
    this.apiService.posttoEdit = post;
    this.navCtrl.navigateForward(['/member/create-post', post.id]);
  }

  exitApp() {
    this.authService.logout();
  }

  markRead(post:Post) {
    post.post_read_at = (post.post_read_at) ? null : true;
    this.apiService.readPost(post.id).subscribe(
      res => {}
    )
  }
}
