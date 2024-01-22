import { Router } from "express";
import * as itinerariesController from "../controllers/itineraries.js";

const router = Router()



router.get('/itineraries', itinerariesController  )

router.get('/itineraries/:itinerary_id', itinerariesController )

router.post('/itineraries',itinerariesController )

router.put('/itineraries/:itinerary_id', itinerariesController)

router.delete('/itineraries/:itinerary_id', itinerariesController )


export default router 