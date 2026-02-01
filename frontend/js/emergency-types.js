const API_URL = 'http://localhost:3000/api';
let emergencyTypes = [];

async function loadEmergencyTypes() {
  emergencyTypes = await fetch(`${API_URL}/emergency-types`).then(r => r.json());
  renderTable();
}

function renderTable() {
  const tbody = document.getElementById('emergencyTable');

  if (emergencyTypes.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="3">No emergency types found</td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = emergencyTypes.map(e => `
    <tr>
    <td>${e.emergency_name}</td>
    <td>${e.severity_level}</td>

     <td class="actions-cell">
      <button class="btn-icon" onclick="editType('${e.emergency_type_id}')">✏️</button>
      <button class="btn-icon delete" onclick="deleteType('${e.emergency_type_id}')">🗑️</button>
    </td>

    </tr>
  `).join('');
}

document.getElementById('emergencyForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('editId').value;
  const data = {
  emergency_name: document.getElementById('typeName').value,
  severity_level: document.getElementById('description').value
};

  if (id) {
    await fetch(`${API_URL}/emergency-types/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } else {
    await fetch(`${API_URL}/emergency-types`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }
  
  resetForm();
  loadEmergencyTypes();
});
function editType(id) {
  const e = emergencyTypes.find(x => x.emergency_type_id == id);
  document.getElementById('editId').value = e.id;
 document.getElementById('typeName').value = e.emergency_name;
 document.getElementById('description').value = e.severity_level;
  document.getElementById('formTitle').textContent = 'Edit Emergency Type';
  document.getElementById('submitBtn').textContent = 'Update Emergency Type';
  document.getElementById('cancelBtn').style.display = 'inline-flex';
}

async function deleteType(id) {
  if (confirm('Delete this emergency type?')) {
    await fetch(`${API_URL}/emergency-types/${id}`, { method: 'DELETE' });
  }
}

function resetForm() {
  document.getElementById('emergencyForm').reset();
  document.getElementById('editId').value = '';
  document.getElementById('formTitle').textContent = 'Add New Emergency Type';
  document.getElementById('submitBtn').textContent = 'Add Emergency Type';
  document.getElementById('cancelBtn').style.display = 'none';
}

document.getElementById('cancelBtn').addEventListener('click', resetForm);

loadEmergencyTypes();
