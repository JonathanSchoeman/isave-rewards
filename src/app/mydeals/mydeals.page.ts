import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, MenuController, NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-mydeals',
  templateUrl: './mydeals.page.html',
  styleUrls: ['./mydeals.page.scss'],
})
export class MydealsPage implements OnInit
{
  @ViewChild( IonContent, { static: true } ) content?: IonContent;

  Deals: any = [];
  AllDeals: any = [];

  Skip: number = 0;

  DealsShowing: string = "All";

  AllDealsSrc: string = "./../assets/imgs/all-deals-brown.png";
  VouchersSrc: string = "./../assets/imgs/vouchers-gold.png";
  CouponsSrc: string = "./../assets/imgs/coupon-gold.png";
  TravelSrc: string = "./../assets/imgs/travel-gold.png";
  SoccerSrc: string = "./../assets/imgs/soccer-gold.png";
  SpaSrc: string = "./../assets/imgs/spa-gold.png";
  EducationSrc: string = "./../assets/imgs/education-gold.png";
  EntertainmentSrc: string = "./../assets/imgs/entertainment-gold.png";
  FastFoodSrc: string = "./../assets/imgs/fast-food-gold.png";
  OnlineShoppingSrc: string = "./../assets/imgs/online-shopping-gold.png";
  CosmeticsSrc: string = "./../assets/imgs/cosmetics-gold.png";
  AssistanceSrc: string = "./../assets/imgs/assistance-gold.png";
  CarHireSrc: string = "./../assets/imgs/car-hire-gold.png";
  
  ScrollIconSrc: string = "./../assets/imgs/scroll-icon-1.jpeg";

  CategoryWidth: number = 0;

  constructor( public navCtrl: NavController, public rt: Router, public menuCtrl: MenuController, public auth: UserService )
  { 
    if ( this.auth.CurrentUser == undefined || ( this.auth.CurrentUser != undefined && this.auth.CurrentUser.Id <= 0 ) )
    {
      this.navCtrl.navigateRoot( "login" );
    }

    this.menuCtrl.enable( true );
  }

  async ngOnInit() 
  {
    await this.LoadDeals();
  }

  ngAfterViewInit() 
  {
    this.auth.ContentPage = this.content;
  }

  ResetIons()
  {
    this.AllDealsSrc = ( this.DealsShowing == "All" ) ? "./../assets/imgs/all-deals-brown.png" : "./../assets/imgs/all-deals-gold.png";
    this.VouchersSrc = ( this.DealsShowing == "Vouchers" ) ? "./../assets/imgs/vouchers-brown.png" : "./../assets/imgs/vouchers-gold.png";
    this.CouponsSrc = ( this.DealsShowing == "Coupons" ) ? "./../assets/imgs/coupon-brown.png" : "./../assets/imgs/coupon-gold.png";
    this.TravelSrc = ( this.DealsShowing == "Travel" ) ? "./../assets/imgs/travel-brown.png" : "./../assets/imgs/travel-gold.png";
    this.SoccerSrc = ( this.DealsShowing == "Soccer" ) ? "./../assets/imgs/soccer-brown.png" : "./../assets/imgs/soccer-gold.png";
    this.SpaSrc = ( this.DealsShowing == "Spa" ) ? "./../assets/imgs/spa-brown.png" : "./../assets/imgs/spa-gold.png";
    this.EducationSrc = ( this.DealsShowing == "Education" ) ? "./../assets/imgs/education-brown.png" : "./../assets/imgs/education-gold.png";
    this.EntertainmentSrc = ( this.DealsShowing == "Entertainment" ) ? "./../assets/imgs/entertainment-brown.png" : "./../assets/imgs/entertainment-gold.png";
    this.FastFoodSrc = ( this.DealsShowing == "Fast Food" ) ? "./../assets/imgs/fast-food-brown.png" : "./../assets/imgs/fast-food-gold.png";
    this.OnlineShoppingSrc = ( this.DealsShowing == "Online Shopping" ) ? "./../assets/imgs/online-shopping-brown.png" : "./../assets/imgs/online-shopping-gold.png";
    this.CosmeticsSrc = ( this.DealsShowing == "Cosmetics" ) ? "./../assets/imgs/cosmetics-brown.png" : "./../assets/imgs/cosmetics-gold.png";
    this.AssistanceSrc = ( this.DealsShowing == "Assistance" ) ? "./../assets/imgs/assistance-brown.png" : "./../assets/imgs/assistance-gold.png";
    this.CarHireSrc = ( this.DealsShowing == "Car Hire" ) ? "./../assets/imgs/car-hire-brown.png" : "./../assets/imgs/car-hire-gold.png";
  }

