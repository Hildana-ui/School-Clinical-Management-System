const API_URL = 'http://localhost:3000/api';
let classes = [];

async function loadClasses() {
  classes = await fetch(`${API_URL}/classes`).then(r => r.json());
  renderTable();
}

function renderTable() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const filtered = classes.filter(c => 
  c.grade.toLowerCase().includes(search) ||
  c.section.toLowerCase().includes(search)
);

  
  const tbody = document.getElementById('classTable');
  tbody.innerHTML = filtered.length === 0 
    ? '<tr><td colspan="3" class="empty-state">No classes found</td></tr>'
    : filtered.map(c => `
      <tr>
        <td>${c.grade_level}</td>
        <td>${c.section_name}</td>
        <td class="actions-cell">
          <button class="btn-icon" onclick="editClass('${c.id}')">✏️</button>
          <button class="btn-icon delete" onclick="deleteClass('${c.id}')">🗑️</button>
        </td>
      </tr>
    `).join('');
}

document.getElementById('classForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('editId').value;
  const data = {
    grade_level: document.getElementById('gradeLevel').value,
    section_name: document.getElementById('sectionName').value
  };
  
  if (id) {
    await fetch(`${API_URL}/classes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } else {
    await fetch(`${API_URL}/classes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }
  
  resetForm();
  loadClasses();
});

function editClass(id) {
  const c = classes.find(x => x.id === id);
  document.getElementById('editId').value = c.id;
  document.getElementById('gradeLevel').value = c.grade_level;
  document.getElementById('sectionName').value = c.section_name;
  document.getElementById('formTitle').textContent = 'Edit Class';
  document.getElementById('submitBtn').textContent = 'Update Class';
  document.getElementById('cancelBtn').style.display = 'inline-flex';
}

async function deleteClass(id) {
  if (confirm('Delete this class?')) {
    await fetch(`${API_URL}/classes/${id}`, { method: 'DELETE' });
    loadClasses();
  }
}

function resetForm() {
  document.getElementById('classForm').reset();
  document.getElementById('editId').value = '';
  document.getElementById('formTitle').textContent = 'Add New Class';
  document.getElementById('submitBtn').textContent = 'Add Class';
  document.getElementById('cancelBtn').style.display = 'none';
}

document.getElementById('cancelBtn').addEventListener('click', resetForm);
document.getElementById('searchInput').addEventListener('input', renderTable);

loadClasses();
