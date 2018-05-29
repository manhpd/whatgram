import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable()
export class GetUserPhoto {

  FOLDER = '';

  constructor() { }

  getPhoto() {
    var allImageData = [];
    const bucket = new S3(
      {
        accessKeyId: 'AKIAICDELORXYJAPZJ5A',
        secretAccessKey: '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',
        region: 'us-east-1',
        
      }
    );

    const params = {
      Bucket: 'users-photo'
    };

    bucket.listObjects(params,function (err, data) {
      if (err) {
        console.log(err);
        
      } else {
      allImageData = data.Contents;
     
      }
    });
    
    return allImageData;
  }

}
