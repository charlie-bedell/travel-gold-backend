import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const poiSchema = new Schema ({
  place_id: String, // id
  name: String, // displayName.text
  business_status: String, // business_status
  formatted_address: String, // formattedAddress
  international_phone_number: String, // internationalPhoneNumber
  national_phone_number: String, // nationalPhoneNumber
  openingHours: [String], // regularOpeningHours.weekdayDescriptions
  rating: Number, // rating
  website: String, // websiteUri
  serves_beer: Boolean, // serves_beer
  serves_breakfast: Boolean, // serves_breakfast
  serves_lunch: Boolean, // serves_lunch
  serves_dinner: Boolean, // serves_dinner
  serves_wine: Boolean, // serves_wine
  price_level: Number, // price_level
  reservable: Boolean, // reservable
  types: [String], // types
  summary: String, // editorial_summary
  lat: Number, // from params
  long: Number // from params
});

const Poi = mongoose.model('Poi', poiSchema);

export { Poi }
