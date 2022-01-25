import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Post } from 'src/app/_helpers/models/order';
import { Pagination } from 'src/app/_helpers/models/pagination';
import { environment } from 'src/environments/environment';
import { ProfileItems } from '../dashboard/dashboard.page';

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

  constructor(
    private apiService: ApiService,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute
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
    this.apiService.getPost(this.profile.name, this.pagination.page).subscribe(
      res => {
        if(res.posts && res.posts.length) {
          this.posts = res.posts;
        }
        if(res.pagination) {
          this.pagination = res.pagination;
        }
      }
    )
  }

  gotoPost() {
    this.navCtrl.navigateForward('/member/create-post');
  }

  getMediaUrl(path, type=1) {
    return (path.indexOf('http://') > -1 || path.indexOf('https://') > -1) 
            ? path : `${environment.baseMediaPath}${type == 1 ? 'thumb/' : 'storage'}${path.split('.')[0]}-sc-1200.${path.split('.')[1]}`
  }

  openEdit(post) {
    this.apiService.posttoEdit = post;
    this.navCtrl.navigateForward(['/member/create-post', post.id]);
  }

}
