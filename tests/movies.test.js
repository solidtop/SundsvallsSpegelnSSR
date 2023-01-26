import request from 'supertest';
import app from '../index.js';

const titles = ['Isle of dogs', 'The Shawshank Redemption', 'Encanto', 'Min granne Totoro'];

describe('Movies', () => {
    test('Movies show correct title', async () => {
        const res = await request(app)
            .get('/movies')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200);
        
        expect(titles.some(title => res.text.includes(title))).toBeTruthy();
    });

    test("Show 404 status when movie doesn't exist", async () => {
        const res = await request(app)
            .get('/movies/10')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(404);

        expect(res.text.includes('Page not found')).toBeTruthy();
    });
});



