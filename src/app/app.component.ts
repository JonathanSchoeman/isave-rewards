import { Component } from '@angular/core';

import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent
{
  public selectedIndex = 0;

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home.png'
    },
    {
      title: 'My Deals',
      url: '/mydeals',
      icon: 'mydeals.png'
    },
    {
      title: 'My Wallet',
      url: '/mywallet',
      icon: 'mywallet.png'
    },
    {
      title: 'Notifications',
      url: '/notifications',
      icon: 'notifications.png'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'profile.png'
    },
    {
      title: 'Contact Us',
      url: '/contactus',
      icon: 'contactus.png'
    },
    {
      title: 'Terms and Conditions',
      url: '/termsandconditions',
      icon: 'termsandconditions.png'
    }/*,
    {
      title: 'Logout',
      url: '/logout',
      icon: 'log-out'
    }*/
  ];
  
  constructor( public auth: UserService )
  {

  }

  ngOnInit()
  {
    const path = window.location.pathname.split('/')[1];

    if ( path !== undefined ) 
    {
      this.selectedIndex = this.appPages.findIndex( page => page.title.toLowerCase() === path.toLowerCase() );
    }
  }
}
