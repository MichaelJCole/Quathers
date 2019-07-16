#!/bin/bash

REPO=registry.gitlab.com/org/proj
BRANCH=master

# Exit if unsaved changes in repo

if `git status | grep -q "nothing to commit, working tree clean"`; then
  git checkout --quiet $BRANCH || exit 1
else
  echo "ERROR: repo has unsaved changes.  declining to build uncommitted code."
  exit 1
fi

# Build vote SPA and commit to game repo
(cd .. && quasar build || exit 1) || exit 1
# Copy to src-feathers to workaround docker: COPY failed: Forbidden path outside the build context: dist/spa ()
rm -rf public/*
cp -rf ../dist/spa/* public

# build and push Docker image

VERSION=$(node -p -e "require('./package.json').version")-$(git rev-parse --short HEAD)
docker build -t $REPO:$VERSION . || exit 1
# docker push $REPO:$VERSION || exit 1

# Done
echo "==========================================="
echo "BUILT $REPO:$VERSION FOR $BRANCH"
echo ""
echo "Push with a command like this: docker push $REPO:$VERSION"

