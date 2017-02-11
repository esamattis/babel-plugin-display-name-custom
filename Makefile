export PATH := node_modules/.bin:$(PATH)
export SHELL := /bin/bash # Required for OS X for some reason

all: deps js

deps:
	yarn install

js:
	NODE_ENV=production webpack -p

js-dev:
	webpack

server:
	python -m SimpleHTTPServer 8080

js-server:
	webpack-dev-server -d --inline --host 0.0.0.0
	

js-watch:
	webpack -d --progress --watch


