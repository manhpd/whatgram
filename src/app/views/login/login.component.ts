import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  user = null;

  public form: FormGroup = new FormGroup({
    'email': new FormControl(null, [ ]),
    'password': new FormControl(null, [])
  });

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
  }
    signInWithEmailPassword() {
      console.log(this.form);
      this.authService.signInWithEmailPassword(this.form.value.email,this.form.value.password)
      .then((res) => {
          this.router.navigate(['dashboard'])
        })
      .catch((err) => console.log(err));
    }
    signInWithFacebook() {
      this.authService.signInWithFacebook()
      .then((res) => {
          this.router.navigate(['dashboard'])
        })
      .catch((err) => console.log(err));
    }


    signInWithGoogle() {
      this.authService.signInWithGoogle()
      .then((res) => {
          this.router.navigate(['dashboard']);
          
        })
      .catch((err) => console.log(err));
    }

    public showRegisterPanel() {
      this.router.navigate(['register']);
    }



  ngOnInit() {
  }

}
