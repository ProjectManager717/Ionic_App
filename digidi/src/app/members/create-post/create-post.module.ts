import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePostPageRoutingModule } from './create-post-routing.module';

import { CreatePostPage } from './create-post.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { QuillModule } from 'ngx-quill'
import { PipesModule } from 'src/app/_helpers/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PipesModule,
    ComponentsModule,
    CreatePostPageRoutingModule,
    ColorPickerModule,
    QuillModule.forRoot(
      {
        modules: {
          syntax: true,
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], 
          ]
        }
      }
    )
  ],
  declarations: [CreatePostPage]
})
export class CreatePostPageModule {}
