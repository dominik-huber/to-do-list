// Here starts the codes for section 1

// Here end the codes for section 1


// Here starts the codes for section 2

// Here end the codes for section 2


// Here starts the codes for mark task as done
const taskList = document.querySelector('.taskList');
const tasks = document.querySelectorAll('.form-check-input');

tasks.forEach(el => {
  el.addEventListener('click', (e) => {
    e.currentTarget.parentElement.parentElement.classList.toggle('disable');

		// Toggle class "done" of the clicked task
		const taskDisabled = e.currentTarget.closest(".task")
		taskDisabled.classList.toggle('done');

		// Check if task has class done and give position
		if (taskDisabled.classList.contains("done")) {
			taskList.appendChild(taskDisabled);
		} else {
			taskList.prepend(taskDisabled);
		}

  });

});



// Here end the codes for mark task as done
