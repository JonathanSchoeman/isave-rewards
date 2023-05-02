import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { NavController, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit 
{
  @ViewChild( IonContent, { static: true } ) content?: IonContent;
  

  constructor( public auth: UserService, public navCtrl: NavController ) 
  {
  }

  ngOnInit() 
  {
    this.auth.LogOut();
    this.navCtrl.navigateRoot( "login" );
  }

  ngAfterViewInit() 
  {
    this.auth.ContentPage = this.content;
  }

}
