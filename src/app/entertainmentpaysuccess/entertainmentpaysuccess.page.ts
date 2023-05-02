import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, MenuController, NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-entertainmentpaysuccess',
  templateUrl: './entertainmentpaysuccess.page.html',
  styleUrls: ['./entertainmentpaysuccess.page.scss'],
})
export class EntertainmentpaysuccessPage implements OnInit
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

  ngOnInit() 
  {
    
  }

  ngAfterViewInit() 
  {
    this.auth.ContentPage = this.content;
  }

  MyWallet()
  {
    this.navCtrl.navigateRoot( "home" ).then( r =>
    {
      this.navCtrl.navigateForward( "mywallet" );
    } );
  }
}
