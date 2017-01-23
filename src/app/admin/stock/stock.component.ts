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
  i = 0;
  displayDialog: boolean;
  displayImageDialog: boolean;
  uploadURL = 'http://test.fr';

  constructor(private _drinkService: DrinkService) {
    this.displayDialog = false;
    this.displayImageDialog = false;
  }

  ngOnInit() {
    this._drinkService.fetch().subscribe((drinks) => {
      this.drinks = drinks;
    });
  }

  editDrink(event) {
    this._drinkService.update(event.data).catch(error => alert(error));
  }

  addImage(drink) {
    this.displayImageDialog = true;
  }

  showDialogToAdd() {
    this.drink = new Object();
    this.displayDialog = true;
    this.i = this.i + 1;
    this.uploadURL = 'http://autrechose' + this.i + '.fr';
  }

  save() {
    if (this.drink) {
      this._drinkService.create(this.drink).catch(error => alert(error));
      this.drink = null;
      this.displayDialog = false;
    }
  }

  onUpload(event) {
    console.log(event);
    this.saveImage();
  }

  saveImage() {
    this.displayImageDialog = false;
  }

  deleteImage(drink) {
    console.log(drink.photo);
  }
}
