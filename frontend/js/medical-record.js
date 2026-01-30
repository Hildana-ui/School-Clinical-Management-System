document.addEventListener('DOMContentLoaded', () => {

  const saveBtn = document.getElementById('saveBtn');
  const cancelBtn = document.getElementById('cancelBtn');

  saveBtn.addEventListener('click', () => {
    const systolic = document.getElementById('systolic').value;
    const diastolic = document.getElementById('diastolic').value;
    const temperature = document.getElementById('temperature').value;
    const heartRate = document.getElementById('heartRate').value;
    const breathingRate = document.getElementById('breathingRate').value;
    const notes = document.getElementById('clinicalNotes').value;

    if (!systolic || !diastolic || !temperature) {
      alert('Please fill in all required fields.');
      return;
    }

    console.log({
      systolic,
      diastolic,
      temperature,
      heartRate,
      breathingRate,
      notes
    });

    alert('Medical record saved successfully!');
  });

  cancelBtn.addEventListener('click', () => {
    document.querySelectorAll('input').forEach(input => input.value = '');
    document.getElementById('clinicalNotes').value = '';
  });

});
