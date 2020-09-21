import { Action } from '@ngrx/store';
import { ShipmentModel } from '../models/shipment.model';

/**
 * this actions handler the events  for the ngrx or store;
 */

export enum ActionTypes {
  LoadDataBegin = '[Data] Load data begin',
  LoadDataSuccess = '[Data] Load data success',
  EDIT = '[Data] update data',
}
/**
 * this actions start the load data;
 */
export class LoadDataBegin implements Action {
  readonly type = ActionTypes.LoadDataBegin;
}

/**
 * this action load sucess the data;
 */
export class LoadDataSuccess implements Action {
  readonly type = ActionTypes.LoadDataSuccess;

  constructor(public payload: { payload: ShipmentModel[] }) { }
}
/**
 * this actions support the edit the data to form;
 */
export class EDIT implements Action {
  readonly type = ActionTypes.EDIT;

  constructor(public payload: { form: any, id: any }) { }
}



export type ActionsUnion = LoadDataBegin | LoadDataSuccess | EDIT;
