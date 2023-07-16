const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var fs = require("fs");
var https = require("https");
const logger = require('morgan');
const pgp = require('pg-promise')();
const cookieParser = require('cookie-parser');
 
// Allows easy reading a local .env file to import settings
require('dotenv').config();

const SELECT_ALL_ROCKS_QUERY = 'select id,name from rock';
const SELECT_ONE_ROCK_QUERY = 'select id,name from rock where id=$1';

const dbConfig = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    ssl: true
};
// Connect to database using the above details
const db = pgp(dbConfig);

const app = new express();
app.use(bodyParser.json());
app.use(logger('dev'));
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

const {version} = require('./package.json');

app.get('/', (req, res) => {
    res.render('pages/smsc', {
        title: "Sam's Minions Scrambling Club",
        version: `version: ${version}`,
    });
});

app.get('/tourdeflatirons', (req, res) => {
    res.render('pages/tourdeflatirons', { title: 'Tour de Flatirons' });
});

app.get('/rock', (req, res) => {
    console.log('Returning all the rocks...');
    db.manyOrNone(SELECT_ALL_ROCKS_QUERY)
        .then(function (data) {
            res.status(200).json({
                allRocks: data,
            });
        })
        .catch(function (error) {
            console.log('Got an error:', error);
            res.status(500).send({
                route: req.path,
                error,
            });
        });
    console.log('Done with this function');
});

app.get('/rocks', (req, res) => {
    console.log('Trying to render rocks page...');
    db.manyOrNone(SELECT_ALL_ROCKS_QUERY)
        .then(function (data) {
            const pageData = {
                user: { name: 'Bill Wright' },
                rocks: data,
            };
            res.render('pages/rocks', pageData);
        })
        .catch(function (error) {
            console.log('Error trying to get rocks from db:', error)
            res.status(500).json({
                route: req.path,
                error: error
            });
        });
});

app.get('/rock2', (req, res) => {
    const selectPromise = db.manyOrNone(SELECT_ALL_ROCKS_QUERY);

    function handleQueryResults(data) {
        res.status(200).json({
            allRocks: data,
        });
    }

    function handleError(error) {
        res.send({
            route: req.path,
            error: error,
        });
    }

    selectPromise.then(handleQueryResults);
    selectPromise.catch(handleError);
});

app.get('/rock/:id', (req, res) => {
    db.one(SELECT_ONE_ROCK_QUERY, req.params.id)
        .then(function (data) {
            res.send(data);
        })
        .catch(function (error) {
            res.status(404).json({
                route: req.path,
                error: error,
            });
        });
    //   res.sendFile(path.resolve(__dirname, "../../public/rock.html"));
});

app.post('/rock', (req, res) => {
    db.one(
        'INSERT INTO rock(name, gps_coordinates) VALUES($1, $2) RETURNING id',
        [req.body.name, req.body.gps_coordinates]
    )
        .then((data) => {
            console.log(data.id); // return created id;
            res.status(201).json({
                id: data.id,
            });
        })
        .catch((error) => {
            console.log('ERROR in post:', error);
            res.status(500);
            if (error.code == 'ECONNREFUSED') {
                const reason = 'Failed to connect to the database';
                console.log(reason);
                // In general, we would never return this information to the client
                res.json({ reason });
            } else {
                res.json({ error });
            }
        });
});

app.delete('/rock/:id', (req, res) => {
    db.result('DELETE FROM rock WHERE id = $1', req.params.id)
        .then((result) => {
            // rowCount = number of rows affected by the query
            console.log(result.rowCount);
            res.status(200).send(); // print how many records were deleted;
        })
        .catch((error) => {
            console.log('ERROR:', error);
        });
});

const primeFactorsRouter = require('./routes/primeFactorsRoutes');
app.use('/primeFactors',primeFactorsRouter);
