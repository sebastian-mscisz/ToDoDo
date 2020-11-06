## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)

## General info

My next application. It's your typical todo app with minor improvements. Its main goal was to get familiar with the BEM methodology and the basics of the backend website using node.js and express.js. The app allows users to create individual accounts and save their todo list in the cloud. There is also an option to try the application's capabilities in guest mode, but the changes are not saved.

## Technologies

Project is created with:

Front-end

- React version: 16.13.1
- Webpack version: 4.44.1
- React Router Dom version: 5.2.0
- Scss

Back-end

- Node.js
- Express.js: 4.16.1
- mysql version: 2.18.1

## Setup

This project has front-end and back-end sides. U can install only client side to check how the app works using guest mode, or install server side as well to have user registering, logging and task saving to database. To have back-end side working properly u will have to connect it to your database with your credentials. Mind back-end is not my main field of work so it's a simple and quick solution for my needs.

```
To install client side

$ cd ../Tododo/client
$ npm install
$ npm start

To install api side

Create database with tables with example code below
Connect to your database with your credentials in file ./routes/db.js
Then your standard launch with npm.

$ cd ../Tododo/api
$ npm install
$ npm start

Create theses tables in your database to enable user registering, logging and task saving:

>   CREATE TABLE users (
        id int(4) NOT NULL AUTO_INCREMENT,
        login varchar(155) NOT NULL,
        password varchar(155) NOT NULL,
        PRIMARY KEY (id)
    )

>   CREATE TABLE tasks (
        id int(4) NOT NULL AUTO_INCREMENT,
        userId int(4) NOT NULL,
        name varchar(150) NOT NULL,
        dueDate date default=NULL,
        finishDate datetime default=NULL,
        finished tinyint(1) NOT NULL,
        tags varchar(255) NOT NULL,
        PRIMARY KEY (id)
    )
```

You can check the running app here: https://sebastian-mscisz.github.io/ToDoDo/#/
