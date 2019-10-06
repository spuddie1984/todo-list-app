////////////////////////////////// NOTES ///////////////////////////////////////
// - Consider refactoring the saved todo list / new todo list logic, it's possible to 
//   reduce the double ups by referring to li tags instead of using an id for the new todo list
//   that way li's can be referred to programmatically
// - refine css a bit messy
// - if refactoring the whole project i will follow oop style instead would be much cleaner
// - ui redesign maybe ???
//    BUGS
// - error messages
// - 
////////////////////////////////// GENERAL /////////////////////////////////////

// On Page refresh or Reload reset the login section, 
// signup section and dashboard section to display:none
// function called in the startPageLoad function 
const pageRestart = () => {

    document.querySelector("#start-page").style.display = "block";
    document.querySelector("#login-page").style.display = "none";
    document.querySelector("#signup-page").style.display = "none";
    document.querySelector("#dashboard-page").style.display = "none";
    document.querySelector("#user-exists-error-message").style.display = "none";
    resetNewTodoDiv(document.querySelector("#new-todo-div"));
}

////////////////////////////////////////////////////////////////////////////////

////////////////////////////////// DASHBOARD //////////////////////////////////

/////////////////////////// USER SETTINGS SECTION /////////////////////////////

// on user settings button click show user settings box(div)
const userSettings = () => {
    const userSettings = document.querySelector(".user-settings-div");    
    userSettings.classList.add("user-settings-display-toggle"); 
}

// grab the currently logged in user details and display them in the user settings box(div)
const userSettingsFunction = (details) => {
    
    const getUserInfo = JSON.parse(localStorage.getItem(details.email));
    document.querySelector("#first-name-change").value = getUserInfo.firstName;
    document.querySelector("#last-name-change").value = getUserInfo.lastName;
    
    // return for later use
    return getUserInfo;
}
 
// show users password when a user clicks and holds the mouse button
const showPassword = () => {
    const pswdInput = document.querySelector("#password-change");
    if(pswdInput.type === "password"){
        pswdInput.type = "text";
    }else {
        pswdInput.type = "password";
    }
}

// on the close button click close the user settings box(div)
const closeUserSettings = () => {
    document.querySelector(".user-settings-div").classList.remove("user-settings-display-toggle");
    document.querySelector("#user-details-success").style.display = "none";
}

// exactly like it sounds log the user out
const userSignOut = () => {

    document.querySelector("#new-todo-div").classList.remove("new-todo-toggle-display");
    document.querySelector("#new-todo-button").classList.remove("new-todo-button-toggle-display");
    // basically reload the page so that the start page is shown
    location.reload();
    
}

////////////////////////////////////////////////////////////////////////////

/////////////////////////// TODO STUFF /////////////////////////////////////

// reset all values in the new todo div, delete list items
function resetNewTodoDiv(div) {
    const inputs = div.querySelectorAll("input");
    const todoList = div.querySelector("#a-todo-list");
    // reset all input values
    for(let input of inputs){
        input.value = "";
    }
    // delete all list items
    while(todoList.hasChildNodes()){
        todoList.removeChild(todoList.lastChild);
    }
    div.querySelector("#save-new-todo").style.display = "none";
    div.querySelector("#new-todo-item").style.display = "none";
    div.querySelector("#todo-list-title-input").style.display = "block";
    document.querySelector("#new-todo-title-message").style.display = "none";
 } 

// mark or delete a todo item
function liCheckUncheck(event) {
    if(event.target.classList.contains("trashbin")){
        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
    
    // if all the list items are deleted, hide the save button
    }if(!this.hasChildNodes()){
        document.querySelector("#save-new-todo").style.display = "none";
    }else{
        document.querySelector("#save-new-todo").style.display = "block";
    }
    // don't forget to mark / unmark list items  ;)
    if(event.target.tagName === "LI"){
        event.target.classList.toggle("done-list-item");
    }
}

