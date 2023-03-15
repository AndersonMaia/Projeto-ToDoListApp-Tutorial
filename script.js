const listEl = document.getElementById("list");
const createBtnEl = document.getElementById("create");

let toDos = [];

createBtnEl.addEventListener("click", CreateNewToDo);

function CreateNewToDo() {
  const item = {
    id: new Date().getTime(),
    text: "",
    complete: false,
  };

  toDos.unshift(item);
  const { itemEl, inputEl } = CreateToDoElement(item);
  listEl.prepend(itemEl);
  inputEl.removeAttribute("disabled");
  inputEl.focus();

  Save();
}

function CreateToDoElement(item) {
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = item.complete;

  if (item.complete) {
    itemEl.classList.add("complete");
  }

  const inputEl = document.createElement("input");
  inputEl.type = "text";
  inputEl.value = item.text;
  inputEl.setAttribute("disabled", "");

  const actionsEl = document.createElement("div");
  actionsEl.classList.add("actions");

  const editBtnEl = document.createElement("button");
  editBtnEl.classList.add("material-icons");
  editBtnEl.innerText = "edit";

  const removeBtnEl = document.createElement("button");
  removeBtnEl.classList.add("material-icons", "remove-btn");
  removeBtnEl.innerText = "remove_circle";

  actionsEl.append(editBtnEl);
  actionsEl.append(removeBtnEl);

  itemEl.append(checkbox);
  itemEl.append(inputEl);
  itemEl.append(actionsEl);

  //EVENTS
  checkbox.addEventListener("change", () => {
    item.complete = checkbox.checked;

    if (item.complete) {
      itemEl.classList.add("complete");
    } else {
      itemEl.classList.remove("complete");
    }

    Save();
  });

  inputEl.addEventListener("input", () => {
    item.text = inputEl.value;
  });

  inputEl.addEventListener("blur", () => {
    inputEl.setAttribute("disabled", "");
    Save();
  });

  editBtnEl.addEventListener("click", () => {
    inputEl.removeAttribute("disabled");
    inputEl.focus();
  });

  removeBtnEl.addEventListener("click", () => {
    toDos = toDos.filter((t) => t.id != item.id);
    itemEl.remove();

    Save();
  });

  return { itemEl, inputEl, editBtnEl, removeBtnEl };
}

function displayToDos() {
  Load();

  for (let i = 0; i < toDos.length; i++) {
    const item = toDos[i];

    const { itemEl } = CreateToDoElement(item);

    listEl.append(itemEl);
  }
}

displayToDos();

function Save() {
  const save = JSON.stringify(toDos);
  localStorage.setItem("tarefas", save);
}

function Load() {
  const data = localStorage.getItem("tarefas");

  if (data) {
    toDos = JSON.parse(data);
  }
}
