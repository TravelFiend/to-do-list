import Component from '../Component.js';

class UserSignUp extends Component {
    onRender(dom) {
        const onSignUp = this.props.onSignUp;

        dom.addEventListener ('submit', event => {
            event.preventDefault();

            const formData = new FormData(dom);
            console.log(formData.get('name'));

            const user = {
                shownName: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password')
            };
            onSignUp(user);
        });
    }

    renderHTML() {
        return /*html*/`
            <form id="sign-in-form">
                <div>
                    <label for="name"><label>
                    <input class="user-input" id="name" name="name" placeholder="Your Name" />
                </div>
                <div>
                    <label for="email"><label>
                    <input class="user-input" id="email" name="email" type="email" placeholder="Email"/>
                </div>
                <div>
                    <label for="password"><label>
                    <input class="user-input" id="password" name="password" type="password" placeholder="Password"/>
                </div>
                <button type="submit" class="auth-button">Create Account</button>
            </form>
        `;
    }
}

export default UserSignUp;