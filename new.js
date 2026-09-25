const homeBtn = document.getElementById("homeBtn");
const howBtn = document.getElementById("howBtn");
const settingsBtn = document.getElementById("settingsBtn");

const content = document.getElementById("content");

homeBtn.onclick = function() {
    showHome();
};


/* ============================= */
/* TEMPORARY EXPENSE DATA */
/* ============================= */

let expenses = [];


/* ============================= */
/* HOME */
/* ============================= */

function showHome(successMessage = "") {

    content.innerHTML = `
    
        <div class="home-expense-bars">

            <div class="new-expense-bar" id="newExpenseBar">

                <div class="plus-sign">+</div>

                <div>New Expense</div>

            </div>


            <div class="new-expense-bar" id="expenseHistoryBar">

                <div class="plus-sign">$</div>

                <div>Expense History</div>

            </div>

        </div>

        ${
            successMessage
                ? `<div class="success-message">${successMessage}</div>`
                : ""
        }

    `;


    /* New Expense */

    document
        .getElementById("newExpenseBar")
        .addEventListener(
            "click",
            showExpenseForm
        );


    /* Expense History */

    document
        .getElementById("expenseHistoryBar")
        .addEventListener(
            "click",
            showExpenseHistory
        );

}


/* ============================= */
/* HOW IT WORKS */
/* ============================= */

howBtn.onclick = function() {

    content.innerHTML = `
        <h1>How It Works</h1>

        <p>
            This page explains how your Expense Tracker works.
        </p>
    `;

};


/* ============================= */
/* SETTINGS */
/* ============================= */

settingsBtn.onclick = function() {

    content.innerHTML = `
        <h1>Settings</h1>

        <p>
            Your settings will appear here.
        </p>
    `;

};


/* ============================= */
/* NEW EXPENSE */
/* ============================= */

