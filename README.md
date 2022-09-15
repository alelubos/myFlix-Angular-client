This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.5.

# Project

## Description

MyFlixAngularClient or "TOPFLIX" is a client-side application built with **Angular** and **TypeScript**, that consumes API services from an existing **"myFlix" webserver** (which you can check its repository on GitHub by clicking [here](https://github.com/alelubos/my-flix/)).

Together frontend and backend conform the full-stack application, based on the **MEAN JavaScript stack**, comprised of the following technologies:

- **MongoDB**: a NoSQL database that uses JSON-like documents with optional schemas;
- **Express**: a backend framework for Node.js for building web applications and APIs;
- **Angular**: a TypeScript-based framework from Google for developing single-page applications;
- **Node.js**: a performant JavaScript runtime in the backend;

On top of these, the following dependencies were added to the project:

- **Angular Material**: a modern component-based UI library for Angular that promotes reusability;
- **TypeDoc**: A library to automatically generate documentation based on block comments in the source code for **TypeScript**;

## User Stories

- As a user, I want to be able to receive information on movies, directors, and genres so that I can learn more about movies I’ve watched or am interested in.

  Broken down into smaller user stories:

1. As a registered user visiting the app’s homepage, I should be able to click a link to log in with my credentials, so that I can see/navigate a list of all its movies;
2. As a logged user that sees the list of movies, I should be able to click on a button, so that I can see that movie’s synopsis;
3. As a user that sees a movie’s details view, I should be able to click on a button, so that I can see its director’s details view;
4. As a user that sees a movie’s details view, I should be able to click on a button, so that I can see its Genre’s details view;

- As a user, I want to be able to create a profile so I can save data about my favorite movies.

  Broken down into smaller user stories:

1. As a new user, I should be able to fill a register form, so that I can create an account to use the app.
2. As a logged user, I should be able to access my profile view, so that I can see/edit my information.
3. As a logged user, in the movie view I should be able to click on a movie’s favorite icon, so that I can add / remove the movie from my favorites list.

## Key Features

Upon accessing the [application website](https://alelubos.github.io/myFlix-Angular-client/welcome) users are greeted with a "Welcome" view, in which they can either:

- **SIGN UP** and access a Registration Form to create a new account, or
- **LOG IN** accessing a form to enter their credentials.

Upon log in, the user is presented with a GRID of Movie Cards they can navigate and explore.

On each movie card, users can click on different links to display additional details about the movie like:

- Director's information,
- Genre's information
- The Movie Synopsis
- And even click on the **♡ icon** in order to either add or remove that movie from their list of favorites.

## Some useful commands from the Angular CLI

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
