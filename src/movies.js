import fetch from "node-fetch";

const API_URL = 'https://plankton-app-xhkom.ondigitalocean.app/api/movies';

export async function fetchMovies() {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data.data;
}

export async function fetchMovie(id) {
    const res = await fetch(API_URL + id);
    const data = await res.json();
    return data.data;
} 