import express from 'express';
import APIAdapter from '../../apiAdapter.js';
const router = express.Router();

router.get('/movies/:id/ratings', async (req, res) => {
    const api = new APIAdapter();
    const id = req.params.id;
    const payload = await api.fetchRating(id);
    if (payload) {
        res.send(payload);
    } else {
        res.status(404).end();
    }
});

export default router;