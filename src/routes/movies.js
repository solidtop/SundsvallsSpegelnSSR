import express from 'express';
import APIAdapter from '../apiAdapter.js';
import { render404 } from '../app.js';

const router = express.Router();
const api = new APIAdapter();

router.get('/', async(req, res) => {
    const movies = await api.fetchMovies();
    res.render('movies', {
        title: 'Nya Filmer, Heta Filmer, Kommande Filmer, Alla Filmer',
        movies: movies
    });   
});

router.get('/:id', async (req, res) => {
    const movie = await api.fetchMovie(req.params.id);
    console.log(movie);
    if (movie) {
        res.render('movie', {
            title: movie.attributes.title,
            movie: movie,
        });        
    } else {           
        render404(res);
    }
});

export default router;

