// Dropdown Options
export function createProjectsDropdown(projects, selectEl, selectedIndex) {
    selectEl.replaceChildren();
    for ( let i = 0; i < projects.length; i++) {
        const projectName = document.createElement("option");
        projectName.textContent = projects[i].name;
        selectEl.appendChild(projectName); 
    }
    selectEl.options[selectedIndex].selected = true;
}