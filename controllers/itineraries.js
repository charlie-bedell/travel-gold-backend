import { Profile } from "../models/profile.js";
import { Itinerary } from "../models/itinerary.js";

function getItineraryList(req,res) {
Profile.findOne({_id:req.body.profile_id })
  .then((profile) => {
    if(!profile) {
      return res.status(404).json({error:'Profile not found'});
    }
      const itineraryIds = profile.itinerary_ids;
      return Itinerary.find({_id: { $in: itineraryIds }});
  })
  .then((itineraries) => {
    res.json({itineraries});
  })
  .catch((error) => {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error'});
  });
};


function getItineraryInfo(req,res) {
  Profile.findOne({ _id:req.body.profile_id })
  .then((profile) => {
    if(!profile) {
      return res.status(404).json({error:'Profile not found'});
    };
    const itineraryIds = profile.itinerary_ids;
    return Itinerary.findOne({_id: itinerary_id})
  })
  .then((itineraries) => {
    res.json({itineraries})
  })
  .catch((error) => {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error});
  });
};

function createNewItinerary(req,res) {

};

function editItinerary(req,res) {

};

function deleteItinerary(req,res) {

};





export {getItineraryList, getItineraryInfo, createNewItinerary, editItinerary, deleteItinerary}
