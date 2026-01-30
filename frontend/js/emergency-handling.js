const emergencyTypes = {
    asthma: 'Asthma Attack',
    allergy: 'Allergic Reaction',
    injury: 'Physical Injury',
    fainting: 'Fainting/Dizziness',
    seizure: 'Seizure',
    head: 'Head Injury',
    other: 'Other Emergency'
};

const formattedDate = new Date(dateTime).toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
});

const newRow = document.createElement('tr');

newRow.innerHTML = `
    <td>${studentId}</td>
    <td>${emergencyTypes[emergencyType] || 'Unknown'}</td>
    <td>${formattedDate}</td>
    <td><span class="status status-stable">Stable</span></td>
    <td>
        <button class="action-btn">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5
                       c4.478 0 8.268 2.943 9.542 7
                       -1.274 4.057-5.064 7-9.542 7
                       -4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
        </button>
    </td>
`;

document
  .getElementById('logTableBody')
  .insertBefore(newRow, document.getElementById('logTableBody').firstChild);

// Clear form
document.getElementById('studentId').value = '';
document.getElementById('detailedNotes').value = '';

alert('Emergency log saved successfully!');
