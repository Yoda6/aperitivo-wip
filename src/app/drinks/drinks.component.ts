import { Component, OnInit } from '@angular/core';
import { DrinkService } from '../shared/drink-service/drink.service';
import 'rxjs/add/operator/mergeMap';

const BASE_URL = 'http://localhost:9000';

@Component({
  selector: 'drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css']
})
export class DrinksComponent implements OnInit {

  dialogStatus = 'inactive';
  drinks = [];
  currentDrinks = [];
  view = 'card';

  constructor(
    private _service: DrinkService
  ) { }

  ngOnInit() {
    this._service.fetch().subscribe((drinks) => {
      this.drinks = drinks;
      this.currentDrinks = drinks;
    });
  }

  switchView() {
    this.view = (this.view === 'card') ? 'list' : 'card';
  }

  filterDrinks(tags) {
    if (!tags || tags.length === 0) {
      this.currentDrinks = this.drinks;
    } else {
      this.currentDrinks = this.drinks.filter(function(drink) {
          let present = false;
          tags.forEach(function(tag) {
            let searched = tag.toLowerCase();
            present = drink.name.toLowerCase().indexOf(searched) !== -1
                      || drink.type.toLowerCase().indexOf(searched) !== -1
                      || drink.country.toLowerCase().indexOf(searched) !== -1;
            if (present) {
              return;
            }
          });
          return present;
      });
    }
  }
}
