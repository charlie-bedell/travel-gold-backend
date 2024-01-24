import { Poi } from "../models/poi.js";
import { Profile } from "../models/profile.js";
import { Itinerary } from "../models/itinerary.js";
import axios from 'axios'

function getPlace(req,res) {
  console.log(process.env.GOOGLE_MAPS_API_KEY)
  console.log(req.params)
  axios.get(`https://places.googleapis.com/v1/places/${req.params.place_id}?fields=id,displayName&key=${process.env.GOOGLE_MAPS_API_KEY}`)
  .then((result) => {
    res.status(200).json({result})
  })
  .catch ((err) => {
    res.status(501).json({message:'error fetching place details', error:`${err}`})
  })
}







export { getPlace }