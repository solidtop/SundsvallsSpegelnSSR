export default function getMovieTemplates() {
    const movies = [];
    for (let i = 0; i < 10; i++) {
        movies.push({
            id: null,
            attributes: {
                title: 'Generic Movie',
                intro: '',
                image: {
                    url: 'https://picsum.photos/640/560' 
                }
            }
        });
    }
    return movies;
}