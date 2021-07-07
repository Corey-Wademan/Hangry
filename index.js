const express = require('express')
const PORT = 5001;
const app = express();
require('dotenv').config();
const cors = require('cors');

const yelp = require('yelp-fusion');
const client = yelp.client(process.env.apiKey);

app.use(express.static("client"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(process.env.PORT || PORT); 
console.log(`Server is listening on ${PORT}`); 

// Uses yelp-fusion Api
app.get('/search/:term/:location/:sort_by', (req, res) => {
	const term = req.params.term
	const location = req.params.location
	const sort_by = req.params.sort_by

	client.search({
		term: term,
		location: location,
		sort_by: sort_by
	}).then(response => {
		res.json(response.jsonBody)
	}).catch(error => {
		console.log(error.message);
	})
});

// Serves Statics when app is in production
if(process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'))

	app.get('*', (req, res) => {
			res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	})
}