/**
 * Interface from which every shipment model should has
 */
export interface ShipmentModel {
  createdDate: string;
  companyName: string;
  shipmentId: number;
  createdBy: string;
  shipper: ShiperModel;
  origin: Location;
  destination: Location;
  customerStatus: string;
  references: RefeneceModel[];
  carrier: CarrierModel;
  uplift: UpliftModel;
  rateType: string;
  scac: string;
  serviceType: string;
  serviceDays: string;
  carrierRate: RateModel[];
  customerRate: RateModel[];
  trackingDetails: TrackingDetailsModel[];
  id: string;
}

export interface ShiperModel {
  companyName: string;
  address: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  id: string;
}

interface Location {
  city: string;
  state: string;
}

interface RefeneceModel {
  name: string;
  value: string;
}

interface CarrierModel {
  name: string;
  logoUrl: string;
}

interface UpliftModel {
  value: string;
  unit: string;
}

interface RateModel {
  name: string;
  charge: string;
}

interface TrackingDetailsModel {
  status: string;
  location: string;
}
