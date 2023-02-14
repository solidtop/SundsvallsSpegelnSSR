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

    async fetchScreenings(id) {
        const res = await fetch(API_URL + `/screenings?filters[movie]=${id}&populate=movie&sort[start_time]=asc`);
        const payload = await res.json();
        return payload.data;
    }

    async fetchUpcomingScreenings() {
        const res = await fetch(API_URL + '/screenings?populate=movie&sort[start_time]=asc');
        const payload = await res.json();
        return payload.data;
    }

    async fetchReviews(id, page = 0) {
        const pageQuery = `pagination[page]=${page}&pagination[pageSize]=5`;
        const res = await fetch(API_URL + `/reviews?filters[movie]=${id}&${pageQuery}&sort[createdAt]=asc`);
        const payload = await res.json();
        return payload;
    }

    async postReview(review, verified = false) {
        
    }

    async fetchRating(id) {
        const query =  `/reviews?populate=movie&filters[movie]=${id}&fields=rating`;
        const res = await fetch(API_URL + query);
        const payload = await res.json();
        const ratings = payload.data.map(rating => rating.attributes.rating);

        let averageRating, maxRating;
        if (ratings.length >= 5) {
            let sumOfRatings = 0;
            ratings.forEach(rating => {
                sumOfRatings += rating;
            });
           averageRating = Math.floor((sumOfRatings / ratings.length * 10)) / 10;
           maxRating = 5;
        } else {
            const { imdbId } = payload.data[0].attributes.movie.data.attributes;
            averageRating = await this.fetchIMDBRating(imdbId);
            maxRating = 10;
        }

        return {
            rating: averageRating,
            maxRating: maxRating,
        };
    }

    async fetchIMDBRating(imdbId) {
        const res = await fetch(`http://www.omdbapi.com/?i=${imdbId}&apikey=6a9f2053`);
        const data = await res.json();
        return data.imdbRating;
    }
}

export default APIAdapter;

const items = {
    "data": [
        {
            "attributes": {
                "start_time": "2023"
            }
        },
        {
            "attributes": {
                "start_time": "2023"
            }
        }
    ]
}