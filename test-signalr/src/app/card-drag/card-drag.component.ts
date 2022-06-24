import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from "../models/card.model";

@Component({
  selector: 'app-card-drag',
  templateUrl: './card-drag.component.html',
  styleUrls: ['./card-drag.component.scss']
})
export class CardDragComponent implements OnInit {
  @Input() item: Card | undefined;
  @Output() changeAuthor = new EventEmitter<Card>();
  @Output() dragStart = new EventEmitter<Card>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onChangeAuthor(item: Card) {
    this.changeAuthor.emit((item))
  }

  onDragStart(item: Card) {
    this.dragStart.emit(item);
  }
}
