import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnChanges {

  @Input() animationLeft = null;
  showSidebar;

  constructor() { }
  /**
   * detect the changes for open o close sidebar
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.showSidebar = this.animationLeft;
  }

}
