const sidebar = document.querySelector('.sidebar');
const logo = document.getElementById('logo');
const sidebarLinks = document.querySelectorAll('.sidebar nav a');
const form = document.getElementById('prescriptionForm');

logo.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
});

if (localStorage.getItem('sidebarCollapsed') === 'true') {
    sidebar.classList.add('collapsed');
}

const currentPath = window.location.pathname.split("/").pop();


sidebarLinks.forEach(link => {
  link.classList.remove('active');
  if (link.getAttribute('href') === currentPath) link.classList.add('active');
});

const params = new URLSearchParams(window.location.search);
const studentId = params.get('id');

if (!studentId) {
  alert('No student selected');
  throw new Error('Missing student id');
}

const nameEl = document.getElementById('student-name');
const idEl = document.getElementById('studentId');

// Load student basic info
async function loadStudentDetails() {
  const res = await fetch(`http://localhost:3000/api/students/${studentId}`);
  const student = await res.json();

  nameEl.textContent = `Student ID: ${student.student_number}`;
  idEl.textContent = `Year: ${student.grade}`;
}


loadStudentDetails();


const detailsContainer = document.getElementById('details-container');

const studentBtn = document.querySelector('.student-details');
const medicalBtn = document.querySelector('.medical-record-details');
const visitBtn = document.querySelector('.visit-history');

function setActive(btn) {
  [studentBtn, medicalBtn, visitBtn].forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}


async function loadStudentInfo() {
  setActive(studentBtn);

  const res = await fetch(`http://localhost:3000/api/students/${studentId}`);
  const s = await res.json();

  detailsContainer.innerHTML = `
    <h3>Student Information</h3>
    <p><strong>Student Number:</strong> ${s.student_number}</p>
    <p><strong>Class:</strong> ${s.grade}</p>
    <p><strong>Parent Name:</strong> ${s.parent_name}</p>
    <p><strong>Parent Contact:</strong> ${s.parent_contact}</p>
  `;
}



async function loadStudentInfo() {
  setActive(studentBtn);

  const res = await fetch(`http://localhost:3000/api/students/${studentId}`);
  const s = await res.json();

  detailsContainer.innerHTML = `
    <h3>Student Information</h3>
    <p><strong>Student Number:</strong> ${s.student_number}</p>
    <p><strong>Class:</strong> ${s.section}</p>
    <p><strong>Parent Name:</strong> ${s.parent_name}</p>
    <p><strong>Parent Contact:</strong> ${s.parent_contact}</p>
  `;
}


async function loadVisitHistory() {
  setActive(visitBtn);

  const res = await fetch(`http://localhost:3000/api/visits/student/${studentId}`);
  const visits = await res.json();

  if (visits.length === 0) {
    detailsContainer.innerHTML = `<p>No visits recorded.</p>`;
    return;
  }

  detailsContainer.innerHTML = `
    <ul>
      ${visits.map(v => `
        <li>
          ${v.visit_date} — ${v.reason || 'No reason'}
        </li>
      `).join('')}
    </ul>
  `;
}


studentBtn.addEventListener('click', loadStudentInfo);
medicalBtn.addEventListener('click', loadMedicalRecords);
visitBtn.addEventListener('click', loadVisitHistory);


loadStudentInfo();
