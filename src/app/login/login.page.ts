import { Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { NavController, MenuController, AlertController, IonContent, ModalController, PopoverController, Platform } from '@ionic/angular';

import { UserService } from '../services/user.service';
import { ExitappconfirmComponent } from '../exitappconfirm/exitappconfirm.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit 
{
  @ViewChild( IonContent, { static: true } ) content?: IonContent;
  
  Pin: string = "";
  MembershipId:  string = "";

  Subscription: any;

  constructor( public navCtrl: NavController, public activatedRoute: ActivatedRoute, public menuCtrl: MenuController, public alertCtrl: AlertController, public auth: UserService, public mCtrl: ModalController, public popCtrl: PopoverController, public plat: Platform ) 
  {
    if ( this.auth.CurrentUser != undefined && this.auth.CurrentUser.Id > 0 )
    {
      this.navCtrl.navigateRoot( "home" );
    }

    this.menuCtrl.enable( false );
  }

  async ngOnInit()
  {
    await this.plat.ready();
    await this.auth.SetDeviceUser();

    this.auth.ExitApp = false;
  }

  ionViewDidEnter()
  {
    this.Subscription = this.plat.backButton.subscribe( () =>
    {
      this.OnExitAppConfirm();
    });

    var msg = "";

    if ( this.auth.Registering )
    {
      this.auth.Registering = false;

      msg = "Account successfully registered, please login below using your Membership ID and Pin";

      this.auth.ActivateAccount( this.auth.UpdatedUser.Id );
    }
    else if ( this.auth.ResetingPin )
    {
      this.auth.ResetingPin = false;

      msg = "Pin was successfully updated, please login below using your Membership ID and Pin";
    }
    else if ( this.auth.DeletingAccount )
    {
      this.auth.DeletingAccount = false;

      msg = "Your account was successfully deleted. If you change your mind, simply register with us again.";
    }

    if ( msg != "" )
    {
      var me = this;

      me.auth.UpdatedUser = me.auth.CurrentUser = me.auth.DeviceUser = null;
        
      setTimeout( function()
      {
        me.auth.ShowMessage( "", msg );
      }, 1000);
    }
  }

  ionViewWillLeave()
  {
    this.Subscription.unsubscribe();
  }

  async OnExitAppConfirm()
  {
    return false;
    /*const pop = await this.popCtrl.create
    ({
      translucent: true,
      backdropDismiss: false,
      component: ExitappconfirmComponent
    });

    pop.onDidDismiss().then( ( r ) => 
    {
      if ( this.auth.ExitApp )
      {
        navigator[ "app" ].exitApp();
      }
    });

    return await pop.present();*/
  }

  async ngAfterViewInit() 
  {
    this.auth.ContentPage = this.content;
  }

  async SignIn()
  {
    if ( !this.Valid() )
    {
      return;
    }

    await this.auth.LoginByMembershipIdAndPin( { MembershipId: this.MembershipId, Pin: this.Pin } );

    if ( this.auth.CurrentUser != undefined && this.auth.CurrentUser.Code == 1 )
    {
      this.Pin = this.MembershipId = "";

      this.navCtrl.navigateRoot( "mydeals" );
    }
    else if ( this.auth.CurrentUser != undefined  && this.auth.CurrentUser.Message != "" )
    {
      this.auth.ShowMessage( "Error", this.auth.CurrentUser.Message );
    }
  }

  Valid()
  {
    var valid = true;

    // Required inputs
    if ( this.MembershipId == "" || this.Pin == "" )
    {
      this.auth.ShowError( "Please complete all required '*' inputs" );

      return false;
    }

    return valid;
  }

  Register()
  {
    this.navCtrl.navigateForward( "register" );
  }

  async ForgotPin()
  {
    this.navCtrl.navigateForward( "forgotpin" );
  }
}
