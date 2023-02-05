import APIAdapter from "./apiAdapter.js";

class ReviewList {

    constructor(reviews) {
        this.reviews = reviews;
    }

    render() {
        const list = document.querySelector('.review-list');
        this.reviews.forEach(review => {
            const card = new Review(review).render();
            list.append(card);
        });
    }
}

class Review {

    constructor(review) {
        this.review = review;
    }

    render() {
        const li = document.createElement('li');
        li.classList.add('review');

        const rating = document.createElement('div');
        rating.classList.add('review__rating');
        li.append(rating);

        const star = document.createElement('img');
        star.src = '/assets/star-solid.svg';
        star.classList.add('review__rating-star');
        rating.append(star);

        const ratingInd = document.createElement('p');
        ratingInd.classList.add('review__rating-label');
        ratingInd.textContent = this.review.attributes.rating;
        rating.append(ratingInd);
        const span = document.createElement('span');
        span.textContent = '/5';
        ratingInd.append(span);
        
        const profile = document.createElement('div');
        profile.classList.add('review__profile');
        li.append(profile);

        const img = document.createElement('img');
        img.src = 'https://i.pravatar.cc/50' + Math.round(Math.random()*40);
        img.classList.add('review__portrait');
        img.alt = 'profile picture';
        profile.append(img);

        const author = document.createElement('p');
        author.classList.add('review__author');
        author.textContent = this.review.attributes.author;
        profile.append(author);

        const timestamp = document.createElement('small');
        timestamp.classList.add('review__timestamp');
        const opt = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
        timestamp.textContent = new Date(this.review.attributes.createdAt).toLocaleDateString('sv-SE', opt);
        profile.append(timestamp);

        const comment = document.createElement('p');
        comment.classList.add('review__comment');
        comment.textContent = this.review.attributes.comment;
        li.append(comment);

        return li;
    }

}

const api = new APIAdapter();
const path = window.location.pathname;
const reviews = [
    {
        attributes: {
            comment: 'Jättebra film!',
            rating: 3,
            author: 'Mustyplumber',
            createdAt: '2023-02-02T12:24:12.887Z',
        }
    },
    {
        attributes: {
            comment: 'Japanska versionen är perfekt, alla dubbade versioner är katastrof.',
            rating: 5,
            author: 'Noel',
            createdAt: '2023-02-02T12:24:12.887Z',
        }
    },
    {
        attributes: {
            comment: 'Bra film, men för låga tonarter för sångarens röst!',
            rating: 3,
            author: 'Alice',
            createdAt: '2023-02-02T12:24:12.887Z',
        }
    },
    {
        attributes: {
            comment: 'Den var lite konstig för hundarna pratade.',
            rating: 2,
            author: 'Jan',
            createdAt: '2023-02-02T12:24:12.887Z',
        }
    },
];
    

new ReviewList(reviews).render();