import { Component, OnInit , Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UploadFileService } from '../../services/upload-file.service';
import { GetUserPhoto } from '../../services/get-user-photo.service';

import { Observable } from 'rxjs/Observable';
import { Fileupload } from '../../model/fileupload';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';

import {  Http } from '@angular/http';
import { environment } from 'environments/environment.prod';


@Component({
  selector: 'app-new-feed',
  templateUrl: './new-feed.component.html',
  styleUrls: ['./new-feed.component.css']
})

export class NewFeedComponent implements OnInit  {

  selectedFiles: FileList;
  fileUploads: Observable<Array<Fileupload>>;
  users: Observable<User[]>;
  user: Observable<User>;
  photo: Observable<Fileupload>;

  constructor(public authService: AuthService, private uploadService: UploadFileService, 
    private userService: UserService, private http: Http, route: ActivatedRoute) {
        route.params.subscribe(val => {
          this.fileUploads = this.uploadService.getFiles();
      this.users = this.userService.getAllUsers();
        });
      }

  ngAfterViewInit() {
    this.fileUploads = this.uploadService.getFiles();
    this.users = this.userService.getAllUsers();
    // subcribe method here
  }

ngOnInit() {
  this.fileUploads = this.uploadService.getFiles();
  this.users = this.userService.getAllUsers();
  // Call map on the response observable to get the parsed people object
  // Subscribe to the observabl
}
  

}
