import Component from '../Component.js';
import TodoItem from './TodoItem.js';

class TodoList extends Component {
    
    onRender(list) {
        const todos = this.props.todos;
        
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;
        
        todos.forEach(todo => {
            const oneTodo = new TodoItem({ todo });
            list.appendChild(oneTodo.renderDOM());
        });
    }
    renderHTML() {
        return /*html*/`
            <ul class="todos"></ul>
        `;
    }
}

export default TodoList;
