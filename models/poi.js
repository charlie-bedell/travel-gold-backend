import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const poiSchema = new Schema ({
  business_status: String, // change to enum
  formatted_address: String,
  formatted_phone_number: String,
  name: String,
  weekday_text: [String],
  place_id: String,
  rating: Number,
  website: String,
  serves_bee: Boolean,
  serves_breakfast: Boolean,
  serves_lunch: Boolean,
  serves_dinner: Boolean,
  serves_vegetarian_food: Boolean,
  serves_wine: Boolean,
  price_level: Number // change to enum
});

const Poi = mongoose.model('Poi', poiSchema);

export { Poi }
