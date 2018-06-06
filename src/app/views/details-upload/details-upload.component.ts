import { Component, OnInit, Input } from '@angular/core';
import { Fileupload } from '../../model/fileupload';

@Component({
  selector: 'app-details-upload',
  templateUrl: './details-upload.component.html',
  styleUrls: ['./details-upload.component.css']
})
export class DetailsUploadComponent implements OnInit {

  @Input() fileUpload: Fileupload;

  constructor() { }

  ngOnInit() {
  }

}
