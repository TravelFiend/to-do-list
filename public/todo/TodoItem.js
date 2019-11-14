import Component from '../Component.js';

class TodoItem extends Component {
    
    onRender(dom) {
        const todo = this.props.todo;
        console.log(todo);
        
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;

        const p = dom.querySelector('p');
        p.addEventListener('click', event => {
            event.preventDefault();
            
            todo.complete = !todo.complete;
            onUpdate(todo);
        });

        const trash = dom.querySelector('#getRid');
        trash.addEventListener('click', event => {
            event.preventDefault();
            
            onRemove(todo);
        });
    }

    renderHTML() {
        const todo = this.props.todo;
        
        return /*html*/`
            <li>
                <span id="getRid">
                    <i class="fas fa-trash-alt"></i>
                </span>
                <p class="${todo.complete ? 'completed' : ''}">${todo.task}</p>
            </li>
        `;
    }
}

export default TodoItem;