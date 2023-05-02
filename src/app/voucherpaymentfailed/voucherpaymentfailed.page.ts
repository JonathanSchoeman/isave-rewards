import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, MenuController, NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-voucherpaymentfailed',
  templateUrl: './voucherpaymentfailed.page.html',
  styleUrls: ['./voucherpaymentfailed.page.scss'],
})
export class VoucherpaymentfailedPage implements OnInit {

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

  TryAgain()
  {
    this.navCtrl.back();
  }

}
