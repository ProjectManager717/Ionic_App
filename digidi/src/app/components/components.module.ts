import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../_helpers/pipes/pipes.module';
import { VerifyComponent } from './verify/verify.component';
import { FormsModule } from '@angular/forms';
import { PostItemComponent } from './post-item/post-item.component';
import { MediaDispComponent } from './media-disp/media-disp.component';



@NgModule({
  declarations: [
    VerifyComponent,
    PostItemComponent,
    MediaDispComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    PipesModule,
  ],
  exports: [
    VerifyComponent,
    PostItemComponent,
    MediaDispComponent
  ]
})
export class ComponentsModule { }
