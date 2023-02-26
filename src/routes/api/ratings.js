import express from 'express';
import APIAdapter from '../../apiAdapter.js';
const router = express.Router();
const api = new APIAdapter();

router.get('/movies/:id/ratings', async (req, res) => {
    const id = req.params.id;
    const payload = await api.fetchRating(id);
    if (payload) {
        res.send(payload);
    } else {
        res.status(404).end();
    }
});

export default router;