import { Action } from '@ngrx/store';
import { ShipmentModel } from '../models/shipment.model';

export enum ActionTypes {
  LoadDataBegin = '[Data] Load data begin',
  LoadDataSuccess = '[Data] Load data success',
  EDIT = '[Data] update data',
}

export class LoadDataBegin implements Action {
  readonly type = ActionTypes.LoadDataBegin;
}

export class LoadDataSuccess implements Action {
  readonly type = ActionTypes.LoadDataSuccess;

  constructor(public payload: { payload: ShipmentModel[] }) { }
}

export class EDIT implements Action {
  readonly type = ActionTypes.EDIT;

  constructor(public payload: { form: any, id: any }) { }
}



export type ActionsUnion = LoadDataBegin | LoadDataSuccess | EDIT;
