const API_URL = 'http://localhost:3000/api';
let departments = [];

async function loadDepartments() {
  departments = await fetch(`${API_URL}/departments`).then(r => r.json());
  renderTable();
}

function renderTable() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const filtered = departments.filter(d => 
    d.name.toLowerCase().includes(search) || 
    (d.lead_staff && d.lead_staff.toLowerCase().includes(search))
  );
  
  const tbody = document.getElementById('deptTable');
  tbody.innerHTML = filtered.length === 0 
    ? '<tr><td colspan="5" class="empty-state">No departments found</td></tr>'
    : filtered.map(d => `
      <tr>
        <td>${d.name}</td>
        <td>${d.lead_staff || '—'}</td>
        <td>${d.members || '—'}</td>
        <td><span class="status-badge status-${d.status?.toLowerCase() || 'active'}">${d.status || 'Active'}</span></td>
        <td class="actions-cell">
          <button class="btn-icon" onclick="editDept('${d.id}')">✏️</button>
          <button class="btn-icon delete" onclick="deleteDept('${d.id}')">🗑️</button>
        </td>
      </tr>
    `).join('');
}

document.getElementById('deptForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('editId').value;
  const data = {
    name: document.getElementById('deptName').value,
    lead_staff: document.getElementById('leadStaff').value || null,
    members: parseInt(document.getElementById('members').value) || null,
    status: document.getElementById('status').value,
    description: document.getElementById('description').value || null
  };
  
  if (id) {
    await fetch(`${API_URL}/departments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } else {
    await fetch(`${API_URL}/departments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }
  
  resetForm();
  loadDepartments();
});

function editDept(id) {
  const d = departments.find(x => x.id === id);
  document.getElementById('editId').value = d.id;
  document.getElementById('deptName').value = d.name;
  document.getElementById('leadStaff').value = d.lead_staff || '';
  document.getElementById('members').value = d.members || '';
  document.getElementById('status').value = d.status || 'Active';
  document.getElementById('description').value = d.description || '';
  document.getElementById('formTitle').textContent = 'Edit Department';
  document.getElementById('submitBtn').textContent = 'Update Department';
  document.getElementById('cancelBtn').style.display = 'inline-flex';
}

async function deleteDept(id) {
  if (confirm('Delete this department?')) {
    await fetch(`${API_URL}/departments/${id}`, { method: 'DELETE' });
    loadDepartments();
  }
}

function resetForm() {
  document.getElementById('deptForm').reset();
  document.getElementById('editId').value = '';
  document.getElementById('formTitle').textContent = 'Add New Department';
  document.getElementById('submitBtn').textContent = 'Add Department';
  document.getElementById('cancelBtn').style.display = 'none';
}

document.getElementById('cancelBtn').addEventListener('click', resetForm);
document.getElementById('searchInput').addEventListener('input', renderTable);

loadDepartments();
