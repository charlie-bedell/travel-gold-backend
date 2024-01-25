 import { Poi } from "../models/poi.js";
// import { Profile } from "../models/profile.js";
// import { Itinerary } from "../models/itinerary.js";
import axios from 'axios';

function mapPlacetoPoi(placeData) {
  const poiData = {
    place_id: placeData.id,
    name: placeData.displayName.text,
    business_status: placeData.business_status,
    formatted_address: placeData.formattedAddress,
    international_phone_number: placeData.internationPhoneNumber,
    national_phone_number: placeData.nationalPhoneNumber,
    openingHours: placeData.regularOpeningHours.weekdayDescriptions, // todo: does this work?
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

function fetchPlace(req,res) {
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
    console.log('hello there')
    const placeInfo = result.data;
    Poi.create(placeInfo)
    .then((newPlace) => {
    return newPlace
    }) 
    .catch((err) => {
      res.status(500).json({message:'error creating new place', error:`${err}`});
    })
  })
  .catch ((err) => {
    res.status(501).json({message:'error fetching place details', error:`${err}`});
  });
}

function getPlace(req,res){
  const place_id = req.params.place_id
  Poi.findOne({place_id})
  .then((place) => {
    console.log('made it made it')
    if(place) {
      res.status(200).json(place)
    } else {
      console.log('made it')
      fetchPlace(req,res)
      .then ((newPlace) => {
      res.status(200).json(newPlace)
      })
    }
  })
  .catch((err) => {
    res.status(501).json({message:'error getting place', error:`${err}`})
  });
  };






export { fetchPlace, getPlace }
