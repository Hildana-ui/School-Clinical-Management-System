document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
      username: usernameInput.value.trim(),
      password: passwordInput.value
    };

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Login failed');
        return;
      }

      localStorage.setItem('user_id', data.user_id);
      localStorage.setItem('role_id', data.role_id);

      if (data.role_id === 3) {
        if (data.needs_profile) {
          window.location.href = 'complete-student-profile.html';
        } else {
          window.location.href = 'student.html';
        }
      } else if (data.role_id === 1) {
        window.location.href = '../templates/student-search.html';
      } else if (data.role_id === 2) {
        window.location.href = '/staff.html';
      }

    } catch (err) {
      console.error(err);
      alert('Server error. Please try again later.');
    }
  });
});


