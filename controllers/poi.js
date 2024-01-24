// import { Poi } from "../models/poi.js";
// import { Profile } from "../models/profile.js";
// import { Itinerary } from "../models/itinerary.js";
import axios from 'axios';

function getPlace(req,res) {
  const place_id = req.params.place_id;
  const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
  
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

  console.log('place_id: ', place_id);
  console.log('GOOGLE_MAPS_API_KEY: ', GOOGLE_MAPS_API_KEY);

  axios.get(`https://places.googleapis.com/v1/places/${place_id}?fields=${placeFields.join(",")}&key=${GOOGLE_MAPS_API_KEY}`)
  .then((result) => {
    res.status(200).json(result.data);
  })
  .catch ((err) => {
    res.status(501).json({message:'error fetching place details', error:`${err}`});
  });
}







export { getPlace }
