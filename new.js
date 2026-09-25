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

const loginScreen =
    document.getElementById("loginScreen");

const signInBtn =
    document.getElementById("signInBtn");

const signUpBtn =
    document.getElementById("signUpBtn");


/* ============================= */
/* SIGN IN PAGE */
/* ============================= */

const signInPage =
    document.getElementById("signInPage");

const backToLoginFromSignInBtn =
    document.getElementById(
        "backToLoginFromSignInBtn"
    );

const signInUsernameInput =
    document.getElementById(
        "signInUsernameInput"
    );

const signInPasswordInput =
    document.getElementById(
        "signInPasswordInput"
    );

const signInPinInput =
    document.getElementById(
        "signInPinInput"
    );

const signInPasswordToggleBtn =
    document.getElementById(
        "signInPasswordToggleBtn"
    );

const enterAccountBtn =
    document.getElementById(
        "enterAccountBtn"
    );

const signInMessage =
    document.getElementById(
        "signInMessage"
    );


/* ============================= */
/* SIGN UP PAGE */
/* ============================= */

const signUpPage =
    document.getElementById("signUpPage");

const backToLoginBtn =
    document.getElementById(
        "backToLoginBtn"
    );

const usernameInput =
    document.getElementById(
        "usernameInput"
    );

const passwordInput =
    document.getElementById(
        "passwordInput"
    );

const pinInput =
    document.getElementById(
        "pinInput"
    );

const passwordToggleBtn =
    document.getElementById(
        "passwordToggleBtn"
    );

const saveAccountBtn =
    document.getElementById(
        "saveAccountBtn"
    );

const signupMessage =
    document.getElementById(
        "signupMessage"
    );


/* ============================= */
/* ACCOUNT ICON + ACCOUNT BOX */
/* ============================= */

const accountIcon =
    document.getElementById(
        "accountIcon"
    );

const accountOverlay =
    document.getElementById(
        "accountOverlay"
    );

const closeAccountBtn =
    document.getElementById(
        "closeAccountBtn"
    );

const displayUsername =
    document.getElementById(
        "displayUsername"
    );

const displayPassword =
    document.getElementById(
        "displayPassword"
    );

const displayPin =
    document.getElementById(
        "displayPin"
    );

const accountPasswordToggle =
    document.getElementById(
        "accountPasswordToggle"
    );


/* ============================= */
/* TEMPORARY ACCOUNT DATA */
/* ============================= */

let accountUsername = "";

let accountPassword = "";

let accountPin = "";


/* ============================= */
/* SIGN IN BUTTON */
/* ============================= */

signInBtn.addEventListener(
    "click",
    function() {

        /* Hide login screen */

        loginScreen.style.display =
            "none";


        /* Show sign in page */

        signInPage.style.display =
            "flex";


        /* Clear sign in fields */

        signInUsernameInput.value = "";

        signInPasswordInput.value = "";

        signInPinInput.value = "";

        signInMessage.textContent = "";


        /* Password starts hidden */

        signInPasswordInput.type =
            "password";

        signInPasswordToggleBtn.textContent =
            "Show Pass";

    }
);


/* ============================= */
/* BACK FROM SIGN IN */
/* ============================= */

backToLoginFromSignInBtn.addEventListener(
    "click",
    function() {

        signInPage.style.display =
            "none";

        loginScreen.style.display =
            "flex";

    }
);


/* ============================= */
/* SIGN IN PASSWORD SHOW / HIDE */
/* ============================= */

signInPasswordToggleBtn.addEventListener(
    "click",
    function() {

        if (
            signInPasswordInput.type ===
            "password"
        ) {

            signInPasswordInput.type =
                "text";

            signInPasswordToggleBtn.textContent =
                "Hide Pass";

        } else {

            signInPasswordInput.type =
                "password";

            signInPasswordToggleBtn.textContent =
                "Show Pass";

        }

    }
);


/* ============================= */
/* ENTER ACCOUNT */
/* ============================= */

