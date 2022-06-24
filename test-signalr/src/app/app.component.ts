import {Component, Inject, OnInit} from '@angular/core';
import {MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService} from "@azure/msal-angular";
import {Subject} from "rxjs";
import {filter, takeUntil} from 'rxjs/operators';
import {InteractionStatus, RedirectRequest} from "@azure/msal-browser";
import {GraphUserService} from "./shared/graph-user.service";
import {PushNotificationService} from "./shared/push-message.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'test-signalr';

  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
              private broadcastService: MsalBroadcastService,
              private authService: MsalService,
              private userGraphService: GraphUserService,
              private pushMessageService: PushNotificationService) {

  }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;
    this.broadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {

        console.log("Login success");

        this.setLoginDisplay();
      })

  }

  login() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
    this.pushMessageService.requestPermission().subscribe(token => {
      if (token) {


        this.userGraphService.registerToken(token).subscribe(response => {
          console.log(response);
        })
      }
    })
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  logout() { // Add log out function here

    this.pushMessageService.requestPermission().subscribe(token => {
      if (token) {
        this.userGraphService.removeToken(token).subscribe(response => {

          this.authService.logoutRedirect({
            postLogoutRedirectUri: 'http://localhost:4200'
          })
        })
      }
    })

  }
}
