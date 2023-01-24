export function sortByDate(movies, newest = true) {
    return movies.sort((a, b) => {
        const date1 = new Date(a.attributes.publishedAt);
        const date2 = new Date(b.attributes.publishedAt);
        return newest ? date2 - date1 : date1 - date2;
    });  
}