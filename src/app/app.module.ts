import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { NbThemeModule } from '@nebular/theme';
import { NbEmailPassAuthProvider, NbAuthModule } from '@nebular/auth';
import { MarkdownModule } from 'ngx-markdown';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { FirebaseAuthenticationProvider } from './shared/firebase-authentication.provider';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'checklists'),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbAuthModule.forRoot({
      providers: {
        email: {
          service: FirebaseAuthenticationProvider
        }
      }
    }),
    MarkdownModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
