#!/usr/bin/env sh

# checkout
git checkout master

# abort on errors
set -e

# build
npm run build --fix

# rename
mv dist/ docs/

# commit changes
git add docs/
git commit -m "Deploy App Build"

# push
git push origin master
