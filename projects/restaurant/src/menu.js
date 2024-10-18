
function createListBlock(heading, dt1, dd1, dt2, dd2, dt3, dd3) {  
    const contentDiv = document.querySelector("#content"); 
    const h = document.createElement("h3");
    h.textContent = heading;
    contentDiv.appendChild(h)

    const descriptionList = document.createElement("dl");

    const descriptionTerm1 = document.createElement("dt");
    const descriptionDetails1 = document.createElement("dd");
    descriptionTerm1.textContent = dt1;
    descriptionDetails1.textContent = dd1;

    const descriptionTerm2 = document.createElement("dt");
    const descriptionDetails2 = document.createElement("dd");
    descriptionTerm2.textContent = dt2;
    descriptionDetails2.textContent = dd2;

    const descriptionTerm3 = document.createElement("dt");
    const descriptionDetails3 = document.createElement("dd");
    descriptionTerm3.textContent = dt3;
    descriptionDetails3.textContent = dd3;

    descriptionList.append(descriptionTerm1, descriptionDetails1, descriptionTerm2, descriptionDetails2, descriptionTerm3, descriptionDetails3);
    contentDiv.appendChild(descriptionList)
}


export default function createMenuTab() {
    const motto = document.createElement("p");
    motto.textContent = "Authentic Italian Flavors, Crafted with Love";
    motto.classList.add("motto");
    document.querySelector("#content").appendChild(motto);

    createListBlock("Antipasti", 
        "Bruschetta al Pomodoro", 
        " - Grilled bread topped with fresh tomatoes, basil, and olive oil", 
        "Prosciutto e Melone", 
        " - Sweet melon paired with thinly sliced prosciutto", 
        "Caprese Salad", 
        " - Fresh mozzarella, vine-ripened tomatoes, and basil drizzled with balsamic glaze");
    
    createListBlock("Primi",
        "Spaghetti alla Carbonara",
        " - Pasta with pancetta, eggs, and Pecorino Romano",
        "Tagliatelle al Tartufo",
        " - Fresh egg pasta with a creamy truffle sauce",
        "Lasagna alla Bolognese",
        " - Layers of pasta, rich meat sauce, béchamel, and Parmesan");

    createListBlock("Secondi",
        "Pollo alla Cacciatora",
        " - Chicken stewed with tomatoes, olives, and capers",
        "Saltimbocca alla Romana",
        " - Veal cutlets with prosciutto, sage, and white wine sauce",
        "Branzino al Forno",
        " - Oven-baked sea bass with lemon and herbs");

    createListBlock("Dolci",
        "Tiramisu",
        " - Classic Italian dessert with layers of espresso-soaked ladyfingers and mascarpone",
        "Panna Cotta alla Vaniglia",
        " - Creamy vanilla pudding with a berry compote",
        "Cannoli Siciliani",
        " - Crisp pastry filled with sweet ricotta and chocolate chips");
}