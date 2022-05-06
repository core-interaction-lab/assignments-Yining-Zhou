const todoTextarea = document.querySelectorAll(".todo-textarea");
const resultAnswers = document.querySelectorAll(".result-answer");
const addTodoBtn = document.getElementById("add-todo-btn");
const todoContainer = document.getElementById("todo-container");

const state = {
  todoItems: [],
};

const setTodoItems = (items) => {
  state.todoItems = items;
};

const addTodoItem = (item) => {
  const todoItemCopy = state.todoItems.slice();
  todoItemCopy.push(item);
  setTodoItems(todoItemCopy);
};

const removeTodoItem = (index) => {
  const todoItemCopy = state.todoItems.slice();
  todoItemCopy.splice(index, 1);
  setTodoItems(todoItemCopy);
};

const buildTodoItem = (item, index) => {
  const todoEl = document.createElement("article");
  const textEl = document.createElement("p");
  const deleteBtn = document.createElement("button");

  deleteBtn.innerHTML = "delete";

  textEl.innerHTML = item;
};

const buildTodoItems = (items) => {
  todoContainer.innerHTML = "";
  const todoItemEls = items.map(buildTodoItem);
  todoContainer.append(...todoItemEls);
};

const main = () => {
  addTodoBtn.addEventListener("click", (evt) => {
    resultAnswers.forEach((el, i) => {
      el.textContent = todoTextarea[i].value;
    });
  });
};

main();
