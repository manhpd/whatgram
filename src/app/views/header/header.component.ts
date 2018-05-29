import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  user = null;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
  }

  ngOnInit() {
  }

  redirectToProfile() {
    this.router.navigate(['profile'])
    
  }

  redirectToSetting() {
    this.router.navigate(['settings'])
    
  }

  refresh() {
    this.router.navigate(['dashboard'])
  }

  search() {
    this.router.navigate(['/search'])
  }
  
}