enterAccountBtn.addEventListener(
    "click",
    function() {

        const enteredUsername =
            signInUsernameInput.value.trim();

        const enteredPassword =
            signInPasswordInput.value;

        const enteredPin =
            signInPinInput.value.trim();


        /* Username must be entered */

        if (enteredUsername === "") {

            signInMessage.textContent =
                "Please enter a username.";

            return;

        }


        /* Password must be entered */

        if (enteredPassword === "") {

            signInMessage.textContent =
                "Please enter a password.";

            return;

        }


        /* PIN must be from 1 to 5 */

        if (
            enteredPin !== "1" &&
            enteredPin !== "2" &&
            enteredPin !== "3" &&
            enteredPin !== "4" &&
            enteredPin !== "5"
        ) {

            signInMessage.textContent =
                "PIN must be a number from 1 to 5.";

            return;

        }


        /* ============================= */
        /* SIGN IN SUCCESS */
        /* ============================= */

        signInMessage.textContent = "";


        /* Use the entered information
           as the current account */

        accountUsername =
            enteredUsername;

        accountPassword =
            enteredPassword;

        accountPin =
            enteredPin;


        /* Update account box */

        displayUsername.textContent =
            accountUsername;

        displayPassword.textContent =
            "••••••••";

        displayPassword.dataset.visible =
            "false";

        displayPin.textContent =
            accountPin;

        accountPasswordToggle.textContent =
            "Show Pass";


        /* Hide Sign In page */

        signInPage.style.display =
            "none";


        /* Hide Login screen */

        loginScreen.style.display =
            "none";


        /* Open Home */

        homeBtn.click();


        /* Show account icon */

        accountIcon.style.display =
            "flex";

    }
);


/* ============================= */
/* SIGN UP BUTTON */
/* ============================= */

signUpBtn.addEventListener(
    "click",
    function() {

        /* Hide login screen */

        loginScreen.style.display =
            "none";


        /* Show Sign Up page */

        signUpPage.style.display =
            "flex";


        /* Generate random PIN from 1 to 5 */

        accountPin = String(
            Math.floor(Math.random() * 5) + 1
        );

        pinInput.value =
            accountPin;


        /* Clear fields */

        usernameInput.value = "";

        passwordInput.value = "";

        signupMessage.textContent = "";


        /* Password starts hidden */

        passwordInput.type =
            "password";

        passwordToggleBtn.textContent =
            "Show Pass";

    }
);


/* ============================= */
/* BACK TO LOGIN FROM SIGN UP */
/* ============================= */

backToLoginBtn.addEventListener(
    "click",
    function() {

        signUpPage.style.display =
            "none";

        loginScreen.style.display =
            "flex";

    }
);


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


    return (
        hasLetter &&
        hasNumber &&
        hasSpecial
    );

}


/* ============================= */
/* SIGN UP PASSWORD SHOW / HIDE */
/* ============================= */

passwordToggleBtn.addEventListener(
    "click",
    function() {

        if (
            passwordInput.type ===
            "password"
        ) {

            passwordInput.type =
                "text";

            passwordToggleBtn.textContent =
                "Hide Pass";

        } else {

            passwordInput.type =
                "password";

            passwordToggleBtn.textContent =
                "Show Pass";

        }

    }
);


/* ============================= */
/* SAVE ACCOUNT */
/* ============================= */

saveAccountBtn.addEventListener(
    "click",
    function() {

        const username =
            usernameInput.value.trim();

        const password =
            passwordInput.value;


        /* Username check */

        if (username === "") {

            signupMessage.textContent =
                "Please enter a username.";

            return;

        }


        /* Password check */

        if (
            !isValidPassword(password)
        ) {

            signupMessage.textContent =
                "Password needs a letter, a number, and at least one of ! @ # $ & > _";

            return;

        }


        /* Save temporary account */

        accountUsername =
            username;

        accountPassword =
            password;

        accountPin =
            pinInput.value;


        /* Put information into account box */

        displayUsername.textContent =
            accountUsername;

        displayPin.textContent =
            accountPin;

        displayPassword.textContent =
            "••••••••";

        displayPassword.dataset.visible =
            "false";


        accountPasswordToggle.textContent =
            "Show Pass";


        /* Hide Sign Up page */

        signUpPage.style.display =
            "none";


        /* Hide Login screen */

        loginScreen.style.display =
            "none";


        /* Open old Home page */

        homeBtn.click();


        /* Show account icon */

        accountIcon.style.display =
            "flex";

    }
);


/* ============================= */
/* ACCOUNT ICON */
/* ============================= */

accountIcon.addEventListener(
    "click",
    function() {

        accountOverlay.style.display =
            "flex";

    }
);


/* ============================= */
/* CLOSE ACCOUNT BOX */
/* ============================= */

closeAccountBtn.addEventListener(
    "click",
    function() {

        accountOverlay.style.display =
            "none";

    }
);


/* ============================= */
/* ACCOUNT PASSWORD SHOW / HIDE */
/* ============================= */

accountPasswordToggle.addEventListener(
    "click",
    function() {

        if (
            displayPassword.dataset.visible ===
            "true"
        ) {

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

    }
);