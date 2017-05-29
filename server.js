const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	const now = new Date().toString();
	const LOG = `${now}: ${req.method} ${req.url}`;

	console.log(LOG);
	fs.appendFile('server.log', LOG + '\n', (err) => {
		if (err) {
			console.log('Unable to write to server.log');
		}
	});

	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs', {
// 		pageTitle: 'Maintenance',
// 		welcomeMessage: 'The site is under maintenance - we\'ll be back soon!'
// 	})
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home',
		welcomeMessage: 'Welcome to this node and Express-served, Handlebars rendered, static web page.'
	})
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Something went wrong.'
	})
})

app.disable('etag');
app.listen(3000, () => console.log('Server running on port 3000'));