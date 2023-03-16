const path = require('path');
const expressEdge = require('express-edge');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = new express();

mongoose.connect('mongodb://localhost:27017/blog', {
        useNewUrlParser: true
    })
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err))

app.use(express.static('public'));
app.use('/posts', express.static('public'))

app.use(expressEdge.engine);
app.set('views', __dirname + '/views');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.render('index');
});


app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/pages/about.html');
});

app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
});

app.get('/post', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/post.html'));
});

app.get('/posts/add', (req, res) => {
    res.render('create')
});

app.post('/posts/store', (req, res) => {
    console.log(req.body)
    res.redirect('/')
});


app.listen(5000, () => {
    console.log('App listening on port 5000')
});