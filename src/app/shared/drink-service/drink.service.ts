import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';

const DB_NAME = 'drinks';

@Injectable()
export class DrinkService {

  constructor(private _db: AngularFireDatabase) {
  }

  fetch() {
    return this._db.list(DB_NAME);
  }

  fetchOne(id) {
    return this._db.object(`${DB_NAME}/${id}`);
  }

  create(person) {
    return this._db.list(DB_NAME).push(person);
  }

  update(updateDrink) {
    delete updateDrink.$exists;
    delete updateDrink.$key;
    return this.fetchOne(updateDrink.id).update(updateDrink);
  }

  reduceStock(orderedItem) {
    this.fetchOne(orderedItem.id).first().subscribe(drink => {
      drink.stock = drink.stock - orderedItem.quantity;
      if (drink.stock < 0) {
        drink.stock = 0;
      }
      this.update(drink);
    });
  }
}
