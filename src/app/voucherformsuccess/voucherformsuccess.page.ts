import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, MenuController, NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-voucherformsuccess',
  templateUrl: './voucherformsuccess.page.html',
  styleUrls: ['./voucherformsuccess.page.scss'],
})
export class VoucherformsuccessPage implements OnInit
{
  @ViewChild( IonContent, { static: true } ) content?: IonContent;

  constructor( public navCtrl: NavController, public r: Router, public menuCtrl: MenuController, public auth: UserService )
  { 
    if ( this.auth.CurrentUser == undefined || ( this.auth.CurrentUser != undefined && this.auth.CurrentUser.Id <= 0 ) )
    {
      this.navCtrl.navigateRoot( "login" );
    }

    this.menuCtrl.enable( true );
  }

  ngOnInit() 
  {
  }

  ngAfterViewInit() 
  {
    this.auth.ContentPage = this.content;
  }

  MyDeals()
  {
    // Remove certain pages from the stack

    this.auth.VoucherDeal = undefined;

    this.navCtrl.navigateRoot( "home" ).then( r =>
    {
      this.navCtrl.navigateForward( "mydeals" );
    } );
  }

}
