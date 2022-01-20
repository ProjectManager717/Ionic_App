import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/_helpers/auth/authentication.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {
  fixHeader: boolean;
  showApperance:boolean = false;
  postForm: FormGroup;
  color:any = null;
  bgColor:any = null;
  fonts= [
    {title:'Raleway (default)', value:'Raleway'},
    {title:'Arial', value:'Arial'},
    {title:'Comic Sans MS', value:'Comic Sans MS'},
    {title:'Impact', value:'Impact'},
    {title:'Tahoma', value:'Tahoma'},
    {title:'Verdana', value:'Verdana'},
  ]
  constructor(
    private authService: AuthenticationService,
    private navCtrl: NavController,
    private fb: FormBuilder,
  ) { 
    // if(!this.authService.currentUserValue) {
    //   this.exitApp();
    // }
    this.initForm();
    this.visiblity();
  }

  get accFrm() {
    return this.postForm.controls;
  }

  initForm() {
    this.postForm = this.fb.group(
      {
        title: ['', [Validators.required]],
        upMedia: [''],
        upAttach: [''],
        content: ['', [Validators.required]],
        font:[null],
        bg_color: [null],
        font_color: [null],
        author_alias: [''],
        publish_date: [new Date()],
        created_date: [ new Date()],
        status: ['PUBLISHED'],
        notify_followers: [null],
        sticky: [null],
        maecenate: ['', [Validators.required]]
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
    console.log(this.postForm.value)
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
    console.log(this.showApperance)
    this.showApperance = !this.showApperance;
  }

  colorChanged(e, type) {
    console.log(type, this.color, this.bgColor)
    this.postForm.patchValue(
      {
        bg_color: this.color,
        font_color: this.bgColor
      }
    )
  }

}
