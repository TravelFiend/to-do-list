import Component from '../Component.js';

class TodoItem extends Component {
    
    onRender(dom) {
        const todo = this.props.todo;
        console.log(todo);
        
        // const onUpdate = this.props.onUpdate;
        // const onRemove = this.props.onRemove;

        
    }

    renderHTML() {
        const todo = this.props.todo;
        
        return /*html*/`
            <li>
                <p class="task"><span><i class="fas fa-trash-alt"></i></span>${todo.task}</p>
            </li>
        `;
    }
}

export default TodoItem;