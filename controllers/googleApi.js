import axios from 'axios';

function getNearbyPlaces(req,res) {
  const { lat, lng, query } = req.query;
  axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=2000&keyword=${encodeURIComponent(query)}&key=${process.env.GOOGLE_MAPS_API_KEY}`).then((response) => {
    res.status(200).json(response.data.results);
  })
  .catch((error) => {
    res.status(500).send('error fetching nearby places');
  });
};

export { getNearbyPlaces }
