import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {Component, OnInit} from '@angular/core';
import {CardService} from '../shared/card.service';
import * as signalR from '@microsoft/signalr';
import {Card} from "../models/card.model";
import {environment} from "../../environments/environment";
import {GraphUserService} from "../shared/graph-user.service";
import {PushNotificationService} from "../shared/push-message.service";
import {UIService} from "../shared/ui.service";


@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
})
export class FirstComponent implements OnInit {
  constructor(private cardService: CardService,
              private graphUserService: GraphUserService,
              private pushNotificationService: PushNotificationService,
              private uiService: UIService) {
  }

  todo: Card[] = []
  done: Card[] = []
  noNeed: Card[] = []
  users: any[] = [];

  allCards: Card[] = [];
  currentMessage: any;
  ngOnInit(): void {
    this.graphUserService.getAllUsers('').subscribe((x: any) => {
      this.users = x.value;
    });
    this.cardService.getCard().subscribe(x => {
      this.updateBoard(x);
    });

    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(environment.serverUrl + 'signalRHub')
      .build();

    connection.start().then(function () {
      console.log('SignalR Connected!');
    }).catch(function (err) {
      return console.error(err.toString());
    });

    connection.on("UpdateCardBoard", (x) => {
      this.updateBoard(x);
    });

    connection.on("UpdateCard", (x) => {
      this.allCards.forEach(item => {
        if (item.id === x.id) {
          this.changeValue(item, x)
        }
      })
    });


  this.pushNotificationService.receiveMessage()

  }

  changeValue(item: Card, x: any) {
    item.cardAuthor = x.cardAuthor;
    item.estimateValue = x.estimateValue;
    item.assignedTo = x.assignedTo;
    item.title = x.title;
  }

  _done: Card[] = []
  _todo: Card[] = []
  _noNeed: Card[] = []

  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    this._done = this.done.map((x) => {
      return {
        id: x.id,
        title: x.title,
        order: this.done.indexOf(x),
        type: 1,
        cardAuthor: x.cardAuthor,
        estimateValue: x.estimateValue,
        assignedTo: x.assignedTo
      };
    });
    this._todo = this.todo.map((x) => {
      return {
        id: x.id,
        title: x.title,
        order: this.todo.indexOf(x),
        type: 0,
        cardAuthor: x.cardAuthor,
        estimateValue: x.estimateValue,
        assignedTo: x.assignedTo
      };
    });
    this._noNeed = this.noNeed.map((x) => {
      return {
        id: x.id,
        title: x.title,
        order: this.noNeed.indexOf(x),
        type: 2,
        cardAuthor: x.cardAuthor,
        estimateValue: x.estimateValue,
        assignedTo: x.assignedTo
      };
    });
    let dataToPost = this._done.concat(this._todo);
    dataToPost = dataToPost.concat(this._noNeed);
    this.cardService.updateCard(dataToPost).subscribe(x => {
      this.updateBoard(x);
    });
  }

  onChangeAuthor(item: Card) {
    this.cardService.updateCardInfo(item).subscribe(x => {
      console.log(x);
    })
  }

  updateBoard(x: any) {
    this.allCards = x as Card[];
    this.todo = this.allCards.filter(t => t.type === 0).sort(x => x.order)
    this.done = this.allCards.filter(t => t.type === 1).sort(x => x.order)
    this.noNeed = this.allCards.filter(t => t.type === 2).sort(x => x.order)
  }
}
