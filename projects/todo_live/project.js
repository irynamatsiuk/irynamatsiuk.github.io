import { saveToLS } from "./helper.js";

export function addNewProject(name, projectsArr) {
    const newProject = createNewProjectObj(name);
    projectsArr.push(newProject);
    saveToLS(projectsArr);
    return projectsArr
}

function createNewProjectObj(name) {
    if (!name) { name = "Unnamed Project"};
    return {
        name: name, 
        tasks: [],
    }
}
