 import { Poi } from "../models/poi.js";
// import { Profile } from "../models/profile.js";
// import { Itinerary } from "../models/itinerary.js";
import axios from 'axios';

function mapPlaceToPoi(placeData) {
  const poiData = {
    place_id: placeData.id,
    name: placeData.displayName.text,
    business_status: placeData.business_status,
    formatted_address: placeData.formattedAddress,
    international_phone_number: placeData.internationPhoneNumber,
    national_phone_number: placeData.nationalPhoneNumber,
    openingHours: placeData.regularOpeningHours.weekdayDescriptions,
    rating: placeData.rating,
    website: placeData.websiteUri,
    serves_beer: placeData.serves_beer,
    serves_lunch: placeData.serves_lunch,
    serves_dinner: placeData.serves_dinner,
    serves_wine: placeData.serves_wine,
    price_level: placeData.price_level,
    reservable: placeData.reservable,
    types: placeData.types,
    summary: placeData.editorial_summary
  };

  return poiData;
}

async function fetchPlace(place_id) {
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

  try {
    let result = await axios.get(`https://places.googleapis.com/v1/places/${place_id}?fields=${placeFields.join(",")}&key=${GOOGLE_MAPS_API_KEY}`);
    const poiData = mapPlaceToPoi(result.data);
    const poi = await Poi.create(poiData);
    return poi;
  } catch (err) {
    throw new Error(err);
  }
}

async function getPlace(req,res) {
  const place_id = req.params.place_id;
  try {
    const poi = await Poi.findOne({ place_id: `${place_id}` });
    if (poi) {
      res.status(200).json(poi);
    } else {
      const place = await fetchPlace(place_id);
      res.status(200).json(place);
    }  
  } catch (err) {
    res.status(500).json({message: 'error fetching place', error: `${err}`});
  }
}




export { fetchPlace, getPlace }
