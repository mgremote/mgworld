export PATH := node_modules/.bin:$(PATH)
SHELL = /bin/bash
JS = src/client/index.js
JS_OUT = src/public/bundle.js
SCSS = src/scss/style.scss
CSS_OUT = src/public/

build: js css

start: FORCE
	chastifol "make server-watch" "make js-watch" "make css-watch"

migration: FORCE
	sqlmigrate create --name=$(name)

migrate: FORCE
	sqlmigrate

models: FORCE
	sequelize-auto -c sequelize-auto.config.js \
		-u "$(shell node -e 'process.stdout.write(require("config").app.db.username)')" \
		-x "$(shell node -e 'process.stdout.write(require("config").app.db.password)')" \
		-h "$(shell node -e 'process.stdout.write(require("config").app.db.host)')" \
		-d "$(shell node -e 'process.stdout.write(require("config").app.db.database)')" \
		--camel \
		--skip-tables migrations \
		-e mysql -o src/server/models

server: FORCE
	node src/server/index.js

server-watch: FORCE
	nodemon --ignore src/public --ignore src/client src/server/index.js

js: FORCE
	browserify -t babelify $(JS) -o $(JS_OUT)

js-watch: FORCE
	watchify -v --debug -t babelify $(JS) -o $(JS_OUT)

css: FORCE
	node-sass $(SCSS) -o $(CSS_OUT)

css-watch: FORCE css
	node-sass --watch $(SCSS) -o $(CSS_OUT)

test: FORCE
	jest

test-coverage: FORCE
	jest --coverage

test-watch: FORCE
	jest --watch

lint: FORCE
	eslint src/

ci: lint migrate build test-coverage

FORCE:
