import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../_helpers/pipes/pipes.module';
import { VerifyComponent } from './verify/verify.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    VerifyComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    PipesModule,
  ],
  exports: [
    VerifyComponent
  ]
})
export class ComponentsModule { }
