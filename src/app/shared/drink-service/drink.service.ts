import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';

const DB_NAME = 'drinks';

// http://blog.angular-university.io/angular-2-firebase/

@Injectable()
export class DrinkService {

  constructor(private _db: AngularFireDatabase) {
  }

  fetch() {
    return this._db.list(DB_NAME);
  }

  fetchRandom() {
    return this._db.object(`${DB_NAME}/1`);
  }

  fetchOne(id) {
   return this._db.object(`${DB_NAME}/${id}`);
  }

  update(updateDrink) {
    delete updateDrink.$exists;
    delete updateDrink.$key;
    return this.fetchOne(updateDrink.id).update(updateDrink);
  }

  create(person) {
    return this._db.list(DB_NAME).push(person);
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
