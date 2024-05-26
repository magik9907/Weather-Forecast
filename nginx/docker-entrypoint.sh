#!/bin/sh
echo "ENVSUBST START"
envsubst '$APP_API_KEY' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf
echo "ENVSUBST END"
nginx -g 'daemon off;'