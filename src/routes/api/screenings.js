import express from 'express';
import APIAdapter from '../../apiAdapter.js';
const router = express.Router();
const api = new APIAdapter();

router.get('/movies/:id/screenings', async (req, res) => {
    const screenings = await api.fetchScreenings(req.params.id);
    if (screenings) {
        res.send(screenings);
    } else {
        res.status(404).end();
    }
});

router.get('/upcoming-screenings', async (req, res) => {
    const screenings = await api.fetchUpcomingScreenings();
    const filteredData = filterUpcomingScreenings(screenings);
    const dates = getScreeningDates(filteredData);
    if (screenings && dates) {
        res.send({
            dates: dates,
            screenings: filteredData,
        });
    } else {
        res.status(404).end();
    }
});

function filterUpcomingScreenings(screenings) {
    const today = new Date();
    const daysFromToday = 10;
    const dateToFilter = new Date();
    dateToFilter.setDate(new Date().getDate() + daysFromToday);

    let filteredArr = screenings.filter(screening => {
        const date = new Date(screening.attributes.start_time);
        return date >= today && date <= dateToFilter;
    });

    filteredArr = filteredArr.sort((a, b) => {
        return new Date(a.attributes.start_time) - new Date(b.attributes.start_time);
    });

    const screeningsToInclude = 10;
    return filteredArr.slice(0, screeningsToInclude);
} 

function getScreeningDates(screenings) {
    const dates = screenings.map(screening => screening.attributes.start_time.split('T')[0]);

    //remove dublicates
    return dates.filter((date, i) => {
        return dates.indexOf(date) === i;
    });
}

export default router;