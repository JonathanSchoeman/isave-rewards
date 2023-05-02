import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, MenuController, NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-voucherhistory',
  templateUrl: './voucherhistory.page.html',
  styleUrls: ['./voucherhistory.page.scss'],
})
export class VoucherhistoryPage implements OnInit
{
  @ViewChild( IonContent, { static: true } ) content?: IonContent;

  Vouchers: any = [];
  VoucherStatus: number = -1;

  constructor( public navCtrl: NavController, public menuCtrl: MenuController, public auth: UserService )
  { 
    if ( this.auth.CurrentUser == undefined || ( this.auth.CurrentUser != undefined && this.auth.CurrentUser.Id <= 0 ) )
    {
      this.navCtrl.navigateRoot( "login" );
    }

    this.menuCtrl.enable( true );
  }

  async ngOnInit() 
  {
    await this.List();
  }

  ngAfterViewInit() 
  {
    this.auth.ContentPage = this.content;
  }

  async List()
  {
    await this.auth.LoadVouchers();

    this.Vouchers = this.auth.Vouchers;
  }

  async loadData( event:any )
  {
    await this.List();

    event.target.complete();
  }

  async Refresh( refresher: any )
  {
    this.Vouchers = this.auth.Vouchers = [];

    await this.List();
    
    refresher.target.complete();
  }

  GoToVoucher( campaignPurchaseId:number )
  {
    var i = this.auth.Vouchers.findIndex( (n: { CampaignPurchaseId: number; }) => n.CampaignPurchaseId == campaignPurchaseId );

    this.auth.Voucher = this.auth.Vouchers[ i ];

    this.navCtrl.navigateForward( "voucherhistorydetails" );
  }
}
