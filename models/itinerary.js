import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const itinerarySchema = new Schema ({
  name: String,
  profile_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
  poi_ids: [{type: mongoose.Schema.Types.ObjectId, ref: 'POI'}],
  isPublic: Boolean
});

itinerarySchema.post('findOneAndDelete', async (itinerary, next) => {
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

export { Itinerary }
