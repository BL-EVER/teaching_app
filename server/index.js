const express = require('express');
const app = express();
require('dotenv').config();
var bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(morgan('dev'));

app.use(function (req, res, next) {
    console.log(JSON.stringify(req.device.type));
    next()
})

app.post('/', function (req, res) {
    res.send(req.body)
})
app.get('/', function (req, res) {
    res.send(`Hello World from ${req.hostname} on port ${PORT}`)
})

const fibonacci = (num) => {
    if(num < 2) {
        return num;
    }
    else {
        return fibonacci(num-1) + fibonacci(num - 2);
    }
}
app.get('/fibonacci/:fib', function (req, res) {
	const n = fibonacci(parseInt(req.params.fib))
    res.send(n.toString())
})

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`Echo server listening on port: ${PORT}`);
});
