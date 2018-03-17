# blahblah.tech

[![build][build-status-badge]][build-status-link]
[![build][codecov-badge]][codecov-link]

<div align="center">
  <p>We can do blahblah about the Programming!</p>
  <h1>🙄&nbsp;🧐&nbsp;🤣&nbsp;🤭</h1>
</div>

## Getting Started

### Prerequisites

Required | Description
--|--
[Git](https://git-scm.com/) | We follow the [GitHub Flow](https://guides.github.com/introduction/flow/)
[Node.js](nodejs.org) | 8.9.4 LTS
[Yarn](https://yarnpkg.com/lang/en/) | 1.5.1
[React](https://reactjs.org/) | 16.2.0

#### Install Node, Yarn

The project manages the version of node through `nvm`

```
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
$ command -v nvm
$ nvm install 8.9.4
$ which node
$ npm install -g yarn
```

In the project root as follows are performed through the `.nvmrc`

```
$ nvm use
Found '/Users/user/Github/blahblah.tech/.nvmrc' with version <8.9.4>
Now using node v8.9.4 (npm v5.6.0)
```

### Yarn Commands

#### Install project

```bash
$ nvm use
Found '/Users/user/Github/blahblah.tech/.nvmrc' with version <8.9.4>
Now using node v8.9.4 (npm v5.6.0)
$ yarn
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

#### Configure hosts

Hosts must be registered in development.

`/etc/hosts`
```
127.0.0.1 dev.blahblah.tech
```

### Continous Integration

This project is testing and generating coverage reports in [Travis CI](https://travis-ci.org/)

```bash
$ yarn install
$ yarn coverage:report
```

## License

```
MIT
```

[build-status-badge]: https://travis-ci.org/blah-blah-tech/blahblah.tech.svg?branch=develop
[build-status-link]: https://travis-ci.org/blah-blah-tech/blahblah.tech

[codecov-badge]: https://codecov.io/gh/blah-blah-tech/blahblah.tech/branch/develop/graph/badge.svg
[codecov-link]: https://codecov.io/gh/blah-blah-tech/blahblah.tech
