import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, LoadingController, MenuController, NavController, PopoverController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { WicodeconfirmComponent } from '../wicodeconfirm/wicodeconfirm.component';

@Component({
  selector: 'app-coupondetails',
  templateUrl: './coupondetails.page.html',
  styleUrls: ['./coupondetails.page.scss'],
})
export class CoupondetailsPage implements OnInit
{
  @ViewChild( IonContent, { static: true } ) content?: IonContent;

  Coupons: any = [];
  AllCoupons: any = [];
  Query: string = "";
  CartCount: number = 0;
  CategoryName: string = "";

  constructor( public navCtrl: NavController, public menuCtrl: MenuController, public auth: UserService, public popCtrl: PopoverController, public loadingCtrl: LoadingController )
  { 
    if ( this.auth.CurrentUser == undefined || ( this.auth.CurrentUser != undefined && this.auth.CurrentUser.Id <= 0 ) )
    {
      this.navCtrl.navigateRoot( "login" );
    }

    this.menuCtrl.enable( true );
  }

  async ngOnInit() 
  {
    this.AllCoupons = this.auth.CouponDeal.Vouchers;

    await this.PrepareCoupons();

    if ( this.auth.LoadingOtherCoupons )
    {
      let loading = await this.loadingCtrl.create(
      { 
        spinner: "bubbles",
        message: "Loading..."
      } );
      
      loading.present();

      this.Wait( loading, null );
    }
    else
    {
      var me = this;

      setTimeout( function()
      {
        var allCoupons = me.auth.CouponDeal.Vouchers.concat( me.auth.OtherCoupons[ me.auth.CouponDeal.Id ] );

        me.AllCoupons = allCoupons;

        me.PrepareCoupons();
      }, 100 );
    }
  }

  ngAfterViewInit() 
  {
    this.auth.ContentPage = this.content;
  }

  ionViewDidEnter()
  {
    if ( this.auth.CouponShoppingCart == undefined || this.auth.CouponShoppingCart.length <= 0 ) return;

    this.CartCount = 0;

    for ( var i = 0; i < this.auth.CouponShoppingCart.length; i++ )
    {
      this.CartCount += this.auth.CouponShoppingCart[ i ].CouponsInCart;
    }
  }

  async PrepareCoupons()
  {
    this.Coupons = this.AllCoupons;

    if ( this.Query == "" ) return;

    var cs = [];

    var query = this.Query.toLowerCase();

    for ( let r of this.AllCoupons )
    {
      if ( ( r.Name.toLowerCase().includes( query ) ) ||
           ( r.SummaryText.toLowerCase().includes( query ) ) ||
           ( r.SummaryHTML.toLowerCase().includes( query ) ) ||
           ( r.DescriptionText.toLowerCase().includes( query ) ) ||
           ( r.DescriptionHTML.toLowerCase().includes( query ) ) ||
           ( r.TermAndConditionsText.toLowerCase().includes( query ) ) ||
           ( r.TermAndConditionsHTML.toLowerCase().includes( query ) ) ||
           ( r.RedemptionDetailsText.toLowerCase().includes( query ) ) ||
           ( r.RedemptionDetailsHTML.toLowerCase().includes( query ) ) )
      {
        cs.push( r );
      }
    }

    this.Coupons = cs;
  }

  async Search()
  {
    this.Coupons = [];

    await this.PrepareCoupons();
  }

  GoToCart()
  {
    if ( this.auth.CouponShoppingCart != undefined && this.auth.CouponShoppingCart.length <= 0 ) 
    {
      // Toast (cart is empty)
      this.auth.Toast( "Cart is empty" );

      return;
    }

    if ( this.auth.CouponDeal.HasWiCode )
    {
      this.Confirm();
    }
    else
    {
      this.navCtrl.navigateForward( "couponpaynow" );
    }
  }

  async Confirm()
  {
    const pop = await this.popCtrl.create
    ({
      translucent: true,
      backdropDismiss: false,
      component: WicodeconfirmComponent
    });

    pop.onDidDismiss().then( ( r ) => 
    {
      if ( this.auth.Proceed )
      {
        this.navCtrl.navigateForward( "couponpaynow" );
      }
    } );

    return await pop.present();
  }

  AddToCart( guid: string )
  {
    var i = this.auth.CouponShoppingCart.findIndex( (n: { Guid: string; }) => n.Guid == guid );

    if ( i >= 0 )
    {
      if ( this.auth.CouponShoppingCart[ i ].AvailableCoupons <= 0 )
      {
        // Toast (reached maximum redeemeable coupons)
        this.auth.Toast( "Reached maximum redeemeable coupons" );

        return;
      }

      this.CartCount += 1;

      this.auth.CouponShoppingCart[ i ].CouponsInCart += 1;
      this.auth.CouponShoppingCart[ i ].AvailableCoupons -= 1;

      return;
    }

    var i = this.AllCoupons.findIndex( (n: { Guid: string; }) => n.Guid == guid );

    this.AllCoupons[ i ].CouponsInCart += 1;
    this.AllCoupons[ i ].AvailableCoupons -= 1;

    this.auth.CouponShoppingCart.push( this.AllCoupons[ i ] );

    this.CartCount += 1;

    // Toast (item added to cart)
    //this.auth.Toast( "Item added to cart" );
  }

  RemoveFromCart( guid: string )
  {
    var i = this.auth.CouponShoppingCart.findIndex( (n: { Guid: string; }) => n.Guid == guid );

    if ( i < 0 )
    {
      return;
    }

    this.CartCount -= 1;

    this.auth.CouponShoppingCart[ i ].CouponsInCart -= 1;
    this.auth.CouponShoppingCart[ i ].AvailableCoupons += 1;

    if ( this.auth.CouponShoppingCart[ i ].CouponsInCart <= 0 )
    {
      this.auth.CouponShoppingCart.splice( i, 1 );

      // Toast (item removed from cart)
      this.auth.Toast( "Item removed from cart" );
    }
  }

  SetCategoryName( cname: string )
  {
    if ( this.CategoryName == cname )
    {
      this.CategoryName = "";

      return;
    }

    this.CategoryName = cname;
  }

  InCategory( categories: any )
  {
    if ( this.CategoryName == "" ) return true;

    var i = categories.findIndex( (n: { CategoryName: string; }) => n.CategoryName == this.CategoryName );

    if ( i >= 0 )
    {
      return true;
    }

    return false;
  }

  async loadData( event:any )
  {
    if ( this.auth.LoadingOtherCoupons )
    {
      let loading = await this.loadingCtrl.create(
      { 
        spinner: "bubbles",
        message: "Loading.."
      } );
      
      loading.present();

      this.Wait( loading, event );
    }
    else
    {
      event.target.complete();
    }
  }

  Timeout: any;

  async Wait( loading: HTMLIonLoadingElement, event:any = null )
  {
    clearTimeout( this.Timeout );

    var me = this;

    this.Timeout = setTimeout( function()
    {
      if ( me.auth.LoadingOtherCoupons )
      {
        me.Wait( loading, event );
      }
      else
      {
        var allCoupons = me.auth.CouponDeal.Vouchers.concat( me.auth.OtherCoupons[ me.auth.CouponDeal.Id ] );

        me.Coupons = allCoupons;

        if ( event != null )
        {
          event.target.complete();
        }

        loading.dismiss();
      }
      
    }, 1000 );
  }
}
