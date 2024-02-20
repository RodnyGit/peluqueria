//modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//app resources
const routes = require('./app/routes/routes');
const { url } = require('./app/config/dataBase');



//DB Connecion
mongoose.set('strictQuery', true);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
	if (err) {
		console.log(err);
	}
	console.log('conectado a MongoDB');
});

//archivos estaticos
app.use(express.static(path.join(__dirname, '/public')));

//settings
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3999);

//middlewares
app.use(express.json());
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.raw({ type: 'image/*', limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(routes);

//starting server
const server = app.listen(app.get('port'), () => {
	console.log('Server en ' + app.get('port'));
});