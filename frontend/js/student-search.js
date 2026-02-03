const tableBody = document.getElementById('studentTableBody');
const searchInput = document.getElementById('searchInput');
const paginationContainer = document.getElementById('pagination');

const gradeFilter = document.getElementById('gradeFilter');
const visitFilter = document.getElementById('visitFilter');

let currentPage = 1;
const pageSize = 5;

// Load students from backend API
async function loadStudents(query = '') {
  tableBody.innerHTML = '<tr><td colspan="4">Loading...</td></tr>';

  const grade = gradeFilter.value;
  const visit = visitFilter.value;

  try {
    // Build query params
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (grade) params.append('grade', grade);
    if (visit) params.append('visit', visit);

    // Fetch students from backend
    const response = await fetch(`http://localhost:3000/api/students?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch students');
    const students = await response.json();

    // Filter "recent" visits if needed
    let filteredStudents = students;
    if (visit === 'recent') {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      filteredStudents = students.filter(s => new Date(s.last_visit_date) >= lastWeek);
    }

    // Filter by search query
    if (query) {
      filteredStudents = filteredStudents.filter(s =>
        s.student_number.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Pagination
    const totalPages = Math.ceil(filteredStudents.length / pageSize);
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const studentsToShow = filteredStudents.slice(start, end);

    
    tableBody.innerHTML = '';
    if (studentsToShow.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="4">No students found</td></tr>';
    } else {
      studentsToShow.forEach(s => {
        const row = document.createElement('tr');
         row.innerHTML = `
            <td>${s.student_number || 'N/A'}</td>
            <td>${s.student_name || 'N/A'}</td>
            <td>${s.grade || 'N/A'}</td>
            <td>${s.last_visit_date ? new Date(s.last_visit_date).toLocaleDateString() : 'N/A'}</td>
            <td>
              <button class="action-btn" onclick="viewStudent('${s.user_id}')">👁</button>
            </td>
          `;
        tableBody.appendChild(row);
      });
    }

    renderPagination(totalPages);
  } catch (err) {
    console.error(err);
    tableBody.innerHTML = `<tr><td colspan="4">Failed to load students</td></tr>`;
  }
}

// Pagination buttons
function renderPagination(totalPages) {
  paginationContainer.innerHTML = '';

  const prev = document.createElement('button');
  prev.textContent = '< Previous';
  prev.classList.add('prev-next');
  prev.disabled = currentPage === 1;
  prev.onclick = () => { currentPage--; loadStudents(searchInput.value); };
  paginationContainer.appendChild(prev);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === currentPage) btn.classList.add('active');
    btn.onclick = () => { currentPage = i; loadStudents(searchInput.value); };
    paginationContainer.appendChild(btn);
  }

  const next = document.createElement('button');
  next.textContent = 'Next >';
  next.classList.add('prev-next');
  next.disabled = currentPage === totalPages;
  next.onclick = () => { currentPage++; loadStudents(searchInput.value); };
  paginationContainer.appendChild(next);
}

// View student details
function viewStudent(user_id) {
  window.location.href = `student-search-profile.html?id=${user_id}`;
}

// Event listeners
document.getElementById('searchBtn').addEventListener('click', () => {
  currentPage = 1;
  loadStudents(searchInput.value);
});

gradeFilter.addEventListener('change', () => {
  currentPage = 1;
  loadStudents(searchInput.value);
});

visitFilter.addEventListener('change', () => {
  currentPage = 1;
  loadStudents(searchInput.value);
});

// Sidebar collapse
const sidebar = document.querySelector('.sidebar');
const logo = document.getElementById('logo');

logo.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
});

if (localStorage.getItem('sidebarCollapsed') === 'true') {
  sidebar.classList.add('collapsed');
}

// Highlight active link
const sidebarLinks = document.querySelectorAll('.sidebar nav a');
const currentPath = window.location.pathname.split("/").pop();

sidebarLinks.forEach(link => {
  link.classList.remove('active');
  if (link.getAttribute('href') === currentPath) link.classList.add('active');
});

// Initial load
loadStudents();
