const homeBtn = document.getElementById("homeBtn");
const howBtn = document.getElementById("howBtn");
const settingsBtn = document.getElementById("settingsBtn");

const content = document.getElementById("content");


homeBtn.onclick = function() {

    content.innerHTML = `
    <div class="new-expense-bar">
        <div class="plus-sign">+</div>
        <div>New Expense</div>
    </div>
`;

};


howBtn.onclick = function() {

    content.innerHTML = `
        <h1>How It Works</h1>
        <p>This page explains how your Expense Tracker works.</p>
    `;

};


settingsBtn.onclick = function() {

    content.innerHTML = `
        <h1>Settings</h1>
        <p>Your settings will appear here.</p>
    `;

};


/* ============================= */
/* LOGIN SCREEN */
/* ============================= */

const loginScreen = document.getElementById("loginScreen");

const loginBox = document.querySelector(".login-box");

const signInBtn = document.getElementById("signInBtn");

const signUpBtn = document.getElementById("signUpBtn");


/* Sign In */

signInBtn.addEventListener("click", function() {

    /* Move purple side */
    loginBox.classList.add("move-purple");

    /* Wait for animation */
    setTimeout(function() {

        /* Hide login screen */
        loginScreen.classList.add("hide-login");

    }, 600);

});


/* Sign Up */

signUpBtn.addEventListener("click", function() {

    /* Nothing for now */

});