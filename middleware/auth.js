import jwt from 'jsonwebtoken'

const SECRET = process.env.SECRET

const decodeUserFromToken = (req, res, next) => {
  let token = req.get('Authorization') || req.query.token || req.body.token
  if (token) {
    token = token.replace("Bearer ", "")
    console.log(token);
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        next(err)
      } else {
        req.user = decoded.user
        next()
      }
    })
  } else {
    next()
  }
}

export { decodeUserFromToken }