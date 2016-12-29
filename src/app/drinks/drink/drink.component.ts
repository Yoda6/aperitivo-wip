import { Component, OnInit } from '@angular/core';
import { DrinkService } from '../../shared/drink-service/drink.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.css']
})
export class DrinkComponent implements OnInit {

  private drink = {};

  constructor(
    private _route: ActivatedRoute,
    private _service: DrinkService
  ) { }

  ngOnInit() {
     this._route.params
      .map((params: any) => params.id)
      .flatMap(id => this._service.fetchOne(id))
      .subscribe(drink => this.drink = drink);
  }
}
