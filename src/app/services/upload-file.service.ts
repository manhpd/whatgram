import { Injectable, ElementRef } from '@angular/core';
import { environment } from 'environments/environment';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { FileUpload } from '../model/file-upload';

import { Http, Response, RequestOptions, Headers} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Progress } from './progress.service';

const API_URL = environment.photoApiUrl;

@Injectable()
export class UploadFileService {
  public progressPercentage = 0;
  public progress = new Progress;
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

  public getAllPhotos(): Observable<FileUpload[]> {
    return this.http
      .get(API_URL)
      .map(response => {
        const photos = response.json();
        return photos.map((fileUpload) => new FileUpload(fileUpload.name,fileUpload.uploadedUser,fileUpload.url,fileUpload.Description));
      })
      .catch(this.handleError);
  }

  constructor(private http : Http) { }

  public uploadPhotoDB(photo: FileUpload):Promise<any>{
    console.log(photo);
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

  uploadfile(file)  {
    const params = {
      Bucket: 'serverlessimageresize-imagebucket-asjv83zdnqub',
      Key: this.FOLDER + file.name,
      Body: file,
      ACL: 'public-read'
    };
    this.progress.status = 'doing';
    this.getS3Bucket().upload(params).on('httpUploadProgress', function(progress) {
      this.progressPercentage = Math.round((progress.loaded * 100.0) / progress.total);
  /* LINE 1 */ console.log(this.progressPercentage);
  }).send(function(err, data) {
      console.log("FINISHED");
      this.progress.status = 'concluded';
      if (err) {
          console.log(err.message);
          return false;
      } else {
         
          console.log('File Uploaded Successfully');
      }
  });

      
  }

  getFiles(): Observable<Array<FileUpload>> {
    const fileUploads = new Array<FileUpload>();

    const params = {
      Bucket: this.BUCKET,
      Prefix: this.FOLDER
    };

    return this.getAllPhotos();
  }
}
