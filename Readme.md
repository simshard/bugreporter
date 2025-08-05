## CES Coding Challenge: Bug Reporter

Clone the repository or download the zip archive and unpack it.

  ` git clone https://github.com/simshard/bugreporter.git`

 # How to run the Laravel backend

 In  a terminal navigate to the project directory `bugreporter` and run these cli commands: 

 - To install all the required packages and dependencies. 
   `composer install`
 - Next run this command 
    `npm install`
 - To create the .env file, run the following command
    `cp .env.example .env`
 - To create the required database file run this command
    `touch ./database/database.sqlite`
 - To generate an application key, run this command
    `php artisan key:generate`
 - To create the  database tables run this command
    `php artisan migrate`
 - Start the webserver and Vite    
    `composer run dev`

Visit http://localhost:8000/ in the browser

# How to run the frontend test suite

 - in the terminal run the command 
    `npx cypress open`
 - Choose your preferred browser for E2E testing and run the spec `bug-reporter-form.cy.js`

