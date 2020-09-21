import * as shipmentActions from './shipment.actions';

export let initialState: any = {};


export function shipmentReducer(state = initialState, action: shipmentActions.ActionsUnion) {

  switch (action.type) {
    case shipmentActions.ActionTypes.LoadDataBegin: {
      return null;
    }
    case shipmentActions.ActionTypes.LoadDataSuccess:
      return action.payload;
    default:
      return state;


  }

}
