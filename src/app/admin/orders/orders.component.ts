import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/order-service/order.service';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders = [];
  items = [];

  constructor(private _orderService: OrderService) {
  }

  ngOnInit() {
    this._orderService.getOrders()
      .subscribe(orders => {
        this.orders = orders;
        this.getItemsFromOrders();
      });
  }

  private getItemsFromOrders() {
    this.items = [];
    this.orders.map(order => {
      for (const item of Object.keys(order.items).map(key => order.items[key])) {
        const displayedItem = item;
        displayedItem.order = order;
        this.items.push(displayedItem);
      }
    });
  }

  validateOrder(order) {
    this._orderService.validateOrder(order);
  }
}
