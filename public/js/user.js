const baseURL = 'http://localhost:3000';

function showLogin() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
  }
  
  function showRegister() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
  }
  
  async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
  
    const response = await fetch(`${baseURL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
  
    const data = await response.json();
    if (response.ok) {
      alert('Login successful!');
      // Save token or redirect to a protected page
    } else {
      alert(data.message);
    }
  }
  
  async function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
  
    const response = await fetch(`${baseURL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
  
    const data = await response.json();
    if (response.ok) {
      alert('Registration successful!');
      showLogin();
    } else {
      alert(data.message);
    }
  }
  