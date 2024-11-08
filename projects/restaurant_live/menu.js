import { antipasti, primi, secondi, dolci } from "./dishes.js";

function createMenuBlock(obj) {  
    const contentDiv = document.querySelector("#content"); 
    const h = document.createElement("h3");
    h.textContent = obj.heading;
    contentDiv.appendChild(h);
    const descriptionList = document.createElement("dl");
    const dishes = obj.dishes;

    for (const dish of dishes) {
        const descriptionTerm = document.createElement("dt");
        descriptionTerm.textContent = dish.name;
        const descriptionDetails = document.createElement("dd");
        descriptionDetails.textContent = dish.description;
        descriptionList.append(descriptionTerm, descriptionDetails);
    }
    contentDiv.appendChild(descriptionList);
}

export default function createMenuTab() {
    const motto = document.createElement("p");
    motto.textContent = "Authentic Italian Flavors, Crafted with Love";
    motto.classList.add("motto");
    document.querySelector("#content").appendChild(motto);
    createMenuBlock(antipasti);
    createMenuBlock(primi);
    createMenuBlock(secondi);
    createMenuBlock(dolci);
}