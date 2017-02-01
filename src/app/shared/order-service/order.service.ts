import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2';
import { AuthenticationService } from '../authentication-service/authentication.service';

const ORDERS_DB_NAME = 'orders';
const ORDER_DB_NAME = ORDERS_DB_NAME + '/order-';


@Injectable()
export class OrderService {

  orderObs: FirebaseObjectObservable<any>;
  order: Array<any>;

  constructor(private _db: AngularFireDatabase, private _authentService: AuthenticationService) {
    this.orderObs = this._db.object(ORDER_DB_NAME + this._authentService.user.uid);
    this.orderObs.subscribe(order => this.order = order);
  }

  getOrders() {
    return this._db.list(ORDERS_DB_NAME);
  }

  getOrder() {
    return this._db.object(ORDER_DB_NAME);
  }

  addOrder(items) {
    this.cleanItems(items);
    if (this.order) {
      this.mergeItems(this.order, items);
      this.deleteOrder();
    }
   this.orderObs.set({ 'userName': this._authentService.user.auth.displayName, 'items': items });
  }

  deleteOrder() {
    this.orderObs.remove().catch(error => alert(error));
  }

  private cleanItems(items) {
    for (const item of items) {
      delete item.$exists;
      delete item.$key;
    }
  }

  private mergeItems(oldOrer, items) {
    for (const item of oldOrer.items) {
      let found = false;
      for (const newItem of items) {
        if (item.id === newItem.id) {
          found = true;
          newItem.quantity = newItem.quantity + item.quantity;
          break;
        }
      }
      if (!found) {
        items.push(item);
      }
    }
  }
}
