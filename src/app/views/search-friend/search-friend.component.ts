import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Observable } from '@firebase/util';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-search-friend',
  templateUrl: './search-friend.component.html',
  styleUrls: ['./search-friend.component.css']
})
export class SearchFriendComponent implements OnInit {
 
  searchUsers : User[];

  constructor(private authService: AuthService, private router: Router, private userService: UserService, private header: HeaderComponent) {
   this.searchUsers = this.header.getSearchUsers();
  }

  ngOnInit() {
    this.searchUsers = this.header.getSearchUsers();
  }

  setSearchUsers(users) {
    this.searchUsers = users;
  }

}
