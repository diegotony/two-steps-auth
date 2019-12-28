const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(require('./routes/index'));


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
 
    res.render('index',{ title: 'The index page!' });
 
});

mongoose.connect("mongodb://localhost:27017/two", {
    useNewUrlParser: true
}, (error, res) => {
    if (error) throw error;
    console.log("MONGO IS WORKING ");
});

app.listen(8080);
console.log('8080 is the magic port');