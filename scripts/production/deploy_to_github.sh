#!/bin/bash

# Configure token
GH_TOKEN=a2591219284bb4379fab010c24c095b038034050

# Build project
. $HOME/.bash_profile
nvm use
yarn && yarn build

# Deploy
pushd packages/blahblah-app/build
echo 'www.blahblah.tech' > CNAME
( git init
 git config user.name "stunstunstun"
 git config user.email "wjdsupj@gmail.com"
 git add .
 git commit -m "Publish static pages"
 git push --force --quiet "https://${GH_TOKEN}@github.com/blah-blah-tech/blah-blah-tech.github.io" master:master > /dev/null 2>&1
)
popd