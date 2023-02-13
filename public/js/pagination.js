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

        const pageFirst = document.createElement('a');
        pageFirst.classList.add('page-nav');
        pageFirst.id = 'page-first';
        pageFirst.href = '#';
        pageFirst.innerHTML = '<i class="fa-solid fa-angles-left"></i>';
        nav.append(pageFirst);

        const navPrev = document.createElement('a');
        navPrev.classList.add('page-nav');
        navPrev.id = 'page-prev';
        navPrev.href = '#';
        navPrev.innerHTML = '<i class="fa-solid fa-caret-left"></i>';
        nav.append(navPrev);

        if (this.meta.page === 1) {
            pageFirst.classList.add('disabled');
            navPrev.classList.add('disabled');
        }

        const ul = document.createElement('ul');
        ul.classList.add('page-list');
        nav.append(ul);

        let startIdx = 0;
        if (this.meta.page >= 5) {
            startIdx = clamp(this.meta.page-2, 0, (this.meta.pageCount-1) - (this.pagesToDisplay-1))
        }
        const endInd = Math.min(startIdx + this.pagesToDisplay, this.meta.pageCount);

        for (let i = startIdx; i < endInd; i++) {
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

        const pageLast = document.createElement('a');
        pageLast.classList.add('page-nav');
        pageLast.id = 'page-last';
        pageLast.href = '#';
        pageLast.innerHTML = '<i class="fa-solid fa-angles-right"></i>';
        nav.append(pageLast);

        if (this.meta.page === this.meta.pageCount) {
            pageLast.classList.add('disabled');
            navNext.classList.add('disabled');
        }

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
            const pageCount = this.meta.pageCount;
            switch(e.target.id) {
                case 'page-prev':
                    if (page > 1) {
                        action.changePage(--page);
                    }
                    break;

                case 'page-next':
                    if (page < pageCount) {
                        action.changePage(++page);
                    }
                    break;
                
                case 'page-first':
                    if (page !== 1) {
                        action.changePage(1);
                    }
                    break;

                case 'page-last':
                    if (page !== pageCount) {
                        action.changePage(pageCount);
                    }
                    break;
                    
                default: 
                    if (e.target.id != '') { 
                        const page = parseInt(e.target.id);
                        if (this.meta.page !== page+1) {
                            action.changePage(page + 1);
                        }
                    }
                    break;

            }
        });
    }

}

function clamp(n, min, max) {
    return Math.max(min, Math.min(n, max));
}
