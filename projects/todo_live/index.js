import { initProjects } from "./init.js"
import { addNewProject } from "./project.js";
import { addNewTask, Task } from "./task.js";
import { createProjectsDropdown } from "./dropdown-ui.js"
import { showTaskList } from "./list-ui.js";


// Projects 
const pd = document.querySelector("#dropdown");
const npb = document.querySelector("#new-project-btn");
const npd = document.querySelector(".new-project-div");
const pni = document.querySelector("#project-name-input");
const apb = document.querySelector("#add-project-btn");
// New task
const fb = document.querySelector("#form-btn");
const fd = document.querySelector("#form-div");
// Form input fields
const titleInput = document.querySelector("#title");
const dueDateInput = document.querySelector("#due-date");
const priorityInput = document.querySelector("#priority");
const notesInput = document.querySelector("#notes");
const sb = document.querySelector("#submit-btn");
// Task list elements
const ul = document.querySelector("#new-ul");
const template = document.querySelector("#task-li-template");
const ntd = document.querySelector("#no-tasks-div");
const db = document.querySelector("#demo-btn");


let projects = initProjects(Task, addNewProject);

createProjectsDropdown(projects, pd, 0);
showTaskList(projects, pd.selectedIndex, ul, template, ntd);


  // Event Listeners
// Demo button: add demo tasks to the project selected in dropdown and shows them in a task list
db.addEventListener("click", () => {
    addNewTask(projects, pd.selectedIndex, "Face Your Fear", "1.01.2025", "High", 
        "Finish that project you've been procrastinating on. Perfection can wait — just get it done");
    addNewTask(projects, pd.selectedIndex, "Gratitude Audit", "1.01.2025", "High",
        "List five things you're grateful for. It's time to shift your mindset from 'What's wrong?' to 'What's good?'");
    addNewTask(projects, pd.selectedIndex, "Declutter Your Space", "1.01.2025", "High", 
        "Get rid of what you don't need. It's time to let go of the ghosts of your past");
    addNewTask(projects, pd.selectedIndex, "Find the Missing Sock", "1.01.2025", "Mid",
        "Investigate the laundry vortex and negotiate with the sock thief");   
    showTaskList(projects, pd.selectedIndex, ul, template, ntd);
})

// Project dropdown: refresh displayed list of tasks depending on selected option 
pd.addEventListener("change", () => {
    ul.replaceChildren();
    showTaskList(projects, pd.selectedIndex, ul, template, ntd);
})

// New project button: show / hide new projects input fields
npb.addEventListener("click", () => {
    npd.style.display = npd.style.display == "block" ? "none" : "block";
    npb.textContent = npb.textContent == "Close Project Form" ? "New Project" : "Close Project Form";
})

// Add new project button: add new project to the projects array and show it in dropdown menu, 
// refresh task list to new one, hide new projects input fields
apb.addEventListener("click", () => {
    addNewProject(pni.value, projects);
    createProjectsDropdown(projects, pd, [projects.length-1]); // refresh dropdown projects list
    showTaskList(projects, [projects.length-1], ul, template, ntd);
    pni.value = "";
    npd.style.display = npd.style.display  == "none" ? "block" : "none";
    npb.textContent = "New Project";
})

// Form button: show / hide form for new task
fb.addEventListener("click", () => {
    fd.style.display = fd.style.display == "block" ? "none" : "block";
    fb.textContent = fb.textContent == "Close Task Form" ? "New Task" : "Close Task Form";
})

// Task submit button: add new task to the selected project
sb.addEventListener("click", (event) => {
    event.preventDefault();
    addNewTask(projects, pd.selectedIndex, titleInput.value, dueDateInput.value, priorityInput.value, notesInput.value);
    showTaskList(projects, pd.selectedIndex, ul, template, ntd);
    fd.style.display = fd.style.display == "block" ? "none" : "block";
    fb.textContent = fb.textContent == "Close Task Form" ? "New Task" : "Close Task Form";
    titleInput.value = "";
    dueDateInput.value = "";
    priorityInput.value = "";
    notesInput.value = "";
})








   






