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
        question: String,
        answers: [{content: String, correct: Boolean}],
        bundle: String,
    }
);

var score = new mongoose.Schema({
    user: String,
    score: Number,
    numOfQuestions: Number,
    bundles: [String],
});
mongoose.model('quiz', quiz);
mongoose.model('score', score);

//mongoose.model('quiz').create(quiz);
//mongoose.model('score').create(score);


baucis.rest('quiz');
baucis.rest('score');


//app.use(keycloak.protect(['admin', 'user']));
app.use('/api', keycloak.protect(['admin', 'user']), baucis());

/* Serve static files */
const path = require('path');
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/build/index.html'));
});

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`Server listening on port: ${PORT}`);
});
