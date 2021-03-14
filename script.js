const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
  todos.forEach((todo) => addTodo(todo));
}

function updateLS() {
  todosEl = document.querySelectorAll('li');

  const todos = [];

  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      complete: todoEl.classList.contains('complete'),
    });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const todoEl = document.createElement('li');
    if (todo && todo.complete) {
      todoEl.classList.add('complete');
    }
    todoEl.innerText = todoText;

    todoEl.addEventListener('click', () => {
      todoEl.classList.toggle('complete');
      updateLS();
    });

    todoEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();

      todoEl.remove();
      updateLS();
    });

    todosUL.appendChild(todoEl);

    input.value = '';

    updateLS();
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  addTodo();
});
