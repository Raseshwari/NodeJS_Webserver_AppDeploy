const express = require('express');
const hbs = require('hbs');

var app = express();

//using handlebars i.e., set handlebars
app.set('view engine','hbs');
//middleware
app.use(express.static(__dirname+'/public'));

//Route handlers
app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome User',
		currentYear: new Date().getFullYear()
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs',{
		pageTitle: 'About Page',
		currentYear: new Date().getFullYear()
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to load page',
		status:'ENOTFOUND'
	});
});

//bind app to machine
app.listen(3000, () => {
	console.log('Server is up on port 3000');
});