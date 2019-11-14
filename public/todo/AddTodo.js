import Component from '../Component.js';

class AddTodo extends Component {

    onRender(dom) {
        const onAdd = this.props.onAdd;
        const form = dom.querySelector('form');
        
        const input = dom.querySelector('input[name=new-todo]');
        
        form.addEventListener('submit', async event => {
            event.preventDefault();
            console.log(input.value);
            

            const newTodo = {
                task: input.value,
                complete: false
            };

            try {
                await onAdd(newTodo);
                // this only runs if no error:
                form.reset();
                document.activeElement.blur();
            }
            catch (err) {
                // nothing to do as App will show error,
                // but will keep form from clearing...
            }
        });
    }

    renderHTML() {
        return /*html*/`
            <section class="formee">
                <form>
                    <label for="new-todo">Add a ToDo: </label>
                    <input type="text" name="new-todo">
                    <button type="submit">Add it!</button>
                </form>
            </section>
        `;
    }
}

export default AddTodo;