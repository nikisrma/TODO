const taskDescriptionInput = document.getElementById("taskDescription");
const plusIcon = document.getElementById("plusIcon");

taskDescriptionInput.addEventListener("input", updateIconVisibility);
taskDescriptionInput.addEventListener("focus", updateIconVisibility);
taskDescriptionInput.addEventListener("blur", updateIconVisibility);

let currentSelectedButton = document.getElementById("all");

function updateButtonStyle(button) {
  if (currentSelectedButton) {
    currentSelectedButton.style.fontWeight = "normal";
  }
  button.style.fontWeight = "bold";
}
function updateIconVisibility(event) {
  if (event.type === "keypress" && event.keyCode === 13) {
    event.preventDefault();
  }

  if (taskDescriptionInput.value.trim() !== "") {
    plusIcon.style.display = "inline-block";
  } else {
    plusIcon.style.display = "none";
  }
}

let tasks = [
  { _id: 1, task: "Drink Coffee", status: "completed" },
  { _id: 2, task: "Wake Up", status: "uncomplete" },
  { _id: 3, task: "23123 Up", status: "uncomplete" },
];

var tasksLeft = tasks.filter((item) => item.status == "uncomplete");
document.getElementById("tasksLeft").textContent =tasksLeft.length + " tasks left";

const dynamicListContainer = document.getElementById("dynamic-list-container");
const ul = document.getElementById("lists");

function addTaskToList(i) {
  const li = document.createElement("li");
  li.classList.add("list-group-item");
  li.id = "listItem" + i._id;

  const div = document.createElement("div");
  div.classList.add(
    "custom-control",
    "custom-checkbox",
    "d-flex",
    "align-items-center"
  );
  div.style.marginLeft = "1em";
  div.style.paddingLeft = "2em";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("custom-control-input");
  checkbox.id = "task" + i._id;
  checkbox.checked = i.status === "completed";
  checkbox.onchange = function () {
    selectTasks(this, i._id);
  };
  checkbox.style.cursor = 'pointer';

  const label = document.createElement("label");
  label.classList.add("custom-control-label");
  label.htmlFor = "task" + i._id;
  label.textContent = i.task;
  label.style.cursor = 'pointer';

  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("btn", "btn-primary", "ml-auto");
  button.textContent = i.category;

  const icon = document.createElement("i");
  icon.classList.add("fas", "fa-times-circle", "ml-auto");
  icon.style.marginRight = "1em";
  icon.style.paddingRight = "2em";
  icon.style.cursor = 'pointer';
  icon.onclick = function () {
    deleteTask(i._id);
  };
  // button.textContent = i.category;

  div.appendChild(checkbox);
  div.appendChild(label);
  div.appendChild(icon);

  li.appendChild(div);
  ul.appendChild(li);
}

showList();

function showList() {
  ul.innerHTML = "";
  tasks.forEach((i) => {
    addTaskToList(i);
  });

  updateButtonStyle(document.getElementById("all"));
  currentSelectedButton = document.getElementById("all");
}

// Append the unordered list to the container
dynamicListContainer.appendChild(ul);

// Function to add a new task
function addTask() {
  const taskDescription = document.getElementById("taskDescription").value;

  if (taskDescription.trim() === "") {
    return;
  }
  let data = {
    _id: tasks.length + 1,
    task: taskDescription,
    status: "uncomplete",
  };
  tasks.push(data);
  addTaskToList(data);
  updateTasksLeft();
  document.getElementById("taskDescription").value = "";
}

// update the status of task
function selectTasks(checkbox, taskId) {
  const taskIndex = tasks.findIndex((task) => task._id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex].status = checkbox.checked ? "completed" : "uncomplete";
  }
  updateTasksLeft();
}

// Function to update the number of tasks left
function updateTasksLeft() {
  const taskList = document.getElementById("lists");
  tasksLeft = tasks.filter((item) => item.status == "uncomplete");
  document.getElementById("tasksLeft").textContent =
    tasksLeft.length + " tasks left";
}

// Function to delete task
function deleteTask(taskId) {
  const index = tasks.findIndex((obj) => obj._id === taskId);
  tasks.splice(index, 1);
  const elementToRemove = document.getElementById("listItem" + taskId);
  elementToRemove.remove();
  updateTasksLeft();
}

// Function to complete all task
function completeAllTasks() {
  for (let i = 0; i < tasks.length; i++) {
    tasks[i]["status"] = "completed";
  }
  updateCheckboxes(tasks, "completed");
  updateTasksLeft();
}

// Function to update checkboxes completed task
function updateCheckboxes(list, status) {
  const taskList = document.getElementById("lists");
  const listItems = taskList.getElementsByTagName("li");
  for (let i = 0; i < listItems.length; i++) {
    const checkbox = listItems[i].querySelector("input[type='checkbox']");
    checkbox.checked = status == "completed" ? true : false;
  }
}

// Function to delete all completed task
function deleteAllcompleteTasks() {
  const completedTasks = tasks.filter((task) => task.status === "completed");
  completedTasks.forEach((completedTask) => {
    const elementToRemove = document.getElementById("listItem" + completedTask._id);
    if (elementToRemove) {
      elementToRemove.remove();
    }
  });

  tasks = tasks.filter((task) => task.status !== "completed");
  updateTasksLeft();
}

// Function to show all completed task
function showCompletedTasks(){
  const completeTasks = tasks.filter((task) => task.status === "completed");
  ul.innerHTML = "";
  completeTasks.forEach((task) => {
    addTaskToList(task);
  });
  updateCheckboxes(completeTasks, "completed");
  updateTasksLeft();
  updateButtonStyle(document.getElementById("completed"));
  currentSelectedButton = document.getElementById("completed");
}


// Function to shoow all uncompleted task
function ShowUnCompletedTasks(){
  const uncompleteTasks = tasks.filter((task) => task.status === "uncomplete");
  ul.innerHTML = "";
  uncompleteTasks.forEach((task) => {
    addTaskToList(task);
  });
  updateTasksLeft();
  updateButtonStyle(document.getElementById("uncomplete"));
  currentSelectedButton = document.getElementById("uncomplete");
}
// Event listener for the "plusIcon" to add a task
document.getElementById("plusIcon").addEventListener("click", addTask);
