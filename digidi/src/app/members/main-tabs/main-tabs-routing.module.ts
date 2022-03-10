import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainTabsPage } from './main-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: MainTabsPage,
    children: [
      {
        path: 'feeds',
        children: [
          {
            path: '',
            loadChildren: ()=>import('../feeds/feeds.module').then( f => f.FeedsPageModule)
          }
        ]
      },
      {
        path: 'create-post',
        children: [
          {
            path: '',
            loadChildren: ()=>import('../create-post/create-post.module').then( f => f.CreatePostPageModule)
          }
        ]
      },
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            loadChildren: ()=>import('../dashboard/dashboard.module').then( f => f.DashboardPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/member/tabs/feeds',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainTabsPageRoutingModule {}
