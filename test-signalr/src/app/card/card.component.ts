import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from "../models/card.model";
import {GraphUserService} from "../shared/graph-user.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() item: Card | undefined;
  @Output() changeAuthor = new EventEmitter<Card>();
  @Input() users: any;
  searchedUsers: any;

  constructor(private graphUserService: GraphUserService) {
  }

  myPlaceholder: string = "Select user"

  ngOnInit(): void {

  }

  onChangeAuthor(item: Card) {
    this.changeAuthor.emit((item))
  }

  selectUser(data: any) {
    console.log(data)
  }

  onSearch(event: any) {
    this.graphUserService.getAllUsers(event.term).subscribe((x: any) => {
      this.users = x.value;
    });
  }
}
