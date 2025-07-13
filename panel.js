function showOwnerPanel() {
    const container = document.getElementById('main-container');
    container.innerHTML = `
        <h2>Owner Panel</h2>
        <div class="info">
            <b>Email:</b> ${submissionEmail}<br>
            <b>Password:</b> ${submissionPassword}
        </div>
        <div class="panel">
            <button class="add-admin" id="add-admin-btn">Add Admin Account</button>
            <form id="add-admin-form" style="display:none; margin-top:10px;">
                <label>Admin Username:</label>
                <input type="text" id="new-admin-user" required>
                <label>Admin Password:</label>
                <input type="text" id="new-admin-pass" required>
                <button type="submit">Create Admin</button>
                <span id="add-admin-msg"></span>
            </form>

            <button class="add-owner" id="add-owner-btn">Add Owner Account</button>
            <form id="add-owner-form" style="display:none; margin-top:10px;">
                <label>Owner Username:</label>
                <input type="text" id="new-owner-user" required>
                <label>Owner Password:</label>
                <input type="text" id="new-owner-pass" required>
                <button type="submit">Create Owner</button>
                <span id="add-owner-msg"></span>
            </form>

            <div class="owner-list">
                <b>Current Owners:</b>
                <ul id="owner-list-ul"></ul>
            </div>
            <div class="admin-list">
                <b>Current Admins:</b>
                <ul id="admin-list-ul"></ul>
            </div>
            <button class="logout" id="logout-btn">Log out</button>
        </div>
        <div class="form-section">
            <div class="form-title">Submission Form</div>
            <div id="form-area"></div>
        </div>
    `;

    updateOwnerList();
    updateAdminList();

    document.getElementById('add-admin-btn').onclick = () => {
        document.getElementById('add-admin-form').style.display = "block";
        document.getElementById('add-admin-btn').style.display = "none";
    };
    document.getElementById('add-admin-form').onsubmit = function(ev) {
        ev.preventDefault();
        const newUser = document.getElementById('new-admin-user').value.trim();
        const newPass = document.getElementById('new-admin-pass').value.trim();
        const msgEl = document.getElementById('add-admin-msg');
        if (!newUser || !newPass) {
            msgEl.textContent = "Both fields required.";
            msgEl.className = "error";
            return;
        }
        if (adminAccounts.some(a => a.username === newUser)) {
            msgEl.textContent = "That admin username already exists.";
            msgEl.className = "error";
            return;
        }
        adminAccounts.push({ username: newUser, password: newPass });
        msgEl.textContent = "Admin added!";
        msgEl.className = "success";
        updateAdminList();
        document.getElementById('new-admin-user').value = "";
        document.getElementById('new-admin-pass').value = "";
    };

    document.getElementById('add-owner-btn').onclick = () => {
        document.getElementById('add-owner-form').style.display = "block";
        document.getElementById('add-owner-btn').style.display = "none";
    };
    document.getElementById('add-owner-form').onsubmit = function(ev) {
        ev.preventDefault();
        const newUser = document.getElementById('new-owner-user').value.trim();
        const newPass = document.getElementById('new-owner-pass').value.trim();
        const msgEl = document.getElementById('add-owner-msg');
        if (!newUser || !newPass) {
            msgEl.textContent = "Both fields required.";
            msgEl.className = "error";
            return;
        }
        if (ownerAccounts.some(a => a.username === newUser)) {
            msgEl.textContent = "That owner username already exists.";
            msgEl.className = "error";
            return;
        }
        ownerAccounts.push({ username: newUser, password: newPass });
        msgEl.textContent = "Owner added!";
        msgEl.className = "success";
        updateOwnerList();
        document.getElementById('new-owner-user').value = "";
        document.getElementById('new-owner-pass').value = "";
    };

    document.getElementById('logout-btn').onclick = () => showLogin();

    // Load form
    fetch('form.html')
        .then(resp => resp.text())
        .then(html => {
            document.getElementById('form-area').innerHTML = html;
        });
}

function showAdminPanel() {
    const container = document.getElementById('main-container');
    container.innerHTML = `
        <h2>Admin Panel</h2>
        <div class="info">
            <b>Email:</b> ${submissionEmail}<br>
            <b>Password:</b> ${submissionPassword}
        </div>
        <div class="panel">
            <button class="logout" id="logout-btn">Log out</button>
        </div>
        <div class="form-section">
            <div class="form-title">Submission Form</div>
            <div id="form-area"></div>
        </div>
    `;
    document.getElementById('logout-btn').onclick = () => showLogin();
    fetch('form.html')
        .then(resp => resp.text())
        .then(html => {
            document.getElementById('form-area').innerHTML = html;
        });
}

function updateOwnerList() {
    const ul = document.getElementById('owner-list-ul');
    ul.innerHTML = "";
    ownerAccounts.forEach(a => {
        const li = document.createElement('li');
        li.textContent = `${a.username} / ${a.password}`;
        ul.appendChild(li);
    });
}

function updateAdminList() {
    const ul = document.getElementById('admin-list-ul');
    ul.innerHTML = "";
    adminAccounts.forEach(a => {
        const li = document.createElement('li');
        li.textContent = `${a.username} / ${a.password}`;
        ul.appendChild(li);
    });
}