import express from 'express';
import { fetchMovies, fetchMovie } from './movies.js'; 
import getDropdownMenu from './menus.js';

const router = express.Router();

const DROPDOWN_MENU = getDropdownMenu();

//Homepage 
router.get('/', async (req, res) => {
    const movies = await fetchMovies();
    res.render('index', {
        movies: movies,
        dropdownMenu: DROPDOWN_MENU
    });
});

router.get('/contact', (req, res) => {
    res.render('contact', {
        dropdownMenu: DROPDOWN_MENU
    });
});

router.get('/about', (req, res) => {
    res.render('about', {
        dropdownMenu: DROPDOWN_MENU
    });
});

router.get('/tickets', (req, res) => {
    res.status(404).render('404', {
        dropdownMenu: DROPDOWN_MENU
    });
});

router.get('/news', (req, res) => {
    res.status(404).render('404', {
        dropdownMenu: DROPDOWN_MENU
    });
});

router.get('/giftcard', (req, res) => {
    res.status(404).render('404', {
        dropdownMenu: DROPDOWN_MENU
    });
});

export default router;