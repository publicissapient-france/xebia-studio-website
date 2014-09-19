#!/bin/bash
BASEDIR=$(dirname $0)

cd $BASEDIR
open $BASEDIR/dist/index.html
npm run watch
