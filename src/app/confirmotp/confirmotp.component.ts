import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-confirmotp',
  templateUrl: './confirmotp.component.html',
  styleUrls: ['./confirmotp.component.scss'],
})
export class ConfirmotpComponent implements OnInit
{
  OTP: string = "";
  Error: string = "";
  ShowError: boolean = false;
  ShowSuccess: boolean = false;

  constructor( public auth: UserService, public popCtrl: PopoverController )
  {
    if ( this.auth.UpdatedUser == undefined && this.auth.CurrentUser != undefined )
    {
      this.auth.UpdatedUser = this.auth.CurrentUser;
      this.auth.UpdatedUser.OTP = "";
    }
  }

  async ngOnInit()
  {
    if ( this.auth.PleaseSendOTP )
    {
      await this.Send();

      this.auth.PleaseSendOTP = false;
    }
  }

  async Validate()
  {
    if ( this.OTP == "" )
    {
      this.Error = "Enter your OTP!";

      this.ShowError = true;
      this.ShowSuccess = false;

      return;
    }

    this.ShowError = false;

    if ( this.auth.UpdatedUser == undefined )
    {
      this.Error = "Submit the form to receive an OTP!";

      this.ShowError = true;
      this.ShowSuccess = false;

      return;
    }
    
    // Validate OTP against registered user
    if ( this.OTP.trim() != this.auth.UpdatedUser.OTP.trim() )
    {
      this.Error = "You entered an incorrect OTP!";

      this.ShowError = true;
      this.ShowSuccess = false;

      return;
    }

    this.ShowError = false;
    this.ShowSuccess = this.auth.ShowLogin = true;

    this.popCtrl.dismiss();
  }

  async Send()
  {
    await this.auth.SendOTP( this.auth.UpdatedUser.MembershipId, this.auth.UpdatedUser.Cell, "Please wait..." );

    if ( this.auth.UpdatedUser != undefined && this.auth.UpdatedUser.Code == 1 )
    {
      this.ShowError = false;
      this.ShowSuccess = true;
    }
    else
    {
      this.Error = "Request failed because " + this.auth.UpdatedUser.Message + "! Please try again.";
      this.ShowError = true;
      this.ShowSuccess = false;
    }
  }

  async Cancel()
  {
    this.popCtrl.dismiss();
  }
}
