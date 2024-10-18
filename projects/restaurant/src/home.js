
function createElement(element, text, classname) {
    const el = document.createElement(element);
    el.textContent = text;
    el.classList.add(classname);
    document.querySelector("#content").appendChild(el);
}

export default function createHomeTab() {
    const heading = "Welcome to our familly italian Restaurant 'Holy Cannoly'";
    const motto = "Where tradition meets taste, and every meal feels like home";
    const historyPart1 = "In 2001, 'Holy Cannoly' opened in the heart of a picturesque Italian village, founded by Irene and Giorgio, a passionate couple with a deep love for traditional cooking. With recipes handed down from their grandparents, they began serving handmade pasta, flavorful sauces, and local wines in a rustic, cozy setting.";
    const historyPart2 = "What began as a small, humble eatery soon gained a reputation for its warmth and authenticity, becoming a favorite spot for both locals and visitors. Over the decades, the restaurant flourished, keeping its family spirit alive, and is now a beloved landmark, embodying the rich culinary traditions of the region."; 

    const h = createElement("h3", heading);
    const p1 = createElement("p", motto, "motto");
    const p2 = createElement("p", historyPart1, "history");
    const p3 = createElement("p", historyPart2, "history");

    const img = document.createElement("img");
    img.src = "https://plus.unsplash.com/premium_photo-1676651534637-f1906933aef4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    img.height = "300";
    document.querySelector("#content").appendChild(img);
}
