import express from 'express';
import { fetchMovies, fetchMovie } from './movies.js'; 
import getMoviePlaceholders from './placeholders.js'
import { sortByDate } from './sorting.js';
const router = express.Router();

const MOVIE_PLACEHOLDERS = getMoviePlaceholders();

function render404(res) {
    res.status(404).render('404', {
        title: '404: Not Found',
    });   
}

//Homepage 
router.get('/', async (req, res) => {
    const movies = await fetchMovies();

    const moviesToDisplay = 10;
    const moviesOutNow = movies.length > moviesToDisplay ? movies.slice(0, moviesToDisplay) : movies; //Slice first x movies to display
    
    res.render('index', {
        title: 'Sundsvalls Spegeln, Bio-Bar-Bistro',
        moviesOutNow: moviesOutNow,
        moviesComingSoon: MOVIE_PLACEHOLDERS,
        slides: moviesOutNow
    });
});

router.get('/movies', async(req, res) => {
    const movies = await fetchMovies();
    res.render('movies', {
        title: 'Nya Filmer, Heta Filmer, Kommande Filmer, Alla Filmer',
        movies: movies
    });   
});

router.get('/movies/:id', async (req, res) => {
    const movie = await fetchMovie(req.params.id);
    if (movie) {
        res.render('movie', {
            title: movie.attributes.title,
            movie: movie,
        });        
    } else {           
        render404(res);
    }
});

router.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Öppettider & Kontakt',
    });
});

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'Om Oss',
    });
});

router.get('/tickets', (req, res) => {
    render404(res);
});

router.get('/news', (req, res) => {
    render404(res);
});

router.get('/giftcard', (req, res) => {
    render404(res);
});

export default router;