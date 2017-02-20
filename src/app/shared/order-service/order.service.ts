import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2';
import { AuthenticationService } from '../authentication-service/authentication.service';
import { DrinkService } from '../../shared/drink-service/drink.service';

const ORDERS_DB_NAME = 'orders';
const ORDER_DB_NAME = ORDERS_DB_NAME + '/order-';


@Injectable()
export class OrderService {

  orderObs: FirebaseObjectObservable<any> = null;
  order = null;

  constructor(private _db: AngularFireDatabase, private _authentService: AuthenticationService, private _drinkSevice: DrinkService) {
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
    if (this.order.$exists()) {
      this.mergeItems(this.order, items);
      this.deleteOrder(this.order);
    }
   this.orderObs.set({ 'userName': this._authentService.user.auth.displayName, 'items': items });
  }

  deleteOrder(order) {
    this._db.object(ORDER_DB_NAME + order.$key).remove().catch(error => alert(error));
  }

  validateOrder(order) {
    this.reduceStock(order.items);
    this.deleteOrder(order);
  }

  private cleanItems(items) {
    for (const item of items) {
      delete item.$exists;
      delete item.$key;
    }
  }

  private reduceStock(items) {
    for (const item of items) {
      this._drinkSevice.reduceStock(item);
    }
  }

  private mergeItems(oldOrer, items) {
    for (const item of oldOrer.items) {
      let found = false;
      for (const newItem of items) {
        if (item.id === newItem.id) {
          found = true;
          newItem.quantity = parseInt(newItem.quantity, 10) + parseInt(item.quantity, 10);
          break;
        }
      }
      if (!found) {
        items.push(item);
      }
    }
  }
}
