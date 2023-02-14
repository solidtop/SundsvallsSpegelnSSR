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
        const path = window.location.pathname;
        const data = await api.fetchScreenings(path);
        this.screenings = data;
    }

    render() {
        if (!this.screenings) {
            const h3 = document.createElement('h3');
            h3.textContent = 'Inga kommande visningar vid detta tillfälle';
            return h3;
        }

        const container = document.createElement('div');
        container.classList.add('screenings-container');

        const ul = document.createElement('ul');
        ul.classList.add('screenings-list');
        container.append(ul);

        this.screenings.forEach(screening => {
            const li = document.createElement('li');
            li.classList.add('screening');
            ul.append(li);

            const date = new Date(screening.attributes.start_time);
            let span = document.createElement('span');
            span.textContent = date.toLocaleDateString('sv-SE', options).toLocaleUpperCase();
            li.append(span);

            const time = document.createElement('span');
            time.textContent = date.toLocaleTimeString('sv-SE', options2);
            span.append(time);

            span = document.createElement('span');
            span.textContent = screening.attributes.room;
            li.append(span);
            
            const a = document.createElement('a');
            a.classList.add('button', 'primary');
            a.href = '/tickets';
            a.text = 'Biljetter';
            li.append(a);
        });

        return container;
    }
}

const screeningList = new ScreeningList();
await screeningList.load();
const section = document.querySelector('.screenings');
section.append(screeningList.render());

