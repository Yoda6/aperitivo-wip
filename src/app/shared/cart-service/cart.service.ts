import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
import { AuthenticationService } from '../authentication-service/authentication.service';

const DB_NAME = 'carts/cart-';

@Injectable()
export class CartService {

  items: FirebaseListObservable<Array<any>>;
  localItems: Array<any>;

  constructor(private _db: AngularFireDatabase, private _authentService: AuthenticationService) {
    this.items = this._db.list(DB_NAME + this._authentService.user.uid + '/items');
    this.items.subscribe(items => this.localItems = items);
  }

  getItems() {
    return this._db.list(DB_NAME + this._authentService.user.uid + '/items');
  }

  addItem(itemToAdd) {
    const cartItem = {
      'id': itemToAdd.id,
      'name': itemToAdd.name,
      'type': itemToAdd.type,
      'quantity': 1,
      'userName': this._authentService.user.auth.displayName
    };
    for (const item of this.localItems) {
      if (item.id === itemToAdd.id) {
        cartItem.quantity = item.quantity + 1;
        this.items.remove(item);
        break;
      }
    }
    this.items.push(cartItem);
  }

  editCartItem(event) {
    console.log(event.data);
   //  this._drinkService.update(event.data).catch(error => alert(error));
  }

  deleteItem(item) {
    if (item && item.$key) {
      this.items.remove(item.$key);
    }
  }

  deleteCart(items) {
    this._db.object(DB_NAME + this._authentService.user.uid + '/items').remove();
  }
}
