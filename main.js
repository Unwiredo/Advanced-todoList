class todoList{
    todoList = JSON.parse(localStorage.getItem('todos')) || [];

    addBtn = document.querySelector('.js-add-button');
    inputElement = document.querySelector('.js-todo-input');
    todoContainer = document.querySelector('.js-todos-container');
    popupElement = document.querySelector('.js-popup');

    renderTodoList(){
        let todoListHTML = '';

        this.todoList.forEach((todo, index) => {
            const {name} = todo;
            const html = `<div class="todoDiv">
                <button class="js-check-button checked ${todo.done? 'is-checked': ''}"></button>
                <p ${todo.done? 'text-checked': ''}>${name}</p>
                <button class="js-edit-button edit-button"><i class="fa fa-pen"></i></button>
                <button class="js-delete-button delete-button" data-index="${index}"><i class="fa fa-trash"></i></button>
            </div>`;
            todoListHTML+=html;
        });
        
        this.todoContainer.innerHTML = todoListHTML;

        document.querySelectorAll('.js-delete-button').forEach(button => {
            const index = Number(button.dataset.index);
            button.addEventListener('click', () => this.removeTodo(index));
        });

        document.querySelectorAll('.js-check-button')
            .forEach((checkButton, i)=> {
                checkButton.addEventListener('click', () =>{
                    this.todoList[i].done = !this.todoList[i].done;
                    this.saveToLocalStorage();
                    this.renderTodoList();
                })
            });

        
    }
    
    addTodo(){
        const todo = this.inputElement.value;
        
        if(this.inputElement.value === ''){
            this.popupElement
                .innerHTML = `
                <div class="error-popup">
                    <div class="error-image"></div>
                    <div>
                        <p class="popup-paragraph">Error: Please a name to your task...
                    </div>
                    <div class="ok-button">
                        <button class="js-ok popup-ok">Ok</button>
                    </div>
                </div>
                `
                this.removePopup();
        }else{
            this.todoList.push({
            name: todo
            });
        }

        this.inputElement.value = '';
        this.renderTodoList();
        this.saveToLocalStorage();
    }

    removeTodo(index){
        this.todoList.splice(index, 1);
        this.renderTodoList();
        this.saveToLocalStorage();
    }

    saveToLocalStorage(){
        localStorage.setItem('todos', JSON.stringify(this.todoList));
    }

    removePopup(){
        document.querySelector('.js-ok')
            .addEventListener('click', () => {
                document.querySelector('.js-popup').innerHTML = '';
            })
    }
}

const todoListInstance = new todoList();

todoListInstance.addBtn.addEventListener('click',() => todoListInstance.addTodo());

todoListInstance.renderTodoList();
