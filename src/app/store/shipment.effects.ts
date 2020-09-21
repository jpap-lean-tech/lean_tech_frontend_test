import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { ShipmentService } from '../services/shipment.service';

/**
 * this effects handler the load for the store;
 */

@Injectable()
export class ShipmentEffects {

  loadShipments$ = createEffect(() => this.actions$.pipe(
    ofType('[Data] Load data begin'),
    mergeMap(() => this.shipmentService.getShipmentList()
      .pipe(
        map(shipments => ({ type: '[Data] Load data success', payload: shipments })),
        catchError(() => EMPTY)
      )
    )
  )
  );

  constructor(
    private actions$: Actions,
    private shipmentService: ShipmentService
  ) { }

}
