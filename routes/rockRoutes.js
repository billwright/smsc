/**
 * @swagger
 * components:
 *   schemas:
 *     Rock:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Rock
 *         name:
 *           type: string
 *           description: The name of the particular Flatiron
 *         gps_coordinates:
 *           type: string
 *           description: Location of the rock
 *       example:
 *         name: The Slab
 *         gps_coordinates: 119.123, 44.567
 */

/**
 * @swagger
 * schemes:
 *   - "https"
 *   - "http"
 * tags:
 *   name: Rock
 *   description: The Rock managing API
 * /rock:
 *   post:
 *     summary: Create a new Rock
 *     tags: [Rock]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rock'
 *     responses:
 *       201:
 *         description: The created Rock.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rock'
 *       500:
 *         description: Some server error
 * /Rock/{id}:
 *   get:
 *     summary: Get the Rock by id
 *     tags: [Rock]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Rock id
 *     responses:
 *       200:
 *         description: The Rock response by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rock'
 *       404:
 *         description: The Rock was not found
 *   put:
 *    summary: Update the Rock by the id
 *    tags: [Rock]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Rock id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Rock'
 *    responses:
 *      201:
 *        description: The Rock was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Rock'
 *      404:
 *        description: The Rock was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the Rock by id
 *     tags: [Rock]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Rock id
 *
 *     responses:
 *       200:
 *         description: The Rock was deleted
 *       404:
 *         description: The Rock was not found
 */

const express = require('express');
const rockRouter = express.Router();

const SELECT_ALL_ROCKS_QUERY = 'select id,name from rock';
const SELECT_ONE_ROCK_QUERY = 'select id,name from rock where id=$1';

rockRouter.get('/api', (req, res) => {
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

rockRouter.get('/', (req, res) => {
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

rockRouter.get('/:id', (req, res) => {
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
});

rockRouter.post('/', (req, res) => {
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

rockRouter.delete('/:id', (req, res) => {
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