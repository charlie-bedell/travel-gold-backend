import { User } from '../models/user.js'
import { Profile } from '../models/profile.js'
import jwt from 'jsonwebtoken'

function signup(req, res) {
  Profile.findOne({ email: req.body.email })
  .then(profile => {
    if (profile) {
      throw new Error('Account already exists')
    } else if (!process.env.SECRET){
      throw new Error('no SECRET in .env file')
    } else {
      Profile.create(req.body)
      .then(newProfile => {
        req.body.profile = newProfile._id
        User.create(req.body)
        .then(user => {
          // TODO: Send back a JWT instead of the user
          const token = createJWT(user)
          res.status(200).json({ token })
        })
        .catch(err => {
          Profile.findByIdAndDelete(newProfile._id)
          res.status(500).json({err: err.errmsg})
        })
      })
    }
  })
  .catch(err => {
    res.status(500).json({err: err.message})
  })
}

function createJWT(user) {
  return jwt.sign(
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  )
}

export { signup, }
