const homeBtn = document.getElementById("homeBtn");
const howBtn = document.getElementById("howBtn");
const settingsBtn = document.getElementById("settingsBtn");

const content = document.getElementById("content");

homeBtn.onclick = function() {
    showHome();
};


/* ============================= */
/* TEMPORARY ACCOUNT + EXPENSE DATA */
/* ============================= */

let accounts = [];
let allAccounts = [];
let currentAccount = null;
let darkModeEnabled = false;
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
/* ACCOUNTS PAGE */
/* ============================= */

let selectedAccountIndex = 0;


function showAccountsPage() {

    let accountsPage =
        document.getElementById(
            "accountsPage"
        );


    if (!accountsPage) {

        accountsPage =
            document.createElement("div");

        accountsPage.id =
            "accountsPage";

        accountsPage.className =
            "accounts-page";


        accountsPage.innerHTML = `

            <button
                class="accounts-back-button"
                id="accountsBackButton"
            >
                ← Back
            </button>


            <div class="accounts-page-content">

                <h1>Accounts</h1>

                <p class="accounts-subtitle">
                    Choose an account to continue
                </p>


                <div class="accounts-carousel-wrapper">

                    <button
                        class="account-carousel-arrow left"
                        id="accountArrowLeft"
                        aria-label="Previous account"
                    >
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>


                    <div
                        class="accounts-carousel-viewport"
                        id="accountsCarouselViewport"
                    >

                        <div
                            class="accounts-carousel-track"
                            id="accountsCarouselTrack"
                        ></div>

                    </div>


                    <button
                        class="account-carousel-arrow right"
                        id="accountArrowRight"
                        aria-label="Next account"
                    >
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>

                </div>


                <div
                    class="accounts-total"
                    id="accountsTotal"
                ></div>

            </div>

        `;


        document.body.appendChild(
            accountsPage
        );


        document
            .getElementById("accountsBackButton")
            .addEventListener(
                "click",
                function() {

                    accountsPage.remove();

                    loginScreen.style.display =
                        "flex";

                    signInPage.style.display =
                        "none";

                    signUpPage.style.display =
                        "none";

                }
            );


        document
            .getElementById("accountArrowLeft")
            .addEventListener(
                "click",
                function() {

                    moveAccountsCarousel(-1);

                }
            );


        document
            .getElementById("accountArrowRight")
            .addEventListener(
                "click",
                function() {

                    moveAccountsCarousel(1);

                }
            );

    }


    loginScreen.style.display =
        "none";

    signInPage.style.display =
        "none";

    signUpPage.style.display =
        "none";


    accountsPage.style.display =
        "flex";


    renderAccountsCarousel();

}


function renderAccountsCarousel() {

    const track =
        document.getElementById(
            "accountsCarouselTrack"
        );

    const totalText =
        document.getElementById(
            "accountsTotal"
        );


    if (!track || !totalText) {
        return;
    }


    track.innerHTML = "";


    if (accounts.length === 0) {

        track.innerHTML = `

            <div class="no-accounts-message">

                No accounts yet.

            </div>

        `;

        totalText.textContent =
            "0 accounts";

        return;

    }


    if (
        selectedAccountIndex < 0
    ) {

        selectedAccountIndex = 0;

    }


    if (
        selectedAccountIndex >=
        accounts.length
    ) {

        selectedAccountIndex =
            accounts.length - 1;

    }


    accounts.forEach(
        function(account, index) {

            const card =
                document.createElement("div");


            card.className =
                "account-carousel-card";


            if (
                index ===
                selectedAccountIndex
            ) {

                card.classList.add(
                    "selected"
                );

            }


            card.innerHTML = `

                <div class="account-profile-circle">

                    <i class="fa-solid fa-user"></i>

                </div>


                <div class="account-carousel-username">

                    ${escapeHTML(account.username)}

                </div>


                <button
                    class="remove-account-shortcut"
                    type="button"
                >
                    Remove
                </button>

            `;

            const removeButton =
    card.querySelector(
        ".remove-account-shortcut"
    );


removeButton.addEventListener(
    "click",
    function(event) {

        event.stopPropagation();


        const accountToRemove =
            accounts[index];


        if (!accountToRemove) {
            return;
        }


        /* Remove ONLY from the
           Accounts shortcut list */

        accounts.splice(
            index,
            1
        );


        /* Keep the actual account
           inside allAccounts */


        if (
            selectedAccountIndex >=
            accounts.length
        ) {

            selectedAccountIndex =
                Math.max(
                    0,
                    accounts.length - 1
                );

        }


        renderAccountsCarousel();

    }
);


            card.addEventListener(
                "click",
                function() {

                    if (
                        index !==
                        selectedAccountIndex
                    ) {

                        selectedAccountIndex =
                            index;

                        renderAccountsCarousel();

                        return;

                    }


                    enterAccountFromCarousel(
                        account
                    );

                }
            );


            track.appendChild(card);

        }
    );


    totalText.textContent =
        accounts.length === 1
            ? "1 account"
            : `${accounts.length} accounts`;


    requestAnimationFrame(
        function() {

            moveAccountsCarousel(
                0
            );

        }
    );

}


