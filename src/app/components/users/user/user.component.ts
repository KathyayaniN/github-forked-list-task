import { GIT_CONFIG } from '../../../config/index';
import { Component, OnInit, Input } from '@angular/core';
import { GitApiService } from '../../../services/git-api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input('user') user: any;
  @Input('currentUsername') currentUsername: string;

  isFollowingUser: boolean = false;
  loading: boolean = false;

  constructor(
    private gitApiSrv: GitApiService
  ) { }

  ngOnInit() {
    this.followingUser();
  }

  // To check Whether current user is following the target user or not. 
  followingUser() {
    this.loading = true;
    this.gitApiSrv.makeGetApiCall('FOLLOWING_USER', this.getInfo())
    .subscribe(res => {
      this.loading = false;
      this.isFollowingUser = true;
    }, err => {
      this.loading = false;
      this.isFollowingUser = false;
    })
  }

  // Follow user.
  followUser() {
    this.gitApiSrv.makePutApiCall('FOLLOW_USER', {}, this.getInfo())
    .subscribe(res => {
      this.isFollowingUser = true;
    }, err => {
      this.isFollowingUser = false;
    })
  }

  // Unfollow User
  unfollowUser() {
    this.gitApiSrv.makeDeleteApiCall('UN_FOLLOW_USER', this.getInfo())
    .subscribe(res => {
      this.isFollowingUser = false;
    }, err => {
      
    })
  }

  // Current context info.
  getInfo() {
    return  {
      REPLACE_CURRENT_USERNAME: GIT_CONFIG.currentUsername,
      REPLACE_TARGET_USERNAME: this.user.login
    }
  }

}
