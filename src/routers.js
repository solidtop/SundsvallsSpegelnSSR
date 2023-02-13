import express from 'express';
import moviesRoute from './routes/movies.js';
import screeningsRoute from './routes/api/screenings.js';
import reviewsRoute from './routes/api/reviews.js';
import ratingsRoute from './routes/api/ratings.js';

const router = express.Router();

router.use('/movies', moviesRoute);        
router.use('/api', screeningsRoute);        
router.use('/api', reviewsRoute);        
router.use('/api', ratingsRoute);        

export default router;