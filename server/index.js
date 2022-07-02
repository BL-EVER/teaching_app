const express = require('express');
const app = express();
require('dotenv').config();
var bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
var baucis = require('baucis');
var mongoose = require('mongoose');
const session = require('express-session');

const memoryStore = new session.MemoryStore();

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

const keycloak = require('./keycloakConfig.js').initKeycloak(memoryStore);
app.use(keycloak.middleware());


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/teaching-app');
var quiz = new mongoose.Schema(
    {
        title: String,
        question: String,
        answers: [String],
        correctAnswer: String,
        bundle: String,
    }
);

var score = new mongoose.Schema({
    user: String,
    score: Number,
    answers: [String],
    bundles: [String],
});
mongoose.model('quiz', quiz);
mongoose.model('score', score);

//mongoose.model('quiz').create(quiz);
//mongoose.model('score').create(score);


baucis.rest('quiz');
baucis.rest('score');


app.use(keycloak.protect(['admin', 'user']));
app.use('/api', baucis());

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`Server listening on port: ${PORT}`);
});
