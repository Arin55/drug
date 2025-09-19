// Register
(function() {
  const form = document.getElementById('registerForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const password = document.getElementById('regPassword').value;
    if (!name || !email || !password) return alert('Please fill all fields');
    const user = { name, email, password };
    localStorage.setItem('dis_credentials', JSON.stringify(user));
    alert('Signup successful! Please login.');
    window.location.href = 'login.html';
  });
})();

// Login
(function() {
  const form = document.getElementById('loginForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;
    const stored = JSON.parse(localStorage.getItem('dis_credentials') || 'null');
    if (!stored || stored.email !== email || stored.password !== password) {
      alert('Invalid credentials');
      return;
    }
    auth.set({ email: stored.email, name: stored.name });
    window.location.href = 'inventory.html';
  });
})();

// Inventory guard + logout
(function() {
  const onInventory = /inventory\.html$/i.test(location.pathname);
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', () => { auth.clear(); location.href = 'login.html'; });
  if (onInventory && !auth.get()) {
    location.href = 'login.html';
  }
})();



