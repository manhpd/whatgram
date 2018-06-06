import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  ParamMap } from '@angular/router';
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
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-profile',
  templateUrl: './userProfile.component.html',
  styleUrls: ['./userProfile.component.css']
})


export class UserPorfileComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    'userName': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(18) ]),
    'email': new FormControl(null, [ Validators.required, Validators.email, Validators.minLength(10) ]),
    'displayName': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(18) ])
  });
  public user : User;
  public userObs : Observable<User>;
  userId : string;
  firebasuser: Observable<firebase.User>;

 
  constructor(private afAuth: AngularFireAuth, private authService: AuthService, private router: Router, 
    private userService: UserService, private uploadService: UploadFileService, private globals: Globals,
    private route: ActivatedRoute) {
      
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
    this.userObs = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>

         this.userService.getUserById(params.get('id'))
    ));

    this.userObs.subscribe(
      (user) => {
        if (user) {
          console.log(user);
          this.user = user;
          this.fileUploads = this.uploadService.getNewFeedPhotos([this.user.id]);
        }
        else {
          this.user = null;
        }
      }
    );

  
   
    console.log(this.user);
  }

}
