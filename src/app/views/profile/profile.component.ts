import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { UploadFileService } from '../../services/upload-file.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Fileupload } from '../../model/fileupload';
import { User } from '../../model/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Globals } from '../../golbals.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    'userName': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(18) ]),
    'email': new FormControl(null, [ Validators.required, Validators.email, Validators.minLength(10) ]),
    'displayName': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(18) ])
  });
  public user : User;
  firebasuser: Observable<firebase.User>;

 
  constructor(private afAuth: AngularFireAuth, private authService: AuthService, private router: Router, 
    private userService: UserService, private uploadService: UploadFileService, private globals: Globals) {
      
  }

  fileUploads: Observable<Array<Fileupload>>;

  editUser() {
    var params = {
      "id" : this.globals.user.id,
      "email" : this.form.value.email,
      "displayName" : this.form.value.displayName,
      "userName" : this.form.value.userName
    }
    console.log(params);
    this.userService.updateUser(params);
  }
  

  async ngOnInit() {
    
    // Call map on the response observable to get the parsed people object
    // Subscribe to the observabl
   
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

    this.fileUploads = this.uploadService.getNewFeedPhotos([this.globals.user.id]);
    this.user = this.globals.user;
    console.log(this.user);
  }

}
