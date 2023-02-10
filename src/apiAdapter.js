import fetch from 'node-fetch';

const API_URL = 'https://plankton-app-xhkom.ondigitalocean.app/api';

class APIAdapter {

    async fetchMovies() {
        const res = await fetch(API_URL + '/movies');
        const payload = await res.json();
        return payload.data;
    }

    async fetchMovie(id) {
        const res = await fetch(API_URL + '/movies/' + id);
        const payload = await res.json();
        return payload.data;
    }

    async fetchUpcomingScreenings() {
        const res = await fetch(API_URL + '/screenings?populate=movie');
        const payload = await res.json();
        return payload.data;
    }

    async fetchReviews(id, page = 0) {
        const pageQuery = `pagination[page]=${page}&pagination[pageSize]=5`;
        const res = await fetch(API_URL + `/reviews?filters[movie]=${id}&${pageQuery}`);
        const payload = await res.json();
        return payload;
    }
}

export default APIAdapter;