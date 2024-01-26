import { Router } from "express";
import * as itinerariesController from "../controllers/itineraries.js";
import * as poiController from "../controllers/poi.js";
const router = Router();

router.get('/', itinerariesController.getItineraryList);

router.get('/:itinerary_id', itinerariesController.getItineraryInfo);

router.post('/',itinerariesController.createNewItinerary);

router.put('/:itinerary_id', itinerariesController.editItinerary);

router.delete('/:itinerary_id', itinerariesController.deleteItinerary);

router.get('/:itinerary_id/poi/:place_id/:lat/:long', poiController.getPlace);

router.delete('/:itinerary_id/poi/:place_id', poiController.removePlaceFromItinerary);

export { router } 
