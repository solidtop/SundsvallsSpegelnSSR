export default class CarouselHandler {

    constructor() {
        this.slidesContainer = document.querySelector('.carousel-slides');
        this.slide = document.querySelector('.slide');
        this.pages = document.querySelectorAll('.slide-page');
        const prevButton = document.querySelector('#slide-arrow-prev');
        const nextButton = document.querySelector('#slide-arrow-next');
        const slideWidth = this.slide.clientWidth;
        this.currentPage = Math.round(this.slidesContainer.scrollLeft / slideWidth);
        this.pages[this.currentPage].classList.add('selected');

        this.pages.forEach((page, i) => {
            page.addEventListener('click', e => {
                if (!e.target.classList.contains('selected')) {
                    this.currentPage = i;
                    this.changeSlide();
                }    
            });
        });

        prevButton.addEventListener('click', () => {
            this.currentPage --;
            if (this.currentPage < 0)  {
                this.currentPage = this.pages.length - 1;
            }
            this.changeSlide();
        });

        nextButton.addEventListener('click', () => {
            this.currentPage ++;
            if (this.currentPage >= this.pages.length)  {
                this.currentPage = 0;
            }
            this.changeSlide();
        });

        window.addEventListener('resize', () => {
            const slideWidth = this.slide.clientWidth;
            this.slidesContainer.scrollTo({
                left: slideWidth * this.currentPage,
                behavior: 'instant',
            });
        });
    }

    changeSlide() {
        const page = Array.from(this.pages)[this.currentPage];
        const selected = document.querySelector('.slide-page.selected');
        if (selected !== null) {
            page.classList.add('selected');
            selected.classList.remove('selected');
        }
        const slideWidth = this.slide.clientWidth;
        this.slidesContainer.scrollLeft = slideWidth * this.currentPage;
    }
}