// for modification of the new todo list and its items
function newTodoDetails(input) {
    // make all dom selectors shorter(it's easier for repeated use) by assigning them to variables
    const todoTitleInput = document.querySelector("#todo-list-title-input");
    const todoTitle = document.querySelector("#todo-edit-title");
    const todoItem = document.querySelector("#new-todo-item");
    const newLi = document.createElement("li");
    const todoList = document.querySelector("#a-todo-list");
    const saveTodo = document.querySelector("#save-new-todo");
    const titleMessage = document.querySelector("#new-todo-title-message");
 
    // lets start the the todo list title
    if(input.target.id === "todo-list-title-input"){
        // KeyCode 13 is enter on the keyboard
        // enter a title for your todo
        if(input.keyCode === 13 && input.target.value.length > 0){
            input.stopPropagation();
            // lets hide that todo title input box
            todoTitleInput.style.display = "none";
            // add entered value and display title 
            document.querySelector("#todo-edit-title").value = todoTitleInput.value;
            todoTitle.style.visibility = "visible"
            if(todoTitle.style.visibility === "visible"){
                todoItem.style.display = "flex";
                titleMessage.style.display = "block";
            }
            else {
                todoItem.style.display = "none";
            }
        }
    }else if(input.target.id === "new-todo-item"){
        // KeyCode 13 is enter on the keyboard
        if(input.keyCode === 13){
            todoList.style.display = "block";
            // store input value in a newly created li 
            const newChild = todoList.appendChild(newLi);            
            newChild.innerHTML = "<span class='far fa-trash-alt trashbin'></span>" + todoItem.value;
            // clear the input every enterkey press
            input.target.value = "";
            // wait until someone enters a list item before showing the save button
            if(todoList.hasChildNodes()){
                saveTodo.style.display = "block";
            }
        }
    }
 }

const todoListSaverMaker = (list) => {
    
    // object to store data for a todo list
    const listDetails = {
        todoTitle : list.querySelector(".todo-edit-title").value,
               li : [],
    };
    
    // lets grab their list of todo's
    for(let listItem of list.querySelectorAll("li")){
        // use this to store checked todo status
        const listExtra = {};

        // if isn't checked just push to array, else push filled object to array
        if(!listItem.classList.contains("done-list-item")){
            listDetails.li.push(listItem.textContent);
        }else {
            listExtra.todo = listItem.textContent;
            listExtra.isChecked = true;
            listDetails.li.push(listExtra);
        }
    }
    // oh glorious todo's
    return listDetails;
}

// check for todoTitle naming collisions then,
// add the newly created list to storage and identify it with the users email with -list attached to the end
const addListToStorage = (userDetails,userEmail,displayNewlyCreatedTodo) => {
    
    // get users lists
    let checkUserLists = JSON.parse(localStorage.getItem(`${userEmail}-list`));

    // check for existing user lists if none lets add our first todo list
    // a variable to hold objects to be pushed to JSON array
    let todoHolder = [];

    // callback for the every array method
    // check for matching titles, if they match return false and stop searching the array
    const titleChecker = (title) => {
        return title.todoTitle !== userDetails.todoTitle;   
    }
    ////// POSSIBLE REFACTOR TRY TO FOLLOW DRY PRINCIPLE WITH THE displayNewlyCreatedTodo FUNC CALL ///////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    // after a few checks lets send our todo list to storage ;)
    // localStorage returns null if the key doesnt exist
    // if there are no lists stored for that user lets add the first one ever
    // we will store an array of objects for each users Email
    if(checkUserLists === null){
        todoHolder.push(userDetails);
        localStorage.setItem(`${userEmail}-list`, JSON.stringify(todoHolder));
        // as it says display the list on the dashboard
        // a call to the displaySavedLists function
        displayNewlyCreatedTodo(userEmail);
    }else{
        // check for todo title collisions
        // Oh no that todo title is already in use
        if(!checkUserLists.every(titleChecker)){
            document.querySelector("#todo-title-error-message").style.display = "block";
        
        // no worries no collisions lets proceed and write the todo details to the array of lists
        }else{
            checkUserLists.push(userDetails); 
            document.querySelector("#todo-title-error-message").style.display = "none";
            // a call to the displaySavedLists function
            localStorage.setItem(`${userEmail}-list`, JSON.stringify(checkUserLists));
            displayNewlyCreatedTodo(userEmail, true);
        }
    }
}

