# backend


> git config  
## Git workflow
``` bash
git config core.ignorecase false
git checkout -b branchname dev
git checkout dev
git pull --rebase dev
git checkout -
git rebase dev  
git checkout - 
git merge --no-commit dev
```
> Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ yarn

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn  run build
$ yarn start

# generate static project
$ yarn run generate
```

*Note: Due to a bug in yarn's engine version detection code if you are
using a prerelease version of Node (i.e. v7.6.0-rc.1) you will need to either:
  1. Use `npm install`
  2. Run `yarn` with a standard release of Node and then switch back

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
