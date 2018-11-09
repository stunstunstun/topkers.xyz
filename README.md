# GitHub Jobs Korea

[![build][build-status-badge]][build-status-link]
[![build][codecov-badge]][codecov-link]

<div align="center">
  <p>💬 Talk is cheap, show me the your code 🔍when u get a job</p>
</div>

## Getting Started

### Prerequisites

Required | Description
--|--
[Git](https://git-scm.com/) | We follow the [GitHub Flow](https://guides.github.com/introduction/flow/)
[MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/#install-mongodb-community-edition) | 4.0 or above
[Node.js](nodejs.org) | 10.13.0 LTS or above
[Yarn](https://yarnpkg.com/lang/en/) | Recommend [stable version](https://github.com/yarnpkg/yarn/releases)

### Install MongoDB

The project use MongoDB as documents store

```
$ brew update
$ brew install mongodb
```
> https://docs.mongodb.com/manual/administration/install-community/

### Install Node, Yarn

The project manages the version of node through `nvm`

```
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
$ command -v nvm
$ nvm install 10
$ which node
$ npm install -g yarn
```

In the project root as follows are performed through the `.nvmrc`

```
$ nvm use
Found '/Users/user/Github/blahblah.tech/.nvmrc' with version <10.13.0>
```

### Yarn CLIs

#### Install project

```bash
$ nvm use
...
$ yarn bootstrap
```

#### Workspace info

```bash
$ yarn workspaces info
```

#### Test

```bash
$ yarn test
```

#### Run

```bash
$ yarn dev
```

packages | localhost | environments as production
---|---
server | http://localhost:10080 | https://githubjobs.herokuapp.com/graphql
app | http://localhost:10001 | https://www.githubjobs.xyz/
admin | http://localhost:10000 | https://githubjobs.now.sh/

## References

The repository is collecting data through the links below. Thank you!

- https://www.reddit.com/dev/api/
- https://api.github.com/
- https://github.com/sarojaba/awesome-devblog

## License

```
MIT
```

[build-status-badge]: https://travis-ci.org/stunstunstun/githubjobs.svg?branch=develop
[build-status-link]: https://travis-ci.org/stunstunstun/githubjobs
[codecov-badge]: https://codecov.io/gh/stunstunstun/githubjobs/branch/develop/graph/badge.svg
[codecov-link]: https://codecov.io/gh/stunstunstun/githubjobs
