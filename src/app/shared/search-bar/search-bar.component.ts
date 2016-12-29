import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Output('searchedTags') searchedTags$;

  tags: Array<String>;
  current: String;

  constructor() {
    this.searchedTags$ = new EventEmitter();
  }

  ngOnInit() {
     if (!this.tags) {
      this.tags = [];
      this.current = '';
    }
  }

  focus() {
    document.getElementById('tagInput').focus();
  }

  keyUp(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.addCurrentToTag();
    } else if (event.keyCode === 8 && this.current.length === 0 && this.tags.length > 0) {
      this.tags.pop();
      this.current = '';
      this.searchedTags$.emit(this.tags);
    }
    return event;
  }

  blur() {
    if (this.current !== '') {
      this.addCurrentToTag();
    }
  }

  deleteTag(tag) {
    let index = this.tags.indexOf(tag);
    this.tags.splice(index, 1);
    this.searchedTags$.emit(this.tags);
  }

  private addCurrentToTag() {
      this.tags.push(this.current);
      this.current = '';
      this.searchedTags$.emit(this.tags);
  }
}