  ShowDeal( n: string )
  {
    this.Deals = [];

    if ( n == "All" )
    {
      this.Deals = this.auth.CouponDeals.concat( this.auth.VoucherDeals, this.auth.TravelDeals, this.auth.SoccerDeals, this.auth.SpaDeals, this.auth.EducationDeals, this.auth.EntertainmentDeals, this.auth.FastFoodDeals, this.auth.OnlineShoppingDeals, this.auth.CosmeticsDeals, this.auth.AssistanceDeals, this.auth.CarHireDeals );
    }
    else if ( n == "Vouchers" )
    {
      this.Deals = this.auth.VoucherDeals;
    }
    else if ( n == "Coupons" )
    {
      this.Deals = this.auth.CouponDeals;
    }
    else if ( n == "Travel" )
    {
      this.Deals = this.auth.TravelDeals;
    }
    else if ( n == "Soccer" )
    {
      this.Deals = this.auth.SoccerDeals;
    }
    else if ( n == "Spa" )
    {
      this.Deals = this.auth.SpaDeals;
    }
    else if ( n == "Education" )
    {
      this.Deals = this.auth.EducationDeals;
    }
    else if ( n == "Entertainment" )
    {
      this.Deals = this.auth.EntertainmentDeals;
    }
    else if ( n == "Fast Food" )
    {
      this.Deals = this.auth.FastFoodDeals;
    }
    else if ( n == "Online Shopping" )
    {
      this.Deals = this.auth.OnlineShoppingDeals;
    }
    else if ( n == "Cosmetics" )
    {
      this.Deals = this.auth.CosmeticsDeals;
    }
    else if ( n == "Assistance" )
    {
      this.Deals = this.auth.AssistanceDeals;
    }
    else if ( n == "Car Hire" )
    {
      this.Deals = this.auth.CarHireDeals;
    }

    this.DealsShowing = n;
    this.ResetIons();
  }

  async LoadDeals()
  {
    var n = this.DealsShowing;

    this.Deals = [];

    if ( n == "All" )
    {
      await this.LoadCouponDeals();
      await this.LoadVoucherDeals();
      await this.LoadTravelDeals();
      await this.LoadSoccerDeals();
      await this.LoadSpaDeals();
      await this.LoadEducationDeals();
      await this.LoadEntertainmentDeals();
      await this.LoadFastFoodDeals();
      await this.LoadOnlineShoppingDeals();
      await this.LoadCosmeticsDeals();
      await this.LoadCarHireDeals();
      await this.LoadAssistanceDeals();

      this.Deals = this.auth.CouponDeals.concat( this.auth.VoucherDeals, this.auth.TravelDeals, this.auth.SoccerDeals, this.auth.SpaDeals, this.auth.EducationDeals, this.auth.EntertainmentDeals, this.auth.FastFoodDeals, this.auth.OnlineShoppingDeals, this.auth.CosmeticsDeals, this.auth.CarHireDeals, this.auth.AssistanceDeals );

      this.AllDeals = this.auth.CouponDeals.concat( this.auth.VoucherDeals, this.auth.TravelDeals, this.auth.SoccerDeals, this.auth.SpaDeals, this.auth.EducationDeals, this.auth.EntertainmentDeals, this.auth.FastFoodDeals, this.auth.OnlineShoppingDeals, this.auth.CosmeticsDeals, this.auth.CarHireDeals, this.auth.AssistanceDeals );

      this.auth.AllDealsLoaded = true;
    }
    else if ( n == "Coupons" )
    {
      await this.LoadCouponDeals();
    }
    else if ( n == "Vouchers" )
    {
      await this.LoadVoucherDeals();
    }
    else if ( n == "Travel" )
    {
      await this.LoadTravelDeals();
    }
    else if ( n == "Soccer" )
    {
      await this.LoadSoccerDeals();
    }
    else if ( n == "Spa" )
    {
      await this.LoadSpaDeals();
    }
    else if ( n == "Education" )
    {
      await this.LoadEducationDeals();
    }
    else if ( n == "Entertainment" )
    {
      await this.LoadEntertainmentDeals();
    }
    else if ( n == "Fast Food" )
    {
      await this.LoadFastFoodDeals();
    }
    else if ( n == "Online Shopping" )
    {
      await this.LoadOnlineShoppingDeals();
    }
    else if ( n == "Cosmetics" )
    {
      await this.LoadCosmeticsDeals();
    }
    else if ( n == "Assistance" )
    {
      await this.LoadAssistanceDeals();
    }
    else if ( n == "Car Hire" )
    {
      await this.LoadCarHireDeals();
    }
  }

