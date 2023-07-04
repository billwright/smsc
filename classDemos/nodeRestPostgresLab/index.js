const express = require("express");
bodyParser = require('body-parser');
const path = require("path");

const pgp = require("pg-promise")();
require("dotenv").config();

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

const port = process.env.EXPRESS_LISTENING_PORT;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.get("/trail", (req, res) => {
    const sort_by = req.query.sort_by;
    const num = req.query.num;
    query = `SELECT * from trails order by ${sort_by} desc limit ${num}`;
    db.many(query)
        .then(results => {
            res.send({
                results: results
            })
        })
        .catch(error => {
            console.log(error);
            res.status(204).json({
                message: `Did not have ${num} trails`
            });
        })
});

app.post('/trail/:id/review', (req, res) => {
    const user_id = req.body.user_id;
    const contents = req.body.contents;
    const rating = req.body.rating;

    if (!user_id || !contents || !rating) {
        res.status(400).json({
            message: 'user_id, contents, and rating are required'
        });
        return;
    }

    const image_url = req.body.image_url
    const image_caption = req.body.image_caption
    const trail_id = parseInt(req.params.id);

    createReview(user_id, trail_id, contents, rating, image_url, image_caption)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(error => {
            console.log('I got this error', error);
            let errorResult = error;

            if (error.name == 'QueryResultError' && error.result.rowCount == 1) {
                res.status(400);
                errorResult = {reason: 'User already filed a review for this trail'};
            }
            res.json(errorResult);
        })
})

async function createReview(user_id, trail_id, contents, rating, image_url, image_caption) {
    const insertReview = 'insert into reviews (user_id, trail_id, contents, rating) VALUES($1, $2, $3, $4) returning review_id';
    const insertImage = 'insert into images (review_id, image_url, image_caption) VALUES($1, $2, $3) returning image_id';

    // Ensure the user hasn't already created a review for this trail
    const selectReview = 'select review_id from reviews where user_id = $1 and trail_id = $2';
    console.log('Checking for an existing review...', user_id, trail_id);
    await db.none(selectReview, [user_id, trail_id]);

    console.log('inserting into reviews with: ', insertReview);
    console.log('and data', [user_id, trail_id, contents, rating]);

    const {review_id} = await db.one(insertReview, [user_id, trail_id, contents, rating]);

    let image_id = undefined;
    if (image_url) {
        console.log('inserting into images with: ', insertImage);
        console.log('and data', [review_id, image_url, image_caption]);
    
        image_result = await db.one(insertImage, [review_id, image_url, image_caption]);
    }

    return {
        message: 'Data added successfully',
        review_id: review_id,
        image_id: image_result.image_id
    };
}