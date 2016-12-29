import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'drink-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() drink = {};

  constructor() {
  }

  ngOnInit() {
  }
}
