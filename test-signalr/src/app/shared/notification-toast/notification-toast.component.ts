import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatSnackBarRef} from "@angular/material/snack-bar";

@Component({
  selector: 'app-notification-toast',
  templateUrl: './notification-toast.component.html',
  styleUrls: ['./notification-toast.component.scss']
})
export class NotificationToastComponent implements OnInit {

  @Input() data: string = ""

  constructor(public snackBarRef: MatSnackBarRef<NotificationToastComponent>,) {
  }

  ngOnInit(): void {
  }

  close = () => {
    this.snackBarRef.dismiss();
  }
}