function moveAccountsCarousel(
    direction
) {

    if (
        accounts.length === 0
    ) {
        return;
    }


    if (
        direction !== 0
    ) {

        selectedAccountIndex +=
            direction;


        if (
            selectedAccountIndex < 0
        ) {

            selectedAccountIndex = 0;

        }


        if (
            selectedAccountIndex >=
            accounts.length
        ) {

            selectedAccountIndex =
                accounts.length - 1;

        }

    }


    const viewport =
        document.getElementById(
            "accountsCarouselViewport"
        );

    const track =
        document.getElementById(
            "accountsCarouselTrack"
        );


    if (!viewport || !track) {
        return;
    }


    const selectedCard =
        track.children[
            selectedAccountIndex
        ];


    if (!selectedCard) {
        return;
    }


    const viewportCenter =
        viewport.clientWidth / 2;


    const cardCenter =
        selectedCard.offsetLeft +
        selectedCard.offsetWidth / 2;


    const translateX =
        viewportCenter -
        cardCenter;


    track.style.transform =
        `translateX(${translateX}px)`;


    document
        .querySelectorAll(
            ".account-carousel-card"
        )
        .forEach(
            function(card, index) {

                card.classList.toggle(
                    "selected",
                    index ===
                    selectedAccountIndex
                );

            }
        );

}


