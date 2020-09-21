import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() hiddenSidebar = new EventEmitter<boolean>();
  Sidebar = null;

  constructor() { }

  ngOnInit() {
  }

  public showSidebar() {
    this.Sidebar = !this.Sidebar;
    this.hiddenSidebar.emit(this.Sidebar);
  }

}
