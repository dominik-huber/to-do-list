const taskList = document.querySelector('.taskList');
const tasks = document.querySelectorAll('.form-check-input');
const addTaskBtn = document.querySelector('#addTaskBtn');
const deleteAllBtn = document.querySelector('#deleteAllBtn');
const buttonlist = document.querySelectorAll('.delete_button');

let tasknumber;

if (localStorage.getItem('tasknumber') == null) {
  tasknumber = 1;
  window.localStorage.setItem('tasknumber', JSON.stringify(tasknumber));
}
else {
  tasknumber = JSON.parse(localStorage.getItem('tasknumber'));
  // console.log(JSON.parse(localStorage.getItem('tasknumber')) + 'test');
}

document.addEventListener("DOMContentLoaded", () => {
  let i = 1;
  let j = 1;

  console.log(tasknumber);

  while (i < tasknumber) { 
    if(localStorage.getItem('task' + i) !== null){
      let task = JSON.parse(localStorage.getItem('task' + i));
      if (task.isDone == false) {
        createTask(task, i, false);
      }
    }
    i++
  }

  while (j < tasknumber) {
    if(localStorage.getItem('task' + j) !== null){
      let task = JSON.parse(localStorage.getItem('task' + j));
      if (task.isDone == true) {
        createTask(task, j, true);
      }
    }
    j++;
  }

});

deleteAllBtn.addEventListener('click', (e) => {
  window.localStorage.clear();
  taskList.innerHTML = '';
})

addTaskBtn.addEventListener('click', (e) => {
  const taskName = document.querySelector('#taskName').value;

  if (taskName !== '') {

    const task = {
      name: taskName,
      isDone: false,
      id: tasknumber
    }

    window.localStorage.setItem('task' + tasknumber, JSON.stringify(task));
    createTask(task, tasknumber);

    tasknumber++;
    window.localStorage.setItem('tasknumber', JSON.stringify(tasknumber));
  }
})

function createTask(taskObject, taskID, status) {
  const element = document.createElement('div');
  element.classList.add('task', 'mt-3');
  element.innerHTML =
    `<div class="row justify-content-center flex-row flex-wrap align-items-center">
  <div class="col-9">
    <div class="input-group ${taskObject.isDone ? 'disable' : ''}">
      <div class="input-group-text">
        <input class="form-check-input mt-0" type="checkbox" data-taskNumber="${taskID}" value="" id="${'markTask' + taskID}"
          aria-label="Checkbox for following text input" ${taskObject.isDone ? 'checked' : ''} />
      </div>
      <input type="text" class="form-control" aria-label="Text input with checkbox" placeholder="" value="${taskObject.name}" id="${'taskText' + taskID}"
        disabled />
    </div>
  </div>
  <div class="col-3">
    <button class="btn btn-primary" id="${'editTask' + taskID}">
      <i class="bi-pencil-square"></i>
    </button>
    <button class="btn btn-primary delete_button ms-3" id="${'deleteTask' + taskID}">
      <i class="bi-trash"></i>
    </button>
  </div>
</div>`;


  if (status == true) {
    taskList.append(element);
  }else{
    taskList.prepend(element);
  }

  document.getElementById('markTask' + taskID).addEventListener("click", function () {
    markTask(this)
  });
  document.getElementById('deleteTask' + taskID).addEventListener("click", deleteTask);
  document.getElementById('editTask' + taskID).addEventListener("click", editTask);
}

function deleteTask() {
  let taskID = this.id.charAt(this.id.length - 1);
  this.parentElement.parentElement.parentElement.remove()
  window.localStorage.removeItem("task"+taskID);
}

function markTask(button) {
  button.parentElement.parentElement.classList.toggle('disable');
  // Toggle class "done" of the clicked task
  const taskDisabled = button.closest(".task")
  //taskDisabled.classList.toggle('done');

  // get current task out of local storage
  const currentTask = window.localStorage.getItem('task' + button.dataset.tasknumber);
  const currenTaskParsed = JSON.parse(currentTask);

  // Check if task has class done and give position and change the value of isDone
  if (button.parentElement.parentElement.classList.contains("disable")) {
    taskList.append(taskDisabled)
    currenTaskParsed.isDone = true;
  }
  else {
    taskList.prepend(taskDisabled);
    currenTaskParsed.isDone = false;
  }
  // save the task back to local storage
  const saveTask = JSON.stringify(currenTaskParsed);
  localStorage.setItem("task" + button.dataset.tasknumber, saveTask);
}

function editTask() {
  let taskID = this.id.charAt(this.id.length - 1);
  let taskInput = document.getElementById("taskText" + taskID);

  const task = window.localStorage.getItem('task' + taskID);
  const taskParsed = JSON.parse(task);

  let taskValue = taskInput.value;

  if (taskInput.disabled) {
    taskInput.removeAttribute("disabled");
    taskInput.focus();
  } else {
    taskInput.setAttribute("disabled", "true");
    taskInput.setAttribute('value', taskValue);
    taskParsed.name = taskValue
    window.localStorage.setItem('task' + taskID, JSON.stringify(taskParsed));
  }
}