document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signupForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const role_id = document.getElementById('role_id').value;

    

    const payload = {
      username,
      email,
      password,
      role_id,
    };

    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || data.message || 'Signup failed');
        return;
      }

      alert('Signup successful');
      window.location.href = 'login.html';
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    }
  });
});
