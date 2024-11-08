import { saveToLS } from "./helper.js";


export function showTaskList(projects, selectedIndex, taskListEl, template, noTasksDiv) {
    const tasksArr = projects[selectedIndex].tasks;
    taskListEl.replaceChildren();
    // if task array is empty - show a message and button, that offers to add demo tasks
    if (tasksArr.length === 0) {
        noTasksDiv.classList.remove("hidden");
        return
    }
    // otherwise create a list of tasks in DOM
    noTasksDiv.classList.add("hidden");
    for ( let i = 0; i < tasksArr.length; i++) {
    const task = tasksArr[i];
    const clone = template.content.cloneNode(true);
    const heading = clone.querySelector(".li-heading");
    const dueDate = clone.querySelector(".due-date-span");
    const priority = clone.querySelector(".priority-span");
    const notes = clone.querySelector(".notes-span");
    const checkbox = clone.querySelector(".checkbox");
    const detailsBtn = clone.querySelector(".details-btn"); 
    const deleteTaskBtn = clone.querySelector(".delete-task-btn");
    const detailsDiv = clone.querySelector(".details")

    heading.textContent = task.title;
    dueDate.textContent = task.dueDate;
    priority.textContent = task.priority;
    notes.textContent = task.notes;
    checkbox.checked = task.isDone;

    setStylingDoneTask(checkbox.checked, heading);
    
    detailsBtn.addEventListener("click", () => {
        detailsDiv.style.display = detailsDiv.style.display == "block" ? "none" : "block";
        detailsBtn.textContent = detailsBtn.textContent == "Show Details" ? "Hide Details" : "Show Details";
    })

    deleteTaskBtn.addEventListener("click", () => {
        tasksArr.splice(i, 1);
        saveToLS(projects);
        showTaskList(projects, selectedIndex, taskListEl, template, noTasksDiv);
    })

    checkbox.addEventListener("click", () => {  
        checkbox.checked = task.toggleTaskStatus();
        saveToLS(projects);
        setStylingDoneTask(checkbox.checked, heading);
    })
    
    taskListEl.prepend(clone);
    } 
}


function setStylingDoneTask(condition, element) {
    if (condition) {
        element.style.textDecoration = "line-through";
        element.style.color =  "grey";
    } else {
        element.style.textDecoration = "none";
        element.style.color =  "";
    }
}


