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


form.addEventListener('submit', async (e) => {

    const medicationId = document.getElementById('mediction-name').value;
    const amount = document.getElementById('amount').value;
    const unit = document.getElementById('unit').value;
    const frequency = document.getElementById('frequency').value;
    const instructions = document.getElementById('instructions').value;

    const dosage = `${amount} ${unit}`;

    const params = new URLSearchParams(window.location.search);
    const visitId = params.get('visit_id');


    if (!visitId || !medicationId || !amount) {
        alert('Missing required data');
        return;
    }

    const payload = {
        visit_id: visitId,
        medication_id: medicationId,
        dosage,
        frequency,
        instructions
    };

    try {
        const res = await fetch('/api/prescriptions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || 'Failed to save prescription');
            return;
        }

        alert('Prescription saved successfully');
        window.location.href = 'medical-records.html';
    } catch (err) {
        console.error(err);
        alert('Server error');
    }
});