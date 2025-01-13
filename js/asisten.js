const participants = Array.from({ length: 20 }, (_, i) => ({
    nim: `NIM${i + 1}`,
    name: `Peserta ${i + 1}`,
    subject: `Mata Kuliah ${((i % 5) + 1)}`,
    time: `${8 + (i % 4)}:00 - ${10 + (i % 4)}:30`,
    day: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'][i % 5],
  }));
  
  const rowsPerPage = 10;
  let currentPage = 1;
  
  function renderTable(page) {
    const start = (page - 1) * rowsPerPage;
    const end = page * rowsPerPage;
    const currentData = participants.slice(start, end);
  
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
  
    currentData.forEach((participant) => {
      const row = `
        <tr>
          <td>${participant.nim}</td>
          <td>${participant.subject}</td>
          <td>${participant.time}</td>
          <td>${participant.day}</td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  
    document.getElementById('page-info').textContent = `Page ${page} of ${Math.ceil(participants.length / rowsPerPage)}`;
    document.getElementById('prev-btn').disabled = page === 1;
    document.getElementById('next-btn').disabled = page === Math.ceil(participants.length / rowsPerPage);
  }
  
  document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderTable(currentPage);
    }
  });
  
  document.getElementById('next-btn').addEventListener('click', () => {
    if (currentPage < Math.ceil(participants.length / rowsPerPage)) {
      currentPage++;
      renderTable(currentPage);
    }
  });
  
  // Render initial table
  renderTable(currentPage);
  