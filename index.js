const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var fs = require("fs");
var https = require("https");
const logger = require('morgan');
const pgp = require('pg-promise')();
const cookieParser = require('cookie-parser');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
   
// Allows easy reading a local .env file to import settings
require('dotenv').config();
const {version} = require('./package.json');

const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "SMSC API with Swagger",
        version: version,
        description:
          "This is SMSC site and used to schedule outings and for the Tour de Flatirons",
        contact: {
          name: "Bill Wright",
          url: "https://wwwright.com",
          email: "bill@wwwright.com",
        },
      },
      servers: [
        { url: "http://localhost:4000", },
        { url: "https://smsc-web-app.azurewebsites.net/", },
      ],
    },
    apis: ["./routes/*.js"],
  };

const specs = swaggerJsdoc(options);

const dbConfig = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.POSTGRES_SSL
};
// Connect to database using the above details
const db = pgp(dbConfig);

const app = new express();
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cookieParser());
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );

// Optional since express defaults to CWD/views
// TODO: figure out why this next line doesn't work
// app.set('views', path.join(__dirname, 'views'));
// Path to our public directory
// app.use(express.static('public'));
const staticDir = path.join(__dirname, 'public');
console.log('using this path for static:', staticDir);
app.use(express.static(staticDir));

const ejs = require('ejs');
app.set('view engine', 'ejs');

const port = process.env.EXPRESS_LISTENING_PORT;
// https
//   .createServer(
//     {
//       key: fs.readFileSync("server.key"),
//       cert: fs.readFileSync("server.cert"),
//     },
//     app
//   )
app
  .listen(port, () => {
    console.log(`App listening on port ${port}`);
    console.log(`Go to http://localhost:${port}/`);
});

module.exports = app;

app.get('/', (req, res) => {
    res.render('pages/smsc', {
        title: "Sam's Minions Scrambling Club",
        version: `version: ${version}`,
    });
});

app.get('/tourdeflatirons', (req, res) => {
    res.render('pages/tourdeflatirons', { title: 'Tour de Flatirons' });
});

const rockRouter = require('./routes/rockRoutes');
app.use('/rock', rockRouter(db));

const primeFactorsRouter = require('./routes/primeFactorsRoutes');
app.use('/primeFactors', primeFactorsRouter);
