import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/_helpers/auth/authentication.service';
import { Post } from 'src/app/_helpers/models/order';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {
  fixHeader: boolean;
  
  uploadingAttachment:boolean;
  uploadingAttachmentPercent:any = null;
  pickedAttachment:any;
  uploadingMedia:boolean;
  uploadingMediaPercent:any = null;
  pickedMedia:any;

  pickedPost:Post;
  showApperance:boolean = false;
  postForm: FormGroup;
  color:any = null;
  bgColor:any = null;
  fontlist= [
    {title:'Raleway (default)', value:'Raleway'},
    {title:'Arial', value:'Arial'},
    {title:'Comic Sans MS', value:'Comic Sans MS'},
    {title:'Impact', value:'Impact'},
    {title:'Tahoma', value:'Tahoma'},
    {title:'Verdana', value:'Verdana'},
  ]
  profileItems = [];
  constructor(
    private authService: AuthenticationService,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    // if(!this.authService.currentUserValue) {
    //   this.exitApp();
    // }
    this.profileItems = this.apiService.postItems;
    this.initForm();
    this.visiblity();
    this.postForm.get('font').valueChanges.subscribe(
      res => {
        this.changeFont();
      }
    )
    this.postForm.patchValue({font: this.fontlist[0].value});

    this.activatedRoute.params.subscribe(
      res => {
        if(res.id) {
          if(this.apiService.posttoEdit && this.apiService.posttoEdit.id == res.id) {
            this.pickedPost = this.apiService.posttoEdit;
            this.initForm();
            this.visiblity();
          }
        }
      }
    )
  }

  get accFrm() {
    return this.postForm.controls;
  }

  initForm() {
    this.postForm = this.fb.group(
      {
        title: [this.pickedPost?.title || '', [Validators.required]],
        upMedia: [''],
        upAttach: [''],
        content: [this.pickedPost?.content || '', [Validators.required]],
        font:[this.pickedPost?.customization?.font || null],
        bg_color: [this.pickedPost?.customization?.bg_color || null],
        font_color: [this.pickedPost?.customization?.font_color || null],
        author_alias: [this.pickedPost?.author_alias || ''],
        publish_date: [new Date(this.pickedPost?.publish_date || null)],
        created_date: [ new Date(this.pickedPost?.created_date || null)],
        status: [this.pickedPost?.status || 'PUBLISHED'],
        notify_followers: [this.pickedPost?.notify_followers || null],
        sticky: [this.pickedPost?.sticky || null],
        maecenate: [this.pickedPost?.maecenate || '', [Validators.required]]
      }
    )
    this.accFrm.created_date.disable();
  }

  ngOnInit() {
  }

  exitApp() {
    this.authService.logout();
  }

  logScrolling(event:any) {
    this.fixHeader = (event && event.detail && event.detail.currentY > 100);
  }

  creatPost() {
    for(let fl in this.postForm.controls) {
      this.postForm.controls[fl].markAsDirty();
    }
    if(this.postForm.invalid) {
      return;
    }
  }

  formatDate(value: string) {
    this.postForm.patchValue({ publish_date: new Date(value)})
  }

  visiblity() {
    if(this.accFrm.status.value == 'PUBLISHED') {
      this.accFrm.notify_followers.enable();
    } else {
      this.accFrm.notify_followers.disable();
    }
  }

  toggleAppear() {
    this.showApperance = !this.showApperance;
  }

  changeFont() {
    setTimeout(() => {
      let container:HTMLHtmlElement = document.querySelector('.ql-container');
      if(container) {
        if(this.postForm.value.font) {
          container.style.fontFamily = this.postForm.value.font;
        }
      }
    }, 200)
  }

  colorChanged(e, type) {
    this.postForm.patchValue(
      {
        bg_color: this.color,
        font_color: this.bgColor
      }
    )
    let container:HTMLHtmlElement = document.querySelector('.ql-container');
    if(container) {
      if(this.color) {
        container.style.color = this.color;
      }
      if(this.color) {
        container.style.backgroundColor = this.bgColor;
      }
    }
  }

  uploadMedia(event) {
    if(event && event.target && event.target.files && event.target.files[0]) {
      this.readFile(event.target.files[0], 1);
      this.apiService.uploadChunks('MEDIA',this.prepareBody(event.target.files[0])).subscribe(
        res => {
          if (event.type == res.UploadProgress) {
            this.updateUpload(1, res);
          }
        }
      )
    }
  }

  uploadAttachment(event) {
    if(event && event.target && event.target.files && event.target.files[0]) {
      this.readFile(event.target.files[0], 2);
      this.apiService.uploadChunks('FILE',this.prepareBody(event.target.files[0])).subscribe(
        res => {
          if (event.type == res.UploadProgress) {
            this.updateUpload(2, res);
          }
        }
      )
    }
  }

  updateUpload(type, event) {
    let percent = Math.round(100 * (event.loaded / event.total));
    if(type == 1) {
      this.uploadingMediaPercent = percent;
    }
    if(type == 2) {
      this.uploadingAttachmentPercent = percent;
    }
  }

  readFile(file:File, type=1) {
    var reader = new FileReader();
    reader.onload = ()=>{
      if(type == 1) {
        this.pickedMedia = reader.result;
      } else if(type == 2) {
        this.pickedAttachment = reader.result;
      }
    };
    reader.readAsDataURL(file);
  }

  prepareBody(file) {
    let body = new FormData();
    body.append('dzuuid','1e72d07e-b200-4f5b-925d-eedbb29f5c3d');
    body.append('dzchunkindex','1e72d07e-b200-4f5b-925d-eedbb29f5c3d');
    body.append('dzchunksize','5000000');
    body.append('dztotalfilesize',file.size);
    body.append('dztotalchunkcount','1');
    body.append('dzchunkbyteoffset', '0');
    body.append('file', file);
    return body;
  }

  changeProfile(profile){
    this.postForm.patchValue({ maecenate: profile.id });
  }

}
