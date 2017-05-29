const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
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

app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		pageTitle: 'Projects',
		welcomeMessage: 'Welcome to the projects page. There would be projects here, if it were a real website.'
	})
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Something went wrong.'
	})
});

app.disable('etag');
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Add projects page
// Add a link to the nav for the projects page
// 