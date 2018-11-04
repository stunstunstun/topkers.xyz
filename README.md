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
[Node.js](nodejs.org) | 10.13.0 LTS
[Yarn](https://yarnpkg.com/lang/en/) | 1.12.1

### Install Node, Yarn

The project manages the version of node through `nvm`

```
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
$ command -v nvm
$ nvm install 10.13.0
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
$ yarn start
```

## License

```
MIT
```

[build-status-badge]: https://travis-ci.org/stunstunstun/githubjobs.svg?branch=develop
[build-status-link]: https://travis-ci.org/stunstunstun/githubjobs

[codecov-badge]: https://codecov.io/gh/stunstunstun/githubjobs/branch/develop/graph/badge.svg
[codecov-link]: https://codecov.io/gh/stunstunstun/githubjobs
