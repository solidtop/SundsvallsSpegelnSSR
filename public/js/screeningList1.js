import APIAdapter from "./apiAdapter.js";

const options = { 
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
};
const options2 = { 
    hour: 'numeric', 
    minute: 'numeric'
};

class ScreeningList {

    async load() {
        const api = new APIAdapter();
        const data = await api.fetchUpcomingScreenings();
        this.dates = data.dates;
        this.screenings = data.screenings;
    }

    render() {
        const container = document.createElement('div');
        container.classList.add('screenings-container');

        const h3 = document.createElement('h3');
        h3.textContent = 'VISNINGSTIDER';
        container.append(h3);

        const line = document.createElement('div');
        line.classList.add('line');
        container.append(line);

        if (!this.screenings || this.screenings.length <= 0) {
            const h4 = document.createElement('h4');
            h4.textContent = 'Inga kommande visningar vid detta tillfälle';
            container.append(h4);
            return container;
        }

        const ul = document.createElement('ul');
        ul.classList.add('screenings-list');
        container.append(ul);

        let i = 0;
        this.screenings.forEach((screening) => {
            const li = document.createElement('li');
            li.classList.add('screening');
            ul.append(li);

            const time = new Date(screening.attributes.start_time);
            if (i < this.dates.length) {
                const date =  new Date(this.dates[i]);
                if (date.getDate() === time.getDate()) {
                    const h4 = document.createElement('h4');
                    h4.textContent = date.toLocaleDateString('sv-SE', options).toLocaleUpperCase();
                    li.append(h4);
                    i++;
                }
            }

            const span = document.createElement('span');
            span.textContent = time.toLocaleTimeString('sv-SE', options2);
            li.append(span);

            const a = document.createElement('a');
            a.classList.add('link');
            a.href = '/movies/' + screening.attributes.movie.data.id;
            a.textContent = ' - ' + screening.attributes.movie.data.attributes.title;
            span.append(a);
        });

        return container;
    }
}


const section = document.querySelector('.upcoming-screenings');
const screeningList = new ScreeningList();
await screeningList.load();
section.append(screeningList.render());
