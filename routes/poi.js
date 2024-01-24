import * as poiController from '../controllers/poi.js'
import { Router } from 'express'

const router = Router();

router.get('/:place_id', poiController.getPlace)


export { router }