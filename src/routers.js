import express from 'express';
import moviesRouter from './routes/movies.js';
import screeningsRouter from './routes/api/screenings.js';
import reviewsRouter from './routes/api/reviews.js';
import ratingsRouter from './routes/api/ratings.js';

const router = express.Router();

router.use('/movies', moviesRouter);        
router.use('/api', screeningsRouter);        
router.use('/api', reviewsRouter);        
router.use('/api', ratingsRouter);        

export default router;