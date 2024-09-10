// packing list functionality
// global constants
const myList = document.getElementById("my-list");

// arrays
// general list for all vacation types
const essentialList = [
  "ID",
  "Credit Card",
  "Insurance Card",
  "Phone Charger",
  "Personal Hygiene Items",
  "Photo Camera"
];
// list of items for "Nature" vacation type
const natureList = [
  "Layered clothing",
  "Hiking Boots",
  "Walking Poles",
  "Tent",
  "Rain Jacket",
  "First Aid Kit",
  "Bug spray"
];
// list of items for "beach" vacation type
const beachList = [
  "Beach Clothes",
  "Slippers",
  "Sunscreen",
  "Swimsuit",
  "Sunglasses",
  "After Sun Gel",
  "Hat"
];
// list of items for "city" vacation type
const cityList = [
  "Fancy Clothes",
  "Comfortable Shoes",
  "Umbrella",
  "Cosmetics",
  "Accessories"
];

// event listener for a button "Lets go" adds trip name above list to pack
addTripName.addEventListener("click", function () {
  const tripName = document.getElementById("trip-name");
  const tn = document.getElementById("trip");
  tn.innerText = `"${tripName.value}"`;
  tn.setAttribute("style", "font-style: italic", "font-weight: bold");
  tripName.value = "";
});

// addItem() function expects an item and adds it to the list
// it adds a style to the item and removes the item on click
// it also responsible for showing "Clear list" button
function addItem(text) {
  const liItem = document.createElement("li");
  liItem.textContent = text;
  liItem.addEventListener("mouseover", function () {
    liItem.style.textDecoration = "line-through";
    liItem.style.cursor = "pointer";
    liItem.style.color = "#2a9d8f";
    liItem.style.backgroundColor = "lightgrey";
    // liItem.textContent = `${text} \u274c`;
  });
  liItem.addEventListener("mouseout", function () {
    liItem.style.backgroundColor = "";
    liItem.style.cursor = "";
    liItem.style.textDecoration = "";
    liItem.style.color = "";
  });
  liItem.addEventListener("click", function () {
    myList.removeChild(liItem);
  });
  myList.appendChild(liItem);
  // when we add at least one item
  // we want to show clear button
  addClearButton();
}

// event listener for a button that pre-populates list with pre-defined items
// for Beach
beach.addEventListener("click", function () {
  for (const text of essentialList.concat(beachList)) {
    addItem(text);
  }
});

// event listener for a button that pre-populates list with pre-defined items
// for City
city.addEventListener("click", function () {
  for (const text of essentialList.concat(cityList)) {
    addItem(text);
  }
});

// event listener for a button that pre-populates list with pre-defined items
// for Nature
nature.addEventListener("click", function () {
  for (const text of essentialList.concat(natureList)) {
    addItem(text);
  }
});

// event listener for a button "Add my own item"
// it adds a new item to the my-list from user input field
addInput.addEventListener("click", function () {
  const userInput = document.getElementById("inputText");
  const text = capitalize(userInput.value);
  addItem(text);
  userInput.value = "";
});

// adds dynamic "Clear list" button to the document
// the idea is that this button is only visible when the list is not empty
const clear = document.createElement("button");
clear.appendChild(document.createTextNode("Clear list"));

function addClearButton() {
  document.getElementById("h2-list").appendChild(clear);
}
clear.addEventListener("click", function () {
  myList.replaceChildren();
  document.getElementById("h2-list").removeChild(clear);
});

// capitalizes the first letter of text input
function capitalize(text) {
  return `${text[0].toUpperCase()}${text.slice(1).toLowerCase()}`;
}

// curency converter functionality 
// converts entered amount of selected currency
// into another selected currency
function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const from = document.getElementById("dropdownFrom").value;
  const to = document.getElementById("dropdownTo").value;
  const toRecieve = document.getElementById("toRecieve");
  if (from === "usd" && to === "eur") {
    toRecieve.innerText = (amount * 0.94).toFixed(2);
  } else if (from === "usd" && to === "gbp") {
    toRecieve.innerText = (amount * 0.8).toFixed(2);
  } else if (from === "gbp" && to === "usd") {
    toRecieve.innerText = (amount * 1.24).toFixed(2);
  } else if (from === "gbp" && to === "eur") {
    toRecieve.innerText = (amount * 1.16).toFixed(2);
  } else if (from === "eur" && to === "usd") {
    toRecieve.innerText = (amount * 1.07).toFixed(2);
  } else if (from === "eur" && to === "gbp") {
    toRecieve.innerText = (amount * 0.86).toFixed(2);
  } else {
    toRecieve.innerText = amount;
  }
}


// destination adviser functionality
const country_list = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Cape Verde",
  "Cayman Islands",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cruise Ship",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyz Republic",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre and Miquelon",
  "Samoa",
  "San Marino",
  "Satellite",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "St Kitts and Nevis",
  "St Lucia",
  "St Vincent",
  "St. Lucia",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe"
];

//function to suggest list of countries
function suggestCountry() {
  const countryList = document.getElementById("country-list");
  countryList.innerHTML = "";

  //create random list of 5 countries
  const randomCountry = getRandomCountry(5);

  //loop through countries and create list items
  for (let i = 0; i < randomCountry.length; i++) {
    const country = randomCountry[i];
    const listItem = document.createElement("li");
    listItem.textContent = country;
    countryList.appendChild(listItem);
  }
}

//function for random countries
function getRandomCountry(count) {
  const randomCountry = [];
  const countryCopy = country_list.slice();

  while (randomCountry.length < count) {
    const randomIndex = Math.floor(Math.random() * countryCopy.length);
    const pickedCountry = countryCopy.splice(randomIndex, 1)[0];
    randomCountry.push(pickedCountry);
  }
  return randomCountry;
}

