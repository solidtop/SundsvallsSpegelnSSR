export default class APIAdapter {

    async fetchUpcomingScreenings() {
        const res = await fetch('/api/upcoming-screenings');
        return await res.json();
    }

    async fetchScreenings(id) {

    }

    async fetchReviews(id) {
        const res = await fetch(`/api/movies/${id}/reviews`);
        return await res.json();
    }
}