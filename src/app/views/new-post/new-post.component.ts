import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as firebase from 'firebase';
import { Progress } from '../../services/progress.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';
import 'rxjs/Rx';
import { NgProgressHttpClientModule } from '@ngx-progressbar/http-client';
import { UploadFileService } from '../../services/upload-file.service';
import { GetUserPhoto } from '../../services/get-user-photo.service';
import { FileUpload } from '../../model/file-upload';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';

import { environment } from 'environments/environment.prod';

import {  Http } from '@angular/http';

import { HttpEventType,HttpResponse } from '@angular/common/http';


import { Injectable, ElementRef } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import 'rxjs/add/observable/of';


import {  Response, RequestOptions, Headers} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { DashboardComponent } from '../dashboard/dashboard.component';
const API_URL = environment.photoApiUrl;

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})

export class NewPostComponent implements OnInit {
  
  public progressPercentage = 0;
  
  FOLDER = '';
  BUCKET = 'serverlessimageresize-imagebucket-asjv83zdnqub';

  private getS3Bucket(): any {
    const bucket = new S3(
      {
        accessKeyId: 'AKIAICDELORXYJAPZJ5A',
        secretAccessKey: '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',
        region: 'us-east-2'
      }
    );

    return bucket;
  }
  
  
  @Output() public updateTimeline: EventEmitter<any> = new EventEmitter();
  public email: string;
  private image: any;
  public postProgress = 'pending';
  public uploadPercent: number;
  public form: FormGroup = new FormGroup({
    'title': new FormControl(null)
  });

  
  selectedFiles: FileList;
  fileUploads: Observable<Array<FileUpload>>;
  users: Observable<User[]>;
  user: Observable<User>;
  photo: Observable<FileUpload>;
  constructor( private progress: Progress, private uploadService: UploadFileService, private dashboard : DashboardComponent) {

  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    });
  }

  upload() { 
    const file = this.selectedFiles.item(0);
    const params = {
      Bucket: 'serverlessimageresize-imagebucket-asjv83zdnqub',
      Key: this.FOLDER + file.name,
      Body: file,
      ACL: 'public-read'
    };
    this.postProgress = 'doing';
    const postProgress = this.getS3Bucket().upload(params).on('httpUploadProgress', function(progress) {
      this.postProgress = 'doing';
      console.log(progress.loaded + " of " + progress.total + " bytes");
      this.progressPercentage = Math.round((progress.loaded * 100.0) / progress.total);
  }).send(function(err, data) {
      console.log("FINISHED");
      if (err) {
          console.log(err.message);
          return false;
      } else {
       
      }
  });
  this.postProgress = 'concluded';
    var photo = new FileUpload(file.name,"manhpd",environment.cropApiUrl + file.name, "sample description");
    this.uploadService.uploadPhotoDB(photo);
    
   
  }
  

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  public publish(): void {
    
   
  }

  public prepareImageUpload(event: Event): void {
    this.image = (<HTMLInputElement>event.target).files;
  }
}
