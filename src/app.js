import express from 'express';
import bodyParser from 'body-parser';
import { marked } from 'marked';
import getDropdownMenu from './menus.js';
import getMoviePlaceholders from './placeholders.js';
import APIAdapter from './apiAdapter.js';
import router from './routers.js';

const app = express();
app.set('view engine', 'pug');
app.locals.marked = marked; //Save marked func in locals so it can be used in template files
app.locals.dropdownMenu = getDropdownMenu();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
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
   
    res.render('index', {
        title: 'Sundsvalls Spegeln, Bio-Bar-Bistro',
        moviesOutNow: movies,
        moviesComingSoon: MOVIE_PLACEHOLDERS,
        slides: movies
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
