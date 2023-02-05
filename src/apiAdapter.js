import fetch from 'node-fetch';

const API_URL = 'https://plankton-app-xhkom.ondigitalocean.app/api';

class APIAdapter {

    async fetchMovies() {
        const res = await fetch(API_URL + '/movies');
        const data = await res.json();
        return data.data;
    }

    async fetchMovie(id) {
        const res = await fetch(API_URL + '/movies/' + id);
        const data = await res.json();
        return data.data;
    }

    async fetchUpcomingScreenings() {
        const res = await fetch(API_URL + '/screenings?populate=movie');
        const data = await res.json();
        return data.data;
    }
}

export default APIAdapter;