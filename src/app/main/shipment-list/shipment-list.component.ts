import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.scss']
})
export class ShipmentListComponent implements OnInit {

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.store.dispatch({ type: '[Data] Load data begin' });
    this.store.subscribe(data => {
      console.log(data);
    });

  }

}
