# Project: Inventory App "Wonders of Europe"

### Curriculum: The Odin Project, Full Stack JavaScript path

### Course: NodeJS, chapter: "Express"

#### Description:

Dynamic inventory web application created with backend framework Express.  
The subject I chose may seem a bit strange (not a shop-like). But my implementations - "Wonders of Europe" still meets all the requirements: it has categories and items (wonders), so when the user goes to the home-page they can choose a category and/or country to view, and then get a list of every item (wonder) in that category/country.
Moreover all CRUD methods are avaliable for both items and categories, so anybody that’s visiting the site can Create, Read, Update or Delete any Item (wonder) or Category, but not the country.  
Also I have done a simple server-side form validation with _express-validator_ for "Add New Wonder" form. It controls, that input's length is between 2 and 50 symbols and removes whitespace from both ends. Other forms don't have server-side validation.

##### Assignment:

- Set up an Express project and a new PostgreSQL database,
- Design a relational database structure (all tables, their fields and the relations between them),
- Set up the routes and controllers,
- Create all of the ‘READ’ views,
- Create all the forms and build out the controllers for the create and update actions,
- Figure out the delete functionality,
- Add data via a script to your local database and do this again when you deploy,
- Deploy it.

Live: [Wonders of Europe](https://imatsiuk-inventoryapp.onrender.com/)  
_Note: this app is deployed on [render.com](https://render.com/) and most of the time it takes a while to load the app. Thanks, for your patience_
