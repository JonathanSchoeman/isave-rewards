import { Component, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { ActionSheetController, IonContent, MenuController, NavController, PopoverController, IonBackButtonDelegate } from '@ionic/angular';
import { ConfirmotpComponent } from '../confirmotp/confirmotp.component';
import { ProfiledeleteconfirmComponent } from '../profiledeleteconfirm/profiledeleteconfirm.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit
{
  @ViewChild( IonContent, { static: true } ) content?: IonContent;
  @ViewChild(IonBackButtonDelegate) backButton?: IonBackButtonDelegate;

  // Form data
  //Name: string;
  //Surname: string;
  //MembershipId: string;
  Pin: string = "";
  ConfirmPin: string = "";
  MobileNumber: string = "";
  EmailAddress: string = "";
  //UseSAMembershipId: boolean = true;

  // Uploads
  SelfieLoaded: boolean = false;
  SelfieUrl: string = "../assets/imgs/no-preview.png";

  // Shows
  ShowSettings: boolean = false;
  ShowContactInfo: boolean = false;
  
  constructor( public navCtrl: NavController, public menuCtrl: MenuController, public auth: UserService, public camera: Camera, public asCtrl: ActionSheetController, public popCtrl: PopoverController ) 
  { 
    if ( this.auth.CurrentUser == undefined || ( this.auth.CurrentUser != undefined && this.auth.CurrentUser.Id <= 0 ) )
    {
      this.navCtrl.navigateRoot( "login" );
    }

    this.menuCtrl.enable( true );

    this.Set();
  }

  ngOnInit() 
  {

  }

  ngAfterViewInit() 
  {
    this.auth.ContentPage = this.content;
  }

  ionViewDidEnter()
  {
    this.Back();
  }

  async Set()
  {
    if ( this.auth.CurrentUser.SelfieUrl != undefined && this.auth.CurrentUser.SelfieUrl != null && this.auth.CurrentUser.SelfieUrl != "" )
    {
      this.SelfieUrl = this.auth.APIUrl + this.auth.CurrentUser.SelfieUrl;
    }

    // My Details
    //this.Name = this.auth.CurrentUser.Name;
    //this.Surname = this.auth.CurrentUser.Surname;
    //this.MembershipId = this.auth.CurrentUser.IdNumber;

    // Contact Details
    this.MobileNumber = this.auth.CurrentUser.Cell;
    this.EmailAddress = this.auth.CurrentUser.Email;
  }

  UploadDocument( source: any, isSelfie: boolean )
  {
    const options: CameraOptions =
    {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: source
    };
    
    this.camera.getPicture( options ).then( ( imageData ) =>
    {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):

      if ( isSelfie )
      {
        this.SelfieUrl = 'data:image/jpeg;base64,' + imageData;
        this.SelfieLoaded = true;

        this.UploadSelfie();
      }
      /*else
      {
        this.IdPassportUrl = 'data:image/jpeg;base64,' + imageData;
        this.IdPassportLoaded = true;
      }*/
    }, ( err ) =>
    {
      this.SelfieLoaded = ( isSelfie ) ? false: this.SelfieLoaded;
      //this.IdPassportLoaded = ( !isSelfie ) ? false: this.IdPassportLoaded;

     this.auth.ShowError( JSON.stringify( err ) );
    });
  }

  async UploadSelfie()
  {
    await this.auth.UploadDocument( this.auth.CurrentUser.Id, this.SelfieUrl, "file", "selfie.jpg", "image/jpeg", "Uploading your selfie..." );

    this.auth.SelfieUrl = this.auth.CurrentUser.SelfieUrl = this.auth.DeviceUser.SelfieUrl = this.SelfieUrl;

    if ( this.auth.UpdatedUser != null && this.auth.UpdatedUser.Code == -1 )
    {
      // Notify agent
      this.auth.ShowMessage( "", "Your selfie could not be uploaded, please try again." );
    }
  }

  async PresentPhotoOptions( isSelfie: boolean )
  {
    const acc = await this.asCtrl.create
    ({
      buttons: [{
        text: 'Take Photo',
        icon: 'camera',
        handler: () =>
        {
          acc.dismiss();

          this.UploadDocument( 1, isSelfie );
        }
      },{
        text: 'Choose Photo',
        icon: 'images',
        handler: () =>
        {
          acc.dismiss();

          this.UploadDocument( 0, isSelfie );
        }
      },{ 
        icon: 'close',
        text: 'Cancel', 
        role: 'cancel' 
      }]
    });

    await acc.present();
  }

  async Update()
  {
    if ( !this.Valid() )
    {
      return;
    }

    /*if ( !this.auth.ShowLogin )
    {
      this.auth.PleaseSendOTP = true;

      this.ConfirmOTP();

      return;
    }*/

    var user = this.Construct();

    await this.auth.Update( user, "Updating your pin..." );

    if ( this.auth.UpdatedUser != undefined && this.auth.UpdatedUser.Code == 1 )
    {
      // Notify agent
      this.auth.ShowMessage( "", this.auth.UpdatedUser.Message );
    }
    else if ( this.auth.UpdatedUser != undefined  && this.auth.UpdatedUser.Message != "" )
    {
      this.auth.ShowMessage( "Error", this.auth.UpdatedUser.Message );
    }
  }

  ClearForm()
  {
    /*this.MembershipId = this.MobileNumber = this.EmailAddress =*/ this.Pin = this.ConfirmPin = "";
  }

  Valid()
  {
    var valid = true;

    // Required inputs
    if ( this.Pin == "" || this.ConfirmPin == "" )
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
    //var user =`Id=${this.auth.CurrentUser.Id}&Name=${this.Name}&Surname=${this.Surname}&MembershipId=${this.MembershipId}&IsSAId=1&Email=${this.EmailAddress}&Cell=${this.MobileNumber}&Pin=${this.Pin}&ConfirmPin=${this.ConfirmPin}`;

    return `Id=${this.auth.CurrentUser.Id}&Pin=${this.Pin}&ConfirmPin=${this.ConfirmPin}`;
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
      if ( this.auth.ShowLogin && this.auth.DeletingAccount )
      {
        await this.Delete();

        this.auth.ShowLogin = false;
      }
      else if ( this.auth.ShowLogin )
      {
        await this.Update();

        this.auth.ShowLogin = false;
      }
    } );

    return await pop.present();
  }

  Back()
  {
    if ( this.backButton )
    this.backButton.onClick = () =>
    {
      if ( !this.ShowSettings && !this.ShowContactInfo )
      {
        this.navCtrl.back();
      }
      
      this.ShowSettings = this.ShowContactInfo = false;
    };
  }

  async ConfirmDelete()
  {
    const pop = await this.popCtrl.create
    ({
      translucent: true,
      backdropDismiss: false,
      component: ProfiledeleteconfirmComponent
    });

    pop.onDidDismiss().then( async ( r ) => 
    {
      if ( this.auth.Proceed )
      {
        this.auth.DeletingAccount = true;

        await this.auth.SendOTP( this.auth.CurrentUser.MembershipId, this.auth.CurrentUser.Cell, "Please wait..." );

        if ( this.auth.UpdatedUser != undefined && this.auth.UpdatedUser.Code == 1 )
        {
          this.ConfirmOTP();
        }
        else if ( this.auth.UpdatedUser != undefined  && this.auth.UpdatedUser.Message != "" )
        {
          this.auth.ShowMessage( "Error", this.auth.UpdatedUser.Message );
        }
      }
    } );

    return await pop.present();
  }

  async Delete()
  {
    await this.auth.Delete( "Deleting your user data, please wait..." );

    if ( this.auth.UpdatedUser != undefined && this.auth.UpdatedUser.Code == 1 )
    {
      // Notify agent
      this.navCtrl.navigateRoot( "logout" );
    }
    else if ( this.auth.UpdatedUser != undefined  && this.auth.UpdatedUser.Message != "" )
    {
      this.auth.ShowMessage( "Error", this.auth.UpdatedUser.Message );
    }
  }
}
