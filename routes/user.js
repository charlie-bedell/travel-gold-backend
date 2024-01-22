import { Router } from 'express';
import * as itineraries from '../controllers/itineraries.js';
const router = Router();

router.post('/user/itineraries', itineraries.list);
