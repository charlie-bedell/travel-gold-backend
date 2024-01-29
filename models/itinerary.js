import mongoose from 'mongoose';
import { Profile } from './profile.js';

const Schema = mongoose.Schema;

const itinerarySchema = new Schema ({
  name: String,
  locationName: {type: String},
  startDate: {type: Date, required:true },
  endDate: {type: Date, required:true},
  profile_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
  place_ids: [{type: String}],
  isPublic: {type: Boolean, default: true},
  lat: {type: Number},
  lng: {type: Number}
});

itinerarySchema.pre('save', function (next) {
  this.markModified('startDate');
  this.markModified('endDate');
  next();
});


itinerarySchema.post('findOneAndDelete', async (itinerary, next) => {
  const itineraryId = itinerary._id;
  const profileId = itinerary.profile_id;
  await Profile.findByIdAndUpdate(profileId, {$pull: {itinerary_ids: itineraryId}});
  next();
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

export { Itinerary }
