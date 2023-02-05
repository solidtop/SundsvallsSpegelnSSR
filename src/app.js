import express from 'express';
import { marked } from 'marked';
import getDropdownMenu from './menus.js';
import getMoviePlaceholders from './placeholders.js';
import APIAdapter from './apiAdapter.js';
import moviesRoute from './routes/movies.js';
import screeningsRoute from './routes/api/screenings.js';

const app = express();
app.set('view engine', 'pug');
app.locals.marked = marked; //Save marked func in locals so it can be used in template files
app.locals.dropdownMenu = getDropdownMenu();

app.use('/movies', moviesRoute);        
app.use('/api', screeningsRoute);        

//Static files
app.use('/', express.static('public'));

const MOVIE_PLACEHOLDERS = getMoviePlaceholders();

export function render404(res) {
    res.status(404).render('404', {
        title: '404: Not Found',
    });   
}

app.get('/', async (req, res) => {
    const api = new APIAdapter();
    const movies = await api.fetchMovies();
    const moviesToDisplay = 10;
    const moviesOutNow = movies.length > moviesToDisplay ? movies.slice(0, moviesToDisplay) : movies; //Slice first x movies to display
    
    res.render('index', {
        title: 'Sundsvalls Spegeln, Bio-Bar-Bistro',
        moviesOutNow: moviesOutNow,
        moviesComingSoon: MOVIE_PLACEHOLDERS,
        slides: moviesOutNow
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Öppettider & Kontakt',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Om Oss',
    });
});

app.get('/tickets', (req, res) => {
    render404(res);
});

app.get('/news', (req, res) => {
    render404(res);
});

app.get('/giftcard', (req, res) => {
    render404(res);
});

export default app;
