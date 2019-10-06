/* A few things that are unique to this project
 * There are no name values in any of the form inputs
 * (not really neccessary for this project because we are using local storage)
 *  using loops to decrease repetition and follow the DRY principle 
 * Separation of Markup from the js main file
 */

// create a script element so that we can load the main js file when we choose to
const script = document.createElement("script");
script.src = "todo.js";

// Start Page Markup and Details
const stPgData = {
    "id"          : "start-page",
    "title"       : "The Todo Application",
    "Description" : "Please Login or Signup so that you can start making a TODO list or add/modify an existing one."
}
const stPgDataForm = {
    "id"       : "start-form",
    "buttons"  : [{
        "class" : "custom-button-styles",
        "id"    : "start-page-login-button",
        "text"  : "Login",
    },
    {
        "class" : "custom-button-styles",
        "id"    : "start-page-signup-button",
        "text"  : "SignUp",
    }]
};

// loop through buttons 
let startPageButtons = ``;
for(let button of stPgDataForm.buttons){
    startPageButtons += `<button class="${button.class}" id="${button.id}">${button.text}</button>`;
}

// Template for Start Page
const startPageTemplate = `
    <!-- START PAGE SECTION -->
    <div id="${stPgData.id}">
        
        <h1>${stPgData.title}</h1>
        <p>${stPgData.Description}</p>
        
        <form id="${stPgDataForm.id}">
            ${startPageButtons}
        </form>

    </div>
`;

// Login Page and Details
const lgnPgData = {
    "id"   : "login-page",
};

// Login Form 
const lgnPgDataForm = {
    "id" : "login-form",
    "inputs" : [{
        "type"        : "email",
        "placeholder" : "Email Address",
        "id"          : "user-email",
        "err-msg" : {
            "id"   : "invalid-email-error-message",
            "text" : "Please Enter a valid email Address"
        }
    },
    {
        "type"        : "password",
        "placeholder" : "Password",
        "id"          : "user-password",
        "err-msg"     : {
            "id"   : "wrong-password-error-message",
            "text" : "Wrong Password !!!"
        }
    }],
    "err-msg" : [{
        "id"   : "user-doesnt-exist-error-message",
        "text" : "Sorry that user doesn't exist in our database, please signup !"
    },{
        "id"   : "login-form-error-message",
        "text" : "Please fill in all the fields"
    }],
    "buttons" : {
        "type"  : "submit",
        "class" : "custom-button-styles",
        "id"    : "login-form-submit-button",
        "text"  : "Login"
    }
};

// loop through inputs structure data according to if else statements
let loginPageInputs = ``;
for(let input of lgnPgDataForm.inputs){
    if(input.type === "email"){
        loginPageInputs += `<div id="${input["err-msg"].id}">${input["err-msg"].text}</div>
        <!-- ${input.type} Input -->
        <input type="${input.type}" placeholder="${input.placeholder}" id="${input.id}">
        `;
    }else{
        loginPageInputs += `<!-- ${input.type} Input -->
        <input type="${input.type}" placeholder="${input.placeholder}" id="${input.id}">
        <div id="${input["err-msg"].id}">${input["err-msg"].text}</div>
        `;
    }
}

// loop through Login Page error messages
let loginPageErrMsg = ``;
for(msg of lgnPgDataForm["err-msg"]){
    loginPageErrMsg += `<div id="${msg.id}">${msg.text}</div>`;
}

// Template for Login Page
const loginPageTemplate = `
    <!-- LOGIN PAGE SECTION -->
    <div id="${lgnPgData.id}">
        <!-- There are no name value's for simplicity reasons -->
        <!-- Login Form -->
        <form id="${lgnPgDataForm.id}">

            ${loginPageInputs}
            
            ${loginPageErrMsg}

            <button type="${lgnPgDataForm.buttons.type}" class="${lgnPgDataForm.buttons.class}" id="${lgnPgDataForm.buttons.id}">${lgnPgDataForm.buttons.text}</button>

        </form>

    </div>
`;

// Signup Page Section
const sgnUpPgData = {
    "id" : "signup-page"
}

