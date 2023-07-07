const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const logger = require('morgan');
const pgp = require("pg-promise")();
const cookieParser = require('cookie-parser');

// Allows easy reading a local .env file to import settings
require("dotenv").config();

const SELECT_ALL_ROCKS_QUERY = "select id,name from rock";
const SELECT_ONE_ROCK_QUERY = "select id,name from rock where id=$1";

const dbConfig = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
};
// Connect to database using the above details
const db = pgp(dbConfig);

const app = new express();
app.use(bodyParser.json());
app.use(logger(process.env.MORGAN_LOGGING_OUTPUT_FORMAT));
app.use(cookieParser());

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
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

console.log('After calling listen()...');

app.get("/", (req, res) => {
  res.render('pages/smsc', 
    { 
        title: "Sam's Minions Scrambling Club",
        version: `version: ${process.env.VERSION}`
    });
});

app.get("/tourdeflatirons", (req, res) => {
    res.render('pages/tourdeflatirons', { title: "Tour de Flatirons"});
});

app.get("/rock", (req, res) => {
  console.log("Returning all the rocks...");
  db.manyOrNone(SELECT_ALL_ROCKS_QUERY)
    .then(function (data) {
        res.status(200).json({
            allRocks: data,
          });
    })
    .catch(function (error) {
      // error;
      res.send({
        route: req.path,
        error: error
      })
    });
    console.log('Done with this function');
});

app.get('/rocks', (req, res) => {
    db.manyOrNone(SELECT_ALL_ROCKS_QUERY)
    .then(function (data) {
        const pageData = { 
            user: {name: "Bill Wright"}, 
            rocks: data
        };
        res.render('pages/rocks', pageData);
    })
    .catch(function (error) {
      // error;
      res.send({
        route: req.path,
        error: error
      })
    });
});

app.get("/rock2", (req, res) => {
    const selectPromise = db.manyOrNone(SELECT_ALL_ROCKS_QUERY);

    function handleQueryResults(data) {
          res.status(200).json({
              allRocks: data,
            });
    };

    function handleError(error) {
        res.send({
            route: req.path,
            error: error
          }); 
    };

    selectPromise.then(handleQueryResults);
    selectPromise.catch(handleError);
  });

app.get("/rock/:id", (req, res) => {
    db.one(SELECT_ONE_ROCK_QUERY, req.params.id)
    .then(function (data) {
        res.send(data);
    })
    .catch(function (error) {
      res.status(404).json({
        route: req.path,
        error: error
      });
    });
//   res.sendFile(path.resolve(__dirname, "../../public/rock.html"));
});

app.post('/rock', (req, res) => {
    db.one('INSERT INTO rock(name) VALUES($1) RETURNING id', [req.body.name])
    .then(data => {
        console.log(data.id); // return created id;
        res.send({
            id: data.id
        });
    })
    .catch(error => {
        console.log('ERROR:', error); 
        res.status(500).send({
            error: error
        });
    });
});

app.delete('/rock/:id', (req, res) => {
    db.result('DELETE FROM rock WHERE id = $1', req.params.id)
    .then(result => {
        // rowCount = number of rows affected by the query
        console.log(result.rowCount);
        res.status(200).send(); // print how many records were deleted;
    })
    .catch(error => {
        console.log('ERROR:', error);
    });
})
