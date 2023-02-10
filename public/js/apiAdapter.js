export default class APIAdapter {

    async fetchUpcomingScreenings() {
        const res = await fetch('/api/upcoming-screenings');
        return await res.json();
    }

    async fetchScreenings(id) {

    }

    async fetchReviews(path, query = '') {
        const res = await fetch(`/api${path}/reviews${query}`);
        return await res.json();
    }
}