import {AngularFireMessaging} from "@angular/fire/compat/messaging";
import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {UIService} from "./ui.service";

@Injectable()
export class PushNotificationService {
  currentMessage = new BehaviorSubject(null);

  constructor(private angularFireMessaging: AngularFireMessaging,
              private  uiService: UIService) {

  }

  requestPermission = () => this.angularFireMessaging.requestToken;

  receiveMessage = () => this.angularFireMessaging.messages.subscribe((message) => { console.log(message); });

  onMessage() {
    this.angularFireMessaging.onMessage(msg =>{
      console.log(msg)
      this.currentMessage.next(msg);
    })
  }
}
