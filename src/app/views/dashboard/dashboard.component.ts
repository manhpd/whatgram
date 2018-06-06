import { Component, OnInit , Injectable, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { AuthService } from '../../services/auth.service';
import { UploadFileService } from '../../services/upload-file.service';
import { UserService } from '../../services/user.service';

import { Observable } from 'rxjs/Observable';
import { Customer } from '../../model/customer';
import { Fileupload } from '../../model/fileupload';
import { User } from '../../model/user';


import {  Http } from '@angular/http';
import { environment } from 'environments/environment.prod';
import { Globals } from '../../golbals.component';
import { FollowService } from '../../services/follow.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, OnChanges  {

  selectedFiles: FileList;
  users: Observable<User[]>;
  fileUploads: Observable<Fileupload[]>;
  customers: Observable<Customer[]>;
  user: Observable<User>;
  photo: Observable<Fileupload>;
  followings: string[];
  currentUser: User;
  followingUsers : Observable<any[]>;

   constructor(public authService: AuthService, private uploadService: UploadFileService, 
    private userService: UserService, private http: Http, route:ActivatedRoute, 
    private globals: Globals, private followSvc : FollowService) {
       
      
    }

  async ngOnInit() {
    await this.userService.getUserById(this.globals.user.id).subscribe(
      (user) => {
        if (user) {
          console.log(user);
          this.globals.user.userName = user.userName;
        }
        else {
          this.globals.user = null;
        }
      }
    );
    this.currentUser = this.globals.user;
    await this.followSvc.getUserFollowing(this.currentUser.id)
    .subscribe(async response => {    
     const followings = response.json()["Item"]["followings"]["SS"];  
     this.followings = followings;

     this.fileUploads = await this.uploadService.getNewFeedPhotos(this.followings);
      
     this.followingUsers = await this.followSvc.getFollowingUsers(this.followings, this.currentUser.id);
      console.log(this.followingUsers);
      return  followings;
     });

     
      
    
   
    // Call map on the response observable to get the parsed people object
    // Subscribe to the observabl

  }

  ngOnChanges(){
  
  }

  upload() { 
    const file = this.selectedFiles.item(0);
    this.uploadService.uploadfile(file);
    var photo = new Fileupload("",file.name,this.currentUser.userName,environment.cropApiUrl + file.name, "sample description",this.currentUser.id);
    this.uploadService.uploadPhotoDB(photo);
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  public updateTimeline(): void {
    this.fileUploads = this.uploadService.getFiles();
  }

  
  getPhotoById(id) {
  
    this.photo = this.uploadService.getPhotoById(id);
    console.log(this.photo);
  }
  
  showFiles() {
   
  }
  

}
