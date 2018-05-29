import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutes } from './app.routes';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { DetailsUploadComponent } from './views/details-upload/details-upload.component';
import { ProfileComponent } from './views/profile/profile.component';
import { SearchFriendComponent } from './views/search-friend/search-friend.component';
import { HeaderComponent } from './views/header/header.component';
import { NewFeedComponent } from './views/new-feed/new-feed.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import * as firebase from 'firebase/app';

import { AuthService } from './services/auth.service';
import { AuthGuardService } from 'app/services/auth-guard.service';
import { UploadFileService } from 'app/services/upload-file.service';
import { UserService } from 'app/services/user.service'
import { GetUserPhoto } from 'app/services/get-user-photo.service';
import { SettingsComponent } from './views/settings/settings.component';
import { NewPostComponent } from './views/new-post/new-post.component';
import { NgProgressHttpClientModule } from '@ngx-progressbar/http-client';
import { Progress } from './services/progress.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DetailsUploadComponent,
    HeaderComponent,
    ProfileComponent,
    SettingsComponent,
    NewPostComponent,
    NewFeedComponent,
    SearchFriendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    NgProgressHttpClientModule
  ],
  providers: [AuthService, AuthGuardService, UploadFileService, GetUserPhoto, UserService,Progress],
  bootstrap: [AppComponent]
})

export class AppModule { }