  async LoadCouponDeals()
  {
    await this.auth.LoadCouponDeals();

    this.Deals = this.auth.CouponDeals;
  }

  async LoadVoucherDeals()
  {
    await this.auth.LoadVoucherDeals();

    this.Deals = this.auth.VoucherDeals;
  }

  async LoadTravelDeals()
  {
    await this.auth.LoadTravelDeals();

    this.Deals = this.auth.TravelDeals;
  }

  async LoadSoccerDeals()
  {
    await this.auth.LoadVoucherDeals();

    this.Deals = this.auth.SoccerDeals;
  }

  async LoadSpaDeals()
  {
    await this.auth.LoadVoucherDeals();

    this.Deals = this.auth.SpaDeals;
  }

  async LoadEducationDeals()
  {
    await this.auth.LoadVoucherDeals();

    this.Deals = this.auth.EducationDeals;
  }

  async LoadEntertainmentDeals()
  {
    await this.auth.LoadVoucherDeals();

    this.Deals = this.auth.EntertainmentDeals;
  }

  async LoadFastFoodDeals()
  {
    await this.auth.LoadFastFoodDeals();

    this.Deals = this.auth.FastFoodDeals;
  }

  async LoadOnlineShoppingDeals()
  {
    await this.auth.LoadVoucherDeals();

    this.Deals = this.auth.OnlineShoppingDeals;
  }

  async LoadCosmeticsDeals()
  {
    await this.auth.LoadVoucherDeals();

    this.Deals = this.auth.CosmeticsDeals;
  }

  async LoadCarHireDeals()
  {
    await this.auth.LoadVoucherDeals();

    this.Deals = this.auth.CarHireDeals;
  }

  async LoadAssistanceDeals()
  {
    await this.auth.LoadAssistanceDeals();

    this.Deals = this.auth.AssistanceDeals;
  }

  GoToVoucherDeal ( deal:any )
  {
    this.auth.VoucherDeal = deal;
    this.auth.CampaignId = deal.Id;

    if ( deal.IsViral )
    {
      this.navCtrl.navigateForward( "viraldealdetails" );
    }
    else
    {
      this.navCtrl.navigateForward( "voucherdetails" );
    }
  }

  GoToCouponDeal ( deal:any, vendor:any )
  {
    /*if ( !this.auth.LoadingOtherCoupons )
    {
      var allCoupons = this.auth.OtherCoupons[ vendor.Id ].concat( vendor.Vouchers );

      vendor.Vouchers = allCoupons;
    }*/

    this.auth.CampaignId = deal.Id;
    this.auth.CouponDeal = vendor;

    this.rt.navigate( ["coupondetails"] );
    //this.navCtrl.navigateForward( "coupondetails" );
  }

