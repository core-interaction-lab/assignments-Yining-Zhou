const todoTextarea = document.getElementById('todo-textarea');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoContainer = document.getElementById('todo-container');

const state = {
    todoItems: [],
};

const setTodoItems = items => {
    state.todoItems = items;
};

const addTodoItem = item => {
    const todoItemCopy = state.todoItems.slice();
    todoItemCopy.push(item);
    setTodoItems(todoItemCopy);
};

const removeTodoItem = index => {
    const todoItemCopy = state.todoItems.slice();
    todoItemCopy.splice(index,1);
    setTodoItems(todoItemCopy);

}

const buildTodoItem = (item,index) =>{
    const todoEl = document.createElement('article');
    const textEl = document.createElement('p');
    const deleteBtn = document.createElement ('button');

    deleteBtn.innerHTML = 'delete';

    deleteBtn.addEventListener('click',evt =>{
        removeTodoItem(index);
        buildTodoItems(state.todoItems);
    });

    textEl.innerHTML = item;
    todoEl.append(textEl, deleteBtn);
    return todoEl;
};

const buildTodoItems = items => {
    todoContainer.innerHTML = '';
    const todoItemEls = items.map(buildTodoItem);
    todoContainer.append(...todoItemEls);
}

const main = () => {
    addTodoBtn.addEventListener('click',evt => {
        const todoValue = todoTextarea.value;
        if (todoValue.length > 0){
            addTodoItem(todoValue);
            buildTodoItems(state.todoItems);
        }
    });
};

main();