import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, MenuController, NavController, PopoverController } from '@ionic/angular';
import { ConfirmotpComponent } from '../confirmotp/confirmotp.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-forgotpin',
  templateUrl: './forgotpin.page.html',
  styleUrls: ['./forgotpin.page.scss'],
})
export class ForgotpinPage implements OnInit
{
  @ViewChild( IonContent, { static: true } ) content?: IonContent;

  // Form data
  Pin: string = "";
  ConfirmPin: string = "";
  MobileNumber: string = "";
  MembershipId:  string = "";


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

  async ResetPin()
  {
    var user = this.Construct();

    await this.auth.UpdatePin1( user, "Reseting your pin..." );

    if ( this.auth.UpdatedUser != undefined && this.auth.UpdatedUser.Code == 1 )
    {
      this.ClearForm();

      this.navCtrl.navigateRoot( "login" );
    }
    else if ( this.auth.UpdatedUser != undefined  && this.auth.UpdatedUser.Message != "" )
    {
      this.auth.ShowMessage( "Error", this.auth.UpdatedUser.Message );
    }
  }

  async SendOTP()
  {
    if ( !this.Valid() )
    {
      return;
    }

    this.auth.ResetingPin = true;

    await this.auth.SendOTP( this.MembershipId, this.MobileNumber, "Please wait..." );

    if ( this.auth.UpdatedUser != undefined && this.auth.UpdatedUser.Code == 1 )
    {
      this.ConfirmOTP();
    }
    else if ( this.auth.UpdatedUser != undefined  && this.auth.UpdatedUser.Message != "" )
    {
      this.auth.ShowMessage( "Error", this.auth.UpdatedUser.Message );
    }
  }

  ClearForm()
  {
    this.MobileNumber = this.Pin = this.ConfirmPin = "";
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
    var user =`MembershipId=${this.MembershipId}&MobileNumber=${this.MobileNumber}&Pin=${this.Pin}&ConfirmPin=${this.ConfirmPin}`;

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

    pop.onDidDismiss().then( async ( r ) => 
    {
      if ( this.auth.ShowLogin )
      {
        await this.ResetPin();
      }
    });

    return await pop.present();
  }

}
