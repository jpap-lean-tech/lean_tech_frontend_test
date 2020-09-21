import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';



@Component({
  selector: 'app-shipment-dialog',
  templateUrl: './shipment-dialog.component.html',
  styleUrls: ['./shipment-dialog.component.scss']
})
export class ShipmentDialogComponent implements OnInit {
  public shipment; // data shipment
  public form: FormGroup;  // form
  public tags: string[] = ['status', 'origin', 'zipcode', 'destination']; // this variable work in template for tags;
  public actions: any[] = [
    { name: 'BOL', icon: 'receipt_long' },
    { name: 'Label', icon: 'local_printshop' },
    { name: 'Re-Quote', icon: 'refresh' }
  ]; // this variable work in template for actions
  public formTitle = ['Shipper', 'Consignee', 'Bill on'];
  public startLine = 0;
  public endLine = 226;
  tag;



  constructor(
    public dialogRef: MatDialogRef<ShipmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private store: Store<any>,


  ) { }

  ngOnInit() {
    this.editForm();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
  /**
   * this function brings the data about each shipment, through his id, and fill the form;
   */

  editForm() {
    this.store.subscribe(data => {
      if (data.shipment) {
        this.shipment = data.shipment.find(res => {
          return res.shipmentId === this.data.shipmentId;
        });

      }
      if (this.shipment) {
        const comments = this.shipment.shipper.comments ? this.shipment.shipper.comments : '';
        const addressTwo = this.shipment.shipper.addressTwo ? this.shipment.shipper.addressTwo : '';
        const contact = this.shipment.shipper.contact ? this.shipment.shipper.contact : '';
        const phone = this.shipment.shipper.phone ? this.shipment.shipper.phone : '';
        const fax = this.shipment.shipper.fax ? this.shipment.shipper.fax : '';
        const email = this.shipment.shipper.email ? this.shipment.shipper.email : '';
        const location = this.shipment.shipper.location ? this.shipment.shipper.location : '';
        this.form = this.fb.group({
          companyName: [this.shipment.shipper.companyName, Validators.required],
          address: [this.shipment.shipper.address, Validators.required],
          addressTwo: [addressTwo],
          zipCode: [this.shipment.shipper.zipCode, Validators.required],
          city: [this.shipment.shipper.city, Validators.required],
          state: [this.shipment.shipper.state, Validators.required],
          country: [this.shipment.shipper.country, Validators.required],
          contact: [contact],
          phone: [phone],
          fax: [fax],
          email: [email],
          location: [location],
          comments: [comments]
        });
      }


    });
  }

  /**
   * this function sends information to store and update each shipment;
   */
  onSubmit() {
    this.store.dispatch({ type: '[Data] update data', payload: { form: this.form.value, id: this.shipment.shipmentId } });
    this.onNoClick();
  }

  handlerSvg(index) {
    switch (index) {
      case 1:
        this.startLine = 0;
        this.endLine = 226;
        break;
      case 2:
        this.startLine = 226;
        this.endLine = 452;
        break;
      case 3:
        this.startLine = 452;
        this.endLine = 680;
        break;
    }
  }

  addTag(tag) {
    this.tags.push(tag);
    this.tag = '';
  }

  removeTag(tag) {
    this.tags = this.tags.filter(data => data !== tag);
  }

}
