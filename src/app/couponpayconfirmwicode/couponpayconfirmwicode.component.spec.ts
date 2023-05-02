import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CouponpayconfirmwicodeComponent } from './couponpayconfirmwicode.component';

describe('CouponpayconfirmwicodeComponent', () => {
  let component: CouponpayconfirmwicodeComponent;
  let fixture: ComponentFixture<CouponpayconfirmwicodeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponpayconfirmwicodeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CouponpayconfirmwicodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
