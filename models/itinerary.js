import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const itinerarySchema = new Schema ({
  name: String,
  profile_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
  poi_ids: [{type: mongoose.Schema.Types.ObjectId, ref: 'POI'}]
});

const Itinerary = mongoose.mode('Itinerary', itinerarySchema);

export { Itinerary }
