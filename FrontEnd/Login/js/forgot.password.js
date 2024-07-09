const baseURL = 'http://localhost:3000/';

document.getElementById('forgot-password-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;

  const response = await fetch(`${baseURL}api/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  });

  const data = await response.json();

  if (response.ok) {
    alert('Password reset link sent to your email.');
  } else {
    alert(`Error: ${data.error}`);
  }
});
