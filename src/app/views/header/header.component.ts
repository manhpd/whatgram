import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../../model/user';
import { SearchFriendComponent } from '../search-friend/search-friend.component';
import { FollowService} from '../../services/follow.service';
import { FirebaseUser } from '../../model/firebaseUser';
import { AngularFireAuth } from 'angularfire2/auth';
import { Globals } from '../../golbals.component';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

  searchUsers : Observable<User[]>;
  private searchUsersResults : User[];
  isFollowing: boolean;
  followings: string[];
  public form: FormGroup = new FormGroup({
    'search': new FormControl(null, [ Validators.required, Validators.email, Validators.minLength(10) ])
  });
  public currentUser : User;
  firebasuser: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private authService: AuthService, private router: Router, private userService: UserService,
    private route:ActivatedRoute, private followSvc : FollowService, private global : Globals) {
      this.firebasuser = afAuth.authState;
  }

  ngOnInit() {
    this.currentUser = this.global.user;
    console.log(this.currentUser);
  }

  getSearchUsers() {
    return this.searchUsersResults;
  }

  redirectToProfile() {
    this.router.navigate(['profile'])
    
  }

  redirectToSetting() {
    this.router.navigate(['settings'])
    
  }

  refresh() {
    this.router.navigate(['/dashboard'])
  }

  
  search() {
    
    this.followSvc.getUserFollowing(this.currentUser.id)
    .subscribe(response => {    
     const followings = response.json()["Item"]["followings"]["SS"];  
     this.followings = followings;
      console.log(followings);
      return  followings;
     });
    var params = {
      "search" : this.form.value.search,
      "id" : this.currentUser.id
    }
    
    this.searchUsers = this.userService.searchUsers(params);
    console.log(this.searchUsers);
    
  }

  refreshSearch() {

    this.followSvc.getUserFollowing(this.currentUser.id)
    .subscribe(response => {    
     const followings = response.json()["Item"]["followings"]["SS"];  
     this.followings = followings;
      
    });
  }


  async toggleFollow(userId) {
    
    console.log(userId);
    const currentUserId = this.currentUser.id;
    await this.followSvc.follow(currentUserId, userId);
    this.search();
   
  }

  async toggleUnFollow(userId) {
    console.log(userId);
    const currentUserId = this.currentUser.id;
    await this.followSvc.unfollow(currentUserId, userId);
    this.search();
  }

  includes(userId){
    if (this.followings){
      return this.followings.includes(userId);
    }
     else return false;
  }
  
  logout() {
    this.authService.logout();
  }
}
