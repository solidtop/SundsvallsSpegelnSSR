import express from 'express';
import APIAdapter from '../../apiAdapter.js';
const router = express.Router();

router.get('/movies/:id/reviews', async (req, res) => {
    const api = new APIAdapter();
    const id = req.params.id;
    const page = req.query.page || '';
    console.log(page);
    const payload = await api.fetchReviews(id, page);
    if (payload) {
        res.send({
            reviews: payload.data,
            ...payload.meta,
        });
    } else {
        res.status(404).end();
    }
});

export default router;