const todoBuilder = (todo) => {
    const childTodo = document.createElement("article");
    const childInput = document.createElement("input");
    const todoContainer = document.querySelector("#show-saved-todos").appendChild(childTodo);
    const ulList = document.createElement("ul");
    const deleteButton = document.createElement("button");
    const saveChangesButton = document.createElement("button");
    const errorMessage = document.createElement("div");
    const titleMessage = document.createElement("span");

    // children
    todoContainer.appendChild(childInput); 
    todoContainer.appendChild(titleMessage);
    todoContainer.appendChild(ulList);
    todoContainer.appendChild(errorMessage);
    todoContainer.appendChild(saveChangesButton);
    todoContainer.appendChild(deleteButton);
    
    // styling and attributes
    childTodo.setAttribute("data-todo", todo.todoTitle);
    todoContainer.classList.add("todo");
    childInput.classList.add("todo-edit-title");
    titleMessage.classList.add("title-message");
    ulList.classList.add("the-todo-list");
    errorMessage.classList.add("saved-todo-title-error-message");
    saveChangesButton.classList.add("custom-button-styles", "saved-todos-changes-button");
    deleteButton.classList.add("custom-button-styles", "saved-todos-delete-button");

    // content
    childInput.value = todo.todoTitle;
    titleMessage.textContent = "Click the title to change";    
    errorMessage.textContent = "Sorry that todo tilte already exists";
    saveChangesButton.textContent = "Save Changes";
    deleteButton.textContent = "Delete";

    // add li elements to the ul list including the trashbin span and any checked list items
    for(let listItem of todo.li){
        const liTag = document.createElement("li");
        const addLi = ulList.appendChild(liTag);
        if(listItem.isChecked){
            addLi.innerHTML = `<span class="far fa-trash-alt trashbin"></span>${listItem.todo}`;
            addLi.classList.add("done-list-item");
        }else{
            addLi.innerHTML = `<span class="far fa-trash-alt trashbin"></span>${listItem}`;
        }  
    }
}

const displaySavedLists = (userDetails,addNewTodoToDisplayList = false) => {
    // if no todo lists in storage we have nothing to display 
    if(localStorage.getItem(`${userDetails}-list`) !== null){
    
        // need to grab the users saved lists first
        const userSavedLists = JSON.parse(localStorage.getItem(`${userDetails}-list`));
        
        // if we add a new todo to storage add that to the displayed todo's
        // no need to refresh all the displayed todos just add the newly created one
        // on login display all todo's
        if(!addNewTodoToDisplayList){
            for(let todo of userSavedLists){
                todoBuilder(todo);
            }
        }else{
            todoBuilder(userSavedLists[userSavedLists.length-1]);
        }
    }
}

// on button click show the new todo box
const newTodoButton = () => {
    document.querySelector("#new-todo-div").classList.remove("new-todo-toggle-display");
    document.querySelector("#new-todo-button").classList.add("new-todo-button-toggle-display");
}

///////////////////////////////////////////////////////////////////////////////////

////////////// MAIN FUNCTION FOR USER ACTIVITIES WHILE LOGGED IN //////////////////

