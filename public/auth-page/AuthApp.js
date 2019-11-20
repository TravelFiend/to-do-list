import Component from '../Component.js';
import UserSignIn from './UserSignIn.js';
import UserSignUp from './UserSignUp.js';
import Header from '../common/Header.js';
import { signIn, signUp } from '../services/todo-api.js';

const success = user => {
    localStorage.setItem('TOKEN', user.token);
    localStorage.setItem('USER', user.shownName);
    const searchParams = new URLSearchParams(location.search);
    location = searchParams.get('redirect') || './todo.html';
};

class AuthApp extends Component {
    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const user = localStorage.getItem('USER');
        if (user) {
            const logout = dom.querySelector('.logout');
            logout.addEventListener('click', () => {
                localStorage.removeItem('USER');
                localStorage.removeItem('TOKEN');
                this.update();
            });
            return;
        }
        const errors = dom.querySelector('.error');
        const signUpSpot = dom.querySelector('#sign-up-spot');
        const signInSpot = dom.querySelector('#sign-in-spot');

        const userSignUp = new UserSignUp({
            onSignUp: async newUser => {
                try {
                    const user = await signUp(newUser);
                    success(user);
                } catch (err) {
                    errors.textContent = err;
                    throw err;
                }
            }
        });
        signUpSpot.prepend(userSignUp.renderDOM());

        const userSignIn = new UserSignIn({
            onSignIn: async newUser => {
                try {
                    const user = await signIn(newUser);
                    success(user);
                } catch (err) {
                    errors.textContent = err;
                    throw err;
                }
            }
        });
        signInSpot.prepend(userSignIn.renderDOM());

        const toggleToSignIn = dom.querySelector('#to-sign-in');
        toggleToSignIn.addEventListener('click', () => {
            signInSpot.classList.remove('hidden');
            signUpSpot.classList.add('hidden');
        });

        const toggleToSignUp = dom.querySelector('#to-sign-up');
        toggleToSignUp.addEventListener('click', () => {
            signUpSpot.classList.remove('hidden');
            signInSpot.classList.add('hidden');
        });
    }

    renderHTML() {
        const user = localStorage.getItem('USER');

        if (user) {
            return /*html*/ `
            <div>
                <main class="container">
                    <section class="logout-section">
                        <p>Signed in as ${user}</p>
                        <button class="logout auth-button">Logout</button>
                    </section>
                </main>
            </div>
            `;
        }
        return /*html*/ `
        <div>
            <main class="container">
                <div class="error"></div>
                <section class="hidden" id="sign-up-spot">
                    <div class="toggle">
                        <button class="auth-button" id="to-sign-in">Already have an account?</button>
                    </div>
                </section>

                <section id="sign-in-spot">
                    <div class="toggle">
                        <button class="auth-button" id="to-sign-up">Sign Up</button>
                    </div>
                </section>
            </main>
        </div>
        `;
    }
}

export default AuthApp;