function showExpenseForm() {

    let currentStep = 1;


    let expenseData = {

        name: "",

        rate: "",

        date: "",

        time: "",

        familyMember: "",

        category: ""

    };


    renderExpenseStep();


    function renderExpenseStep() {

        let stepHTML = "";


        /* ============================= */
        /* STEP 1 - NAME */
        /* ============================= */

        if (currentStep === 1) {

            stepHTML = `

                <div class="expense-step-content">

                    <label for="expenseName">
                        Name of Expense
                    </label>

                    <input
                        type="text"
                        id="expenseName"
                        placeholder="Enter expense name"
                    >

                    <button
                        class="next-button"
                        id="nextButton"
                    >
                        Next
                        <span>→</span>
                    </button>

                    <div
                        class="expense-error"
                        id="expenseError"
                    ></div>

                </div>

            `;

        }


        /* ============================= */
        /* STEP 2 - RATE */
        /* ============================= */

        else if (currentStep === 2) {

            stepHTML = `

                <div class="expense-step-content">

                    <label for="expenseRate">
                        Rate of Expense
                    </label>

                    <div class="rate-input">

                        <span>$</span>

                        <input
                            type="number"
                            id="expenseRate"
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                        >

                    </div>

                    <button
                        class="next-button"
                        id="nextButton"
                    >
                        Next
                        <span>→</span>
                    </button>

                    <div
                        class="expense-error"
                        id="expenseError"
                    ></div>

                </div>

            `;

        }


        /* ============================= */
        /* STEP 3 - DATE + TIME */
        /* ============================= */

        else if (currentStep === 3) {

            stepHTML = `

                <div class="expense-step-content">

                    <div class="date-time-row">

                        <div class="date-field">

                            <label for="expenseDate">
                                Date of Expense
                            </label>

                            <input
                                type="date"
                                id="expenseDate"
                            >

                        </div>


                        <div class="time-field">

                            <label for="expenseTime">
                                Time
                            </label>

                            <input
                                type="time"
                                id="expenseTime"
                            >

                        </div>

                    </div>


                    <button
                        class="next-button"
                        id="nextButton"
                    >
                        Next
                        <span>→</span>
                    </button>

                    <div
                        class="expense-error"
                        id="expenseError"
                    ></div>

                </div>

            `;

        }


        /* ============================= */
        /* STEP 4 - FAMILY MEMBER */
        /* ============================= */

        else if (currentStep === 4) {

            stepHTML = `

                <div class="expense-step-content">

                    <label for="familyMember">
                        Family Member
                    </label>

                    <input
                        type="text"
                        id="familyMember"
                        placeholder="Who made this expense?"
                    >

                    <button
                        class="next-button"
                        id="nextButton"
                    >
                        Next
                        <span>→</span>
                    </button>

                    <div
                        class="expense-error"
                        id="expenseError"
                    ></div>

                </div>

            `;

        }


        /* ============================= */
        /* STEP 5 - CATEGORY */
        /* ============================= */

        else if (currentStep === 5) {

            stepHTML = `

                <div class="expense-step-content">

                    <label for="expenseCategory">
                        Category
                    </label>

                    <select id="expenseCategory">

                        <option value="">
                            Select a category
                        </option>

                        <option value="Electrical">
                            Electrical
                        </option>

                        <option value="Household">
                            Household
                        </option>

                        <option value="Furniture">
                            Furniture
                        </option>

                        <option value="Other">
                            Other
                        </option>

                    </select>


                    <button
                        class="save-expense-button"
                        id="saveExpenseButton"
                        disabled
                    >
                        Save Expense
                    </button>

                    <div
                        class="expense-error"
                        id="expenseError"
                    ></div>

                </div>

            `;

        }


        /* ============================= */
        /* PROGRESS BAR */
        /* ============================= */

        let progressHTML = `

            <div class="expense-stepper">

                <div class="step-tab ${
                    currentStep >= 1 ? "active" : ""
                }">
                    Name
                </div>

                ${
                    currentStep >= 2
                        ? `
                            <div class="step-line"></div>

                            <div class="step-tab active">
                                Rate
                            </div>
                        `
                        : ""
                }

                ${
                    currentStep >= 3
                        ? `
                            <div class="step-line"></div>

                            <div class="step-tab active">
                                Date & Time
                            </div>
                        `
                        : ""
                }

                ${
                    currentStep >= 4
                        ? `
                            <div class="step-line"></div>

                            <div class="step-tab active">
                                Family Member
                            </div>
                        `
                        : ""
                }

                ${
                    currentStep >= 5
                        ? `
                            <div class="step-line"></div>

                            <div class="step-tab active">
                                Category
                            </div>
                        `
                        : ""
                }

            </div>

        `;


        content.innerHTML = `

            <div class="expense-form-page">

                <div class="expense-form-card">

                    <button
                        class="expense-back-button"
                        id="expenseBackButton"
                    >
                        ← Back
                    </button>

                    <h1>New Expense</h1>

                    ${progressHTML}

                    ${stepHTML}

                </div>

            </div>

        `;


        /* ============================= */
        /* BACK BUTTON */
        /* ============================= */

        document
            .getElementById("expenseBackButton")
            .addEventListener(
                "click",
                function() {

                    showHome();

                }
            );


        /* ============================= */
        /* STEP 1 */
        /* ============================= */

        if (currentStep === 1) {

            document
                .getElementById("nextButton")
                .addEventListener(
                    "click",
                    function() {

                        const value =
                            document
                                .getElementById(
                                    "expenseName"
                                )
                                .value
                                .trim();


                        if (value === "") {

                            showError(
                                "Please enter the name of the expense."
                            );

                            return;

                        }


                        expenseData.name =
                            value;

                        currentStep = 2;

                        renderExpenseStep();

                    }
                );

        }


        /* ============================= */
        /* STEP 2 */
        /* ============================= */

        if (currentStep === 2) {

            document
                .getElementById("nextButton")
                .addEventListener(
                    "click",
                    function() {

                        const value =
                            document
                                .getElementById(
                                    "expenseRate"
                                )
                                .value;


                        if (
                            value === "" ||
                            Number(value) < 0
                        ) {

                            showError(
                                "Please enter a valid expense rate."
                            );

                            return;

                        }


                        expenseData.rate =
                            Number(value)
                                .toFixed(2);

                        currentStep = 3;

                        renderExpenseStep();

                    }
                );

        }


        /* ============================= */
        /* STEP 3 */
        /* ============================= */

        if (currentStep === 3) {

            document
                .getElementById("nextButton")
                .addEventListener(
                    "click",
                    function() {

                        const date =
                            document
                                .getElementById(
                                    "expenseDate"
                                )
                                .value;

                        const time =
                            document
                                .getElementById(
                                    "expenseTime"
                                )
                                .value;


                        if (
                            date === "" ||
                            time === ""
                        ) {

                            showError(
                                "Please select both the date and time."
                            );

                            return;

                        }


                        expenseData.date =
                            date;

                        expenseData.time =
                            time;

                        currentStep = 4;

                        renderExpenseStep();

                    }
                );

        }


        /* ============================= */
        /* STEP 4 */
        /* ============================= */

        if (currentStep === 4) {

            document
                .getElementById("nextButton")
                .addEventListener(
                    "click",
                    function() {

                        const value =
                            document
                                .getElementById(
                                    "familyMember"
                                )
                                .value
                                .trim();


                        if (value === "") {

                            showError(
                                "Please enter the family member."
                            );

                            return;

                        }


                        expenseData.familyMember =
                            value;

                        currentStep = 5;

                        renderExpenseStep();

                    }
                );

        }


        /* ============================= */
        /* STEP 5 */
        /* ============================= */

        if (currentStep === 5) {

            const category =
                document.getElementById(
                    "expenseCategory"
                );

            const saveButton =
                document.getElementById(
                    "saveExpenseButton"
                );


            category.addEventListener(
                "change",
                function() {

                    if (category.value !== "") {

                        saveButton.disabled =
                            false;

                        saveButton.classList.add(
                            "enabled"
                        );

                    } else {

                        saveButton.disabled =
                            true;

                        saveButton.classList.remove(
                            "enabled"
                        );

                    }

                }
            );


            saveButton.addEventListener(
                "click",
                function() {

                    if (category.value === "") {

                        return;

                    }


                    expenseData.category =
                        category.value;


                    /* Save temporarily */

                    expenses.push({
                        name:
                            expenseData.name,

                        rate:
                            expenseData.rate,

                        date:
                            expenseData.date,

                        time:
                            expenseData.time,

                        familyMember:
                            expenseData.familyMember,

                        category:
                            expenseData.category
                    });


                    /* Return Home */

                    showHome(
                        "Saved successfully"
                    );

                }
            );

        }


        function showError(message) {

            document
                .getElementById("expenseError")
                .textContent = message;

        }

    }

}


