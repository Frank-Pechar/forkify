# Forkify Project - Recipe Application
# JavaScript Project
## Desription of App Functionality, Features, and Methods:

Javascript project completed from the Udemy - The Complete Javascript Course 2023: From Zero to Expert by Jonas Schmedtmann

App can be run from: https://frank-pechar-js-forkify.netlify.app/

## This App Uses Javascript Features Such As:

- ES6 Modules
- MVC - Model/View/Controller Architecture wih Publisher/Subscriber Pattern
- Recipe Database API - Query & Update
- DOM Updating Algorithm - Only changed elements are re-rendered
- Pagination of Search Results
- Create and List Bookmarks to and from Local Storage
- Async/Await Handling of Promises

## Coding Methods and Features Used:

- Parcel for build bundling (Babel for transpiling, core.js/stable for polyfilling)
- Base and Sub Classes and Static Methods
- Private Fields and Methods
- Protected Fields and Methods for Class Inheritance
- Event Delegation for Elements Not Yet Created in DOM
- Display Spinner Animation for Asynchronous Fetch Downloads and Uploads
- Update Routine (render only changed DOM Text and Attributes)
- Update - Created Document Fragment - Used document.createRange().createContextualFragment() 
- Update - For Comparisons - Used isEqualNode() and nodeValue
- Retrieved Form Input using FormData() Method 
- Converted Input Data Array to Object using Object.fromEntries() Method
- Converted Object to Array using Object.entries() Method
- Used Data Attributes for Dyamically Updating for Pagination of Search Results, and Updating Recipe Servings
- Usage of load and hashchange events to render recipe detail also used window.history.pushState() to change URL without reloading page
