const homeBtn = document.getElementById("homeBtn");
const howBtn = document.getElementById("howBtn");
const settingsBtn = document.getElementById("settingsBtn");

const content = document.getElementById("content");


homeBtn.onclick = function() {

    content.innerHTML = `
        <h1>Home</h1>
        <p>Welcome to your Expense Tracker.</p>
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