import { User } from '../models/user.js'
import { Profile } from '../models/profile.js'

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
          res.status(200).json(user)
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

export { signup, }
