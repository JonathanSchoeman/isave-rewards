import { Component, OnInit, ViewChild } from '@angular/core';

import { UserService } from '../services/user.service';
import { NavController, MenuController, AlertController, IonContent, PopoverController } from '@ionic/angular';
import { ConfirmotpComponent } from '../confirmotp/confirmotp.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit 
{
  @ViewChild( IonContent, { static: true } ) content?: IonContent;

  // Form data
  Pin: string = "";
  ConfirmPin: string = "";
  MembershipId: string = "";
  MobileNumber: string = "";
  EmailAddress: string = "";

  constructor( public navCtrl: NavController, public menuCtrl: MenuController, public auth: UserService, public popCtrl: PopoverController ) 
  { 
    if ( this.auth.CurrentUser != undefined && this.auth.CurrentUser.Id > 0 )
    {
      this.auth.CurrentUser = this.auth.DeviceUser = null;
    }

    this.menuCtrl.enable( false );
  }

  ngOnInit() 
  {

  }

  ngAfterViewInit() 
  {
    this.auth.ContentPage = this.content;
  }

  async SignUp()
  {
    if ( !this.Valid() )
    {
      return;
    }

    var user = this.Construct();

    await this.auth.Register( user, "Creating your account..." );

    if ( this.auth.UpdatedUser != undefined && this.auth.UpdatedUser.Code == 1 )
    {
      this.ClearForm();

      this.auth.Registering = true;

      // Enter OTP
      this.ConfirmOTP();
    }
    else if ( this.auth.UpdatedUser != undefined  && this.auth.UpdatedUser.Message != "" )
    {
      this.auth.ShowMessage( "Error", this.auth.UpdatedUser.Message );
    }
  }

  ClearForm()
  {
    this.MembershipId = this.MobileNumber = this.EmailAddress = this.Pin = this.ConfirmPin = "";
  }

  Valid()
  {
    var valid = true;

    // Required inputs
    if ( this.MembershipId == "" || this.MobileNumber == "" || this.Pin == "" || this.ConfirmPin == "" )
    {
      this.auth.ShowError( "Please complete all required '*' inputs" );

      return false;
    }

    if ( this.Pin != this.ConfirmPin )
    {
      this.auth.ShowError( "Your pin does not match." );

      return false;
    }

    return valid;
  }

  private Construct()
  {
    var user =`MembershipId=${this.MembershipId}&IsSAId=1&Cell=${this.MobileNumber}&Pin=${this.Pin}&ConfirmPin=${this.ConfirmPin}`;

    return user;
  }

  async ConfirmOTP()
  {
    const pop = await this.popCtrl.create
    ({
      translucent: true,
      backdropDismiss: false,
      component: ConfirmotpComponent
    });

    pop.onDidDismiss().then( ( r ) => 
    {
      if ( this.auth.ShowLogin )
      {
        this.navCtrl.navigateRoot( "login" ); 
      }
    } );

    return await pop.present();
  }
}
