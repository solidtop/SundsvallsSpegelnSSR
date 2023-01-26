import express from 'express';
import pug from 'pug';
import router from './src/routes.js';

const app = express();
app.set('view engine', 'pug');

//Routes
app.use(router);        

//Static files
app.use('/', express.static('public'));

app.listen(5080, () => {
    console.log('Listening on port 5080');
});

export default app;