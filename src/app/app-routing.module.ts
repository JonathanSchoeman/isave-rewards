import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'notificationdetail',
    loadChildren: () => import('./notificationdetail/notificationdetail.module').then( m => m.NotificationdetailPageModule)
  },
  {
    path: 'forgotpin',
    loadChildren: () => import('./forgotpin/forgotpin.module').then( m => m.ForgotpinPageModule)
  },
  {
    path: 'contactus',
    loadChildren: () => import('./contactus/contactus.module').then( m => m.ContactusPageModule)
  },
  {
    path: 'mydeals',
    loadChildren: () => import('./mydeals/mydeals.module').then( m => m.MydealsPageModule)
  },
  {
    path: 'mywallet',
    loadChildren: () => import('./mywallet/mywallet.module').then( m => m.MywalletPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'termsandconditions',
    loadChildren: () => import('./termsandconditions/termsandconditions.module').then( m => m.TermsandconditionsPageModule)
  },
  {
    path: 'mycontactinfo',
    loadChildren: () => import('./mycontactinfo/mycontactinfo.module').then( m => m.MycontactinfoPageModule)
  },
  {
    path: 'voucherdetails',
    loadChildren: () => import('./voucherdetails/voucherdetails.module').then( m => m.VoucherdetailsPageModule)
  },
  {
    path: 'coupondetails',
    loadChildren: () => import('./coupondetails/coupondetails.module').then( m => m.CoupondetailsPageModule)
  },
  {
    path: 'voucherpaymentsuccess',
    loadChildren: () => import('./voucherpaymentsuccess/voucherpaymentsuccess.module').then( m => m.VoucherpaymentsuccessPageModule)
  },
  {
    path: 'voucherhistorydetails',
    loadChildren: () => import('./voucherhistorydetails/voucherhistorydetails.module').then( m => m.VoucherhistorydetailsPageModule)
  },
  {
    path: 'voucherhistory',
    loadChildren: () => import('./voucherhistory/voucherhistory.module').then( m => m.VoucherhistoryPageModule)
  },
  {
    path: 'couponhistory',
    loadChildren: () => import('./couponhistory/couponhistory.module').then( m => m.CouponhistoryPageModule)
  },
  {
    path: 'specialhistory',
    loadChildren: () => import('./specialhistory/specialhistory.module').then( m => m.SpecialhistoryPageModule)
  },
  {
    path: 'traveldetails',
    loadChildren: () => import('./traveldetails/traveldetails.module').then( m => m.TraveldetailsPageModule)
  },
  {
    path: 'voucherpaynow',
    loadChildren: () => import('./voucherpaynow/voucherpaynow.module').then( m => m.VoucherpaynowPageModule)
  },
  {
    path: 'couponpaynow',
    loadChildren: () => import('./couponpaynow/couponpaynow.module').then( m => m.CouponpaynowPageModule)
  },
  {
    path: 'couponpaymentsuccess',
    loadChildren: () => import('./couponpaymentsuccess/couponpaymentsuccess.module').then( m => m.CouponpaymentsuccessPageModule)
  },
  {
    path: 'couponhistorydetails',
    loadChildren: () => import('./couponhistorydetails/couponhistorydetails.module').then( m => m.CouponhistorydetailsPageModule)
  },
  {
    path: 'chats',
    loadChildren: () => import('./chats/chats.module').then( m => m.ChatsPageModule)
  },
  {
    path: 'chatdetail',
    loadChildren: () => import('./chatdetail/chatdetail.module').then( m => m.ChatdetailPageModule)
  },
  {
    path: 'chatadd',
    loadChildren: () => import('./chatadd/chatadd.module').then( m => m.ChataddPageModule)
  },
  {
    path: 'voucherpaymentfailed',
    loadChildren: () => import('./voucherpaymentfailed/voucherpaymentfailed.module').then( m => m.VoucherpaymentfailedPageModule)
  },
  {
    path: 'couponwicodepaymentsuccess',
    loadChildren: () => import('./couponwicodepaymentsuccess/couponwicodepaymentsuccess.module').then( m => m.CouponwicodepaymentsuccessPageModule)
  },
  {
    path: 'couponhistorywicodedetails',
    loadChildren: () => import('./couponhistorywicodedetails/couponhistorywicodedetails.module').then( m => m.CouponhistorywicodedetailsPageModule)
  },
  {
    path: 'entertainmentdetails',
    loadChildren: () => import('./entertainmentdetails/entertainmentdetails.module').then( m => m.EntertainmentdetailsPageModule)
  },
  {
    path: 'entertainmentpaynow',
    loadChildren: () => import('./entertainmentpaynow/entertainmentpaynow.module').then( m => m.EntertainmentpaynowPageModule)
  },
  {
    path: 'entertainmentpaysuccess',
    loadChildren: () => import('./entertainmentpaysuccess/entertainmentpaysuccess.module').then( m => m.EntertainmentpaysuccessPageModule)
  },
  {
    path: 'entertainmentpayfailed',
    loadChildren: () => import('./entertainmentpayfailed/entertainmentpayfailed.module').then( m => m.EntertainmentpayfailedPageModule)
  },
  {
    path: 'entertainmenthistory',
    loadChildren: () => import('./entertainmenthistory/entertainmenthistory.module').then( m => m.EntertainmenthistoryPageModule)
  },
  {
    path: 'entertainmenthistorydetails',
    loadChildren: () => import('./entertainmenthistorydetails/entertainmenthistorydetails.module').then( m => m.EntertainmenthistorydetailsPageModule)
  },
  {
    path: 'entertainmentcinemas',
    loadChildren: () => import('./entertainmentcinemas/entertainmentcinemas.module').then( m => m.EntertainmentcinemasPageModule)
  },
  {
    path: 'fastfooddetails',
    loadChildren: () => import('./fastfooddetails/fastfooddetails.module').then( m => m.FastfooddetailsPageModule)
  },
  {
    path: 'fastfoodstores',
    loadChildren: () => import('./fastfoodstores/fastfoodstores.module').then( m => m.FastfoodstoresPageModule)
  },
  {
    path: 'fastfoodhistory',
    loadChildren: () => import('./fastfoodhistory/fastfoodhistory.module').then( m => m.FastfoodhistoryPageModule)
  },
  {
    path: 'fastfoodclaim',
    loadChildren: () => import('./fastfoodclaim/fastfoodclaim.module').then( m => m.FastfoodclaimPageModule)
  },
  {
    path: 'assistmedetails',
    loadChildren: () => import('./assistmedetails/assistmedetails.module').then( m => m.AssistmedetailsPageModule)
  },
  {
    path: 'viraldealdetails',
    loadChildren: () => import('./viraldealdetails/viraldealdetails.module').then( m => m.ViraldealdetailsPageModule)
  },
  {
    path: 'voucherformsuccess',
    loadChildren: () => import('./voucherformsuccess/voucherformsuccess.module').then( m => m.VoucherformsuccessPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
