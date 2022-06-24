import {NgModule} from "@angular/core";
import {MatCardModule} from '@angular/material/card';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatInputModule} from '@angular/material/input';
import {DndModule} from "ngx-drag-drop";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NotificationToastComponent } from './notification-toast/notification-toast.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    MatCardModule,
    DragDropModule,
    MatInputModule,
    DndModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    CommonModule
  ],
  exports: [
    MatCardModule,
    DragDropModule,
    MatInputModule,
    DndModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  declarations: [
    NotificationToastComponent
  ]
})
export class SharedMNodule {
}
