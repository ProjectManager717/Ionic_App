import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
 
const routes: Routes = [
  { path: 'dashboard', 
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule) 
  },
  { path: 'posts/:profile', 
    loadChildren: () => import('./posts/posts.module').then( m => m.PostsPageModule) 
  },
  { path: 'create-post', 
    loadChildren: () => import('./create-post/create-post.module').then( m => m.CreatePostPageModule) 
  },
  { path: 'feeds', 
    loadChildren: () => import('./feeds/feeds.module').then( m => m.FeedsPageModule) 
  },
  {
    path: '',
    redirectTo: 'feeds',
    pathMatch: 'full'
  },
];
 
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [
  ]
})
export class MemberModule { }