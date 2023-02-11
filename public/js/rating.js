import APIAdapter from "./apiAdapter.js";

class Rating {
    render(data) {
        const rating = document.createElement('div');
        rating.classList.add('rating');

        const star = document.createElement('img');
        star.src = '/assets/star-solid.svg';
        star.classList.add('rating__star');
        rating.append(star);

        const ratingNumb = document.createElement('p');
        ratingNumb.classList.add('rating__label');
        ratingNumb.textContent = data.rating;
        rating.append(ratingNumb);
        const span = document.createElement('span');
        span.textContent = '/' + data.maxRating;
        ratingNumb.append(span);

        return rating;
    }
}

const api = new APIAdapter();
const path = window.location.pathname;
const data = await api.fetchRating(path);
if (data) {
    const metaDetails = document.querySelector('.meta-details');
    metaDetails.append(new Rating().render(data));
}

