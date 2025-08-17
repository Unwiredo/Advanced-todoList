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
                <p class="${todo.done? 'text-checked': ''}">${name}</p>
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

        document.querySelectorAll('.js-edit-button')
            .forEach((editButton, index) => {
                editButton.addEventListener('click', () => this.editTodo(index));
            });
    }
    
    addTodo(){
        const todo = this.inputElement.value.trim();
        
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

    editTodo(index){
        const todoItem = this.todoContainer.querySelectorAll('.todoDiv')[index];
        const todoText = todoItem.querySelector('p');

        const input = document.createElement("input");
        input.type = 'text';
        input.value = this.todoList[index].name;
        input.classList.add('input-edit');
        input.name = "edit todo name";

        const textWidth = todoText.offsetWidth;
        const textHeight = todoText.offsetHeight;

        input.style.width = textWidth + "px";
        input.style.height = textHeight + "px";

        todoItem.replaceChild(input, todoText);
        input.focus();

        const save = () => {
            const newName = input.value.trim();
            if(newName !== ''){
                this.todoList[index].name = newName;
                this.saveToLocalStorage();
            }
            this.renderTodoList();
        }

        input.addEventListener('keydown', (e) => {
            if(e.key === 'Enter'){
                save();
            }
        });

        input.addEventListener('blur', save);
    }
}

const todoListInstance = new todoList();

todoListInstance.addBtn.addEventListener('click',() => todoListInstance.addTodo());

todoListInstance.inputElement.addEventListener('keydown', (e) => {
    if(e.key === "Enter"){
        todoListInstance.addTodo();
    }
})

todoListInstance.renderTodoList();
