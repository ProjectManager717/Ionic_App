import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
const routes: Routes = [
  { path: 'login', 
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule) 
  },
  { path: 'forgot-password', 
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule) 
  },
  { path: 'register', 
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule) 
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicModule { }