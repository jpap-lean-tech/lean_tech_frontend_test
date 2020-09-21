import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { ShipmentDialogComponent } from 'src/app/shared/shipment-dialog/shipment-dialog.component';
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
  public ship;
  public statusList: any[] = [];
  public statusName = 'Status';
  private newStatus = ['Status'];
  public deleteInput;
  public customerStatus;
  public statusCustomer = 'Customer Status';

  constructor(
    private store: Store<any>,
    public dialog: MatDialog

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
        this.populateFilters();
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
    if (this.longitud === 0) {
      swal.fire('Nothing', 'no shipment with this filters', 'error');
    }
    if (this.longitud < 3) {
      this.pageSize = this.longitud;
      this.arrayPaginator = [this.longitud];
    }
    for (let i = 3; i <= this.longitud; i = i + 3) {
      this.arrayPaginator.push(i);
    }
  }

  public applyFilter(searchValue: string) {
    const event = { previousPageIndex: 0, pageIndex: 0, pageSize: 3, length: 20 };
    if (searchValue && this.shipments) {
      const ship = this.shipments.filter(
        data => {
          return data.companyName === searchValue ||
            data.origin.city === searchValue ||
            data.destination.city === searchValue ||
            data.trackingDetails[0].status === searchValue;
        });
      if (ship.length > 0) {
        this.ship = ship;
        this.onPageChange(event, ship);
        this.shipments = ship;
      }
    }
    if (searchValue === '') {
      this.store.dispatch({ type: '[Data] Load data begin' });

    }
    this.numPage();
    this.statusName = 'Status';
    this.statusCustomer = 'Customer Status';

  }

  private populateFilters() {
    const customerStatus = ['Customer Status'];
    if (this.shipments) {
      this.shipments.forEach(element => {
        customerStatus.push(element.customerStatus);
        element.trackingDetails.forEach(data => {
          this.newStatus.push(data.status);
        });
      });
    }
    const newStatus = new Set(this.newStatus);
    const uniqueStatus = Array.from(newStatus);
    this.statusList = uniqueStatus;
    const customerStatusSet = new Set(customerStatus);
    const uniqueCustumerStatus = Array.from(customerStatusSet);
    this.customerStatus = uniqueCustumerStatus;
  }

  public filterStatus() {
    this.statusCustomer = 'Customer Status';
    const event = { previousPageIndex: 0, pageIndex: 0, pageSize: 3, length: 20 };
    if (this.statusName !== 'Status') {
      this.ship = this.shipments.filter(data => data.trackingDetails[0].status === this.statusName);
      this.onPageChange(event, this.ship);
      this.deleteInput = false;
      this.numPage();
    } else {
      this.ship = this.shipments;
      this.onPageChange(event, this.ship);
      this.deleteInput = true;
      this.store.dispatch({ type: '[Data] Load data begin' });
      this.numPage();
    }
  }


  public customerFilter() {
    this.statusName = 'Status';
    const event = { previousPageIndex: 0, pageIndex: 0, pageSize: 3, length: 20 };
    if (this.statusCustomer !== 'Customer Status') {
      this.ship = this.shipments.filter(data => data.customerStatus === this.statusCustomer);
      this.onPageChange(event, this.ship);
      this.deleteInput = false;
      this.numPage();
    } else {
      this.ship = this.shipments;
      this.onPageChange(event, this.ship);
      this.deleteInput = true;
      this.store.dispatch({ type: '[Data] Load data begin' });
      this.numPage();
    }

  }

  public editShipment(shipment: any): void {
    const dialogRef = this.dialog.open(ShipmentDialogComponent, {
      width: '1200px',
      height: '500px',
      data: {
        shipmentId: shipment.shipmentId
      }
    });
    dialogRef.afterClosed().subscribe(() => { });
  }

}
