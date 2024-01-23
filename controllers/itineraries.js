import { Profile } from "../models/profile.js";
import { Itinerary } from "../models/itinerary.js";

function getItineraryList(req,res) {
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


function getItineraryInfo(req,res) {
  // get POI info by specific itinerary_id and profile_id
  // if itinerary is public, return it, otherwise, check if its
  // owned by the user, if not, return an error

  const itinerary_id = req.params.itinerary_id;

  Profile.findOne({ _id:req.user.profile })
  .then((profile) => {
    if(!profile) {
      return res.status(404).json({error: 'Profile not found'});
    };
    const itinerary = Itinerary.findOne({_id: itinerary_id});
    if (!itinerary.isPublic) {
      if (itinerary.profile_id !== req.user.profile) {
        throw new Error('Itinerary is not public');
      }
    } else {
      res.status(200).json({ itinerary });
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error});
  });
};

function createNewItinerary(req,res) {
  // creates a new itinerary and adds the id to the user doc that created it
  const profileId = req.user.profile;
  const itineraryBody = req.body;
  
  Itinerary.create({ profile_id: profileId,
                     ...itineraryBody})
    .then((itinerary) => {
      const itineraryId = itinerary._id;
      const profileId = itinerary.profile_id;
      Profile.findByIdAndUpdate(profileId, { $push: {itinerary_ids: itineraryId}})
        .then((profile) => {
          // the itineraryId might be a little messy, might remove in the future
          res.status(200).json({message: "itinerary created!", itineraryId: profile.itinerary_ids[profile.itinerary_ids.length - 1]});
        });
    }).catch((err) => {
      res.status(500).json({message: "Internal server error",
                            error: err});
    });
};

function editItinerary(req,res) {
  const profileId = req.user.profile;
  const itineraryId = req.params.itineraryId;
  Itinerary.findByIdAndUpdate(itineraryId, req.body)
    .then((itinerary) => {
      if (!itinerary) {
        throw new Error('Cannot find itinerary');
      } else if (profileId !== itinerary.profile_id) {
        throw new Error('User does not have permission to edit this itinerary');
      }
    })
    .catch((err) => {
      res.status(401).json({message: "internal server error",
                            error: err});
    });
};

function deleteItinerary(req,res) {

};





export {getItineraryList, getItineraryInfo, createNewItinerary, editItinerary, deleteItinerary}