// Signup Page and Details
const sgnUpPgDataForm = {
    "id" : "signup-form",
    "inputs" : [{
        "type"        : "text",
        "placeholder" : "First Name",
        "id"          : "first-name",
        "err-msg"     : {
            "id"   : "first-name-error-message",
            "text" : "First Name Please"
        }
    },{
        "type"        : "text",
        "placeholder" : "Last Name",
        "id"          : "last-name",
        "err-msg"     : {
            "id"   : "last-name-error-message",
            "text" : "Last Name Please"
        }
    },{
        "type"        : "email",
        "placeholder" : "Email Address",
        "id"          : "user-signup-email",
        "err-msg"     : {
            "id"   : "email-error-message",
            "text" : "Valid Email Please"
        }
    },{
        "type"        : "password",
        "placeholder" : "Password",
        "id"          : "user-signup-password",
        "err-msg"     : {
            "id"   : "password-error-message",
            "text" : "Password Please"
        }
    },{
        "type" : "checkbox",
        "id"   : "terms-checkbox",
        "terms-label" : {
            "id"   : "terms",
            "span" : {
                "id"   : "terms-of-use",
                "text" : "I Agree to the Terms of Use"
            }
        },
        "err-msg"     : [{
            "id"   : "terms-error-message",
            "text" : "Please click the terms box"
        },{
            "id"   : "signup-form-error-message",
            "text" : "Please fill out all the details"
        },{
            "id"   : "user-exists-error-message",
            "text" : "Sorry that users email already exists, please use a different one"
        }]
    }],
    "buttons" : {
        "type"  : "submit",
        "class" : "custom-button-styles",
        "id"    : "signupFormSubmitButton",
        "text"  : "Signup"
    }
};

// loop through Signup Page inputs and related data
let signupPageInputs = ``;
for(let input of sgnUpPgDataForm.inputs){
    if(input.placeholder !== undefined){
        signupPageInputs += `
        <div id="${input["err-msg"].id}">${input["err-msg"].text}</div>
        
        <!-- new users ${input.placeholder.toLowerCase()} -->
        <input type="${input.type}" placeholder="${input.placeholder}" id="${input.id}">
        
        `;
    }else{
        signupPageInputs += `<!-- agree to terms checkbox -->
        <label id="${input["terms-label"].id}">
            <input type="${input.type}" id="${input.id}">
            <span id="${input["terms-label"].span.id}">${input["terms-label"].span.text}</span>
        </label>
            
        `;
        for(msg of input["err-msg"]){
            signupPageInputs += `
            <div id="${msg.id}">${msg.text}</div>
            `;
        }
    }
}

// Template for Signup Page
const signupPageTemplate = `
    <!-- SIGNUP FORM SECTION -->
    <div id="${sgnUpPgData.id}">
        <!-- There are no name value's for simplicity reasons -->
        <!-- signup form -->
        <form id="${sgnUpPgDataForm.id}">
            
            ${signupPageInputs}
            
            <!-- a button to submit all the data -->
            <button class="${sgnUpPgDataForm.buttons.class}" id="${sgnUpPgDataForm.buttons.id}" type="${sgnUpPgDataForm.buttons.type}">${sgnUpPgDataForm.buttons.text}</button>

        </form>

</div>
`;
        
            

// Dashboard Page and Details
const dhbdPgData = {
    "id"  : "dashboard-page",
    "nav" : {
        "class"   : "nav-menu",
        "buttons" : [{
            "class" : ["alt-button-style", "nav-menu-buttons"],
            "id"    : "new-todo-button",
            "text"  : "<i class='fas fa-plus fa-2x'></i>"
        },{
            "class" : ["alt-button-style", "nav-menu-buttons"],
            "id"    : "user-settings-button",
            "text"  : "<i class='fas fa-sliders-h fa-lg'></i>"
        },{
            "class" : ["alt-button-style", "nav-menu-buttons"],
            "id"    : "user-signout",
            "text"  : "<i class='fas fa-sign-out-alt fa-lg'></i>"
        }],
    } 
};

// Loop through Nav Menu buttons add multiple classes to each nav menu button
let dshbdPgNav = ``;
for(let btn of dhbdPgData.nav.buttons){
    dshbdPgNav += `<button class="`;
    for(let sel of btn.class){
        dshbdPgNav += `${sel} `;
    }
    dshbdPgNav += `" id="${btn.id}">${btn.text}</button>`;  
}

