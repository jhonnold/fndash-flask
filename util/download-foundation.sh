#!/bin/sh
if [ ! -f /usr/share/fn-dash/app/static/foundation-sites-6.5.1/foundation.scss ]
then
  cd /usr/share/fn-dash/app/static
  curl https://codeload.github.com/zurb/foundation-sites/tar.gz/v6.5.1 | tar xvz
  cd /usr/share/fn-dash
fi