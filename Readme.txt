Install NODE.js
================
1. Download nodejs from https://nodejs.org
2. Install the downloaded file in the default way if you don't want to customize it.
3. Create a folder for your project.
4. Open commandline in your project directory.
5. Create package.json file inside your folder by typing npm init
6. Answer couple of questions(name of our app: Form manipulations, Version: 1.0.0, description: Simple form with database, entry point: app.js(your wish), etc.)
Install Dependencies
=====================
1. You can install them one by one in the command line by adding npm install express --save,  npm install body-parser --save, etc
2. Or you can add them in the package.json file by creating an object called 'dependencies' and specify the things we needed and allow npm to install all of them together automatically.
	"dependencies":{
		"express": "*",  /* if you don't know the latest version*/
		"body-parser": "*"
	}

	then npm install
Starting the Project
=====================
1. Create the entry file as mentioned in the package.json(here it's 'app.js').
2. Import the required files in app.js. Ex: var express = require('express');, var bodyParser = require('body-parser');, etc.
3. To run the project run: node app
4. In browser open: http://localhost:3000/ - You can change your port number as you wish.
Install a Template Engine
==========================
1. npm install ejs
2. ejs is a simple template engine where you can use some HTML and variables.
3. In the middleware statements in app.js the path for the view engine is set to 'views' folder.
4. Partials for separating head and footer from the body
Form Validation - Express Validator
=================== 
1. npm install express-validator
2. Go to https://github.com/ctavan/express-validator to read more about Express Validator
Installing MongoDB
===================
1. Go to https://www.mongodb.com/download-center?jmp=nav#community
2. Download the file and double click. 
3. Better to keep the repository name short.
4. MongoDB is a noSQL database. Data is not stored as tables but as collections. These are JSON objects.
5. Create two folders inside the MongoDB folder called "data" and "log". Inside the "data" folder create another folder called "db". In the "db" folder you will save your databases and in the "log" folder the log details.
6. Open Command prompt as Administrator
7. Open C:\\...whatever...\MongoDB\bin in command line
8. Remember the folders you have created, set the log path and db path.: C:\MongoDB\bin> mongod --directoryperdb --dbpath C:\MongoDB\data\db --logpath C:\MongoDB\log\mongo.log --logappend --install
9. Run mongoDB as a service : C:\MongoDB\bin>net start MongoDB
10. To run the Mongo shell just type 'mongo' in command line within the bin directory
11. Create a new DB for our form. Type : use customerData
12. Create a collection: db.createCollection('users');
13. To insert some data to the collection : db.users.insert([{first_name: 'Jame', last_name: 'Jacob', email:jamjac@gmail.com},{first_name: 'Sam', last_name: 'Jose', email:sam@gmail.com}]);
14. To view the collection: db.users.find()
Connect the database with our project
======================================
1. Install mongoJS: npm install mongojs --save
2. Import it into our project.
3. Connect: var db = mongojs(connectionString, [collections]). - Replace with your connectionString and collection name. In this case var db = mongojs('customerData', ['users']);
4. For more details on inserting and deleting with mongojs visit https://github.com/mafintosh/mongojs