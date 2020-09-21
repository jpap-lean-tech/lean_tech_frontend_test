import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-shipment-filter',
  templateUrl: './shipment-filter.component.html',
  styleUrls: ['./shipment-filter.component.scss']
})
export class ShipmentFilterComponent implements OnChanges {
  private filterStatus: string;
  @Input() get filter() { // this variable get return string about filter;
    return this.filterStatus;
  }
  set filter(val: string) { // this Output emit event to father with string for the filter;
    this.filterStatus = val;
    this.changed.emit(this.filter);
  }
  @Input() deleteInput: boolean;
  @Output() changed = new EventEmitter<string>();
  constructor() { }

  /**
   * Detect changes and clean to search
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.deleteInput) {
      this.filter = '';
    }
    this.deleteInput = this.deleteInput;
  }

}

