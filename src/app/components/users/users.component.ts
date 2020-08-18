import { GIT_CONFIG } from '../../config/index';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GitApiService } from '../../services/git-api.service';
// import { GIT_CONFIG } from '../../config';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  
  @Input('api') api: string;
  @Input('apiType') apiType: string;
  @Input('count') count: any[] = [];
  @Input('users') users: any[] = [];
  @Input('loader') loader: boolean = false;

  @Output('handlePageChange') handlePageChange = new EventEmitter<number>();

  username: string;
  repo: string;
  page: number = 0;
  itemsPerPage: number = GIT_CONFIG.itemsPerPage || 10;


  constructor(
    private gitApiSrv: GitApiService
  ) { }

  ngOnInit() {
    // this.route.queryParams.subscribe(qp => {
    //   thioute.queryParams.subscribe(qp => {
    //   this.username = qp['username'] || GIT_CONFIG.username;
    //   this.repo = qp['repo'] || GIT_CONFIG.repo;

    //   this.loadData();
    // })s.loadData();
    // })
  }

  loadData() {
    this.page = 0;
    this.users = [];
    this.fetchData();
  }

  fetchData() {
    let srv = this.getService();
    let info: any = this.getInfo();
    info.params = {
      page: this.page
    };
    srv(this.api, {}, info)
    .subscribe(res => {
      console.log("res:: ",res);
      this.users = res;
    }, err => {
      this.users = [];
    })
  }

  onPageChange(page: number) {
    this.page = page;
    this.handlePageChange.emit(page);
  }

  getService() {
    let srv;
    switch(this.apiType) {
      case 'PUT':
        srv = this.gitApiSrv.makePutApiCall;
        break;
      case 'POST':
        srv = this.gitApiSrv.makePostApiCall;
        break;
      default:
        srv = this.gitApiSrv.makeGetApiCall;
        break;
    }
    return srv;
  }

  getInfo() {
    return {
      REPLACE_USERNAME: GIT_CONFIG.username,
      REPLACE_CURRENT_USERNAME: GIT_CONFIG.currentUsername,
      REPLACE_REPO: GIT_CONFIG.repo
    }
  }

}
