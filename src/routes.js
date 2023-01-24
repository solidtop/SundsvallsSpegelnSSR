import express from 'express';
import { fetchMovies, fetchMovie } from './movies.js'; 
import getDropdownMenu from './menus.js';
import { sortByDate } from './sorting.js';

const router = express.Router();

const DROPDOWN_MENU = getDropdownMenu();

//Homepage 
router.get('/', async (req, res) => {
    const movies = await fetchMovies();
    const sortedMovies = sortByDate(movies);

    const amountToDisplay = 10;
    const moviesOutNow = movies.length > amountToDisplay ? movies.slice(0, amountToDisplay) : movies; //Slice first x movies to display
  
    res.render('index', {
        title: 'Sundsvalls Spegeln, Bio-Bar-Bistro',
        dropdownMenu: DROPDOWN_MENU,
        moviesOutNow: moviesOutNow,
        moviesComingSoon: moviesOutNow
    });
});

router.get('/movies', async(req, res) => {
    const movies = await fetchMovies();
    res.render('movies', {
        title: 'Nya Filmer, Heta Filmer, Kommande Filmer, Alla Filmer',
        dropdownMenu: DROPDOWN_MENU,
        movies: movies
    });   
});

router.get('/movies/:id', async (req, res) => {
    const movie = await fetchMovie(req.params.id);
    if (movie) {
        res.render('movie', {
            title: movie.attributes.title,
            dropdownMenu: DROPDOWN_MENU,
            movie: movie
        });
    } else {
        res.status(404).render('404', {
            dropdownMenu: DROPDOWN_MENU
        });
    }
});

router.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Öppettider & Kontakt',
        dropdownMenu: DROPDOWN_MENU
    });
});

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'Om Oss',
        dropdownMenu: DROPDOWN_MENU
    });
});

router.get('/tickets', (req, res) => {
    res.status(404).render('404', {
        title: '404: Not Found',
        dropdownMenu: DROPDOWN_MENU
    });
});

router.get('/news', (req, res) => {
    res.status(404).render('404', {
        title: '404: Not Found',
        dropdownMenu: DROPDOWN_MENU
    });
});

router.get('/giftcard', (req, res) => {
    res.status(404).render('404', {
        title: '404: Not Found',
        dropdownMenu: DROPDOWN_MENU
    });
});

export default router;