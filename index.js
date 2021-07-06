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

/* 
if (response) {
				return response.map(business => ({
					id: business.id,
					imageSrc: business.image_url,
					name: business.name,
					address: business.location.address1,
					city: business.location.city,
					state: business.location.state,
					zipCode: business.location.zip_code,
					category: business.categories[0].title,
					rating: business.rating,
					reviewCount: business.review_count
			}))
		}
*/