import express from 'express';
import APIAdapter from '../../apiAdapter.js';
const router = express.Router();
const api = new APIAdapter();

router.get('/movies/:id/screenings', async (req, res) => {
    const screenings = await api.fetchScreenings(req.params.id);
    const comingScreenings = filterUpcomingScreenings(screenings, 5, 5);
    if (comingScreenings) {
        res.send(comingScreenings);
    } else {
        res.status(404).end();
    }
});

router.get('/upcoming-screenings', async (req, res) => {
    const screenings = await api.fetchUpcomingScreenings();
    const comingScreenings = filterUpcomingScreenings(screenings, 10, 10);
    const dates = getScreeningDates(comingScreenings);
    if (comingScreenings && dates) {
        res.send({
            dates: dates,
            screenings: comingScreenings,
        });
    } else {
        res.status(404).end();
    }
});

function filterUpcomingScreenings(screenings, comingDays, items) {
    const today = new Date();
    const dateToFilter = new Date();
    dateToFilter.setDate(new Date().getDate() + comingDays);

    const filteredArr = screenings.filter(screening => {
        const date = new Date(screening.attributes.start_time);
        return date >= today && date <= dateToFilter;
    });

    return filteredArr.slice(0, items);
} 

function getScreeningDates(screenings) {
    const dates = screenings.map(screening => screening.attributes.start_time.split('T')[0]);

    //remove dublicates
    return dates.filter((date, i) => {
        return dates.indexOf(date) === i;
    });
}

export default router;