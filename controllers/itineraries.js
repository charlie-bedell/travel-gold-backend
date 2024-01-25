import { Profile } from "../models/profile.js";
import { Itinerary } from "../models/itinerary.js";
import { Poi } from "../models/poi.js";
import mongoose from 'mongoose';

function getItineraryList(req, res) {
  // get list of itineraries by profile_id
  Profile.findOne({_id: req.user.profile })
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


function getItineraryInfo(req, res) {
  // get a singular itinerary by itinerary_id and profile_id
  // if itinerary is public, return it, otherwise, check if its
  // owned by the user, if not, return an error
  
  const itinerary_id = req.params.itinerary_id;
  Profile.findOne({ _id:req.user.profile })
  .then((profile) => {
    if (!profile) {
      return res.status(404).json({error: 'Profile not found'});
    };
    Itinerary.findOne({ _id: itinerary_id })
      .then((itinerary) => {  
        if (!itinerary.isPublic) {
          if (itinerary.profile_id !== req.user.profile) {
            throw new Error('Itinerary is not public and user is not allowed access');
          }
          throw new Error('Itinerary is not public');
        } else {
          // res.status(200).json({ itinerary });
          Poi.find({ place_id: {$in: itinerary.place_ids}}).then((places) => {
            
            const itineraryJson = itinerary.toJSON();
            
            itineraryJson.places = places;
            
            res.status(200).json(itineraryJson);
          }).catch((err) => {res.status(500).json(
            {message: 'unable to populate itin with place_ids', error: `${err}`});});
        }
      });
  })
  .catch((error) => {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: `${error}`});
  });
};

function createNewItinerary(req, res) {
  // creates a new itinerary and adds the id to the user doc that created it
  const profileId = req.user.profile;
  const itineraryBody = req.body;
    
  Itinerary.create({ profile_id: profileId,
                     poi_ids: [],
                     ...itineraryBody})
    .then((itinerary) => {
      const itineraryId = itinerary._id;
      const profileId = itinerary.profile_id;
      Profile.findByIdAndUpdate(profileId, { $push: {itinerary_ids: itineraryId}})
        .then((profile) => {
          res.status(200).json({message: "itinerary created!", itineraryId: itineraryId });
        });
    }).catch((err) => {
      res.status(500).json({message: "Internal server error",
                            error: `${err}`});
    });
};

function editItinerary(req, res) {
  const profileId = req.user.profile;
  const itineraryId = req.params.itinerary_id;
  Itinerary.findById(itineraryId)
    .then((itinerary) => {
      if (!itinerary) {
        throw new Error('Cannot find itinerary');
      } else if (!mongoose.Types.ObjectId(profileId).equals(itinerary.profile_id)) {
        throw new Error('User does not have permission to edit this itinerary');
      }
      Itinerary.findOneAndUpdate({_id: itineraryId}, req.body)
        .then((itinerary) => {res.status(200).json({ message: "Itinerary Updated"});});
    })
    .catch((err) => {
      res.status(401).json({message: "internal server error",
                            error: `${err}`});
    });
};

function deleteItinerary(req, res) {
  const profileId = req.user.profile;
  const itineraryId = req.params.itinerary_id;
  Itinerary.findById(itineraryId)
  .then((itinerary) => {
    if(!itinerary) {
      throw new Error('The itinerary does not exist');
    } else if (!mongoose.Types.ObjectId(profileId).equals(itinerary.profile_id)) {
      throw new Error('User deos not have permission to delete');
      }
    Itinerary.findOneAndDelete({_id: itineraryId})
    .then(() => {
      res.status(200).json({message: "Itinerary Deleted"});
    });
})
.catch((error) => {
  console.error(error.message);
  res.status(500).json({ error: 'Internal Server Error' });
});
}








export {getItineraryList, getItineraryInfo, createNewItinerary, editItinerary, deleteItinerary}
