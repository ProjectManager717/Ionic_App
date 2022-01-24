import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth/auth.guards';

const routes: Routes = [
  { path: 'member', 
    loadChildren: () => import('./members/members.module').then( m => m.MemberModule),
    canActivate: [AuthGuard]
  },
  { path: 'public', 
    loadChildren: () => import('./public/public.module').then( m => m.PublicModule),
  },
  {
    path: '',
    redirectTo: 'member',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
