import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Output('outputToParent') outputToParent = new EventEmitter<string>();
  outputValue: string = '';
  
  filter() {
    this.outputToParent.emit(this.outputValue);
  }

}
