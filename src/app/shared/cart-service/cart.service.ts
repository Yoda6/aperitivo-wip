import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { AuthenticationService } from '../authentication-service/authentication.service';

const DB_NAME = 'orders/order-';

@Injectable()
export class CartService {

  private items: Array<any>;

  constructor(private _db: AngularFireDatabase, private _authentService: AuthenticationService) {
    //this._db.list(DB_NAME + this._authentService.user.uid).subscribe(items => this.items = items);
    this.items = [];
  }

  getItems() {
    return this.items;
  }

  addItem(itemToAdd) {
    let found = false;
    for (const item of this.items) {
      if (item.id === itemToAdd.id) {
        item.quantity++;
        found = true;
        break;
      }
    }
    if (!found) {
      const cartItem = {
        'id': itemToAdd.id,
        'name': itemToAdd.name,
        'type': itemToAdd.type,
        'quantity': 1,
        'userName': this._authentService.user.auth.displayName
      };
      this.items.push(cartItem);
    }
  }

  deleteItem(item) {
    this.items.splice(this.items.indexOf(item), 1);
  }

  setOrder() {
    const order = this._db.object(DB_NAME + this._authentService.user.uid);
    order.set({ 'userName': this._authentService.user.auth.displayName, 'items': this.items });
    this.items = [];
  }
}
