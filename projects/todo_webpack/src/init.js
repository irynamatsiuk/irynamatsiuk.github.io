export function initProjects(Task, addNewProject) {
    if (localStorage.getItem("projects")) {
        const currentProjects = JSON.parse(localStorage.getItem("projects"));

        // add 'lost in local storage' method to each task obj
        for (let i = 0; i < currentProjects.length; i++) {
            const tasks = currentProjects[i].tasks;
            
            for (let i = 0; i < tasks.length; i++) {
                const task = tasks[i];
                Object.setPrototypeOf(task, Task.prototype);
            }
        }
        return currentProjects;
    } 
    return addNewProject("Main", []);
}