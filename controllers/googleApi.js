import axios from 'axios';

async function getPlaceInfo(req, res) {
  const placeFields = ['id',
                       'displayName',
                       'rating',
                       'editorialSummary',
                       'regularOpeningHours.weekdayDescriptions',
                       'websiteUri',
                       'business_status',
                       'formattedAddress',
                       'internationalPhoneNumber',
                       'nationalPhoneNumber',
                       'regularOpeningHours',
                       'serves_beer',
                       'serves_breakfast',
                       'serves_lunch',
                       'serves_dinner',
                       'serves_wine',
                       'price_level',
                       'reservable',
                       'types'];
  try {
  const placeId = req.params.placeId;
    let result = await axios.get(`https://places.googleapis.com/v1/places/${placeId}?fields=${placeFields.join(",")}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
    res.status(200).json(result.data);
  } catch (err) {
    res.status(500).json({message: 'unable to fetch place info', error: `${err}`});
  }
}

async function getNearbyPlaces(req,res) {
  const { lat, lng, query } = req.query;
  try {
    console.log('query received: ', req.query);
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=2000&keyword=${encodeURIComponent(query)}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
    res.status(200).json(response.data.results);
  } catch (err) {
    res.status(500).json({message: "Error fetching nearby places", error: `${err}`});
  }
};

export { getNearbyPlaces, getPlaceInfo }
