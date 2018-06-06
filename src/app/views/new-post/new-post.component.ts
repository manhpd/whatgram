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
import { Fileupload } from '../../model/fileupload';
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
import { Router } from '@angular/router';
import { Rekognition } from 'aws-sdk';
import { Label } from 'aws-sdk/clients/cloudhsm';
import { Labels } from 'aws-sdk/clients/rekognition';
import { Globals } from '../../golbals.component';
const API_URL = environment.photoApiUrl;

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})

export class NewPostComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    'description': new FormControl( )
  });
  public progressPercentage = 0;
  
  FOLDER = '';
  BUCKET = 'serverlessimageresize-imagebucket-asjv83zdnqub';

  private getS3Bucket(): any {
    const bucket = new S3(
      {
        accessKeyId: 'AKIAJ5JKXVT3Q2TIG6NQ',
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
  public rekognitionData: Labels;
  data : Observable<any>;

  


  
  selectedFiles: FileList;
  fileUploads: Observable<Array<Fileupload>>;
  users: Observable<User[]>;
  user: Observable<User>;
  loadedPhoto: Fileupload;
  photo: Observable<Fileupload>;
  constructor( private progress: Progress, private uploadService: UploadFileService, private router: Router
    , private dashboard : DashboardComponent, private globals : Globals) {

  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    });
  }

  async upload() { 
    this.postProgress = "doing";
    const file = this.selectedFiles.item(0);
    await this.uploadService.uploadfile(file);
   
    this.loadedPhoto = new Fileupload("",file.name,this.globals.user.userName,environment.cropApiUrl + file.name,
       "sample description",this.globals.user.id);
    this.uploadService.getRekognitionData(file.name) .on('success', response => {
      console.log(response.data);

      this.rekognitionData = (<Rekognition.DetectLabelsResponse>response.data).Labels;
    }).on('error', err => {
      console.log('Error with Rekognition');
    });;
    
     
    this.photo = Observable.of(this.loadedPhoto);
    this.postProgress = 'concluded';
  }

  async savePhotoDb() {
    this.loadedPhoto.description = this.form.value.description;
    console.log(this.loadedPhoto);
    await this.uploadService.uploadPhotoDB(this.loadedPhoto);
    this.postProgress = "pending";
    this.dashboard.ngOnInit();
  }
 

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  public publish(): void {
    
  }
  refresh() {
    this.dashboard.ngOnInit();
  }

  loadHashTag() {
  
    console.log(this.uploadService.rekognigionLabels);
  }

  public prepareImageUpload(event: Event): void {
    this.image = (<HTMLInputElement>event.target).files;
  }
}
