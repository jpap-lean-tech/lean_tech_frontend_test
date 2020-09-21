import { Component, Input, OnInit } from '@angular/core';
import { ShipmentModel } from 'src/app/models/shipment.model';

@Component({
  selector: 'app-shipment-card',
  templateUrl: './shipment-card.component.html',
  styleUrls: ['./shipment-card.component.scss']
})
export class ShipmentCardComponent implements OnInit {

  @Input() shipment: ShipmentModel; // Input decorator variable shipment is the info for each shipment
  @Input() date;
  public customerRate = 0;
  public carrierRate = 0;
  public customerValidate = 0;

  constructor() { }

  ngOnInit() {
    this.createDate();
    this.validateCustomer();
  }

  /*
  this function create the date for show in template
  */
  private createDate() {
    const dateString = this.shipment.createdDate;
    const splitDate = dateString.split('/');
    this.date = new Date(`${splitDate[1]}/${splitDate[0]}/${splitDate[2]}`);
  }

  /*
  * this function validate the customer rate
  */
  private validateCustomer() {
    if (this.shipment.uplift) {
      const uplift = parseFloat(this.shipment.uplift.value) / 100;
      this.shipment.carrierRate.forEach(element => {
        this.carrierRate += parseFloat(element.charge);
        this.customerValidate +=
          parseFloat(element.charge) + parseFloat(element.charge) * uplift;
      });
    }
    this.shipment.customerRate.forEach(element => {
      if (element.charge) {
        this.customerRate += parseFloat(element.charge.replace(',', '.'));
      }
    });
  }

}
