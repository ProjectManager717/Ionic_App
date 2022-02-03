import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FileItem } from 'src/app/_helpers/models/order';

@Component({
  selector: 'app-media-disp',
  templateUrl: './media-disp.component.html',
  styleUrls: ['./media-disp.component.scss'],
})
export class MediaDispComponent implements OnInit {
  @Input() media:FileItem;
  @Input() isFile: boolean;
  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit() {}

  getMediaUrl(path, type=1) {
    let tp = type;
    if(this.isFile && type==1) {
      tp =2
    }
    return this.apiService.getMediaUrl(path, tp)
  }

}
