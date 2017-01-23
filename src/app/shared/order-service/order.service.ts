import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';

const DB_NAME = 'orders';

@Injectable()
export class OrderService {

  constructor(private _db: AngularFireDatabase) {
  }

  fetch() {
    return this._db.list(DB_NAME);
  }

  delete(id) {
   /* return this._http.delete(`${BASE_URL}/api/drinks/${id}`)
      .map( res => res.json() );*/
  }

  deleteOrder(order) {
    this._db.list(DB_NAME).remove(order);
  }
}
