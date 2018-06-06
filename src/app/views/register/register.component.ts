import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FirebaseUser } from '../../model/firebaseUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() public showPanel: EventEmitter<string> = new EventEmitter();
  public form: FormGroup = new FormGroup({
    'email': new FormControl(null, [ Validators.required, Validators.email, Validators.minLength(10) ]),
    'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(18) ])
  });
  constructor( private authentication: AuthService, private router: Router) { 

  }

  ngOnInit() {
  }
  public showPanelLogin() {
    this.router.navigate(['/login']);
  }

  public registerUser(): void {
    const user = new FirebaseUser(
      this.form.value.email,
      "",
      "",
      this.form.value.password,
    );
    console.log(user);
    this.authentication.registerUser(user)
      .then(() => this.showPanelLogin());
  }
}
