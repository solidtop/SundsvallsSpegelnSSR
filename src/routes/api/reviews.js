import express from 'express';
import APIAdapter from '../../apiAdapter.js';
const router = express.Router();

router.get('/movies/:id/reviews', async (req, res) => {
    const api = new APIAdapter();
    const id = req.params.id;
    const page = req.query.page || '';
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

router.post('/movies/:id/reviews', async (req, res) => {
    const api = new APIAdapter();
    const id = req.params.id;
    const movie = await api.fetchMovie(id);
    const review = {
        movie: movie,
        ... req.body,
    }

    const status = validateReview(review);
    if (status.isValid) {
        try {
            api.postReview(review, true);
        } catch (err) {
            res.status(500).end(); 
        }
    } 
    res.status(status.code).send({ status: status });
});

function validateReview(review) {
    const MAX_COMMENT_LENGTH = 200;

    const rating = parseInt(review.rating);
    if (isNaN(rating) || rating < 0 || rating > 5) {
        return {
            isValid: false,
            code: 403, 
            message: "Felaktigt betyg",
        };
    }

    if (typeof review.author !== "string") {
        return {
            isValid: false,
            code: 400,
            message: "Inte en sträng",
        }
    } 

    if (review.author.length <= 0) {
        return {
            isValid: false,
            code: 403,
            message: "Vänligen fyll i ditt namn",
        }
    }

    if (typeof review.comment !== "string") {
        return {
            isValid: false,
            code: 400,
            message: "Inte en sträng",
        }
    }

    if (review.comment.length > MAX_COMMENT_LENGTH) {
        return {
            isValid: false,
            code: 403,
            message: "Kommentaren är för lång",
        }
    }

    const hasProfanity = checkProfanity([review.author, review.comment]);
    if (hasProfanity) {
        return {
            isValid: false,
            code: 403,
            message: "Får inte innehålla svordomar",
        }
    }

    return {
        isValid: true,
        code: 200,
        message: "Recension godkänd",
    }
}

function checkProfanity(arr) {
    const profanities = [
        "järnspikar", "attans", "nedrans", "mildamatilda", "herregud", "jösses", "jesusamalia", "fan", "jävlar", "jävla"
    ];

    return arr.some(str => {
        const lowercaseStr = str.toLowerCase().replace(/\s/g, "");
        return profanities.some(p => lowercaseStr.includes(p));
    });
}

export default router;