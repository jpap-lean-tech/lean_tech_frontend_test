import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatesShipmentComponent } from './rates-shipment.component';

describe('RatesShipmentComponent', () => {
  let component: RatesShipmentComponent;
  let fixture: ComponentFixture<RatesShipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatesShipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatesShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
