// login.js

const baseURL = 'http://localhost:3000/';

function showLogin() {
  document.getElementById('login-form').classList.add('active');
  document.getElementById('register-form').classList.remove('active');
  document.getElementById('reset-form').classList.remove('active'); // Ensure reset form is hidden
}

function showRegister() {
  document.getElementById('register-form').classList.add('active');
  document.getElementById('login-form').classList.remove('active');
  document.getElementById('reset-form').classList.remove('active'); // Ensure reset form is hidden
}

  // Login function as before
  async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
  
    try {
      const response = await fetch(`${baseURL}api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
  
      alert('Login successful');
      toAdmin();
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    }
}

async function register() {
  // Register function as before
  const username = document.getElementById('register-username').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('re-register-password').value;
  const role = document.getElementById('register-role').value;

  if (password !== confirmPassword) {
    alert("Passwords don't match");
    return;
  }

  try {
    const response = await fetch(`${baseURL}api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password, role })
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }

    alert('Registration successful');
    showLogin(); // Show login form after successful registration
  } catch (error) {
    alert(`Registration failed: ${error.message}`);
  }
}

async function resetPassword() {
  window.location.href = '/public/forgot.password.html';
  const token = window.location.pathname.split('/').pop(); // Extract token from URL
  const newPassword = document.getElementById('reset-password').value;
  const confirmPassword = document.getElementById('reset-confirm-password').value;

  if (newPassword !== confirmPassword) {
    alert("Passwords don't match");
    return;
  }
  const response = await fetch(`${baseURL}users/reset-password/${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId: null, newPassword }) // userId will be filled in verifyToken()
  });

  if (response.ok) {
    alert('Password reset successful');
    window.location.href = '/users/login'; // Redirect to login page after successful reset
  } else {
    const data = await response.json();
    alert(`Password reset failed: ${data.error}`);
  }
}
