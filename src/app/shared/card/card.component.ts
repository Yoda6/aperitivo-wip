import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../cart-service/cart.service';

@Component({
  selector: 'drink-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() drink = {};

  constructor(private _cartService: CartService) {
  }

  ngOnInit() {
  }

  order(drink) {
    this._cartService.addItem(drink);
  }
}
