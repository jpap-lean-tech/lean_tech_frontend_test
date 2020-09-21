import { Action } from '@ngrx/store';
import { ShipmentModel } from '../models/shipment.model';

export enum ActionTypes {
  LoadDataBegin = '[Data] Load data begin',
  LoadDataSuccess = '[Data] Load data success',
  EDIT = '[Data] update data',
  FilterStatus = '[Data] filter data'

}

export class LoadDataBegin implements Action {
  readonly type = ActionTypes.LoadDataBegin;
}

export class LoadDataSuccess implements Action {
  readonly type = ActionTypes.LoadDataSuccess;

  constructor(public payload: { payload: ShipmentModel[] }) { }
}



export type ActionsUnion = LoadDataBegin | LoadDataSuccess;
