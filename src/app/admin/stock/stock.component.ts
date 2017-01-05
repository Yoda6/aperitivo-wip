import { Component, OnInit } from '@angular/core';
import { DrinkService } from '../../shared/drink-service/drink.service';

@Component({
  selector: 'stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  drinks = [];
  drink = {};
  displayDialog: boolean;

  constructor(private _drinkService: DrinkService) {
    this.displayDialog = false;
  }

  ngOnInit() {
    this._drinkService.fetch().subscribe((drinks) => {
      this.drinks = drinks;
    });
  }

  editDrink(event) {
    this._drinkService.update(event.data).catch(error => alert(error));
  }

  showDialogToAdd() {
    this.drink = new Object();
    this.displayDialog = true;
  }

  save() {
    if (this.drink) {
      this._drinkService.create(this.drink).catch(error => alert(error));
      this.drink = null;
      this.displayDialog = false;
    }
  }
}
