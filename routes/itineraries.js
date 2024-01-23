import { Router } from "express";
import * as itinerariesController from "../controllers/itineraries.js";

const router = Router();

router.get('/', itinerariesController.getItineraryList  );

router.get('/:itinerary_id', itinerariesController. getItineraryInfo);

router.post('/',itinerariesController.createNewItinerary );

router.put('/:itinerary_id', itinerariesController.editItinerary);

router.delete('/:itinerary_id', itinerariesController.deleteItinerary );

export { router } 