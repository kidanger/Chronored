#!/bin/sh

cd ../drystal
./runner.py repack ../chronored -i -d ../chronored/web
cd ../chronored

git checkout gh-pages || exit

du -sh web
mv web/* .
rmdir web

git commit index.html *compress* *js* *data* -m "update pages"
git push origin gh-pages
git checkout master
