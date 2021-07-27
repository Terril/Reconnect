import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablinksComponent } from './tablinks.component';



const routes: Routes = [
  {
    path: 'tablinks',
    component: TablinksComponent,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },

      {
        path: 'search',
        loadChildren: () => import('../search/search.module').then(m => m.SearchPageModule)
      },

      {
        path: 'wishlist',
        loadChildren: () => import('../wishlist/wishlist.module').then(m => m.WishlistPageModule)
      },
      {
        path: '',
        redirectTo: '/tablinks/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tablinks/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    redirectTo: 'tablinks/profile',
    pathMatch: 'full'
  },
  {
    path: 'search',
    redirectTo: 'tablinks/search',
    pathMatch: 'full'
  },
  {
    path: 'wishlist',
    redirectTo: 'tablinks/wishlist',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablinksPageRoutingModule {}
