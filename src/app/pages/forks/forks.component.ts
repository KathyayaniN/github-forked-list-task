
import { Component, OnInit, Input } from '@angular/core';
import { GIT_CONFIG } from '../../config';
import { ActivatedRoute } from '@angular/router';
import { GitApiService } from '../../services/git-api.service';

@Component({
  selector: 'app-forks',
  templateUrl: './forks.component.html',
  styleUrls: ['./forks.component.scss']
})
export class ForksComponent implements OnInit {

  username: string;
  repo: string;

  page: number = 1;
  forks: any[] = []; 
  forks_count: number = 0;
  loader: boolean = false;
  
  itemsPerPage: number = GIT_CONFIG.itemsPerPage || 10;

  isValidConfig: boolean = false;
  cache = {};


  constructor(
    private route: ActivatedRoute,
    private gitApiSrv: GitApiService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(qp => {
      this.username = qp['username'] || GIT_CONFIG.username;
      this.repo = qp['repo'] || GIT_CONFIG.repo;
      this.loadForks();
    })
  }

  loadForks() {
    this.page = 1;
    this.forks_count = 0;
    this.isValidConfig = this.checkIsValidConfig();

    // Load the data only if it is a valid repository.
    if(this.isValidConfig) {
      this.getForksCount();
      this.fetchRepoForksOfPage();
    }
  }

  checkIsValidConfig() {
    if(this.username.startsWith('%') || this.repo.startsWith('%')) {
      return false;
    }
    return true;
  }

  getForksCount() {
    let currentRepoInfo = this.getCurrentRepoInfo();
    this.gitApiSrv.makeGetApiCall('GET_FORKS_COUNT', currentRepoInfo)
    .subscribe(res => {
      this.forks_count = res['forks'];
    }, err => {
      this.forks_count = 0;
    })
  }

  fetchRepoForksOfPage() {
    // Start the loader.
    this.loader = true;
    let currentRepoInfo: any = this.getCurrentRepoInfo();
    currentRepoInfo.params = {
      page: this.page,
      per_page: this.itemsPerPage
    }

    // Caching the results since GITHUB will have some rate limit.
    let cacheKey = 'FETCH_FORKS:'+this.page;

    if(this.cache[cacheKey]) {
      // Cache Hit. (We already cached the current page data. so we can directly assign that.)
      this.forks = this.cache[cacheKey];

      // Stop the loader
      this.loader = false;
    }else {
      // Cache Miss: We need to make an api call to get the current page results.
      this.gitApiSrv.makeGetApiCall('FETCH_FORKS', currentRepoInfo)
      .subscribe(res => {
        // Store the response into cache.
        this.cache[cacheKey] = res;

        // Stop the loader
        this.loader = false;
 
        // Forks list for the current page.
        this.forks = res;
      }, err => {
        // Stop the loader
        this.loader = false;
        this.forks = [];
      })
    }
  }

  // This will be called whenever page changed.
  handlePageChange(page: number) {
    this.page = page;
    this.fetchRepoForksOfPage();
  }

  getCurrentRepoInfo() {
    return {REPLACE_USERNAME: this.username, REPLACE_REPO: this.repo};
  }

}
