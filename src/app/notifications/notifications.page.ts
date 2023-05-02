import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, MenuController, AlertController, IonContent } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit 
{
  @ViewChild( IonContent, { static: true } ) content?: IonContent;

  Notifications: any = [];

  Skip: number = 0;
  Query: string = "";

  constructor( public navCtrl: NavController, public menuCtrl: MenuController, public alertCtrl: AlertController, public auth: UserService ) 
  { 
    if ( this.auth.CurrentUser == undefined || ( this.auth.CurrentUser != undefined && this.auth.CurrentUser.Id <= 0 ) )
    {
      this.navCtrl.navigateRoot( "login" );
    }

    this.menuCtrl.enable( true );
  }

  async ngOnInit() 
  {
    await this.GetNotifications();
  }

  ngAfterViewInit() 
  {
    this.auth.ContentPage = this.content;
  }

  async GetNotifications()
  {
    if ( this.auth.RefreshNotifications )
    {
      this.auth.RefreshNotifications = false;
      this.auth.Notifications = this.Notifications = [];
    }

    var not = await this.auth.GetNotifications( this.Query );

    var useNotifications = this.auth.Notifications;

    if ( this.Query != "" )
    {
      useNotifications = not;
    }

    if ( not != undefined && not.length > this.Notifications.length )
    {
      not = [];

      var c = this.auth.Take;

      for ( var i = this.Skip; i <= useNotifications.length; i++ )
      {
        if ( c <= 0 )
        {
          break;
        }

        c--;

        not.push( useNotifications[ i ] );
      }

      this.Skip += not.length;
  
      this.Notifications = this.Notifications.concat( not );
    }
  }

  async loadData( event:any )
  {
    await this.GetNotifications();

    event.target.complete();
  }

  async Search()
  {
    this.Skip = 0;
    this.Notifications = [];

    await this.GetNotifications();
  }

  async Refresh( refresher: any )
  {
    this.Notifications = this.auth.Notifications = [];

    await this.GetNotifications();
    
    refresher.target.complete();
  }

  async GoToNotification ( id:number )
  {
    var i = this.auth.Notifications.findIndex( (n: { Id: number; }) => n.Id == id );

    this.auth.Notification = this.auth.Notifications[ i ];

    this.navCtrl.navigateForward( "notificationdetail" );
  }

  async ShowMessage( title:string, message:string ) 
  {
    let alert = await this.alertCtrl.create(
    {
      header: title,
      message: message,
      buttons: ["OK"]
    });

    await alert.present();
  }
  
  async GoToPage( page:string )
  {
    if ( page == 'home' )
    {
      this.navCtrl.navigateRoot( page );
    }
    else
    {
      this.navCtrl.navigateForward( page );
    }
  }

}
