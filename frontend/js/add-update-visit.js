const params = new URLSearchParams(window.location.search);
const studentId = params.get('student_id');

if (!studentId) {
  alert('No student selected');
  window.location.href = 'student-search.html';
}

// State
let existingVisitId = null;

// DOM
const studentNameEl = document.querySelector('.student-name');
const studentIdEl = document.querySelector('.studentID');
const form = document.getElementById('visitForm');

const reasonInput = document.getElementById('reason');
const emergencyCategoryInput = document.getElementById('emergency-category');
const detailedNotesInput = document.getElementById('detailed-notes');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');

const saveBtn = document.getElementById('save');
const saveAndNewBtn = document.getElementById('save_and_new');


async function loadStudent() {
  try {
    const res = await fetch(`http://localhost:3000/api/student/${studentId}`);
    if (!res.ok) throw new Error('Failed to fetch student');

    const student = await res.json();
    studentNameEl.textContent = `Student Name: ${student.student_name}`;
    studentIdEl.textContent = `Student ID: ${student.student_id}`;
  } catch (err) {
    alert(err.message);
  }
}


async function loadVisit() {
  try {
    const res = await fetch(`http://localhost:3000/api/visits/student/${studentId}`);
    if (!res.ok) return;

    const data = await res.json();
    if (!data.exists) return;

    const visit = data.visit;
    existingVisitId = visit.visit_id;

    reasonInput.value = visit.reason;
    emergencyCategoryInput.value = visit.emergency_type_id;
    detailedNotesInput.value = visit.notes || '';

    const date = new Date(visit.visit_date);
    dateInput.value = date.toISOString().split('T')[0];
    timeInput.value = date.toTimeString().slice(0, 5);
  } catch (err) {
    console.error('Failed to load visit:', err);
  }
}


function buildPayload() {
  return {
    student_id: studentId,
    reason: reasonInput.value.trim(),
    emergency_type_id: emergencyCategoryInput.value,
    visit_date: `${dateInput.value} ${timeInput.value || '00:00'}`,
    notes: detailedNotesInput.value.trim()
  };
}


saveBtn.addEventListener('click', async () => {
  if (!existingVisitId) {
    alert('No visit exists to update');
    return;
  }

  const payload = buildPayload();

  try {
    const res = await fetch(`http://localhost:3000/api/visits/${existingVisitId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error('Failed to update visit');
    alert('Visit updated successfully');
    window.history.back();
  } catch (err) {
    alert(err.message);
  }
});


saveAndNewBtn.addEventListener('click', async () => {
  const payload = buildPayload();

  try {
    const res = await fetch('http://localhost:3000/api/visits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error('Failed to save visit');
    alert('Visit added successfully');

    form.reset();
    existingVisitId = null;
  } catch (err) {
    alert(err.message);
  }
});


loadStudent();
loadVisit();