/* ============================= */
/* EXPENSE HISTORY */
/* ============================= */

function showExpenseHistory() {

    if (expenses.length === 0) {

        content.innerHTML = `

            <div class="history-empty-page">

                <h1>No expense yet</h1>

                <p>
                    Expense count:
                    <strong>0</strong>
                </p>

                <button
                    class="history-back-button"
                    id="historyBackButton"
                >
                    ← Back
                </button>

            </div>

        `;

    } else {

        let cardsHTML = "";


        expenses.forEach(
            function(expense, index) {

                cardsHTML += `

                    <div class="expense-history-card">

                        <div class="history-card-top">

                            <h2>
                                ${escapeHTML(
                                    expense.name
                                )}
                            </h2>

                            <div class="history-rate">
                                $${expense.rate}
                            </div>

                        </div>


                        <div class="history-details">

                            <div>
                                <span>Date</span>
                                <strong>
                                    ${formatDate(
                                        expense.date
                                    )}
                                </strong>
                            </div>

                            <div>
                                <span>Time</span>
                                <strong>
                                    ${formatTime(
                                        expense.time
                                    )}
                                </strong>
                            </div>

                            <div>
                                <span>Family Member</span>
                                <strong>
                                    ${escapeHTML(
                                        expense.familyMember
                                    )}
                                </strong>
                            </div>

                            <div>
                                <span>Category</span>
                                <strong>
                                    ${escapeHTML(
                                        expense.category
                                    )}
                                </strong>
                            </div>

                        </div>

                    </div>

                `;

            }
        );


        content.innerHTML = `

            <div class="history-page">

                <button
                    class="history-back-button"
                    id="historyBackButton"
                >
                    ← Back
                </button>

                <h1>Expense History</h1>

                <p class="expense-count">

                    ${
                        expenses.length
                    }

                    ${
                        expenses.length === 1
                            ? "expense"
                            : "expenses"
                    }

                </p>


                <div class="history-container">

                    <div class="history-left-line"></div>

                    <div class="history-cards">

                        ${cardsHTML}

                    </div>

                    <div class="history-right-line"></div>

                </div>

            </div>

        `;

    }


    document
        .getElementById("historyBackButton")
        .addEventListener(
            "click",
            function() {

                showHome();

            }
        );

}


