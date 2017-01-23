import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../cart-service/cart.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items = [];
  ordered = false;

  constructor(private _cartService: CartService) {
  }

  ngOnInit() {
    this.items = this._cartService.getItems();
  }

  setOrder() {
    this._cartService.setOrder();
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
