import { Router } from 'express'
import * as authCtrl from '../controllers/auth.js'

const router = Router()

/*---------- Public Routes ----------*/
router.post('/signup', authCtrl.signup)

/*---------- Protected Routes ----------*/


export { router }
