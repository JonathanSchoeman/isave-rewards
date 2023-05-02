import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, MenuController, IonContent, PopoverController } from '@ionic/angular';
import { NourlComponent } from '../nourl/nourl.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit 
{
  @ViewChild( IonContent, { static: true } ) content?: IonContent;
  
  constructor( public navCtrl: NavController, public menuCtrl: MenuController, public auth: UserService, public popCtrl: PopoverController ) 
  { 
    if ( this.auth.CurrentUser == undefined || ( this.auth.CurrentUser != undefined && this.auth.CurrentUser.Id <= 0 ) )
    {
      this.navCtrl.navigateRoot( "login" );
    }

    this.menuCtrl.enable( true );
  }

  async ngOnInit() 
  {
    if ( this.auth.CurrentUser.DeviceOS == undefined )
    {
      await this.auth.SaveDeviceDetails();
    }
    if ( this.auth.CurrentUser.OneSignalToken == undefined )
    {
      await this.auth.PushNotificationConfig();
    }
  }

  ngAfterViewInit() 
  {
    this.auth.ContentPage = this.content;
  }

  OpenSystemLink( url: string, target: string = "_system" )
  {
    if ( url == undefined )
    {
      this.NoUrl();
      
      return;
    }

    this.auth.OpenSystemLink( url, target );
  }

  async NoUrl()
  {
    const pop = await this.popCtrl.create
    ({
      translucent: true,
      backdropDismiss: true,
      component: NourlComponent
    });

    pop.onDidDismiss().then( ( r ) => 
    {
      
    } );

    return await pop.present();
  }
}
