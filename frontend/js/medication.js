const medicationSelect = document.getElementById('medication-name');

async function loadMedications() {
  const res = await fetch('/api/medications');
  const meds = await res.json();

  meds.forEach(med => {
    const option = document.createElement('option');
    option.value = med.medication_id;
    option.textContent = med.name;
    medicationSelect.appendChild(option);
  });
}

loadMedications();
