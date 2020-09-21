import * as shipmentActions from './shipment.actions';

export let initialState: any = {};

/**
 * here I handler the logic for the ngrx his name are reducers;
 */
export function shipmentReducer(state = initialState, action: shipmentActions.ActionsUnion) {

  switch (action.type) {
    case shipmentActions.ActionTypes.LoadDataBegin: {
      return null;
    }
    case shipmentActions.ActionTypes.LoadDataSuccess:
      return action.payload;
    case shipmentActions.ActionTypes.EDIT:
      const shipment = state.find(element => element.shipmentId === action.payload.id);
      const updateShipment = { ...shipment };
      updateShipment.shipper = action.payload.form;
      const updateState = [...state];
      updateState.forEach((data, i) => {
        if (data.shipmentId === action.payload.id) {
          updateState[i] = updateShipment;
        }
      });
      return updateState;
    default:
      return state;


  }

}
