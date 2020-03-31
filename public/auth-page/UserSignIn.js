import Component from '../Component.js';

class UserSignIn extends Component {

    onRender(dom) {
        const onUserSignIn = this.props.onSignIn;

        dom.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(dom);

            const creds = {
                email: formData.get('email'),
                password: formData.get('password')
            };
            onUserSignIn(creds);
        });
    }

    renderHTML() {
        return /*html*/ `
            <form class="auth-form-sign-in">
                <div id="inputs">
                    <p class="labels">
                        <label for="signin-email">Email: </label>
                        <label for="signin-password">Password: </label>
                    </p>
                    <p class="inputs">
                        <input id="signin-email" type="email" name="email" required placeholder="email@email.com">
                        <input id="signin-password" type="password" name="password" required>
                    </p>
                </div>
                    <p>
                        <button class="auth-button">Sign In</button>
                    </p>
            </form>
        `;
    }
}
export default UserSignIn;