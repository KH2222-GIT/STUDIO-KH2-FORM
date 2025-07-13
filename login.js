// Predefined users
window.ownerAccounts = [
    { username: "KH2", password: "310764921199" }
];
window.adminAccounts = [
    { username: "OKI3", password: "965356901928" },
    { username: "Roquailian", password: "198654848648" }
];

// Credentials shown after login
window.submissionEmail = "kyson3713@gmail.com";
window.submissionPassword = "kh2studiosstaffpanellaptop";

function showLogin(errorMsg = "") {
    const container = document.getElementById('main-container');
    container.innerHTML = `
        <h2>Login Panel</h2>
        <form id="login-form">
            <label for="login-user">Username:</label>
            <input type="text" id="login-user" required autocomplete="username">
            <label for="login-pass">Password:</label>
            <input type="password" id="login-pass" required autocomplete="current-password">
            <button type="submit">Login</button>
            <div id="login-error" class="error">${errorMsg}</div>
        </form>
    `;
    document.getElementById('login-form').addEventListener('submit', loginHandler);
}

function loginHandler(e) {
    e.preventDefault();
    const user = document.getElementById('login-user').value.trim();
    const pass = document.getElementById('login-pass').value;

    const owner = ownerAccounts.find(a => a.username === user && a.password === pass);
    if (owner) {
        showOwnerPanel();
        return;
    }
    const admin = adminAccounts.find(a => a.username === user && a.password === pass);
    if (admin) {
        showAdminPanel();
        return;
    }
    document.getElementById('login-error').textContent = 'Invalid credentials.';
}

// Initial call
window.addEventListener('DOMContentLoaded', () => showLogin());