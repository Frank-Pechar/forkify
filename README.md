# Recipe App
## JavaScript Project
## Description of App Functionality, Features, and Methods

Javascript coding project I completed from Udemy - The Complete Javascript Course 2023: From Zero to Expert by Jonas Schmedtmann. After coding this project through the course I then added additional modifications and comments to the code for educational purposes.

App can be run from: https://frank-pechar-js-forkify.netlify.app/

## App Functionality

Search Recipes
- Enter keyword(s) in the search field to display a list of recipes, e.g. “pizza”, “pasta”, “onions”, etc.
- View page(s) of results for various recipes

View a Recipe
- Select a recipe from results list to display recipe ingredients
- Change number of servings as needed will change quantities of ingredients
- Click &lt;DIRECTIONS&gt; Button to go to to recipe origination website for further cooking instructions

Add Your Own Recipe
- Click &lt;ADD RECIPE&gt; Button
- Enter recipe input and click &lt;UPLOAD&gt; Button
- Recipe will be automatically Bookmarked

Bookmark Favorite Recipes
- Click &lt;Bookmark&gt; Button

View List of Bookmarks
- Hover mouse over &lt;BOOKMARKS&gt; Button

## Javascript Features and Methods Used

- ES6 Modules
- MVC - Model/View/Controller Architecture wih Publisher/Subscriber Pattern
- Parcel for build bundling (Babel for transpiling, core.js/stable for polyfilling)
- Recipe Database API - Query & Update
- DOM Updating Algorithm - (render only changed DOM Text and Attributes)
- Pagination of Search Results
- Create and List Bookmarks to and from Local Storage
- Async/Await Handling of Promises
- Try / catch, and re-throwing errors 
- Base and Sub Classes and Static Methods
- Private Fields and Methods
- Protected Fields and Methods for Class Inheritance
- Event Delegation for Elements Not Yet Created in DOM
- Display Spinner Animation for Asynchronous Fetch Downloads and Uploads

List of some methods and properties used:

- Update DOM - Created Document Fragment - Used document.createRange().createContextualFragment() 
- Update DOM - For Comparisons - Used isEqualNode() and nodeValue
- Retrieved Form Input using FormData() Method 
- Converted Input Data Array to Object using Object.fromEntries() Method
- Converted Object to Array using Object.entries() Method
- Used dataset attributes for dyamically updating for pagination of Search Results, and Updating Recipe Servings
- Usage of load and hashchange events to render recipe detail also used window.history.pushState() to change URL without reloading page
