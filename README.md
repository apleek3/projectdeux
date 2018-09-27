# projectdeux - L'Attaque! (Battleship!)
## Overview
Heroku deployed version of the classic Battleship Game! the Rules of Engagement are as follows: 

> Mission Objective
> Your objective is to sink all of your opponent's ships before they can sink all of yours.

> You and your opponent each have five ships:

> Carrier (Five Hits)
> Battleship (Four Hits)
> Cruiser (Three Hits)
> Submarine (Three Hits)
> Destroyer (Two Hits)
> All of your opponent's ships are somewhere on their ocean grid. You will try to hit their ships by selecting coordinates on their grid to fire on. Your opponent will also try to hit your ships by selecting coordinates on your grid. Neither you nor your opponent can see each other's grid, so you must try to guess where each other's ships are. Your display will have two ocean grids – one to display your ship locations and your opponents shots, and one to record your shots at your opponent’s grid.

This App utilize a Model View Controller (MVC) Paradigm for code construction and was made with love by Table 4 of the UC Davis Extension Coding Bootcamp May 2018 Cohort. 

## Requirements & Technologies Overiew
### UCD Ext. Course Project Requirements
* Project must:
  * Use a Node and Express Web Server;
  * Be backed by a MySQL Database an ORM (not necessarily Sequelize);
  * Have both GET and POST routes for retrieving and adding new data;
  * Be deployed using Heroku (with Data);
  * Utilize at least one new library, package, or technology that we haven’t discussed;
  * Have a polished frontend / UI;
  * Have folder structure that meets MVC Paradigm;
  * Meet good quality coding standards (indentation, scoping, naming).
  * Must not expose sensitive API key information on the server, see Protecting-API-Keys-In-Node.md

### Tech Used
* mySQl - for storing user and game results info
* mySQL WorkBench - for interacting with the database
* Firebase - for storing current game information
* Sequelize - for taking care of information Creation, Reading, Updating, and Deletion of information (CRUD)
* node.js - for running and testing our app outside of a browser
* express - for conducting app through ports and connecting our users and servers
* Heroku - for deploying the app to a cloud!
* popper.js - library for handling the numerous poppers we will add to this page [Popper](https://popper.js.org/)
* sparkline.js - a jQuery plugin that generates small inline charts directly to the browser (ICEBOX - added to code) [Sparkline](https://omnipotent.net/jquery.sparkline/#s-about)

## Setup

### To use this application locally:
1. Set up a MySQL database on your machine.  [MySQL](https://dev.mysql.com/downloads/mysql/) 
1. Set up MySQL WorkBench: [MySQL Workbench](https://www.mysql.com/products/workbench/)
1. Set up a new MySQL connection.
1. If you haven't already: clone this repository to your computer
1. Use the attached schema.sql to create a new table; Sequelize will take care of CRUD.
1. Using your terminal: cd to the root of the directory and install the node dependencies -- npm i --
1. In your terminal command line type the following to run the server: -- node server -- 
1. Navigate to localhost:8080 in your browser
1. Follow the link to register a user and play!


### Notes about L'Attaque! (Battleship!)
The app stores the user data you enter and email address and associates it with the game data you produce. The code further tracks your wins losses and hits which can be measured against other players!


#### Detailed example command line codes for getting started: 

    $ git clone https://github.com/apleek3/projectdeux.git
    $ cd --your file path--../projectdeux
    $ npm i
    $ node server



## DEMO
### Want to see a demo of it working? 
### Click here: [Battleship! Video](https://youtu.be/OoJCUN-0H34)

### Want to do it live?
### Click here: [L'Attaque! (Battleship!)](https://lattaque-battleship.herokuapp.com/)



