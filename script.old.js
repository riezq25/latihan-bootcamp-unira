let todos = [];

const baseUrl = "https://crudcrud.com/api/aff52cc0d3ea4ed29c22dd859ecb5539";
let todoEndpoint = `${baseUrl}/todos`;

loadTodos();

function addTodo(e) {
  e.preventDefault();
  const todo = document.getElementById("todo").value;
  if (todo) {
    insertTodo(todo);
  }
}

function insertTodo(todo) {
  fetch(todoEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      todo,
      done: false,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      todos.push(data);
      renderTodos();
      document.getElementById("todo").value = "";
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function loadTodos() {
  fetch(todoEndpoint)
    .then((response) => response.json())
    .then((data) => {
      todos = data;
      renderTodos();
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function listTemplate(todo) {
  const isDone = todo.done ? "text-decoration-line-through" : "";

  return `
  <li onclick="checkTodo('${todo._id}')"  class="list-group-item">
    <div class="d-flex justify-content-between">
      <span class="${isDone}">${todo.todo}</span>
      <button onclick="deleteTodo(event, '${todo._id}')" class="py-1 px-2 btn btn-sm btn-danger">
        <i class="fas fa-trash-alt fa-fw"></i>
      </button>
    </div>
  </li>
  `;
}

function renderTodos() {
  const listGroup = document.getElementById("listGroup");
  listGroup.innerHTML = todos.map(listTemplate).join("");
}

function deleteTodo(e, id) {
  e.stopPropagation();
  fetch(`${todoEndpoint}/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      todos = todos.filter((todo) => todo._id !== id);
      renderTodos();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function checkTodo(id) {
  const index = todos.findIndex((todo) => todo._id === id);
  todos[index].done = !todos[index].done;

  fetch(`${todoEndpoint}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      todo: todos[index].todo,
      done: todos[index].done,
    }),
  })
    .then((response) => {
      renderTodos();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
