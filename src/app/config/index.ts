export const GIT_CONFIG = {
  // Current User Credentials.
  token: "%GITHUB_PERSONAL_ACCESS_TOKEN%",
  currentUsername: '%GITHUB_USERNAME%',

  // Git Base Url
  baseUrl: 'https://api.github.com/',

  // Info about the repo which you want to see.
  username: '%Target repository owner username%',
  repo: '%Target repository%',

  //Pagination
  itemsPerPage: 10
}
export const API_MAPPING = {
  FETCH_FORKS: 'repos/REPLACE_USERNAME/REPLACE_REPO/forks',
  GET_FORKS_COUNT: 'repos/REPLACE_USERNAME/REPLACE_REPO',
  FOLLOWING_USER: 'users/REPLACE_CURRENT_USERNAME/following/REPLACE_TARGET_USERNAME',
  FOLLOW_USER: 'user/following/REPLACE_TARGET_USERNAME',
  UN_FOLLOW_USER: 'user/following/REPLACE_TARGET_USERNAME'
}