const express = require('express');

var app = express();

//middleware
app.use(express.static(__dirname+'/public'));

//Route handlers
app.get('/', (req, res) => {
	// res.send('<h1>Hello Express!!</h1>');
	res.send({
		name: 'Rashu',
		age: 28,
		city: 'Mumbai'
	});
});

app.get('/about', (req, res) => {
	res.send('About Page');
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