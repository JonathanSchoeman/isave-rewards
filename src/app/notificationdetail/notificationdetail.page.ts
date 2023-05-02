import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, MenuController, IonContent } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-notificationdetail',
  templateUrl: './notificationdetail.page.html',
  styleUrls: ['./notificationdetail.page.scss'],
})
export class NotificationdetailPage implements OnInit 
{
  @ViewChild( IonContent, { static: true } ) content?: IonContent;
  

  constructor( public navCtrl: NavController, public menuCtrl: MenuController, public auth: UserService ) 
  { 
    if ( this.auth.CurrentUser == undefined || ( this.auth.CurrentUser != undefined && this.auth.CurrentUser.Id <= 0 ) )
    {
      this.navCtrl.navigateRoot( "login" );
    }

    if ( this.auth.Notification == undefined )
    {
      this.navCtrl.navigateBack( "notifications" );
    }

    this.menuCtrl.enable( true );

    this.MarkNotificationAsRead();
  }

  ngOnInit() 
  {

  }

  ngAfterViewInit() 
  {
    this.auth.ContentPage = this.content;
  }

  async MarkNotificationAsRead()
  {
    this.auth.RefreshNotifications = true;
    
    await this.auth.MarkNotificationAsRead( this.auth.Notification.Id );
  }
}
