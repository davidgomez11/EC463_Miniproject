# EC463_Miniproject
A simple app that should have secure login and a main function of receiving and plotting temperature and humidity from a sensor

## **Description & Features**
This project is defined as an `Ionic` project, which is basically a hybrid SDK originally built off of `AngularJS` and `
Apache Cordova` (more recent releases are built on `Angular`) which provides the tools and services for developing mobile 
apps using Web technologies like `CSS`, `Sass`, and `HTML5`. 

The app features secure login through `Google Login` and its backend database is a `Firebase Realtime Database`. The 
database is updated through the `sensorValueCreator.py` script which uses the `Firebase Python API: Pyrebase` in order to 
communicate with the database. The app itself also communticates with the database in order to pull certain data values in
order to display these values inside of the pages of the app, through a line graph and chart.

## **Sprints Description**
September 6 - September 10

1. Laid down base plan with tasks on what to implement and when to complete it
2. Researched API's, frameworks to use for project
3. Decided on using Ionic, pairing it with Google Login, and a Firebase database

September 11 - 15

1. Began to implement base app with just a home page with two other pages in a tab format
2. Next implemented Google Login, script to update the Firebase data, and the chart mechanics in order to display 
the temperature data

September 16 - 20

1. Added implementation for displaying both temperature and sensor data, visually and literally (graph , and table)
2. Cleaned up some of the UI
3. Worked on final documenatation

## **Installation Steps**
1. Make sure you have `Ionic` installed on your machine, installation steps for that are found here :
https://ionicframework.com/docs/intro/installation/ .

2. You would then just clone the repository into a folder on your machine like so : `git clone <your-repo-address-here>`

3. Next you would have to `cd` into the new cloned project directory, in order to first download all of the `node_modules`
needed in order to run this project. These modules are based on the versions found in the `package.json` file. You would
run the `npm install` command in order to install all these necessary modules. Once this is done you should notice that 
you now have a `node_modules` directory in your project structure. You would also have to install the libraries needed for 
the `sensorValueCreator.py` script, such as `pyrebase` and `firebase-admin`, through the `pip install ... ` command.

4. After this, you need to serve the app running the `ionic serve` command in terminal. This will create your `www` folder 
and your `build` folder, which are necessary for the project to be treated like an `Ionic` or `Cordova` project.

5. Following that, you are ready to restore the state of the project with the `ionic state restore` command. This will 
restore the platforms and plugins you had installed based on your `package.json` file. Now you should be able to see all
the platforms and plugins that you had previously installed now in oyour project folder.

6. Lastly, you can follow the steps found here https://ionicframework.com/docs/intro/deploying/ in order to run either an
`iOS` or an `Android` build. 


## **Database Design** 
The `Firebase` database schema is as follows below. Each user has a { key : uid , values , temperature : values }.

![image](https://user-images.githubusercontent.com/30166356/45782384-c1c27980-bc30-11e8-93c0-b22c6495f951.png)