// show the dashboard with a new todo list
const loggedIn = (user, userSettingsPassword) => {
    // oh glorious dashboard
    document.querySelector("#dashboard-page").style.display = "block";
    
    // lets grab the currently logged in users details
    // for further use in the settings box(div), and beyond....
    const currentlyLoggedInUserDetails = userSettingsFunction(user);
    
    // grab the email of the current user this is used to identify the person logged in
    const currentlyLoggedInUser = user.email;

    // use the password that was entered in the signup/login form and display it
    // in the user settings show password field
    // P.S this is the password before it is hashed

    document.querySelector("#password-change").value = userSettingsPassword;

    // as it says, display the current users saved lists
    displaySavedLists(currentlyLoggedInUser);

    // user details callback
    function editUserDetails(event) {
        // check for button click
        if(event.target.id === "submit-user-detail-changes"){
            
            // validate input data and pass current user details
            // to validation function so we can update that users details after validation
            formInputElementChecker(this,currentlyLoggedInUserDetails);
        }else if(event.target.id === "delete-user-button"){
            localStorage.removeItem(`${currentlyLoggedInUser}-list`);
            localStorage.removeItem(currentlyLoggedInUser);
            pageRestart(); 
        }
    }

    // when enter is clicked move on to the next input
    const enterNewTodo = (keyboardEvent) => { 
        newTodoDetails(keyboardEvent);    
    }

    const saveNewTodo = () => {
         // grab existing stored todos
         const checkExistingTodoTitle = JSON.parse(localStorage.getItem(`${currentlyLoggedInUser}-list`));

         // this function is used to reduce code repetition
         const saver = () => {
             // use this to save to users localStorage and create a new list in their dashboard
             const saveUserDetails = todoListSaverMaker(document.querySelector("#new-todo-div"));
             addListToStorage(saveUserDetails, currentlyLoggedInUser,displaySavedLists);
             document.querySelector("#new-todo-div").classList.add("new-todo-toggle-display");
             resetNewTodoDiv(document.querySelector("#new-todo-div"));
             document.querySelector("#new-todo-button").classList.remove("new-todo-button-toggle-display");
             document.querySelector("#todo-title-error-message").style.display = "none";
         }
 
         // callback for the every array method
         // check for naming collisions with the new todo and previously saved todos
         const checkTitle = (title) => {
             return document.querySelector("#todo-edit-title").value !== title.todoTitle;
         }
         // no saved todos in localstorage so no need to check existing todos
         if(checkExistingTodoTitle === null){
             saver();
         }else{
             if(checkExistingTodoTitle.every(checkTitle)){
                 saver();
             }else{
                 document.querySelector("#todo-title-error-message").style.display = "block";
             }
         }
    }

    // modify or delete displayed todos - A.K.A The tricky section
    const delModTodos = function(event){
        // for later reference
        const thisDisplayedTodo = this.querySelector(".todo-edit-title");
        const thisSavedTodo = JSON.parse(localStorage.getItem(`${currentlyLoggedInUser}-list`));

        // delete todo from localstorage and from the node tree
        if(event.target.classList.contains("saved-todos-delete-button")){
            this.removeChild(event.target.parentNode);
            thisSavedTodo.splice(thisSavedTodo.findIndex(function(item){return item.todoTitle === thisDisplayedTodo.value}),1);
            localStorage.setItem(`${currentlyLoggedInUser}-list`,JSON.stringify(thisSavedTodo)); 
            // if there is only 1 todo in localStorage remove the list object from localStorage all together
            if(thisSavedTodo.length < 1){
                localStorage.removeItem(`${currentlyLoggedInUser}-list`);
            }
        // save changes to a todo(only if no title naming collisions)
        }else if(event.target.classList.contains("saved-todos-changes-button")){
            // the details we will use to update localStorage
            const changeTodo = todoListSaverMaker(event.target.parentNode);
            // use a data attribute as a reference to the targeted todo list
            const currentTodoTitle = event.target.parentNode.getAttribute("data-todo");
  
            // array every method callback
            const existingTodoTitleChecker = (todoItem) => {
                // so that we can make changes to the todo list and not the title
                if(todoItem.todoTitle !== currentTodoTitle){
                    // check for todo title collisions in localStorage
                    return todoItem.todoTitle !== changeTodo.todoTitle;
                }else{
                    // if we havent changed the todo title 
                    // it doesnt mean we dont want to change the todo list, so return true
                    return true;
                }
            }
            // passed all the tests.... lets save and show our changes
            if(thisSavedTodo.every(existingTodoTitleChecker)){
                event.target.parentNode.querySelector(".saved-todo-title-error-message").style.display = "none";
                const siblingsIndex = thisSavedTodo.findIndex(function(item){return item.todoTitle === currentTodoTitle});
                thisSavedTodo.splice(siblingsIndex,1,changeTodo);

                // for Reference, testing.....
                console.log("changeTodo:",changeTodo,"thisSavedTodo:",thisSavedTodo);       
                
                event.target.parentNode.setAttribute("data-todo",changeTodo.todoTitle);         
                localStorage.setItem(`${currentlyLoggedInUser}-list`, JSON.stringify(thisSavedTodo));
            // oh oh didnt pass the tests
            }else{
                event.target.parentNode.querySelector(".saved-todo-title-error-message").style.display = "block";
            }
        // delete a todo list item
        }else if(event.target.classList.contains("trashbin")){
            event.target.parentNode.remove(event.target.parentNode);
        // mark a todo item as checked
        }else if(event.target.tagName === "LI"){
            event.target.classList.toggle("done-list-item");
        }
    }
    
    // event listeners for the dashboard
    document.querySelector("#user-settings-button").addEventListener("click", userSettings);
    document.querySelector(".user-settings-div").addEventListener("click", editUserDetails);
    document.querySelector("#user-signout").addEventListener("click", userSignOut);
    document.querySelector(".user-settings-close-button").addEventListener("click", closeUserSettings);
    document.querySelector("#new-todo-div").addEventListener("keydown", enterNewTodo);
    document.querySelector("#show-password-button").addEventListener("click", showPassword);
    document.querySelector("#a-todo-list").addEventListener("click", liCheckUncheck);
    document.querySelector("#save-new-todo").addEventListener("click", saveNewTodo);   
    document.querySelector("#show-saved-todos").addEventListener("click", delModTodos);
    document.querySelector("#new-todo-button").addEventListener("click", newTodoButton);
}