const dhbdPgUsrSet = {
    "id"          : "user-settings",
    "class"       : "user-settings-div",
    "close-button" : {
        "class" : "user-settings-close-button",
        "text"  : "<i class='fas fa-times fa-3x'></i>"
    },
    "changes-msg" : {
        "id"   : "changes-reminder",
        "text" : "After selecting and changing any details please press the save button for the changes to be saved"
    },
    "del-acc-msg" : {
        "id"   : "delete-button-message",
        "text" : "If you press this button all account details including lists will be deleted !!"
    },
    "success-msg" : {
        "id"   : "user-details-success",
        "text" : "Your details were successfully saved"
    },
    "usr-err-msg" : {
        "id"   : "user-details-error-message",
        "text" : "Only a valid name or email please !!"
    },
    "pwd-err-msg" : {
        "id"   : "new-password-error-message",
        "text" : "Your Password doesn't match"
    },
    "buttons" : [{
        "class" : ["custom-button-styles", "change-details-button"],
        "id"    : "submit-user-detail-changes",
        "text"  : "Save"
    },{
        "class" : ["custom-button-styles", "delete-account-button"],
        "id"    : "delete-user-button",
        "text"  : "Delete Account"
    }],
    "h2"      : "User Settings",
    "usr-dtl-sec" : {
        "id"   : "user-details-section",
        "divs" : [{
            "id"    : "first-name-div",
            "label" : {
                "id"   : "first-name-label",
                "text" : "First Name"
            },
            "input" : {
                "id"   : "first-name-change"
            }
        },{
            "id"    : "last-name-div",
            "label" : {
                "id"   : "last-name-label",
                "text" : "Last Name"
            },
            "input" : {
                "id"   : "last-name-change"
            }
        },{
            "id"    : "password-div",
            "label" : {
                "id"   : "password-label",
                "text" : "Current Password"
            },
            "input" : {
                "type" : "password",
                "id"   : "password-change",
                "attr" : "disabled"
            },
            "button" : {
                "class" : "custom-button-styles",
                "id"    : "show-password-button",
                "text"  : "Show Password"
            }
        }]
    },
    "new-pwd-sec" : {
        "class"   : "new-password-label",
        "text"    : "New Password<em>(Only applicable if to be changed)</em> :",
        "inputs"  : [{
            "type"        : "password",
            "class"       : "new-password-input",
            "id"          : "new-password",
            "placeholder" : "New Password Please"
        },{
            "type"        : "password",
            "class"       : "new-password-input",
            "id"          : "re-entered-password",
            "placeholder" : "Re-enter new password"
        }]
    }
};

// loop through the Save and delete Buttons assigning various classes, id's etc...
let userSetBtn = ``;
for(let btn of dhbdPgUsrSet.buttons){
    if(btn.text === "Delete Account"){
        userSetBtn += `
        <p id="${dhbdPgUsrSet["del-acc-msg"].id}">${dhbdPgUsrSet["del-acc-msg"].text}</p>
        `;
    }
    userSetBtn += `
    <!-- ${btn.text} Button -->
    <button class="`
    for(let sel of btn.class){
        userSetBtn += `${sel} `;
    }
    userSetBtn += `" id="${btn.id}">${btn.text}</button>`;   
}

// Loop through the users detail inputs
let usrSetIpts = ``;
for(let input of dhbdPgUsrSet["usr-dtl-sec"].divs){
    if(input.id === "password-div"){
        usrSetIpts += `<!-- ${input.label.text} -->
        <div id="${input.id}">
            <label for="${input.input.id}" id="${input.label.id}">${input.label.text}</label>
                <input type="${input.input.type}" id="${input.input.id}" ${input.input.attr}>
            <button class="${input.button.class}" id="${input.button.id}">${input.button.text}</button>
        </div>`;
    }else{
        usrSetIpts += `<!-- ${input.label.text} -->
        <div id="${input.id}">
            <label for="${input.input.id}" id="${input.label.id}">${input.label.text}</label>
                <input id="${input.input.id}">
        </div>`;
    }
}

// Loop through the user new password inputs
let chgUsrSetIpts = ``;
for(let ipt of dhbdPgUsrSet["new-pwd-sec"].inputs){
    chgUsrSetIpts += `<input type="${ipt.type}" class="${ipt.class}" id="${ipt.id}" placeholder="${ipt.placeholder}">`
}


