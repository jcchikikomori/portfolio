#!/usr/bin/env sh

# checkout
git checkout master

# abort on errors
set -e

# build
npm run build --fix

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

# COMMIT_MSG = 'Deploy App Build - datetime'
# CURRENTDATETIME=`date +"%Y-%m-%d %T"`

# git init
git add -A
git commit -m 'Deploy App Build'

cd ..

# push `dist` folder
# git subtree split --prefix dist origin -b gh-pages
git subtree push --prefix dist origin gh-pages

# if you are deploying to https://<USERNAME>.github.io
# git push git@github.com:jccultima123/jccultima123.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:jccultima123/portfolio.git master:gh-pages

# delete local branch
git branch -D gh-pages
