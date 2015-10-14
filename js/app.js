//added "edit" to "save" button functionality

// Problem: UI doesn't provide desired results (nothing happens when user clicks things)
// Solution: Add interactivity so user can manage their daily tasks 

//assign elements to variables
var taskInput = document.getElementById("new-task"); //#new-task input
var addButton = document.getElementById("add-button"); //#add-button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //#incomplete-tasks ul
var completedTasksHolder = document.getElementById("completed-tasks"); //#completed-tasks ul

//create new task li
var createNewTaskElement = function(taskString) {
	//create elements
	var listItem = document.createElement("li");
	var checkbox = document.createElement("input"); //checkbox input
	var label = document.createElement("label");
	var editInput = document.createElement("input"); //text input
	var editButton = document.createElement("button");
	var deleteButton = document.createElement("button");
	
	//modify created elements
	checkbox.type = "checkbox"; //set input type prop to "checkbox"
	editInput.type = "text"; //set input type to "text"
	label.innerText = taskString;
	editButton.innerText = "edit";
	editButton.className = "edit";
	deleteButton.innerText = "delete";
	deleteButton.className = "delete";

	//append elements to listItem
	listItem.appendChild(checkbox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

	return listItem;
};

//add new task (add button event handler)
var addTask = function() {
	//create new li with text from #new-task input
	var listItem = createNewTaskElement(taskInput.value);
	//if input not empty
	if (taskInput.value) { 
		//append li to incompleteTasksHolder ul
		incompleteTasksHolder.appendChild(listItem);
		//set correct event handlers for li's inputs/buttons
		bindTaskEvents(listItem, taskCompleted);
		//clear #new-task text input field after adding task
		taskInput.value = "";
	}
};

//edit existing task (edit button event handler)
var editTask = function() {
	var listItem = this.parentNode;
	var editInput = listItem.querySelector("input[type=text]");
	var label = listItem.querySelector("label");
	var editButton = listItem.querySelector("button.edit");
	var containsClass = listItem.classList.contains("editMode");
	//if parent li class is .editMode
	if (containsClass) {
		//label text → input's value
		label.innerText = editInput.value;
		//change button text from "save" → "edit"
		editButton.innerText = "edit";
	} else {
		//input value → label text
		editInput.value = label.innerText;
		//change button text from "edit" → "save"
		editButton.innerText = "save";
	}
	//toggle parent li .editMode class
	listItem.classList.toggle("editMode");
};

//delete existing task (delete button event handler)
var deleteTask = function() {
	var listItem = this.parentNode;
	var ul = listItem.parentNode;
	//remove parent li from its respective ul parent
	ul.removeChild(listItem);
};

//mark task as complete (checkbox event handler)
var taskCompleted = function() {
	var listItem = this.parentNode;
	//append li to completedTasksHolder ul
	completedTasksHolder.appendChild(listItem);
	//set correct event handlers for li's inputs/buttons
	bindTaskEvents(listItem, taskIncomplete);
};

//mark task as incomplete (checkbox event handler)
var taskIncomplete = function() {
	var listItem = this.parentNode;
	//append li to incompleteTasksHolder ul
	incompleteTasksHolder.appendChild(listItem);
	//set correct event handlers for li's inputs/buttons
	bindTaskEvents(listItem, taskCompleted);
};

//set event handlers for li inputs/buttons (use either taskCompleted or taskIncomplete)
var bindTaskEvents = function(taskListItem, checkboxEventHandler) {
	//select children of li
	var checkbox = taskListItem.querySelector("input[type=checkbox]");
	var editButton = taskListItem.querySelector("button.edit");
	var deleteButton = taskListItem.querySelector("button.delete");
	//bind editTask to edit button
	editButton.addEventListener("click", editTask);
	//bind deleteTask to delete button
	deleteButton.addEventListener("click", deleteTask);
	//bind checkboxEventHandler to checkbox (replacing previous, if any)
	checkbox.onchange = checkboxEventHandler; //change event for spacebar or mouse click
};

//set click handler to addTask function
addButton.addEventListener("click", addTask);

//loop over any inital li's in incompleteTasksHolder ul
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
	//bind events to li's children (taskCompleted)
	bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//loop over any initial li's in completedTasksHolder ul
for (var i = 0; i < completedTasksHolder.children.length; i++) {
	//bind events to li's children (taskIncomplete)	
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}