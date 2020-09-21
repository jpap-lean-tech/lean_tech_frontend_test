import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import swal from 'sweetalert2';


@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.scss']
})
export class ShipmentListComponent implements OnInit {

  public shipments;
  public currentItemsToShow;
  public longitud: number;
  public arrayPaginator = [0];
  public pageSize;
  constructor(
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.store.dispatch({ type: '[Data] Load data begin' });
    this.store.subscribe(data => {
      if (data.shipment) {
        this.shipments = data.shipment;
        this.longitud = this.shipments.length;
        const event = { previousPageIndex: 0, pageIndex: 0, pageSize: 3, length: 20 };
        this.onPageChange(event, this.shipments);
        this.numPage();

      }
    });
  }

  public onPageChange($event, ship = this.shipments) {
    this.pageSize = $event.pageSize;
    if (ship) {
      this.longitud = ship.length;
      this.currentItemsToShow = ship.slice(
        $event.pageIndex * $event.pageSize,
        $event.pageIndex * $event.pageSize + $event.pageSize);
    }
  }

  private numPage() {
    this.arrayPaginator = [];
    if (this.longitud < 3) {
      this.pageSize = this.longitud;
      this.arrayPaginator = [this.longitud];
    }
    for (let i = 3; i <= this.longitud; i = i + 3) {
      this.arrayPaginator.push(i);
    }
  }


}
