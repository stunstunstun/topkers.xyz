#!/bin/bash

# Configure token
GH_TOKEN=a2591219284bb4379fab010c24c095b038034050

# Build project
. $HOME/.bash_profile
nvm use
yarn && yarn build

# Deploy
pushd packages/app/build
echo 'www.githubjobs.xyz' > CNAME
( git init
 git config user.name "stunstunstun"
 git config user.email "wjdsupj@gmail.com"
 git add .
 git commit -m "Deploy static resources to GitHub Pages"
 git push --force --quiet "https://${GH_TOKEN}@github.com/blah-blah-tech/blah-blah-tech.github.io" master:master > /dev/null 2>&1
)
popd