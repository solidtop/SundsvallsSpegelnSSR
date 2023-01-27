import express from 'express';
import pug from 'pug';
import { marked } from 'marked';
import router from './src/routes.js';

const app = express();
app.set('view engine', 'pug');
app.locals.marked = marked;

//Routes
app.use(router);        

//Static files
app.use('/', express.static('public'));

app.listen(5080, () => {
    console.log('Listening on port 5080');
});

export default app;