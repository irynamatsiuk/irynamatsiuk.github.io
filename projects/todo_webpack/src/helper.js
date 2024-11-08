export function saveToLS(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
}