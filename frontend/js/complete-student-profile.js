document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('studentProfileForm');
  const user_id = localStorage.getItem('user_id');

  if (!user_id) {
    alert('Session expired. Please log in again.');
    window.location.href = 'login.html';
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
        student_number: document.getElementById('student_number').value,
        grade: document.getElementById('grade').value,
        section: document.getElementById('section').value,
        parent_name: document.getElementById('parent_name').value,
        parent_contact: document.getElementById('parent_contact').value
    };


    try {
      const res = await fetch(
        `http://localhost:3000/api/students/complete-profile/${user_id}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Failed to save profile');
        return;
      }

      alert('Profile completed successfully');
      window.location.href = 'student.html';

    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  });
});
