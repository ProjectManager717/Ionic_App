import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Post } from 'src/app/_helpers/models/order';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;
  constructor(
    private apiService: ApiService,
    // private navCtrl: NavController,
    // private activatedRoute: ActivatedRoute,
    // private authService: AuthenticationService,
    // private toastService: ToastService
  ) { }

  ngOnInit() {}

  getMediaUrl(path, type=1) {
    return this.apiService.getMediaUrl(path, type)
  }

}