// Todo list Section and Details
const todoData = {
    "id"    : "show-saved-todos",
    "class" : "saved-todo",
    "art"   : {
        "id"      : "new-todo-div",
        "class"   : ["todo","new-todo","new-todo-toggle-display"],
        "inputs"  : [{
            "type"  : "text",
            "id"    : "todo-edit-title",
            "class" : "todo-edit-title"
        },{
            "type"        : "text",
            "id"          : "todo-list-title-input",
            "placeholder" : "Todo Name Please"
        },{
            "type"        : "text",
            "id"          : "new-todo-item",
            "placeholder" : "Your Todo Please"
        }],
        "ul"      : {
            "id" : "a-todo-list"
        },
        "err-msg" : {
            "id"   : "todo-title-error-message",
            "text" : "Sorry that title already exists"
        },
        "msg"     : {
            "id"    : "new-todo-title-message",
            "class" : "title-message",
            "text"  : "Click the title to change"
        },
        "buttons"  : {
            "class" : "custom-button-styles",
            "id"    : "save-new-todo",
            "text"  : "Save"
        }
    }
};

// Loop through todo section classes
let todoClass = ``;
for(let sel of todoData.art.class){
    todoClass += `${sel} `;
}

// Loop throught todo inputs assigning relevant data
let newTodoIpts = ``;
for(let ipt of todoData.art.inputs){
    if(ipt.id === "todo-edit-title"){
        newTodoIpts += `<input type="${ipt.type}" class="${ipt.class}" id="${ipt.id}">`
    }else if(ipt.id === "todo-list-title-input"){
        newTodoIpts += `<input type="${ipt.type}" id="${ipt.id}" placeholder="${ipt.placeholder}">
        <span class="${todoData.art.msg.class}" id="${todoData.art.msg.id}">${todoData.art.msg.text}</span>`;
    }else{
        newTodoIpts += `<input type="${ipt.type}" id="${ipt.id}" placeholder="${ipt.placeholder}">`;
    }
}
// Template for Dashboard Page
const dashboardPageTemplate = `
    <!-- DASHBOARD PAGE SECTION -->
    <div id="${dhbdPgData.id}">
    
        <!-- Nav Menu -->
        <nav class="${dhbdPgData.nav.class}">
            ${dshbdPgNav}         
        </nav>
        
        <!-- User Details Section -->
        
        <div id="${dhbdPgUsrSet.id}" class="${dhbdPgUsrSet.class}">
            <button class="${dhbdPgUsrSet["close-button"].class}">${dhbdPgUsrSet["close-button"].text}</button>
            <h2>${dhbdPgUsrSet.h2}</h2>
            <p id="${dhbdPgUsrSet["changes-msg"].id}">${dhbdPgUsrSet["changes-msg"].text}</p>
            
            <!-- Name or Email error message -->
            <div id="${dhbdPgUsrSet["usr-err-msg"].id}">${dhbdPgUsrSet["usr-err-msg"].text}</div>
            
            <!-- User Input Section -->
            <section id="${dhbdPgUsrSet["usr-dtl-sec"].id}">
           
                ${usrSetIpts}
                
            </section>
            
            <!-- Section for changing Passwords -->
            <label class="${dhbdPgUsrSet["new-pwd-sec"].class}">${dhbdPgUsrSet["new-pwd-sec"].text}
                
                ${chgUsrSetIpts}

            </label>
            
            <!-- Error Messages -->
            <div id="${dhbdPgUsrSet["pwd-err-msg"].id}">${dhbdPgUsrSet["pwd-err-msg"].text}</div>
            <div id="${dhbdPgUsrSet["success-msg"].id}">${dhbdPgUsrSet["success-msg"].text}</div>
            ${userSetBtn}
            
        </div>
        <!-- Todo's Section -->
        <section id="${todoData.id}" class="${todoData.class}">
            <!-- this new-todo is always visible while on the dashboard page -->
            <article id="${todoData.art.id}" class="${todoClass}">
                
                ${newTodoIpts}

                <ul id="${todoData.art.ul.id}">
                    <!-- A list of New todo's will dynamically appear here -->
                </ul>
                <!-- Error Messages -->
                <div id="${todoData.art["err-msg"].id}">${todoData.art["err-msg"].text}</div>
                <button class="${todoData.art.buttons.class}" id="${todoData.art.buttons.id}">${todoData.art.buttons.text}</button>
            </article>

            <!-- saved todo's will show in the browser here(dynamically loaded) -->
            
        </section>
    </div>
`;

// wait for the body tags to load before adding
// any more html tags
const waitHtml = () => {
    document.body.innerHTML = startPageTemplate;
    document.body.innerHTML += loginPageTemplate;
    document.body.innerHTML += signupPageTemplate;
    document.body.innerHTML += dashboardPageTemplate;
    
    document.head.appendChild(script);
}

document.addEventListener("DOMContentLoaded", waitHtml);
