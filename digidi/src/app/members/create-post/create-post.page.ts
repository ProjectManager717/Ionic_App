import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/_helpers/auth/authentication.service';
import { User } from 'src/app/_helpers/models';
import { Post } from 'src/app/_helpers/models/order';
import { ToastService } from 'src/app/_helpers/toast-service/toast.service';
import {v4 as uuidv4} from 'uuid';

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
  loadingProfile: boolean;
  currentUser: User;
  loading: boolean;
  constructor(
    private authService: AuthenticationService,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private apiService: ApiService,
    private toastService: ToastService,
  ) {
    // if(!this.authService.currentUserValue) {
    //   this.exitApp();
    // }
    this.profileItems = this.apiService.postItems;

    this.authService.currentUser.subscribe(
      res => {
        this.currentUser = res;
      }
    )
    this.currentUser = this.authService.currentUserValue;

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

    if(!this.apiService.postItems || !this.apiService.postItems.length) {
      this.getProfiles();
    }
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
        author_alias: [this.pickedPost?.author_alias || '', [Validators.required]],
        publish_date: [this.pickedPost?.publish_date ? new Date(this.pickedPost?.publish_date) : new Date()],
        created_date: [this.pickedPost?.created_date ? new Date(this.pickedPost?.created_date) : new Date()],
        status: [this.pickedPost?.status || 'PUBLISHED'],
        notify_followers: [this.pickedPost?.notify_followers || false],
        sticky: [this.pickedPost?.sticky || false],
        maecenate: [this.pickedPost?.maecenate || '', [Validators.required]]
      }
    )
    this.accFrm.created_date.disable();
    if(this.pickedPost) {
      if(this.pickedPost.media?.length) {
        this.pickedMedia = this.pickedPost.media[0];
      }
      if(this.pickedPost.file) {
        this.pickedAttachment = this.pickedPost.file;
      }
      if(this.pickedPost.customization && this.pickedPost.customization.bg_color) {
        this.bgColor = this.pickedPost.customization.bg_color;
      }
      if(this.pickedPost.customization && this.pickedPost.customization.font_color) {
        this.color = this.pickedPost.customization.font_color;
      }
    }
  }

  ngOnInit() {
    console.log(this.pickedPost)
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
    let data:Post = {
      title: this.postForm.value.title,
      content: this.postForm.value.content,
      author_alias: this.postForm.value.author_alias,
      publish_date: new Date(this.postForm.value.publish_date).toISOString(),
      status: this.postForm.value.status,
      notify_followers: this.postForm.value.notify_followers,
      sticky: this.postForm.value.sticky,
      maecenate: this.postForm.value.maecenate,
      media: this.pickedMedia || null,
      file: this.pickedAttachment || null
    }
    // custom
    data.customization = {
      font: this.postForm.value.font,
      bg_color:this.postForm.value.bg_color,
      font_color:this.postForm.value.font_color
    }

    let ps = data;
    if(this.pickedPost && this.pickedPost.id) {
      ps =  JSON.parse(JSON.stringify(this.pickedPost));
      Object.assign(ps, data);
      delete ps.post_read_at;
    } else {
      // ps.created_date= new Date().toISOString();
    }
    this.loading = true;
    this.apiService.post(ps).subscribe(
      res => {
        this.loading =false;
        this.toastService.presentToast(ps.id ? 'Post updated successfully!' : 'Post created successfully!', 'success')
        this.navCtrl.back();
      }, error => {
        this.toastService.errorReponseToast(error);
        this.loading =false;
      }
    )
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
      this.uploadingMediaPercent = 0;
      let data = this.prepareBody(event.target.files[0]);
      this.uploadingMedia = false
      this.apiService.uploadChunks('MEDIA',data, this.updateUpload, this).then(
        res => {
          console.log(res);
          if(res.data.result?.length && res.data.entities) {
            this.pickedMedia = res.data.entities.media[res.data.result[0]]
          }
          this.uploadingMedia = false
        }, error => {
          this.uploadingMedia = false
        }
      )
    }
  }

  uploadAttachment(event) {
    if(event && event.target && event.target.files && event.target.files[0]) {
      this.pickedAttachment = event.target.files[0];
      this.uploadingAttachmentPercent = 0;
      let data =this.prepareBody(event.target.files[0]);
      this.uploadingAttachment = true;
      this.apiService.uploadChunks('FILE', data,  this.updateUpload, this).then(
        res => {
          if(res.data.result?.length && res.data.entities) {
            this.pickedAttachment = res.data.entities.media[res.data.result[0]]
          }
          this.uploadingAttachment = false;
        }, error => {
          this.uploadingAttachment = false;
        }
      )
    }
  }

  removeAttachment() {
    this.pickedAttachment = null;
    this.uploadingAttachmentPercent = 0;
  }

  updateUpload(type, event, zon) {
    let percent = 100 / event;
    if(type == 'MEDIA') {
      zon.uploadingMediaPercent = percent;
    }
    if(type == 'FILE')  {
      zon.uploadingAttachmentPercent = percent;
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
    body.append('dzuuid', uuidv4());
    body.append('dzchunkindex','0');
    body.append('dzchunksize', file.size+5000);
    body.append('dztotalfilesize',file.size);
    body.append('dztotalchunkcount','1');
    body.append('dzchunkbyteoffset', '0');
    body.append('file', file);
    return body;
  }

  changeProfile(profile){
    this.postForm.patchValue({ maecenate: profile.id });
  }

  getMediaUrl(path, type=1) {
    return this.apiService.getMediaUrl(path, type)
  }

  getProfiles() {
    this.loadingProfile = true;
    this.apiService.getProfiles(this.currentUser.id).subscribe(
      res => {
        if(res && res.maecenates) {
          this.profileItems = res.maecenates;
          this.apiService.postItems = this.profileItems;
        }
        this.loadingProfile = false;
      }, error => {
        this.loadingProfile = false;
      }
    )
  }

}
