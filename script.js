// buat variabel todos unutk menmapung data
let todos = [];

// baseUrl
const baseUrl = "https://crudcrud.com/api/aff52cc0d3ea4ed29c22dd859ecb5539";
// endpoint
let todoEndpoint = `${baseUrl}/todos`;

loadTodos();

function addTodo(e) {
  e.preventDefault();
  // ambil data dari inputan id todo
  const todo = document.getElementById("todo").value;

  // cek jika todo tidak kosong
  if (todo) {
    // ke crudcrud.com
    // insert data ke varibale todos
    // buat obejk data yg ingin dikirim
    const data = {
      todo: todo,
      done: false,
    };
    // buat fetch options
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(todoEndpoint, options)
      .then((response) => response.json())
      .then((data) => {
        todos.push(data);
        renderTodos();
        document.getElementById("todo").value = "";
        console.log(data);
      });
  }
}

function loadTodos() {
  fetch(todoEndpoint)
    .then((response) => response.json())
    .then((data) => {
      todos = data;
      renderTodos();
      console.log(data);
    });
}

function listTemplate(todo) {
  const name = todo.todo;
  const id = todo._id;
  const done = todo.done;
  const isDone = done ? "text-decoration-line-through" : "";

  return `
    <li class="list-group-item">
    <div class="d-flex justify-content-between">
      <span class="${isDone}">${name}</span>
      <button class="py-1 px-2 btn btn-sm btn-danger">
        <i class="fas fa-trash-alt fa-fw"></i>
      </button>
    </div>
  </li> 
    `;
}

function renderTodos() {
  const list = document.getElementById("listGroup");
  list.innerHTML = todos.map(listTemplate).join("");
}
