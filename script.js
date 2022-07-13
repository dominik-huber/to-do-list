const taskList = document.querySelector('.taskList');
const tasks = document.querySelectorAll('.form-check-input');
const buttonlist = document.querySelectorAll('.delete_button'); 
// Here starts the codes for section 1
/*
add icons for delete button in html
extract delete button from DOM and store them in a variable
loop over the buttons that we retrieve and attach to each of them an event listener


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


tasks.forEach(task => {
  task.addEventListener('click', (e) => {
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
