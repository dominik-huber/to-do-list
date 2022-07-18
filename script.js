// from Google
/*function hashCode(str) {
  var hash = 0, i, chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
*/
const taskList = document.querySelector('.taskList');
const tasks = document.querySelectorAll('.form-check-input');
const buttonlist = document.querySelectorAll('.delete_button');
let tasknumber = 1;
//Goal: I click on the button and a new todo gets added
//1- retrieve the button and save it into a variable
const addTaskBtn = document.querySelector('#addTaskBtn');

//2- attach event (click) to the button
addTaskBtn.addEventListener('click', (e) => {
  //3- write the event handler
  // 3.1 retrieve the value of the text typed inside the input and save it into a variable
  const taskName = document.querySelector('#taskName').value;
  // 3.2 create an element and store it into a variable
  const element = document.createElement('div');
  /*const id = hashCode(taskName) +'';
  element.setAttribute('id',id);*/
  element.classList.add('task','mt-3');
  
  // 3.3 add the value of the task as innerText to the newly create element
  element.innerHTML = `          
  <div class="row justify-content-center flex-row flex-wrap align-items-center">
    <div class="col-9">
      <div class="input-group">
        <div class="input-group-text">
          <input class="form-check-input mt-0" type="checkbox" value="" id="${'markTask' + tasknumber }"
            aria-label="Checkbox for following text input" />
        </div>
        <input type="text" class="form-control" aria-label="Text input with checkbox" placeholder="${taskName}" id="${'taskText' + tasknumber}"
          disabled />
      </div>
    </div>
    <div class="col-3">
      <button class="btn btn-primary" id="${'editTask' + tasknumber }">
        <i class="bi-pencil-square"></i>
      </button>
      <button class="btn btn-primary delete_button ms-3" id="${'deleteTask' + tasknumber}">
        <i class="bi-trash"></i>
      </button>
    </div>
  </div>`;
  // 3.4 target the spot in the html where you want to inject the newly created element
  taskList.prepend(element);
  document.getElementById('markTask' + tasknumber ).addEventListener("click", markTask);
  document.getElementById('deleteTask' + tasknumber).addEventListener("click", deleteTask);
  document.getElementById('editTask' + tasknumber ).addEventListener("click", editTask);
  tasknumber++;
})



function deleteTask(){
  /*buttonlist.forEach(button => {
    button.addEventListener('click', (e) =>
      e.currentTarget.parentElement.remove()
    )
  });*/
  this.parentElement.parentElement.parentElement.remove()
}

// Here starts the codes for mark task as done
function markTask(){
  /*tasks.forEach(task => {
    task.addEventListener('click', (e) => {*/
      // Toggle Class "disable" of the parent div of the task after clicking the checkbox
      // and automatically uncheck the checkbox
      this.parentElement.parentElement.classList.toggle('disable');
      this.checked = false;
  
      // Toggle class "done" of the clicked task
      const taskDisabled = e.currentTarget.closest(".task")
      taskDisabled.classList.toggle('done');
  
      // Check if task has class done and give position
      (taskDisabled.classList.contains("done"))
        ? taskList.append(taskDisabled)
        : taskList.prepend(taskDisabled);
    //});
  //});
}
// Here end the codes for mark task as done

function editTask(){
  let taskID = this.id.charAt(this.id.length - 1);
  let taskInput = document.getElementById("taskText" + taskID);
  let taskValue = taskInput.value;
  console.log("test")

  if (taskInput.disabled) {
      taskInput.removeAttribute("disabled");
      taskInput.focus();
  } else {
      taskInput.setAttribute("disabled", "true");
      taskInput.setAttribute('value',taskValue);
  }
}


