const taskList = document.querySelector('.taskList');
const tasks = document.querySelectorAll('.form-check-input');
const buttonlist = document.querySelectorAll('.delete_button'); 
// Here starts the codes for section 1
/*
add icons for delete button in html
extract delete button from DOM and store them in a variable



*/

  buttonlist.forEach(button => {
    button.addEventListener('click', (e) =>
    e.currentTarget.parentElement.remove()
    )
  });
 
// Here end the codes for section 1


// Here starts the codes for section 2

// Here end the codes for section 2


// Here starts the codes for mark task as done


// Get Container of all the tasks
const taskList = document.querySelector('.taskList');

// Get all input fields of the respectively task
const tasks = document.querySelectorAll('.form-check-input');

// Here starts the codes for mark task as done
tasks.forEach(task => {
  task.addEventListener('click', (e) => {
    // Toggle Class "disable" of the parent div of the task after clicking the checkbox
    // and automatically uncheck the checkbox
    e.currentTarget.parentElement.parentElement.classList.toggle('disable');
    e.currentTarget.checked = false;

		// Toggle class "done" of the clicked task
		const taskDisabled = e.currentTarget.closest(".task")
		taskDisabled.classList.toggle('done');

		// Check if task has class done and give position
		(taskDisabled.classList.contains("done"))
    ? taskList.append(taskDisabled)
    : taskList.prepend(taskDisabled);

  });

});
// Here end the codes for mark task as done

//Goal: I click on the button and a new todo gets added

//1- retrieve the button and save it into a variable
const addTaskBtn = document.querySelector('#addTaskBtn');

//2- attach event (click) to the button
addTaskBtn.addEventListener ('click', (e) => {
  //3- write the event handler
  // 3.1 retrieve the value of the text typed inside the input and save it into a variable
  const taskName = document.querySelector('#taskName') .value;
  // 3.2 create an element and store it into a variable
  const element = document.createElement ('div');
  element.classList.add ('task');
  // 3.3 add the value of the task as innerText to the newly create element
  element.innerHTML = `
  <div class="input-group mb-3">
    <div class="input-group-text">
      <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
    </div>
    <input type="text" class="form-control" aria-label="Text input with checkbox" placeholder="${taskName}" disabled>
  </div>
  <button class="btn btn-primary" id="editTask"></button>
  <button class="btn btn-primary" id="deleteTask"></button>`;
  // 3.4 target the spot in the html where you want to inject the newly created element
  taskList.prepend(element);
})




