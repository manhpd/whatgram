import { Injectable, ElementRef } from '@angular/core';
import { environment } from 'environments/environment';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import * as S3async from 'aws-s3-async'
import * as Rekognition from 'aws-sdk/clients/rekognition';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Fileupload } from '../model/fileupload';
import { User } from "../model/user";
import { Customer } from "../model/customer";

import { Http, Response, RequestOptions, Headers} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/toPromise';



import { Progress } from './progress.service';

const API_URL = environment.photoApiUrl;
const API_URL_2 = environment.photoApiUrl2;

var rekognition = new Rekognition( {
  accessKeyId: 'ACCESS_KEY_ID',
  secretAccessKey: 'ACCES_KEY',
  region: 'us-east-2'
});


@Injectable()
export class UploadFileService {
  public progressPercentage = 0;
  public progress = new Progress;
  FOLDER = '';
  BUCKET = 'bucket_name';
 
  public rekognigionLabels : any;

  private getS3Bucket(): any {
    const bucket = new S3(
      {
        accessKeyId: 'Access_key_id',
        secretAccessKey: 'access_key',
        region: 'us-east-2'
      }
    );

    return bucket;
  }

  private getRekog(): any {
    const rekog = new Rekognition(
      {
        accessKeyId: 'Access_key_id',
        secretAccessKey: 'access_key',
        region: 'us-east-2'
      }
    );

    return rekog;
  }

  public getAllPhotos(): Observable<Fileupload[]> {
    return this.http
      .get(API_URL)
      .map(response => {
        const photos = response.json();
       
        return photos.map((fileUpload) => new Fileupload(fileUpload.id,fileUpload.name,fileUpload.uploadedUser,
          fileUpload.url,fileUpload.Description,fileUpload.uploadedUserId));
      })
      .catch(this.handleError);
  }


  public getNewFeedPhotos(followings): Observable<Fileupload[]> {
    console.log(followings);
    return this.http
      .put(API_URL,{"followings":followings})
      .map(response => {
        const photos = response.json()["Items"];
        console.log(response);
        return photos.map((fileUpload) => new Fileupload(fileUpload.id,fileUpload.name,fileUpload.uploadedUser,
          fileUpload.url,fileUpload.description,fileUpload.uploadedUserId));
      })
      .catch(this.handleError);
  }

  

  constructor(private http : Http){ }

  uploadfile(file) : Promise<any>  {
     const params = {
      Bucket: 'serverlessimageresize-imagebucket-asjv83zdnqub',
      Key: this.FOLDER + file.name,
      Body: file,
      ACL: 'public-read'
    };

    // return this.getS3Bucket().upload(params).on('httpUploadProgress', function(progress) {
    //   this.progressPercentage = Math.round((progress.loaded * 100.0) / progress.total);
    //   console.log( this.progressPercentage);
    //   }).send(function(err, data) {
    //       console.log("FINISHED");
    //       if (err) {
    //           console.log(err.message);
    //           return false;
    //       } else {
    //         this.postProgress = 'concluded';
    //         console.log(data);
            
    //           return data;
    //       }
    //   });

    return this.getS3Bucket().upload(params, function(err, data) {
            console.log("FINISHED");
            if (err) {
                console.log(err.message);
                return err;
            } else {
                return data;
            }
        }).promise();
  }

  public getRekognitionData(name) {
    var params = {
      Image: {
       S3Object: {
        Bucket: this.BUCKET, 
        Name: name
       }
      }, 
      MaxLabels: 123, 
      MinConfidence: 70
     };
     return this.getRekog().detectLabels(params, function(err, data) {
       if (err) {
         return err;
       } // an error occurred
       else    {
         console.log(data);
         this.rekognigionLabels = data["Labels"];
         console.log(this.rekognigionLabels);

         return data;
       }          // successful response
     });
  }

  getRekognitionLabels(): Observable<any> {
    return Observable.of(this.rekognigionLabels);
  }
  public uploadPhotoDB(photo: Fileupload):Promise<any>{
    let headers = new Headers();
   
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });
    return this.http.post(API_URL ,photo, options)
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body || {};
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  public getPhotoById(req): Observable<any> {
    return  this.http
      .put(API_URL_2, {"id": req })
      .map(response => {
        console.log(response);
        return response.json();
      })
      .catch(this.handleError);
  }

  
  getFiles(): Observable<Fileupload[]> {
    return this.getAllPhotos();
  }
}
