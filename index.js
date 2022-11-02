const express = require('express');
const app     = express();
const cors    = require('cors');

const dal     = require('./dal.js');

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {

    const params = req.params;
    // else create user
    dal.create(params.name, params.email, params.password)
        .then((user) => {
            console.log(user);
            res.send(user);
        });
});

app.get('/account/:email', (req, res) => {
    dal.findOne(req.params.email)
        .then(user => {
            console.log(user);
            res.send(user)
        });
});

app.get('/account/update/:email/:amount', (req, res) => {

    const params = req.params;

    dal.update(params.email, parseInt(params.amount))
        .then(user => {
            console.log(user);
            res.send(user);
        });
});

// all accounts
app.get('/account/all', function (req, res) {

    dal.all().
    then((docs) => {
        console.log(docs);
        res.send(docs);
    });
});

const port = 3000;
app.listen(port);
console.log('Running on port:', port);