////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////// VALIDATION //////////////////////////////////////

// check each input in a chosen form, check each input with the inputValidator function
const formInputElementChecker = (input,loggedInUser) => {

    // grab all the input elements and convert into an array
    const formElements = [...input.getElementsByTagName("input")];

    // check each input for  validation if all inputs have been validated then remove error-message
    // validate each input according to conditions in the inputValidator
    if(!formElements.every(inputValidator)){

        // show error message if input isnt valid
        if(input.id === "login-form"){
            input.querySelector("#login-form-error-message").style.display = "block";
        }else if(input.id === "signup-form"){
            input.querySelector("#signup-form-error-message").style.display = "block";
        }else if(input.id === "user-settings"){
            input.querySelector("#user-details-error-message").style.display = "block";
        }
    }else if(formElements.every(inputValidator)){
       
        // hide error message and send login details to localStorage
        if(input.id === "login-form"){
            input.querySelector("#login-form-error-message").style.display = "none";
        }else if(input.id === "signup-form"){
            input.querySelector("#signup-form-error-message").style.display = "none";
        }else if(input.id === "user-settings"){
            input.querySelector("#user-details-error-message").style.display = "none";
        }

        // lets get or set the inputted details
        localStorageCheckerSetter(input,loggedInUser);
    }
              
    // for testing purposes......
    console.log(formElements.every(inputValidator));
}

