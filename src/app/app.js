const choo = require('choo');
const githubStore = require('./stores/github.js');
const mainPage = require('./views/main-page.js');

const app = choo();

if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')());
}

app.use(githubStore);

app.route('/', mainPage);

app.mount('body');
