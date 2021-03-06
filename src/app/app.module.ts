import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

// Componnets
import { AppComponent } from './app.component';
import { MainComponent } from './main/main/main.component';
import { HeaderComponent } from './main/header/header.component';
import { SidebarComponent } from './main/sidebar/sidebar.component';
import { ShipmentListComponent } from './main/shipment-list/shipment-list.component';
import { ShipmentCardComponent } from './main/shipment-card/shipment-card.component';
import { ShipmentFilterComponent } from './main/shipment-filter/shipment-filter.component';
import { ShipmentDialogComponent } from './shared/shipment-dialog/shipment-dialog.component';
import { RatesShipmentComponent } from './shared/rates-shipment/rates-shipment.component';

// Modules
import { MatIconModule, MatToolbarModule, MatDialogModule, MatPaginatorModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Ngrx -- Store
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { shipmentReducer } from './store/shipment.reducers';
import { ShipmentEffects } from './store/shipment.effects';




@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    SidebarComponent,
    ShipmentListComponent,
    ShipmentCardComponent,
    ShipmentFilterComponent,
    ShipmentDialogComponent,
    RatesShipmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatPaginatorModule,
    HttpClientModule,
    StoreModule.forRoot({ shipment: shipmentReducer }),
    EffectsModule.forRoot([ShipmentEffects]),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  providers: [],
  entryComponents: [ShipmentDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
