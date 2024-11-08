import { saveToLS } from "./helper.js";

export function addNewTask(projects, projectIndex, titleInput, dueDateInput, priorityInput, notesInput) {
    let newTask = new Task(titleInput, dueDateInput, priorityInput, notesInput);
    projects[projectIndex].tasks.push(newTask); 
    saveToLS(projects);
}

export class Task {
    constructor(title, dueDate, priority, notes, isDone) {
        if (!title) {title = "New Task"};
        if (!notes) { notes = "This task has't any notes" };
        if (!dueDate) { dueDate = "not set" };
        if (!isDone) { isDone = false };
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.isDone = isDone;
    }
    toggleTaskStatus() {
        this.isDone = !this.isDone;
        return this.isDone;
    }
}







