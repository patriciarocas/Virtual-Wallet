import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items = [
    "read",
    "write",
    "learn",
    "code"
  ];
   newItem : any;

  constructor() { }

  ngOnInit(): void {
  }

  deleteItem(index: any) {
    this.items.splice(index, 1);
  }

  addItem(newItem: any) {
    if (newItem) {
      this.items.push(newItem);
    }
  }
}
