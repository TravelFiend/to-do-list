import Component from '../Component.js';
import Header from '../common/Header.js';
import Loading from '../common/Loading.js';
import AddTodo from './AddTodo.js';
import TodoList from './TodoList.js';
import { getTodos, addTodo, updateTodo, removeTodo } from '../services/todo-api.js';

class TodoApp extends Component {

    async onRender(dom) {
        const header = new Header({ title: 'My Todos' });
        dom.prepend(header.renderDOM());
        
        const main = dom.querySelector('main');
        const error = dom.querySelector('.error');

        const newTodo = new AddTodo({
            onAdd: async todo => {
                error.textContent = '';

                try {
                    const todoToAdd = await addTodo(todo);
                    this.state.todos.push(todoToAdd);
                    list.update({ todos: this.state.todos });
                }
                catch (err){
                    error.textContent = err;
                    throw err;
                }
            }
        });
        main.prepend(newTodo.renderDOM());

        const list = new TodoList({ 
            todos: [],
            onUpdate: async todo => {
                error.textContent = '';

                try {
                    const todoToUpdate = await updateTodo(todo);
                    const todoState = this.state.todos;
                    const ind = todoState.indexOf(todo);
                    todoState.splice(ind, 1, todoToUpdate);
                    list.update({ todoState });
                }
                catch (err){
                    error.textContent = err;
                    throw err;
                }
            },
            onRemove: async todo => {
                error.textContent = '';
                try {
                    await removeTodo(todo.id);
                    const todoState = this.state.todos;
                    const ind = todoState.indexOf(todo);
                    todoState.splice(ind, 1);
                    list.update({ todoState });
                } catch (err) {
                    error.textContent = err;
                    throw err;
                }
            }
        });
        main.appendChild(list.renderDOM());


        const loading = new Loading({ loading: true });
        dom.appendChild(loading.renderDOM());

        // initial todo load:
        try {
            const todos = await getTodos();
            this.state.todos = todos;
            list.update({ todos });
        }
        catch (err) {
            console.log(`Failed to grab todos\n`, err);
        }
        finally {
            setTimeout(() => loading.update({ loading: false }), 750);
        }
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <!-- show errors: -->
                <p class="error"></p>
                <h1>THE LIST</h1>
                <main></main>
            </div>
        `;
    }
}

export default TodoApp;