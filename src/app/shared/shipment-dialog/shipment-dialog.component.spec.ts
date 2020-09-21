import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentDialogComponent } from './shipment-dialog.component';

describe('ShipmentDialogComponent', () => {
  let component: ShipmentDialogComponent;
  let fixture: ComponentFixture<ShipmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
