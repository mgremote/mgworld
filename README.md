# Portfolio for M Guo

Using Node.JS and React

# Usage:

```bash
git clone <repository>
cd <repository>
npm install
make start
```

# CLI

```bash
make build                 - build javascript and css bundles
make migration name=test   - create a new migration
make migrate               - execute all migrations scripts
make models                - generate models from the database
make start                 - start everyting and watch for file changes
make server                - start the server
make server-watch          - start the server and restart it on file changes
make js                    - build javascript bundle
make js-watch              - build javascript bundle and watch for changes
make css                   - build css bundle
make css-watch             - build css bundle and watch for changes
make test                  - run all tests
make test-coverage         - run all tests and calculate code coverage
make test-watch            - run all tests and watch for changes
make ci                    - run the continuous integration script
```

# Database

## Create database and user

```bash
mysql -u root -p -Dmy_app

mysql> create database my_app
mysql> grant all privileges on my_app.* to test@localhost identified by 'test';

## Setting default characters set to utf8mb4

```bash
mysql -u root -p -Dmy_app

mysql> alter schema default character set utf8mb4 collate utf8mb4_unicode_ci;
```

## SQL Modes

Make sure the SQL mode is the same as on QA/Prod servers:

```bash
mysql -u <qa_user> -p -h <qa_host> -P <port> -D<qa_db>

mysql> select @@SESSION.sql_mode;

+--------------------------------------------+
| @@session.sql_mode                         |
+--------------------------------------------+
| <enabled_modes>                            |
+--------------------------------------------+
1 row in set (0.00 sec)
```

```bash
mysql -utest -ptest -Dmy_app
mysql> SET GLOBAL sql_mode = '<enabled modes>';
```

# New Projects

After cloning the repository, run `npm install`. If you wish to use this in
a new project, either unlink it from this project by running:

```bash
rm -rf .git
git init
git add :/
git commit -m 'First commit'
git remote add origin <my-new-repository>
git push origin master
```

or remove the origin remote:

```bash
git remote remove origin
git remote add origin <my-new-repository>
git push origin master
```
