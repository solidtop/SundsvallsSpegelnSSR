export default class APIAdapter {

    async fetchMovies() {
        const res = await fetch('/api/movies');
        return await res.json();
    }

    async fetchMovie(id) {
        const res = await fetch('/api/movies/' + id);
        return await res.json();
    }

    async fetchUpcomingScreenings() {
        const res = await fetch('/api/upcoming-screenings');
        return await res.json();
    }

    async fetchScreenings(path) {
        const res = await fetch(`/api${path}/screenings`);
        return await res.json();
    }

    async fetchReviews(path, query = '') {
        const res = await fetch(`/api${path}/reviews${query}`);
        return await res.json();
    }

    async fetchRating(path) {
        const res = await fetch(`/api${path}/ratings`);
        return await res.json(); 
    }
}