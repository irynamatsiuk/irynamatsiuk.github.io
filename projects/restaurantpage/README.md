# Project: Restaurant Page: 'Holy Cannoly'

## Course: The Odin Project, Full Stack JavaScript path

### Chapter: "JavaScript, Organizing Your JavaScript Code"

#### Description:

One page website with dynamically generated content.

The user can change website content by clicking on different 'tabs': Home, Menu or Contact. The code of this project is organized in different JavaScript files - modules: home.js, contact.js and menu.js. They export functions to the entry point - index.js. These functions generate relevant content in DOM. Also Webpack was set up to bundle JavaScript modules and handle non-JavaScript files during bundling.
Live version: ["Holy Cannoly"](https://irynamatsiuk.github.io/live/restaurantpage_live/template.html)

#### Assignment:

> Set up your restaurant site to use tabbed browsing to access the Menu and Contact pages.
>
> 1. Put the contents of each “tab” inside of its own module. Each module will export a function that creates a div element, adds the appropriate content and styles to that element and then appends it to the DOM.
> 2. Write the tab-switching logic inside of index.js. You should have event listeners for each button in the header navbar that wipes out the current contents of div#content and then runs the correct ‘tab module’ to populate it with the new contents again.
