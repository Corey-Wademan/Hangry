const exposed = `XSFHjevajVmJP_XNjgTWi7Yh9FUrD5z8i1wPDpjLbSM0nCXAtk5VKCzMnJT5BhylqZJfxqqVbFywGtaOS_4OiLvSPPVtoOE_lximq3t72x0oJv6f89lS3ApF7QEmYHYx`
const Yelp = {
    search(term, location, sortBy) {
      return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, 
      {
        headers: {
          Authorization: `Bearer ${exposed}`,
          "Content-type": "application/json",
        }
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        if (jsonResponse.businesses) {
          return jsonResponse.businesses.map(business => ({
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
          }));
        }
      });
    }
  };

  export default Yelp
