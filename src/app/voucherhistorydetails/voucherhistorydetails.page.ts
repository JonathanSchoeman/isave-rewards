import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, MenuController, NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-voucherhistorydetails',
  templateUrl: './voucherhistorydetails.page.html',
  styleUrls: ['./voucherhistorydetails.page.scss'],
  
})
export class VoucherhistorydetailsPage implements OnInit
{
  @ViewChild( IonContent, { static: true } ) content?: IonContent;

  constructor( public navCtrl: NavController, public menuCtrl: MenuController, public auth: UserService )
  {
    if ( this.auth.CurrentUser == undefined || ( this.auth.CurrentUser != undefined && this.auth.CurrentUser.Id <= 0 ) )
    {
      this.navCtrl.navigateRoot( "login" );
    }

    if ( this.auth.Voucher == undefined )
    {
      this.navCtrl.navigateBack( "voucherhistory" );
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

}
