const homeBtn = document.getElementById("homeBtn");
const howBtn = document.getElementById("howBtn");
const settingsBtn = document.getElementById("settingsBtn");

const content = document.getElementById("content");


/* ============================= */
/* HOME */
/* ============================= */

homeBtn.onclick = function() {

    content.innerHTML = `
        <div class="new-expense-bar">
            <div class="plus-sign">+</div>
            <div>New Expense</div>
        </div>
    `;

};


/* ============================= */
/* HOW IT WORKS */
/* ============================= */

howBtn.onclick = function() {

    content.innerHTML = `
        <h1>How It Works</h1>
        <p>This page explains how your Expense Tracker works.</p>
    `;

};


/* ============================= */
/* SETTINGS */
/* ============================= */

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

const signInBtn = document.getElementById("signInBtn");

const signUpBtn = document.getElementById("signUpBtn");


/* ============================= */
/* SIGN IN */
/* ============================= */

signInBtn.addEventListener("click", function() {

    loginScreen.style.display = "none";

    /* Open the old Home page */
    homeBtn.click();

});


/* ============================= */
/* SIGN UP PAGE */
/* ============================= */

const signUpPage = document.getElementById("signUpPage");

const backToLoginBtn =
    document.getElementById("backToLoginBtn");

const usernameInput =
    document.getElementById("usernameInput");

const passwordInput =
    document.getElementById("passwordInput");

const pinInput =
    document.getElementById("pinInput");

const passwordToggleBtn =
    document.getElementById("passwordToggleBtn");

const saveAccountBtn =
    document.getElementById("saveAccountBtn");

const signupMessage =
    document.getElementById("signupMessage");


/* ============================= */
/* ACCOUNT ICON + ACCOUNT BOX */
/* ============================= */

const accountIcon =
    document.getElementById("accountIcon");

const accountOverlay =
    document.getElementById("accountOverlay");

const closeAccountBtn =
    document.getElementById("closeAccountBtn");

const displayUsername =
    document.getElementById("displayUsername");

const displayPassword =
    document.getElementById("displayPassword");

const displayPin =
    document.getElementById("displayPin");

const accountPasswordToggle =
    document.getElementById("accountPasswordToggle");


/* ============================= */
/* TEMPORARY ACCOUNT DATA */
/* ============================= */

let accountUsername = "";

let accountPassword = "";

let accountPin = "";


/* ============================= */
/* OPEN SIGN UP */
/* ============================= */

signUpBtn.addEventListener("click", function() {

    /* Hide login screen */
    loginScreen.style.display = "none";

    /* Show sign up page */
    signUpPage.style.display = "flex";


    /* Generate random PIN from 1 to 5 */
    accountPin = String(
        Math.floor(Math.random() * 5) + 1
    );

    pinInput.value = accountPin;


    /* Clear fields */
    usernameInput.value = "";

    passwordInput.value = "";

    signupMessage.textContent = "";


    /* Make sure password starts hidden */
    passwordInput.type = "password";

    passwordToggleBtn.textContent = "Show Pass";

});


/* ============================= */
/* BACK TO LOGIN */
/* ============================= */

backToLoginBtn.addEventListener("click", function() {

    signUpPage.style.display = "none";

    loginScreen.style.display = "flex";

});


/* ============================= */
/* PASSWORD VALIDATION */
/* ============================= */

function isValidPassword(password) {

    const hasLetter =
        /[A-Za-z]/.test(password);

    const hasNumber =
        /[0-9]/.test(password);

    const hasSpecial =
        /[!@#$&>_]/.test(password);


    return hasLetter &&
           hasNumber &&
           hasSpecial;

}


/* ============================= */
/* SIGN UP PASSWORD SHOW / HIDE */
/* ============================= */

passwordToggleBtn.addEventListener("click", function() {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        passwordToggleBtn.textContent = "Hide Pass";

    } else {

        passwordInput.type = "password";

        passwordToggleBtn.textContent = "Show Pass";

    }

});


/* ============================= */
/* SAVE ACCOUNT */
/* ============================= */

saveAccountBtn.addEventListener("click", function() {

    const username =
        usernameInput.value.trim();

    const password =
        passwordInput.value;


    /* Check username */

    if (username === "") {

        signupMessage.textContent =
            "Please enter a username.";

        return;

    }


    /* Check password */

    if (!isValidPassword(password)) {

        signupMessage.textContent =
            "Password needs a letter, a number, and at least one of ! @ # $ & > _";

        return;

    }


    /* Save temporary account */

    accountUsername = username;

    accountPassword = password;

    accountPin = pinInput.value;


    /* Put account information into account box */

    displayUsername.textContent =
        accountUsername;

    displayPin.textContent =
        accountPin;

    displayPassword.textContent =
        "••••••••";

    displayPassword.dataset.visible =
        "false";


    /* Make sure account password starts hidden */

    accountPasswordToggle.textContent =
        "Show Pass";


    /* Hide sign up page */

    signUpPage.style.display = "none";


    /* Hide login screen */

    loginScreen.style.display = "none";


    /* Open old Home page */

    homeBtn.click();


    /* Show account icon */

    accountIcon.style.display = "flex";

});


/* ============================= */
/* OPEN ACCOUNT */
/* ============================= */

accountIcon.addEventListener("click", function() {

    accountOverlay.style.display = "flex";

});


/* ============================= */
/* CLOSE ACCOUNT */
/* ============================= */

closeAccountBtn.addEventListener("click", function() {

    accountOverlay.style.display = "none";

});


/* ============================= */
/* ACCOUNT PASSWORD SHOW / HIDE */
/* ============================= */

accountPasswordToggle.addEventListener("click", function() {

    if (displayPassword.dataset.visible === "true") {

        /* Hide password */

        displayPassword.textContent =
            "••••••••";

        displayPassword.dataset.visible =
            "false";

        accountPasswordToggle.textContent =
            "Show Pass";

    } else {

        /* Show password */

        displayPassword.textContent =
            accountPassword;

        displayPassword.dataset.visible =
            "true";

        accountPasswordToggle.textContent =
            "Hide Pass";

    }

});