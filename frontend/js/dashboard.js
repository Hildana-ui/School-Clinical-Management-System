const API_URL = 'http://localhost:3000/api';

async function loadStats() {
  const [classes, departments, emergencyTypes] = await Promise.all([
    fetch(`${API_URL}/classes`).then(r => r.json()),
    fetch(`${API_URL}/departments`).then(r => r.json()),
    fetch(`${API_URL}/emergency-types`).then(r => r.json())
  ]);
  
  document.getElementById('classCount').textContent = classes.length;
  document.getElementById('deptCount').textContent = departments.length;
  document.getElementById('emergencyCount').textContent = emergencyTypes.length;
}

loadStats();