// does what it's called input validation 101
const inputValidator = (input) => {
    // email regular expression
    let emailRegEx = /\S+@\S+\.\S+/;
    // text regular expression
    let textRegEx = /[^A-z]/ ;
    
    // make sure someone has enter something ;p
    if(input.type !== "password" && input.value < 1){
        return false;

    // return true if entered email passes test
    }else if(input.type === "email"){
        return emailRegEx.test(input.value);

    // return true if full valid name entered
    }else if(input.type === "text"){
        return !textRegEx.test(input.value);

    // make sure they agree with the terms and conditions
    }else if(input.type === "checkbox"){
        return input.checked;

    // if you want to add more validator arguements do so here .....
    
    // Yay !!! the form can be submitted it passed all the tests
    }else {
        return true;
    }
}

// for retrieving user data and for setting user data into localStorage 
const localStorageCheckerSetter = (elements, loggedInUser) => {
    
    // variable to store the hashed password
    let hashedPassword;
    
    // new user data object
    const newUser = {
       firstName : "",
        lastName : "",
           email : "",
        password : "",
    };

    // existing user data object
    const existingUser = {
           email : "",
        password : "",
    };

    if(elements.id !== "login-form" && elements.id !== "user-settings"){
        // make sure that user doesnt already exist
        if(localStorage.getItem(elements.querySelector("#user-signup-email").value) === null){
            // hash the user's inputted password and save the hash not the password
            hashedPassword = CryptoJS.MD5(elements.querySelector("#user-signup-password").value).toString();
            
            // put new users details into a object to stringify
            newUser.firstName = elements.querySelector("#first-name").value;
            newUser.lastName = elements.querySelector("#last-name").value;
            newUser.email = elements.querySelector("#user-signup-email").value;
            newUser.password = hashedPassword;
            
            // add the new user to localStorage and hide the signup form
            localStorage.setItem(newUser.email, JSON.stringify(newUser));
            document.querySelector("#signup-page").style.display = "none";
            
            // Lets go to the dashboard
            loggedIn(newUser, elements.querySelector("#user-signup-password").value);

            // Reset the signup form values
            document.querySelector("#signup-form").reset();
        }else{
            // that user already exists
            document.querySelector("#user-exists-error-message").style.display = "block";
        }
    }else if(elements.id === "login-form"){
        // lets log in
        existingUser.email = elements.querySelector("#user-email").value;
        
        // check to see if that user exists in localstorage
        if(localStorage.getItem(existingUser.email) === null){
            // if user doesnt exist show error message and reset form inputs
            document.querySelector("#login-form").reset();
            elements.querySelector("#user-doesnt-exist-error-message").style.display = "block";
            // if user exists  in localStorage then go to the dashboard
        }else{
            elements.querySelector("#user-doesnt-exist-error-message").style.display = "none";
            document.querySelector("#login-page").style.display = "none";
            const existingUsersPassword = JSON.parse(localStorage.getItem(existingUser.email)).password;
            
            // need to check password here
            // consider having a password hasher here
            if(existingUsersPassword === CryptoJS.MD5(elements.querySelector("#user-password").value).toString()){
                // lets go to the dashboard
                loggedIn(existingUser, elements.querySelector("#user-password").value);
                document.querySelector("#login-form").reset();  
            }else{
                elements.querySelector("#wrong-password-error-message").style.display = "block";
                document.querySelector("#login-page").style.display = "block";
            }          
        }

    }else if(elements.id === "user-settings"){
        
        // use an object literal and fill it with the users details to be sent to localStorage
        const updateUserDetails = {};
        updateUserDetails.firstName = elements.querySelector("#first-name-change").value;
        updateUserDetails.lastName = elements.querySelector("#last-name-change").value;
        updateUserDetails.password = CryptoJS.MD5(elements.querySelector("#password-change").value).toString();
        
        // make the if statements shorter
        const newPassword = elements.querySelector("#new-password");
        const reEnteredPsd = elements.querySelector("#re-entered-password");
        
        // check to see if user has attempted a password change
        if(newPassword.value.length > 1 || reEnteredPsd.value.length > 1){
            
            // make sure the user enters the desired password with a password recheck
            if(newPassword.value !== reEnteredPsd.value){
                elements.querySelector("#new-password-error-message").style.display = "block";

            // all is good so send the new password and details to localStorage 
            }else if(newPassword.value === reEnteredPsd.value){
                
                elements.querySelector("#new-password-error-message").style.display = "none";
                
                // hash the new password
                hashedPassword = CryptoJS.MD5(newPassword.value).toString();
                // update users password in the localStorage object
                updateUserDetails.password = hashedPassword;

                // dont forgot the update the password that is displayed in user settings 
                elements.querySelector("#password-change").value = newPassword.value;

                // after successfully updating the users password clear the new password inputs
                newPassword.value = "";
                reEnteredPsd.value = "";

                // localStorage only accepts strings so need to stringify the object
                localStorage.setItem(loggedInUser.email, JSON.stringify(updateUserDetails));
            
                // lets the user know that the details have been saved successfully
                document.querySelector("#user-details-success").style.display = "block";
            }

        }else {

            // grab the data from the user details inputs and write that to the localStorage 
            // then update the form with the new details       
            
            // lets the user know that the details have been saved successfully
            document.querySelector("#user-details-success").style.display = "block";

            // localStorage only accepts strings so need to stringify the object
            localStorage.setItem(loggedInUser.email, JSON.stringify(updateUserDetails));

            // for testing purposes...
            console.log(localStorage.getItem(loggedInUser.email));
        }
    }
    
}

