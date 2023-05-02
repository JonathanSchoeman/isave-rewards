import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CouponhistorywicodedetailsPage } from './couponhistorywicodedetails.page';

describe('CouponhistorywicodedetailsPage', () => {
  let component: CouponhistorywicodedetailsPage;
  let fixture: ComponentFixture<CouponhistorywicodedetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponhistorywicodedetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CouponhistorywicodedetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
