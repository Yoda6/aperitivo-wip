import { Injectable } from '@angular/core';
import { Http, RequestOptions, ResponseContentType, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2';

const DB_NAME = 'drinks';

// http://blog.angular-university.io/angular-2-firebase/

@Injectable()
export class DrinkService {

  constructor(private _http: Http, private _db: AngularFireDatabase) {
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

  delete(id) {
   /* return this._http.delete(`${BASE_URL}/api/drinks/${id}`)
      .map( res => res.json() );*/
  }

  update(updateDrink) {
    delete updateDrink.$exists;
    delete updateDrink.$key;
    return this.fetchOne(updateDrink.id).update(updateDrink);
  }

  create(person) {
    return this._db.list(DB_NAME).push(person);
  }
}