/* ============================= */
/* HELPER FUNCTIONS */
/* ============================= */

function formatDate(dateString) {

    const date =
        new Date(
            dateString + "T00:00:00"
        );


    return date.toLocaleDateString(
        "en-CA",
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );

}


function formatTime(timeString) {

    const [hours, minutes] =
        timeString.split(":");


    const date =
        new Date();

    date.setHours(
        Number(hours),
        Number(minutes)
    );


    return date.toLocaleTimeString(
        "en-US",
        {
            hour: "numeric",
            minute: "2-digit"
        }
    );

}


/* Prevent user-entered text from becoming HTML */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


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

        loginScreen.style.display =
            "none";

        signInPage.style.display =
            "flex";


        signInUsernameInput.value = "";

        signInPasswordInput.value = "";

        signInPinInput.value = "";

        signInMessage.textContent = "";


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


        if (enteredUsername === "") {

            signInMessage.textContent =
                "Please enter a username.";

            return;

        }


        if (enteredPassword === "") {

            signInMessage.textContent =
                "Please enter a password.";

            return;

        }


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


        signInMessage.textContent = "";


        accountUsername =
            enteredUsername;

        accountPassword =
            enteredPassword;

        accountPin =
            enteredPin;


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


        signInPage.style.display =
            "none";

        loginScreen.style.display =
            "none";


        showHome();


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

        loginScreen.style.display =
            "none";

        signUpPage.style.display =
            "flex";


        accountPin = String(
            Math.floor(Math.random() * 5) + 1
        );

        pinInput.value =
            accountPin;


        usernameInput.value = "";

        passwordInput.value = "";

        signupMessage.textContent = "";


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


        if (username === "") {

            signupMessage.textContent =
                "Please enter a username.";

            return;

        }


        if (
            !isValidPassword(password)
        ) {

            signupMessage.textContent =
                "Password needs a letter, a number, and at least one of ! @ # $ & > _";

            return;

        }


        accountUsername =
            username;

        accountPassword =
            password;

        accountPin =
            pinInput.value;


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


        signUpPage.style.display =
            "none";

        loginScreen.style.display =
            "none";


        showHome();


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

            displayPassword.textContent =
                "••••••••";

            displayPassword.dataset.visible =
                "false";

            accountPasswordToggle.textContent =
                "Show Pass";

        } else {

            displayPassword.textContent =
                accountPassword;

            displayPassword.dataset.visible =
                "true";

            accountPasswordToggle.textContent =
                "Hide Pass";

        }

    }
);