const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//setting heroku and default port
const port = process.env.PORT || 3000;

var app = express();

//registering Partials
hbs.registerPartials(__dirname+'/views/partials');
//using handlebars i.e., set handlebars
app.set('view engine','hbs');

//middleware for logging
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now} : ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log + '\n', (err)=>{
		if(err){
			console.log('Unable to append to server log');
		}
	});
	next();
});

// app.use((req,res,next) => {
// 	res.render('project.hbs', {
// 		projectPage: 'Some text about'
// 	});
// 	next();
// });
//middlewar without next(); 
// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// })

//middleware for static content like help
app.use(express.static(__dirname+'/public'));

//registering hbs helpers
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})

//Route handlers
app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		pageBody: 'Home Page Body',
		welcomeMessage: 'Welcome User',
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs',{
		pageTitle: 'About Page',
		pageBody: 'About Page Body',
	});
});

app.get('/project', (req, res) => {
	res.render('project.hbs', {
		projectPage: 'Some text about projects'
	})
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to load page',
		status:'ENOTFOUND'
	});
});

//bind app to machine
app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});


