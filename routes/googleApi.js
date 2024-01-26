import * as googsController from '../controllers/googleApi.js';
import { Router } from "express";



const router = Router();

router.get('/nearbySearch/', googsController.getNearbyPlaces);
router.get('/place/:placeId', googsController.getPlaceInfo);





export {router}
