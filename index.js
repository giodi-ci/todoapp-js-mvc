class Model {
    constructor() {
        this.todos = [
            {
                id: 1,
                text: 'Plant the tulipanes',
                complete: false,
            },
            {
                id: 2,
                text: 'Prepare the dinner',
                complete: false,
            },
        ];
    }

    addTodo(todoText) {
        const todo = {
            id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
            text: todoText,
            complete: false,
        };

        this.todos.push(todo);
    }

    editTodo(id, newText) {
        this.todos = this.todos.map(todo =>
            todo.id === id ? { id: todo.id, text: newText, complete: todo.complete } : todo
        );
    }

    toggleTodo(id) {
        this.todos = this.todos.map(todo =>
            todo.id === id ? { id: todo.id, text: todo.text, complete: !todo.complete } : todo
        );
    }
}

class View {
    constructor() {
        this.app = this.getElement('#app');

        this.title = this.createElement('h1');
        this.title.textContent = 'Todos List';

        this.form = this.createElement('form');

        this.input = this.createElement('input');
        this.input.type = 'text';
        this.input.placeholder = 'Add todo';
        this.input.name = 'todo';

        this.submitButton = this.createElement('button');
        this.submitButton.textContent = 'Add';

        this.todoList = this.createElement('ul', 'todo-list');

        this.form.append(this.input, this.submitButton);

        this.app.append(this.title, this.form, this.todoList);
    }

    get _todoText() {
        return this.input.value;
    }

    _resetInput() {
        this.input.value = '';
    }

    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) {
            element.classList.add(className);
        }

        return element;
    }

    getElement(selector) {
        const element = document.querySelector(selector);

        return element;
    }

    displayTodos(todos) {
        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild);
        }

        if (todos.length === 0) {
            const paragraph = this.createElement('p');
            paragraph.textContent = 'Nothing to do! Add a task?';

            this.todoList.append(paragraph);
        } else {
            todos.forEach((todo) => {
                const li = this.createElement('li');
                li.id = todo.id;

                const checkbox = this.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = todo.complete;

                const span = this.createElement('span');
                span.contentEditable = true;
                span.classList.add('editable');

                if (todo.complete) {
                    const strike = this.createElement('s');
                    strike.textContent = todo.text;
                    span.append(strike);
                } else {
                    span.textContent = todo.text;
                }

                const deleteButton = this.createElement('button', 'delete');
                deleteButton.textContent = 'Delete';
                li.append(checkbox, span, deleteButton);

                this.todoList.append(li);
            });
        }
    }

}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
}

const app = new Controller(new Model(), new View());
