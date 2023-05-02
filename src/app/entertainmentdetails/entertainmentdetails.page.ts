import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, MenuController, NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-entertainmentdetails',
  templateUrl: './entertainmentdetails.page.html',
  styleUrls: ['./entertainmentdetails.page.scss'],
})
export class EntertainmentdetailsPage implements OnInit
{
  @ViewChild( IonContent, { static: true } ) content?: IonContent;

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
    
  }

  ngAfterViewInit() 
  {
    this.auth.ContentPage = this.content;
  }

  BuyNow()
  {
    this.navCtrl.navigateForward( "entertainmentpaynow" );
  }

  Cinemas()
  {
    this.navCtrl.navigateForward( "entertainmentcinemas" );
  }

  History()
  {
    this.navCtrl.navigateForward( "entertainmenthistory" );
  }

}
