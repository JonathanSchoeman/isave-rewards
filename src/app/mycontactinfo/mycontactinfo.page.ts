import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, MenuController, NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-mycontactinfo',
  templateUrl: './mycontactinfo.page.html',
  styleUrls: ['./mycontactinfo.page.scss'],
})
export class MycontactinfoPage implements OnInit
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

}
