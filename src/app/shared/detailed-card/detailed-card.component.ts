import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'detailed-drink-card',
  templateUrl: './detailed-card.component.html',
  styleUrls: ['./detailed-card.component.css']
})
export class DetailedCardComponent implements OnInit {

  @Input() drink = {};

  constructor() {
  }

  ngOnInit() {
  }
}
