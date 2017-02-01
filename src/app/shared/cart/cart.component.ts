import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../cart-service/cart.service';
import { OrderService } from '../order-service/order.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items = [];
  ordered = false;

  constructor(private _cartService: CartService, private _orderService: OrderService) {
  }

  ngOnInit() {
    this._cartService.getItems()
      .subscribe(items => this.items = items);
  }

  setOrder() {
    this._orderService.addOrder(this.items);
    this._cartService.deleteCart(this.items);
    this.items = [];
    this.ordered = true;
  }

  changeQuantity(item) {
    console.log(item.quantity);
  }

  deleteItem(item) {
    this._cartService.deleteItem(item);
  }
}
