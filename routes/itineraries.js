import { Router } from "express";
import * as itinerariesController from "../controllers/itineraries.js";

const router = Router();

router.get('/itineraries', itinerariesController.getItineraryList  );

router.get('/itineraries/:itinerary_id', itinerariesController. getItineraryInfo);

router.post('/itineraries',itinerariesController.createNewItinerary );

router.put('/itineraries/:itinerary_id', itinerariesController.editItinerary);

router.delete('/itineraries/:itinerary_id', itinerariesController.deleteItinerary );

export { router }