class todoList{
    todoList = JSON.parse(localStorage.getItem('todos')) || [];

    addBtn = document.querySelector('.js-add-button');
    inputElement = document.querySelector('.js-todo-input');
    todoContainer = document.querySelector('.js-todos-container');

    renderTodoList(){
        let todoListHTML = '';

        this.todoList.forEach((todo, index) => {
            const {name} = todo;
            const html = `<div class="todoDiv">
                <button class="js-check-button checked"></button>
                <p>${name}</p>
                <button><i class="fa fa-pen"></i></button>
                <button class="js-delete-button" data-index="${index}"><i class="fa fa-trash"></i></button>
            </div>`;
            todoListHTML+=html;
        });
        
        this.todoContainer.innerHTML = todoListHTML;

        document.querySelectorAll('.js-delete-button').forEach(button => {
            const index = Number(button.dataset.index);
            button.addEventListener('click', () => this.removeTodo(index));
        });
    }
    
    addTodo(){
        const todo = this.inputElement.value;
        this.todoList.push({
            name: todo
        });
        this.inputElement.value = '';
        this.renderTodoList();
        localStorage.setItem('todos', JSON.stringify(this.todoList));
    }

    removeTodo(index){
        this.todoList.splice(index, 1);
        this.renderTodoList();
        localStorage.setItem('todos', JSON.stringify(this.todoList));
    }

    checkButton(){

    }
}

const todoListInstance = new todoList();

todoListInstance.addBtn.addEventListener('click',() => todoListInstance.addTodo());

todoListInstance.renderTodoList();