function enterAccountFromCarousel(
    account
) {

    if (!account) {
        return;
    }


    currentAccount =
        account;


    accountUsername =
        account.username;

    accountPassword =
        account.password;

    accountPin =
        account.pin;


    expenses =
        account.expenses;


    darkModeEnabled =
        !!account.darkMode;


    applyDarkMode();


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


    const accountsPage =
        document.getElementById(
            "accountsPage"
        );


    if (accountsPage) {

        accountsPage.remove();

    }


    loginScreen.style.display =
        "none";

    signInPage.style.display =
        "none";

    signUpPage.style.display =
        "none";


    showHome();


    accountIcon.style.display =
        "flex";

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


settingsBtn.onclick = function() {

    const isDark =
        currentAccount
            ? !!currentAccount.darkMode
            : false;


    content.innerHTML = `

        <div class="settings-page">

            <h1>Settings</h1>


            <!-- DARK MODE -->

            <div class="settings-section">

                <div class="settings-section-info">

                    <h2>Dark Mode</h2>

                    <p>
                        Use a darker appearance throughout the website.
                    </p>

                </div>


                <button
                    class="theme-toggle ${isDark ? "active" : ""}"
                    id="darkModeToggle"
                    type="button"
                    aria-pressed="${isDark}"
                >

                    <span class="theme-toggle-track">

                        <span class="theme-toggle-knob"></span>

                    </span>


                    <span class="theme-toggle-label">

                        ${isDark ? "On" : "Off"}

                    </span>

                </button>

            </div>


            <!-- DELETE ACCOUNT -->

            <div class="settings-section">

                <div class="settings-section-info">

                    <h2>Delete Account</h2>

                    <p>
                        Permanently delete your current account and all its expense history.
                    </p>

                </div>


                <button
                    class="delete-account-button"
                    id="deleteAccountButton"
                    type="button"
                >
                    Delete Account
                </button>

            </div>


            <!-- LOG OUT -->

            <div class="settings-section">

                <div class="settings-section-info">

                    <h2>Log Out</h2>

                    <p>
                        Log out of your current account.
                    </p>

                </div>


                <button
                    class="logout-button"
                    id="logoutButton"
                    type="button"
                >
                    Log Out
                </button>

            </div>

        </div>

    `;


    /* ============================= */
    /* DARK MODE TOGGLE */
    /* ============================= */

    document
        .getElementById("darkModeToggle")
        .addEventListener(
            "click",
            function() {

                setDarkMode(!darkModeEnabled);

            }
        );


    /* ============================= */
    /* DELETE ACCOUNT */
    /* ============================= */

    document
        .getElementById("deleteAccountButton")
        .addEventListener(
            "click",
            deleteCurrentAccount
        );


    /* ============================= */
    /* LOG OUT */
    /* ============================= */

    document
        .getElementById("logoutButton")
        .addEventListener(
            "click",
            logoutAccount
        );

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

let historyViewMode = "compact";

function showExpenseHistory(viewMode = historyViewMode) {

    historyViewMode = viewMode;

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


        /* ============================= */
        /* DETAILED VIEW */
        /* ============================= */

        if (viewMode === "detailed") {

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

        }


        /* ============================= */
        /* COMPACT VIEW */
        /* ============================= */

        else {

            expenses.forEach(
                function(expense, index) {

                    cardsHTML += `

                        <div
                            class="expense-history-card compact"
                            data-expense-index="${index}"
                        >

                            <div class="compact-history-row">

                                <div class="compact-history-name">

                                    ${escapeHTML(
                                        expense.name
                                    )}

                                </div>


                                <div class="compact-history-date">

                                    ${formatDate(
                                        expense.date
                                    )}

                                </div>


                                <div class="compact-history-rate">

                                    $${expense.rate}

                                </div>

                            </div>

                        </div>

                    `;

                }
            );

        }


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

                    ${expenses.length}

                    ${
                        expenses.length === 1
                            ? "expense"
                            : "expenses"
                    }

                </p>


                <!-- VIEW OPTIONS -->

                <div class="history-view-options">

                    <button
                        class="history-view-button ${
                            viewMode === "detailed"
                                ? "active"
                                : ""
                        }"
                        id="detailedViewButton"
                    >
                        Detailed View
                    </button>


                    <button
                        class="history-view-button ${
                            viewMode === "compact"
                                ? "active"
                                : ""
                        }"
                        id="compactViewButton"
                    >
                        Compact View
                    </button>

                </div>


                <div class="history-container">

                    <div class="history-left-line"></div>


                    <div class="history-cards">

                        ${cardsHTML}

                    </div>


                    <div class="history-right-line"></div>

                </div>

            </div>

        `;


        /* ============================= */
        /* DETAILED VIEW BUTTON */
        /* ============================= */

        document
            .getElementById("detailedViewButton")
            .addEventListener(
                "click",
                function() {

                    if (viewMode !== "detailed") {

                        showExpenseHistory("detailed");

                    }

                }
            );


        /* ============================= */
        /* COMPACT VIEW BUTTON */
        /* ============================= */

        document
            .getElementById("compactViewButton")
            .addEventListener(
                "click",
                function() {

                    if (viewMode !== "compact") {

                        showExpenseHistory("compact");

                    }

                }
            );


        /* ============================= */
        /* COMPACT EXPENSE CLICK */
        /* ============================= */

        if (viewMode === "compact") {

            document
                .querySelectorAll(
                    ".expense-history-card.compact"
                )
                .forEach(
                    function(card) {

                        card.addEventListener(
                            "click",
                            function() {

                                const index =
                                    Number(
                                        card.dataset.expenseIndex
                                    );

                                showExpenseDetails(index);

                            }
                        );

                    }
                );

        }

    }


    /* ============================= */
    /* HISTORY BACK BUTTON */
    /* ============================= */

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
/* EXPENSE FULL DETAILS */
/* ============================= */

function showExpenseDetails(index) {

    const expense =
        expenses[index];


    if (!expense) {

        showExpenseHistory("compact");

        return;

    }


    content.innerHTML = `

        <div class="history-page">

            <button
                class="history-back-button"
                id="expenseDetailBackButton"
            >
                ← Back
            </button>


            <h1>Expense Details</h1>


            <div class="expense-detail-page">

                <div class="expense-detail-card">

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

            </div>

        </div>

    `;


    /* ============================= */
    /* BACK TO COMPACT VIEW */
    /* ============================= */

    document
        .getElementById(
            "expenseDetailBackButton"
        )
        .addEventListener(
            "click",
            function() {

                showExpenseHistory("compact");

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
/* DARK MODE */
/* ============================= */

function applyDarkMode() {

    document.body.classList.toggle(
        "dark-mode",
        darkModeEnabled
    );

}


function setDarkMode(enabled) {

    darkModeEnabled = enabled;

    if (currentAccount) {

        currentAccount.darkMode = enabled;

    }

    applyDarkMode();


    const toggle =
        document.getElementById("darkModeToggle");

    if (toggle) {

        toggle.classList.toggle(
            "active",
            enabled
        );

        toggle.setAttribute(
            "aria-pressed",
            String(enabled)
        );


        const label =
            toggle.querySelector(
                ".theme-toggle-label"
            );

        if (label) {

            label.textContent =
                enabled ? "On" : "Off";

        }

    }

}


applyDarkMode();


 /* ============================= */
 /* DELETE ACCOUNT */
 /* ============================= */

function deleteCurrentAccount() {

    if (!currentAccount) {

        return;

    }


    /* Remove the current account */

    accounts =
        accounts.filter(
            function(account) {

                return account !== currentAccount;

            }
        );


    /* Clear current account */

    currentAccount = null;

    accountUsername = "";
    accountPassword = "";
    accountPin = "";

    expenses = [];


    /* Reset dark mode */

    darkModeEnabled = false;

    applyDarkMode();


    /* Close account popup */

    accountOverlay.style.display =
        "none";


    /* Hide account icon */

    accountIcon.style.display =
        "none";


    /* Hide application pages */

    signInPage.style.display =
        "none";

    signUpPage.style.display =
        "none";


    /* Return to login screen */

    loginScreen.style.display =
        "flex";

}


/* ============================= */
/* LOG OUT */
/* ============================= */

function logoutAccount() {

    currentAccount = null;

    darkModeEnabled = false;

    applyDarkMode();

    accountUsername = "";
    accountPassword = "";
    accountPin = "";

    expenses = [];

    accountOverlay.style.display = "none";

    accountIcon.style.display = "none";

    signInPage.style.display = "none";

    signUpPage.style.display = "none";

    loginScreen.style.display = "flex";

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
/* ACCOUNTS OPTION ON SIGN IN */
/* ============================= */

let accountsLoginOption =
    document.getElementById("accountsLoginOption");

if (!accountsLoginOption) {

    accountsLoginOption =
        document.createElement("div");

    accountsLoginOption.id =
        "accountsLoginOption";

    accountsLoginOption.className =
        "accounts-login-option";

    accountsLoginOption.textContent =
        "Accounts";

    const signInHeading =
        signInPage.querySelector("h1");

    if (signInHeading) {

        signInHeading.insertAdjacentElement(
            "afterend",
            accountsLoginOption
        );

    } else {

        signInPage
            .querySelector(".sign-in-box")
            .insertBefore(
                accountsLoginOption,
                signInPage
                    .querySelector(".sign-in-box")
                    .children[1]
            );

    }

}

accountsLoginOption.onclick =
    function() {

        selectedAccountIndex = 0;

        loginScreen.style.display =
            "none";

        signInPage.style.display =
            "none";

        signUpPage.style.display =
            "none";

        showAccountsPage();

    };

/* ============================= */
/* ACCOUNTS OPTION CLICK */
/* ============================= */

accountsLoginOption.addEventListener(
    "click",
    function() {

        selectedAccountIndex = 0;


        loginScreen.style.display =
            "none";


        signInPage.style.display =
            "none";


        signUpPage.style.display =
            "none";


        showAccountsPage();

    }
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


        /* ============================= */
        /* FIND ACCOUNT */
        /* ============================= */

        const foundAccount =
            allAccounts.find(
                function(account) {

                    return (
                        account.username ===
                            enteredUsername &&

                        account.password ===
                            enteredPassword &&

                        account.pin ===
                            enteredPin
                    );

                }
            );


        if (!foundAccount) {

            signInMessage.textContent =
                "Account information is incorrect.";

            return;

        }


        /* ============================= */
        /* ENTER FOUND ACCOUNT */
        /* ============================= */

        currentAccount =
            foundAccount;


        darkModeEnabled =
            !!foundAccount.darkMode;

        applyDarkMode();


        accountUsername =
            foundAccount.username;

        accountPassword =
            foundAccount.password;

        accountPin =
            foundAccount.pin;


        /* Connect expenses to this account */

        expenses =
            foundAccount.expenses;


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


        signInMessage.textContent = "";


        signInPage.style.display =
            "none";

        loginScreen.style.display =
            "none";


        showHome();


        accountIcon.style.display =
            "flex";


/* Show save-account popup */

        setTimeout(function() {

            showSaveAccountPopup(foundAccount);

        }, 200);

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


        if (!isValidPassword(password)) {

            signupMessage.textContent =
                "Password needs a letter, a number, and at least one of ! @ # $ & > _";

            return;

        }


        /* ============================= */
        /* CHECK DUPLICATE USERNAME */
        /* ============================= */

        const usernameExists =
            allAccounts.some(
                function(account) {

                    return (
                        account.username.toLowerCase() ===
                        username.toLowerCase()
                    );

                }
            );


        if (usernameExists) {

            signupMessage.textContent =
                "That username is already being used.";

            return;

        }


        /* ============================= */
        /* CREATE NEW ACCOUNT */
        /* ============================= */

        const newAccount = {

            username: username,

            password: password,

            pin: pinInput.value,

            expenses: [],

            darkMode: false

        };


/* Store the account itself */

        allAccounts.push(
            newAccount
        );


/* New sign-up accounts are
   automatically saved in Accounts */

        accounts.push(
            newAccount
        );


        /* Make this the current account */

        currentAccount =
            newAccount;


        darkModeEnabled =
            false;

        applyDarkMode();


        accountUsername =
            newAccount.username;

        accountPassword =
            newAccount.password;

        accountPin =
            newAccount.pin;


        /* Connect expenses to this account */

        expenses =
            newAccount.expenses;


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


        signupMessage.textContent = "";


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


/* ============================= */
/* SAVE ACCOUNT POPUP */
/* ============================= */

let saveAccountPopup = null;


function showSaveAccountPopup(account) {

    if (!account) {
        return;
    }


    /* If account is already saved,
       don't show anything */

    const alreadySaved =
        accounts.includes(account);


    if (alreadySaved) {
        return;
    }


    /* Remove an old popup first */

    if (saveAccountPopup) {

        saveAccountPopup.remove();

        saveAccountPopup = null;

    }


    saveAccountPopup =
        document.createElement("div");


    saveAccountPopup.className =
        "save-account-popup";


    saveAccountPopup.innerHTML = `

        <div class="save-account-popup-text">

            Do you want to save this account?

        </div>


        <div class="save-account-popup-buttons">

            <button
                class="save-account-popup-save"
                id="saveAccountPopupSave"
            >
                Save
            </button>


            <button
                class="save-account-popup-not-now"
                id="saveAccountPopupNotNow"
            >
                Not Now
            </button>

        </div>

    `;


    document.body.appendChild(
        saveAccountPopup
    );


    /* SAVE */

    document
        .getElementById(
            "saveAccountPopupSave"
        )
        .addEventListener(
            "click",
            function() {

                if (
                    !accounts.includes(account)
                ) {

                    accounts.push(account);

                }


                saveAccountPopup.remove();

                saveAccountPopup = null;


                /* Refresh Accounts page
                   if it is currently open */

                const accountsPage =
                    document.getElementById(
                        "accountsPage"
                    );


                if (accountsPage) {

                    renderAccountsCarousel();

                }

            }
        );


    /* NOT NOW */

    document
        .getElementById(
            "saveAccountPopupNotNow"
        )
        .addEventListener(
            "click",
            function() {

                saveAccountPopup.remove();

                saveAccountPopup = null;

            }
        );

}
