// import npm packages
import 'dotenv/config.js';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import axios  from 'axios';

// connect to MongoDB with mongoose
import './config/database.js';

// import routes
import { router as profilesRouter } from './routes/profiles.js';
import { router as authRouter } from './routes/auth.js';
import { router as itinRouter } from './routes/itineraries.js';
import { decodeUserFromToken } from './middleware/auth.js';
// create the express app
const app = express();


// basic middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());

// mount imported routes
app.use('/api/profiles', profilesRouter);
app.use('/api/auth', authRouter);
app.use('/itineraries', decodeUserFromToken, itinRouter);



// handle all other errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ err: err.message });
});

app.get('/api/nearbySearch/', async (req, res) => {
  const { lat, lng, query } = req.query;
  try {
    console.log(req.query)
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=2000&keyword=${encodeURIComponent(query)}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
    res.json(response.data.results);
    console.log(response.data.results)
    console.log("done")
  } catch (error) {
    res.status(500).send('Error fetching nearby places');
  }
});

// handle 404 errors
app.use(function (req, res, next) {
  res.status(404).json({ err: 'Not foundD' });
});

export { app }
