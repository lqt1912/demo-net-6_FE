import {Component, OnInit} from '@angular/core';
import {DndDropEvent} from "ngx-drag-drop";
import {CardService} from "../shared/card.service";
import {Card} from "../models/card.model";

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent implements OnInit {

  constructor(private _cardService: CardService) {
  }

  todo: Card[] = []
  done: Card[] = []
  noNeed: Card[] = []

  ngOnInit(): void {
    this._cardService.getCard().subscribe(x => {

      this.todo = (x as Card[]).filter(t => t.type === 0).sort(x => x.order)

      this.done = (x as Card[]).filter(t => t.type === 1).sort(x => x.order)

    });
  }

  onDragover(event: DragEvent) {

    console.log("dragover", JSON.stringify(event, null, 2));
  }

  onDropToDo(event: DndDropEvent) {

    console.log("dropped", JSON.stringify(event, null, 2));
  }

  onDropDone(event: DndDropEvent) {

    console.log("dropped", JSON.stringify(event, null, 2));
  }

  onChangeAuthor(item: Card) {
    console.log(item)
  }

  onDropNoNeed(event: DndDropEvent) {
    this.noNeed.push(event.data)
    console.log("dropped", JSON.stringify(event, null, 2));
  }

  onMoveCard = (event: Card) => {
    let _a = this.todo.find(x => x.id === event.id);
    if (_a) {
      this.todo = this.todo.filter(x => x.id != event.id);
    }
    console.log("Card move: ", event);
  }
}
