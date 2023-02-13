import express from 'express';
import APIAdapter from '../../apiAdapter.js';

const router = express.Router();
const api = new APIAdapter();

router.get('/movies', async (req, res) => {
    const movies = await api.fetchMovies();
    res.send(movies);
});

router.get('/movies/:id', async (req, res) => {
    const movie = await api.fetchMovie(req.params.id);
    res.send(movie);
});

export default router;