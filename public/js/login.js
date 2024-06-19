const baseURL = 'http://localhost:3000/';


function showLogin() {
    document.getElementById('login-form').classList.add('active');
    document.getElementById('register-form').classList.remove('active');
  }

  function showRegister() {
    document.getElementById('register-form').classList.add('active');
    document.getElementById('login-form').classList.remove('active');
  }

  function toAdmin() {
    window.location.href = "/public/admin.dashboard.html";
  }

  async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch(`${baseURL}api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.ok) {
      alert('Login successful');
      toAdmin()

      // Handle successful login
    } else {
      alert(`Login failed: ${data.message}`);
    }
  }

  async function register() {
    const username = document.getElementById('register-username').value;
    const confirmpassword = document.getElementById('re-register-password').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const role = document.getElementById('register-role').value;

    const response = await fetch(`${baseURL}api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password, role })
    });
    
    const data = await response.json();

    if(confirmpassword != password){
      alert( "Passwords don't match")
    }
    if (response.ok) {
      alert('Registration successful');
      // Handle successful registration
    } else {
      alert(`Registration failed: ${data.error}`);
    }
  }