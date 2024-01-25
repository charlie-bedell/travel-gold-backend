import mongoose from 'mongoose';
import { Profile } from './profile.js';

const Schema = mongoose.Schema;

const itinerarySchema = new Schema ({
  name: String,
  profile_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
  start_date: {type: Date},
  end_date: {type: Date},
  place_ids: [{type: String}],
  isPublic: Boolean
});

itinerarySchema.post('findOneAndDelete', async (itinerary, next) => {
  const itineraryId = itinerary._id;
  const profileId = itinerary.profile_id;
  await Profile.findByIdAndUpdate(profileId, {$pull: {itinerary_ids: itineraryId}});
  next();
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

export { Itinerary }
