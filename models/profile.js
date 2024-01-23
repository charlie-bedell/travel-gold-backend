import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const profileSchema = new Schema({
  first_name: String,
  last_name: String,
  itinerary_ids: [{type: mongoose.Schema.Types.ObjectId, ref: 'Itinerary'}]
},{
  timestamps: true,
});

const Profile = mongoose.model('Profile', profileSchema);

export { Profile }
