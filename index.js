import express from 'express';
import pug from 'pug';
import { marked } from 'marked';
import router from './src/routes.js';
import getDropdownMenu from './src/menus.js';


const app = express();
app.set('view engine', 'pug');
app.locals.marked = marked; //Save marked func in locals so it can be used in template files
app.locals.dropdownMenu = getDropdownMenu();

//Routes
app.use(router);        

//Static files
app.use('/', express.static('public'));

app.listen(5080, () => {
    console.log('Listening on port 5080');
});

export default app;