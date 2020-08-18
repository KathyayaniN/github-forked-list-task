# Git Api Integration

## Features

- Get All forked users of a repository
- Follow a user
- Unfollow a user

## Installation

Clone this repository or download this repository as zip.

Move into the cloned repository
```
  $ cd  <currentpath>/git-api-integration
```

Install all dependencies using the command below
```
  $ npm install
```

Get your github `Personal Access Token(PAT)`. Follow this [doc](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) to get your github `PAT`.

Provide configuaration in `src/app/config/index.ts` file.
```
{
  // Your github account info.
  token: "%GITHUB_PERSONAL_ACCESS_TOKEN%",
  currentUsername: '%GITHUB_USERNAME%',

  // Info about the repo which you want to see.
  username: '%Target repository owner username%',
  repo: '%Target repository%',
}
```

Once you are done with configuration run `ng serve` to run application.
