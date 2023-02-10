export default class Pagination {
    
    constructor(meta) {
        this.meta = meta;
        this.pageCount = Math.min(meta.pageCount, 5);
        this.pagesToDisplay = 5;
    }

    render(container) {
        const nav = document.createElement('nav');
        nav.classList.add('pagination');
        this.nav = nav;

        const navPrev = document.createElement('a');
        navPrev.classList.add('page-nav');
        navPrev.id = 'page-prev';
        navPrev.href = '#';
        navPrev.innerHTML = '<i class="fa-solid fa-caret-left"></i>';
        nav.append(navPrev);

        const ul = document.createElement('ul');
        ul.classList.add('page-list');
        nav.append(ul);

        this.minInd = clamp(this.meta.page-2, 0, (this.meta.pageCount-1) - (this.pagesToDisplay-1))
        this.maxInd = Math.min(this.minInd + this.pagesToDisplay, this.meta.pageCount);
        for (let i = this.minInd; i < this.maxInd; i++) {
            const li = document.createElement('li');
            ul.append(li);

            const a = document.createElement('a');
            a.id = i;
            a.href = window.location.pathname + '?page=' + (i+1);
            a.textContent = i + 1;
            if (i === this.meta.page - 1) {
                a.classList.add('selected');
            }
            li.append(a);
        }
        

        const navNext = document.createElement('a');
        navNext.classList.add('page-nav');
        navNext.id = 'page-next';
        navNext.href = '#';
        navNext.innerHTML = '<i class="fa-solid fa-caret-right"></i>';
        nav.append(navNext);

        container.append(nav);
        return nav;
    }

    update(meta, container) {
        this.nav.remove();

        this.meta = meta;
        this.render(container);
    }

    input(action) {
        this.nav.addEventListener('click', async e => {
            e.preventDefault();

            let page = this.meta.page;
            if (e.target.id === 'page-prev') {
                if (page > 0) {
                    action.changePage(--page);
                }
            } else if (e.target.id === 'page-next') {
                if (page < this.meta.pageCount) {
                    action.changePage(++page);
                }
            } else if (e.target.id != '') { 
                const page = parseInt(e.target.id);
                action.changePage(page + 1);
            }
        });
    }

}

function clamp(n, min, max) {
    return Math.max(min, Math.min(n, max));
}