  GoToTravelDeal ( deal:any )
  {
    if ( deal.IsViral )
    {
      this.auth.VoucherDeal = deal;
      this.auth.CampaignId = deal.Id;

      this.navCtrl.navigateForward( "viraldealdetails" );
    }
    else if ( deal.CampaignTypeId == 6 )
    {
      this.auth.TravelDeal = deal;
      this.auth.CampaignId = deal.Id;

      this.navCtrl.navigateForward( "traveldetails" );
    }
    else
    {
      this.auth.ShowMessage( "Oops!", `Unknown Travel deal ${deal.CampaignTier.DealTitle} being offered by "${deal.TradingPartnerName}".` );
    }
  }

  GoToSoccerDeal ( deal:any )
  {
    this.auth.VoucherDeal = deal;
    this.auth.CampaignId = deal.Id;

    this.navCtrl.navigateForward( "voucherdetails" );
  }

  GoToSpaDeal ( deal:any )
  {
    this.auth.VoucherDeal = deal;
    this.auth.CampaignId = deal.Id;

    this.navCtrl.navigateForward( "viraldealdetails" );
  }

  GoToEducationDeal ( deal:any )
  {
    this.auth.VoucherDeal = deal;
    this.auth.CampaignId = deal.Id;

    this.navCtrl.navigateForward( "viraldealdetails" );
  }

  GoToEntertainmentDeal ( deal:any )
  {
    this.auth.VoucherDeal = deal;
    this.auth.CampaignId = deal.Id;

    this.navCtrl.navigateForward( "entertainmentdetails" );
  }

  GoToFastFoodDeal ( deal:any )
  {
    this.auth.VoucherDeal = deal;
    this.auth.CampaignId = deal.Id;

    this.navCtrl.navigateForward( "fastfooddetails" );
  }

  GoToOnlineShoppingDeal ( deal:any )
  {
    this.auth.VoucherDeal = deal;
    this.auth.CampaignId = deal.Id;

    this.navCtrl.navigateForward( "viraldealdetails" );
  }

  GoToCosmeticsDeal ( deal:any )
  {
    this.auth.VoucherDeal = deal;
    this.auth.CampaignId = deal.Id;

    this.navCtrl.navigateForward( "viraldealdetails" );
  }

  GoToAssistanceDeal ( deal:any )
  {
    if ( deal.IsViral && deal.CampaignTypeId == 1 )
    {
      this.auth.VoucherDeal = deal;
      this.auth.CampaignId = deal.Id;

      this.navCtrl.navigateForward( "viraldealdetails" );
    }
    else
    {
      this.auth.TravelDeal = deal;
      this.auth.CampaignId = deal.Id;
  
      this.navCtrl.navigateForward( "assistmedetails" );
    }
  }

  GoToCarHireDeal ( deal:any )
  {
    this.auth.VoucherDeal = deal;
    this.auth.CampaignId = deal.Id;

    this.navCtrl.navigateForward( "viraldealdetails" );
  }

  async loadData( event:any )
  {
    await this.LoadDeals();

    event.target.complete();
  }

  HasCategory( category: string )
  {
    return this.AllDeals.findIndex( (n: { Category: string; }) => n.Category == category ) > 0;
  }

  GetWidth()
  {
    var _ds = Array();
    var ds = _ds.concat( this.auth.CouponDeals, this.auth.VoucherDeals, this.auth.TravelDeals, this.auth.SoccerDeals, this.auth.SpaDeals, this.auth.EducationDeals, this.auth.EntertainmentDeals, this.auth.FastFoodDeals, this.auth.OnlineShoppingDeals, this.auth.CosmeticsDeals, this.auth.CarHireDeals, this.auth.AssistanceDeals );

    var cats = [];

    this.CategoryWidth = 80;

    for ( let v of ds )
    {
      if (  cats.findIndex( n => n == v.Category ) < 0 )
      {
        this.CategoryWidth += 70;
    
        cats.push( v.Category );
      }
    }

    return `width:${this.CategoryWidth}px !important;`;
  }
}
