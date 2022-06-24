import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FirstComponent} from './first/first.component';
import {SecondComponent} from './second/second.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MainPageComponent} from './main-page/main-page.component';
import {SharedMNodule} from './shared/shared.module';
import {CardComponent} from './card/card.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CardService} from './shared/card.service';
import {FormsModule} from '@angular/forms';
import {CardDragComponent} from './card-drag/card-drag.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {MsalInterceptor, MsalModule, MsalRedirectComponent} from "@azure/msal-angular";
import {InteractionType, PublicClientApplication} from "@azure/msal-browser";
import {environment} from "../environments/environment";
import {CommonModule} from "@angular/common";
import {CustomInterceptor} from "./interceptors/custom-interceptor";
import {GraphUserService} from "./shared/graph-user.service";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireMessagingModule} from "@angular/fire/compat/messaging";
import {PushNotificationService} from "./shared/push-message.service";
import {UIService} from "./shared/ui.service";

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

const firebaseConfig = {
  apiKey: "AIzaSyBlEyM7Ygrctm1C21g8Vb8HIYErP363hf4",
  authDomain: "angular-demo-8117d.firebaseapp.com",
  projectId: "angular-demo-8117d",
  storageBucket: "angular-demo-8117d.appspot.com",
  messagingSenderId: "921198445128",
  appId: "1:921198445128:web:67e8225213d56457d0ce7d"
};

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    SecondComponent,
    MainPageComponent,
    CardComponent,
    CardDragComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireMessagingModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    SharedMNodule,
    HttpClientModule,
    FormsModule,

    MsalModule.forRoot(new PublicClientApplication({
      auth: {
        clientId: environment.aad.clientId,
        authority: `https://login.microsoftonline.com/${environment.aad.tenantId}`,
        redirectUri: 'http://localhost:4200'
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE,
      }
    }), {
      interactionType: InteractionType.Redirect, // MSAL Guard Configuration
      authRequest: {
        scopes: ['user.read']
      }
    }, {
      interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
      protectedResourceMap: new Map([
        ['https://graph.microsoft.com/v1.0/me', ['Directory.Read.All']],
        ['https://localhost:7088/api/', [`${environment.aad.clientId}/.default`]],
        ['https://localhost:7088/UserGraph/*', ['Directory.Read.All']]
      ])
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: CustomInterceptor,
    multi: true
  },
    CardService,
    GraphUserService,
    PushNotificationService,
    UIService],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule {
}
