import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { ShipmentDialogComponent } from 'src/app/shared/shipment-dialog/shipment-dialog.component';
import swal from 'sweetalert2';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';



@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.scss'],
  animations: [
    trigger('cardAnimation', [
      // Transition from any state to any state
      transition('* => *', [
        // Initially the all cards are not visible
        query(':enter', style({ opacity: 0 }), { optional: true }),

        // Each card will appear sequentially with the delay of 300ms
        query(':enter', stagger('200ms', [
          animate('.5s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-50%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(-10px) scale(1.1)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ]))]), { optional: true }),

        // Cards will disappear sequentially with the delay of 300ms
        query(':leave', stagger('200ms', [
          animate('500ms ease-out', keyframes([
            style({ opacity: 1, transform: 'scale(1.1)', offset: 0 }),
            style({ opacity: .5, transform: 'scale(.5)', offset: 0.3 }),
            style({ opacity: 0, transform: 'scale(0)', offset: 1 }),
          ]))]), { optional: true })
      ]),
    ]),
  ]
})
export class ShipmentListComponent implements OnInit {

  public shipments; // data cargada del store
  public currentItemsToShow; // itera los shipmenmts
  public longitud: number; // longitud para el paginador
  public arrayPaginator = [0]; // array con opciones para el paginador
  public pageSize; // tamaño que muestra el paginador
  public ship; // filtra los status
  public statusList: any[] = []; // es el select de los status
  public statusName = 'Status'; // el valor que se muestra en el select
  public deleteInput; // limpia el search
  public customerStatus; // las options del select customerStatus
  public statusCustomer = 'Customer Status'; // valor que muestra el select;

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

  /**
   * this function handler the events to paginator;
   */
  public onPageChange($event, ship = this.shipments) {
    this.pageSize = $event.pageSize;
    if (ship) {
      this.longitud = ship.length;
      this.currentItemsToShow = ship.slice(
        $event.pageIndex * $event.pageSize,
        $event.pageIndex * $event.pageSize + $event.pageSize);
    }
  }

  /**
   * this function create the array fot paginator;
   */
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

  /**
   * this function handler the filter for words;
   */
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


  /**
   * this function populate the values for select filters;
   */
  private populateFilters() {
    const statusFilter = ['Status'];
    const customerStatus = ['Customer Status'];
    if (this.shipments) {
      this.shipments.forEach(element => {
        customerStatus.push(element.customerStatus);
        element.trackingDetails.forEach(data => {
          statusFilter.push(data.status);
        });
      });
    }
    const newStatus = new Set(statusFilter);
    const uniqueStatus = Array.from(newStatus);
    this.statusList = uniqueStatus;
    const customerStatusSet = new Set(customerStatus);
    const uniqueCustumerStatus = Array.from(customerStatusSet);
    this.customerStatus = uniqueCustumerStatus;
  }


  /**
   * this function handler the the filter for status;
   */
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

  /**
   * this function handler the filter for the customerStatus;
   */
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

  /**
   * this function open the modal;
   */
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
