import AuthApp from './AuthApp.js';

const authApp = new AuthApp();
document.body.prepend(authApp.renderDOM());