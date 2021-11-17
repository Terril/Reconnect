import { PasessComponent } from './Pages/pasess/pasess.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'splash',
    loadChildren: () => import('./Pages/splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  },
  

  {
    path: 'dashboard',
    loadChildren: () => import('./Pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },

  {
    path: 'tablinks',
    loadChildren: () => import('./Pages/tablinks/tablinks.module').then( m => m.TablinksPageModule)
  },

  {
    path: 'listing',
    loadChildren: () => import('./Pages/listing/listing.module').then( m => m.ListingPageModule)
  },
  {
    path: 'pasess',
    loadChildren: () => import('./Pages/pasess/pasess.module').then( m => m.PasessModule)
  },
  {
    path: 'classListing',
    loadChildren: () => import('./Pages/classbooking/classbooking.module').then( m => m.ClassbookingModule)
  },
  {
    path: 'promotions',
    loadChildren: () => import('./Pages/promotions/promotions.module').then( m => m.PromotionsModule)
  },
  {
    path: 'vouchers',
    loadChildren: () => import('./Pages/vouchers/vouchers.module').then( m => m.VouchersModule)
  },
  {
    path: 'gym-booking',
    loadChildren: () => import('./Pages/gymbooking/gymbooking.module').then( m => m.GymbookingModule)
  },
  {
    path: 'offers',
    loadChildren: () => import('./Pages/offers/offers.module').then( m => m.OffersPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./Pages/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./Pages/detail-page/detail-page.module').then( m => m.DetailPagePageModule)
  },

  {
    path: 'class_booking',
    loadChildren: () => import('./Pages/classlisting/classlisting.module').then( m => m.ClassListingPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./Pages/checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'classCheckout',
    loadChildren: () => import('./Pages/classbooking/classbooking.module').then( m => m.ClassbookingModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./Pages/history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'digital-wallet',
    loadChildren: () => import('./Pages/digitalwallet/digitalwallet.module').then( m => m.DigitalwalletModule)
  },

  {
    path: 'success',
    loadChildren: () => import('./Pages/success/success.module').then( m => m.SuccessModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./Pages/resetpassword/resetpassword.module').then( m => m.ResetpasswordModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./Pages/policy/policy.module').then( m => m.PolicyModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./Pages/register/register.module').then( m => m.RegisterModule)
  },
  {
    path: 'voucherredeem',
    loadChildren: () => import('./Pages/voucher-redeem/voucher-redeem.module').then( m => m.VoucherRedeemModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./Pages/policy/policy.module').then( m => m.PolicyModule)
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules ,onSameUrlNavigation:'reload'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
