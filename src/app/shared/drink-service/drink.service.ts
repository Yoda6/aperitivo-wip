import { Injectable } from '@angular/core';
import { Http, RequestOptions, ResponseContentType, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

const BASE_URL: string = 'http://localhost:3000';

@Injectable()
export class DrinkService {

  constructor(private http: Http) {}

  fetch() {
    return this.http.get(`${BASE_URL}/api/drinks`)
      .map( res => res.json() );
  }

  fetchRandom() {
    return this.http.get(`${BASE_URL}/api/drinks/1`)
      .map( res => res.json());
  }

  fetchOne(id) {
    return this.http.get(`${BASE_URL}/api/drinks/${id}`)
      .map( res => res.json() );
  }

  delete(id) {
    return this.http.delete(`${BASE_URL}/api/drinks/${id}`)
      .map( res => res.json() );
  }

  update(person) {
    return this.http.put(`${BASE_URL}/api/drinks/${person.id}`, person)
      .map( res => res.json() );
  }

  create(person) {
    let requestOptions = { headers: new Headers({'Content-Type': 'application/json'})};
    return this.http.post(`${BASE_URL}/api/drinks`, JSON.stringify(person), requestOptions)
      .map( res => res.json() );
  }
}
