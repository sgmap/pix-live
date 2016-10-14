#! /bin/bash

APP=$1
GIT_CURRENT_BRANCH=`git rev-parse --abbrev-ref HEAD | tr -d "\n"`

[ -z $APP ] && {
    APP=$GIT_CURRENT_BRANCH
}

# Do we have the remote locally ?
`git remote | grep $APP` || {
    # nope, add it
    git remote add $APP dokku@pix-app.ovh:${APP}
} && true

git subtree push --prefix api $APP master


tmpdir=`mktemp -d`
git clone . $tmpdir
pushd $tmpdir
git filter-branch --prune-empty --subdirectory-filter api master
git push $APP --force .

popd
rm -rf $tmpdir

