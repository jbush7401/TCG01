# TCG01
Trading Card Game

The clone: 
git clone https://github.com/jbush7401/TCG01.git

<h2>Installation</h2>
Grab the repo:

git clone https://github.com/jbush7401/TCG01.git

Install node.js and npm
sudo apt-get install nodejs nodejs-dev npm

Make sure node and npm keywords can be used globally.

In TCG01.WebAPI run <br />
npm install <br />
All packages in package.json should install.

Install knex globally <br />
npm install -g knex

Run all knex migrations: <br />
knex migrate:latest

Run knex seed method: <br />
knex seed:run

You can start the webapi by running node app.js <br />

Test the webapi by pointing Postman or your favorite rest client tester to: <br />
http://localhost:8080/api/card/1 <br />

Or use whatever ID the seed method inserted into the card table. <br />

In TCG01.Client run <br />
npm install <br />
All packages in package.json should install. <br />
You can start the client by running node app.js <br />



The configuration file that this webapi database uses is not included in the repo. If Jason Bush loved you, ask him for it, 
or create your own database and edit the configuration. I run a postgresql db on a ec2 server, I run two separate development and production db environments.
This is the format for my config:

// Update with your config settings.
module.exports = {

  development: {
    client: 'pg',
    connection: {
      host     : '',
      port     : '',
      user     : '',
      password : '',
      database : '',
      charset  : 'UTF8_GENERAL_CI'
    },
    migrations: { tableName: 'knex_migrations'},
    seeds: {directory: './seeds'},
    debug: false
  },

  production: {
    client: 'pg',
    connection: {
      host     : '',
      port     : '',
      user     : '',
      password : '',
      database : '',
      charset  : 'UTF8_GENERAL_CI'
    },
    migrations: { tableName: 'knex_migrations'},
    seeds: {directory: './seeds'},
    debug: false
  }

};
/**
 * Created by jbush_000 on 11/18/2015.
 */


