import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ShipmentModel } from '../models/shipment.model';


const url = 'https://square.lean-tech.io/jsonmock/api/orders/';
@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  constructor(private http: HttpClient) { }


  public getShipmentList(): Observable<ShipmentModel[]> {
    return this.http.get<ShipmentModel[]>(url);

  }
}
