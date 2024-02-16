var express = require('express');
var app = express();

app.get('/', (req, res) => {
	res.render('login');
});
app.get('/createUser', (req, res) => {
	res.render('createUser');
});
app.get('/adminPanel', (req, res) => {
	res.render('adminPanel');
});
app.get('/userPanel', (req, res) => {
	res.render('userPanel');
});

app.use(require('./userRouter'));

module.exports = app;
