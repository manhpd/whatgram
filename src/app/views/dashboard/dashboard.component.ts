import { Component, OnInit , Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { AuthService } from '../../services/auth.service';
import { UploadFileService } from '../../services/upload-file.service';
import { GetUserPhoto } from '../../services/get-user-photo.service';

import { Observable } from 'rxjs/Observable';
import { FileUpload } from '../../model/file-upload';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';

import {  Http } from '@angular/http';
import { environment } from 'environments/environment.prod';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit  {

  selectedFiles: FileList;
  fileUploads: Observable<Array<FileUpload>>;
  users: Observable<User[]>;
  user: Observable<User>;
  photo: Observable<FileUpload>;

  constructor(public authService: AuthService, private uploadService: UploadFileService, 
    private userService: UserService, private http: Http, route:ActivatedRoute) {
      
      
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


  upload() { 
    const file = this.selectedFiles.item(0);
    this.uploadService.uploadfile(file);
    var photo = new FileUpload(file.name,"manhpd",environment.cropApiUrl + file.name, "sample description");
    this.uploadService.uploadPhotoDB(photo);
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  showFiles() {
   
  }
  

}