////////////////////////////////// START PAGE //////////////////////////////////////

// START PAGE FORM CALLBACK
// function for start page button listener(inside the startPageLoad function)
const signUpOrLogin = (event) => {

    // stop page refresh on this button's click(because it's part of a form html element
    // it will fire a page refresh automatically)
    event.preventDefault();
    
    // use the event.target to select the corresponding section on the corresponding button click
    if(event.target.id === "start-page-login-button"){
        document.querySelector("#start-page").style.display = "none";
        document.querySelector("#login-page").style.display = "block";
    }else if(event.target.id === "start-page-signup-button"){
        document.querySelector("#start-page").style.display = "none";
        document.querySelector("#signup-page").style.display = "block";
    }
}

// SIGNUP FORM AND LOGIN FORM BUTTON EVENT LISTENER CALLBACKS
const loginFormFunction = function (event) {
    // every submit button click check the form input elements
    if(event.target.type === "submit"){
        // Use the formInputElementChecker to check each input for a valid input depending on input type
        formInputElementChecker(this);
    }
}

const signupFormFunction = function (event) {
    // every submit button click check the form input elements
    if(event.target.type === "submit"){
        // Use the formInputElementChecker to check each input for a valid input depending on input type
        formInputElementChecker(this);    
    }
}

// START PAGE EVENT LISTENERS AND MISC 

// stop default action on form button submit press
const submitButton = (event) => {
    event.preventDefault();
}

// When the page is reloaded or refreshed this function will run
// function for pageLoad event listener
const startPageLoad = () => {
    
    // On refresh or fresh load of the page, set all the elements
    // (except for the start-page) to display:none 
    pageRestart();
   
    // start page, login form and signup form button listener
    document.querySelector("#start-form").addEventListener("click", signUpOrLogin);
    document.querySelector("#login-form").addEventListener("click", loginFormFunction);
    document.querySelector("#signup-form").addEventListener("click", signupFormFunction);
    document.querySelector("#login-form-submit-button").addEventListener("click", submitButton);
    document.querySelector("#signupFormSubmitButton").addEventListener("click", submitButton);
}

// page load or page refresh event listener
// document.addEventListener("DOMContentLoaded", startPageLoad);
startPageLoad();
///////////////////////////////////////////////////////////////////////////////////