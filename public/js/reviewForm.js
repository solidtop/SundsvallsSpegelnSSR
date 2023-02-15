import APIAdapter from './apiAdapter.js';

class ReviewForm {

    render(title) {
        const form = document.createElement('form');
        form.classList.add('review-form');
        form.name = 'review-form';
        this.form = form;

        const h2 = document.createElement('h2');
        h2.textContent = 'Din Recension för ' + title;
        form.append(h2);

        const message = document.createElement('strong');
        message.classList.add('message');
        form.append(message);

        const h3 = document.createElement('h3');
        h3.textContent = 'Ditt Betyg';
        form.append(h3);

        const rating = document.createElement('div');
        rating.classList.add('rating');
        form.append(rating);

        const ratingIndicator = document.createElement('span');
        ratingIndicator.classList.add('rating-indicator');
        ratingIndicator.textContent = '1';
        rating.append(ratingIndicator);

        for (let i = 5; i > 0; i--) {
            const input = document.createElement('input');
            input.type = 'radio';
            input.id = 'star' + i;
            input.name = 'rating';
            input.value = i;
            if (i === 1) {
                input.checked = true;
            }
            rating.append(input);

            const label = document.createElement('label');
            label.classList.add('star');
            label.htmlFor = 'star' + i;
            label.title = i + ' stars';
            rating.append(label);
        }

        const author = document.createElement('input');
        author.type = 'text';
        author.classList.add('review-form__author');
        author.name = 'author';
        author.placeholder = 'Skriv ditt namn här';
        author.required = true;
        form.append(author);

        const comment = document.createElement('textarea');
        comment.classList.add('review-form__comment');
        comment.name = 'comment';
        comment.maxLength = '200';
        comment.placeholder = 'Skriv din kommentar här (valfri)';
        comment.cols = '30';
        comment.rows = '8';
        form.append(comment);

        const commentLength = document.createElement('small');
        commentLength.classList.add('comment-indicator');
        form.append(commentLength);

        const button = document.createElement('button');
        button.type = 'submit';
        button.classList.add('button', 'primary');
        button.textContent = 'Skicka';
        form.append(button);

        this.input();
        return form;
    }

    input() {
        this.form.addEventListener('submit', async e => {
            e.preventDefault();

            //POST form to server
            const data = new URLSearchParams(new FormData(this.form));
            const path = window.location.pathname;
            const res = await fetch('/api' + path + '/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: data,
            });

            const payload = await res.json();
            const status = payload.status;

            if (status.code === 200) {
                window.location.reload();
            } else {
                this.showMessage(status.message);
            }
        });

        const rating = this.form.querySelector('.rating');
        rating.addEventListener('change', () => {
            this.updateRatingIndicator();
        });

        this.updateCommentIndicator();
        const comment = this.form.querySelector('.review-form__comment');
        comment.addEventListener('input', () => {
            this.updateCommentIndicator();
        });
    }

    showMessage(text) {
        const msg = document.querySelector('.message');
        if (!msg.classList.contains('show')) {
            msg.classList.add('show');
        }
        msg.textContent = text;
    }

    updateRatingIndicator() {
        const indicator = this.form.querySelector(".rating-indicator");
        const stars = this.form.querySelector('.rating').childNodes;
        stars.forEach(star => {
            if (star.checked) {
                indicator.textContent = star.value;
                return;
            }
        });
    }

    updateCommentIndicator() {
        const comment = this.form.querySelector(".review-form__comment");
        const indicator = this.form.querySelector(".comment-indicator");
        const charAmount = comment.maxLength - comment.value.length;
        indicator.textContent = "Max antal tecken: " + charAmount;
    }
}

class Modal {
    render() {
        const modal = document.createElement('div');
        modal.classList.add('modal-container');
        document.body.append(modal);
        this.modal = modal;

        const content = document.createElement('div');
        content.classList.add('modal-content');
        modal.append(content);

        const button = document.createElement('button');
        button.classList.add('button-close-modal');
        button.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        content.append(button);

        this.input();
        return content;
    }

    input() {
        document.body.addEventListener('click', e => {
            if (e.target.classList.contains('modal-container') 
            && !e.target.classList.contains('modal-content') 
            || e.target.classList.contains('button-close-modal')) {
                this.close();
            }
        });
    }

    close() {
        this.modal.remove();
    }
}

const toggle = document.querySelector('.toggle-review-form');
toggle.addEventListener('click', async () => {
    const api = new APIAdapter();
    const path = window.location.pathname;
    const id = path.substring(path.lastIndexOf('/') + 1);
    const data = await api.fetchMovie(id);
    const title = data.attributes.title;

    const modal = new Modal().render();
    const reviewForm = new ReviewForm().render(title);
    modal.append(reviewForm);
});


