import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {GraphUserService} from "../shared/graph-user.service";
import {Profile} from "../models/profile.model";
import {PushNotificationService} from "../shared/push-message.service";
import {UIService} from "../shared/ui.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: Profile | undefined = undefined;

  constructor(private graphUserService: GraphUserService,
              private pushMessageService: PushNotificationService,
              private uiService: UIService ) {
  }

  ngOnInit(): void {
    this.getProfile();
    this.pushMessageService.requestPermission().subscribe(res => {
        console.log(res);
        this.uiService.showNotificationToast(5000, res);
      }
    )
  }

  getProfile() {
    this.graphUserService.decodeToken().subscribe((res: any) => {
      this.profile = res as Profile;
    })
  }
}
