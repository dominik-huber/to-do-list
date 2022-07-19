const taskList = document.querySelector('.taskList');
const tasks = document.querySelectorAll('.form-check-input');
const buttonlist = document.querySelectorAll('.delete_button');
let tasknumber = 1;
var shallow = 'shallow is cool';

//Goal: I click on the button and a new todo gets added
//1- retrieve the button and save it into a variable
const addTaskBtn = document.querySelector('#addTaskBtn');

// if (!task == "") {
// }

//2- attach event (click) to the button
addTaskBtn.addEventListener('click', (e) => {
  // 3.1 retrieve the value of the text typed inside the input and save it into a variable
  const taskName = document.querySelector('#taskName').value;

  //creeate task object and save it to local storage
  const task = {
    name: taskName,
    isDone: false,
    id: tasknumber
  }
  window.localStorage.setItem('task' + tasknumber, JSON.stringify(task));

  //3- event handler
  // 3.2 create an element and store it into a variable
  const element = document.createElement('div');
  /*const id = hashCode(taskName) +'';
  element.setAttribute('id',id);*/
  element.classList.add('task', 'mt-3');

  // 3.3 add the value of the task as innerText to the newly create element
  element.innerHTML = `
  <div class="row justify-content-center flex-row flex-wrap align-items-center">
    <div class="col-9">
      <div class="input-group">
        <div class="input-group-text">
          <input class="form-check-input mt-0" type="checkbox" data-taskNumber="${tasknumber}" value="" id="${'markTask' + tasknumber}"
            aria-label="Checkbox for following text input" />
        </div>
        <input type="text" class="form-control" aria-label="Text input with checkbox" placeholder="${taskName}" id="${'taskText' + tasknumber}"
          disabled />
      </div>
    </div>
    <div class="col-3 d-flex">
      <button class="btn btn-primary" id="${'editTask' + tasknumber}">
        <i class="bi-pencil-square"></i>
      </button>
      <button class="btn btn-primary delete_button ms-3" id="${'deleteTask' + tasknumber}">
        <i class="bi-trash"></i>
      </button>
    </div>
  </div>`;
  // 3.4 target the spot in the html where you want to inject the newly created element
  taskList.prepend(element);

  //attach eventlisteners to all buttons and call the functions
  document.getElementById('markTask' + tasknumber).addEventListener("click", function () {
    markTask(this)
  });
  document.getElementById('deleteTask' + tasknumber).addEventListener("click", deleteTask);
  document.getElementById('editTask' + tasknumber).addEventListener("click", editTask);
  //icnrease tasknumber for every new task id
  tasknumber++;
})

//delete the task clicked
function deleteTask() {
  this.parentElement.parentElement.parentElement.remove()
}

//mark the task clicked as done
function markTask(button) {
  // Toggle Class "disable" of the parent div of the task after clicking the checkbox
  // and automatically uncheck the checkbox
  button.parentElement.parentElement.classList.toggle('disable');
  // Toggle class "done" of the clicked task
  const taskDisabled = button.closest(".task")
  taskDisabled.classList.toggle('done');
  
  // get current task out of local storage
  const currentTask = window.localStorage.getItem('task' + button.dataset.tasknumber);
  const currenTaskParsed = JSON.parse(currentTask);
  
  // Check if task has class done and give position and change the value of isDone
  if (taskDisabled.classList.contains("done")) {
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

// edit the task clicked
function editTask() {
  let taskID = this.id.charAt(this.id.length - 1);
  let taskInput = document.getElementById("taskText" + taskID);
  let taskValue = taskInput.value;

  if (taskInput.disabled) {
    taskInput.removeAttribute("disabled");
    taskInput.focus();
  } else {
    taskInput.setAttribute("disabled", "true");
    taskInput.setAttribute('value', taskValue);
  }
}