import axios from 'axios';

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

export { getNearbyPlaces }
