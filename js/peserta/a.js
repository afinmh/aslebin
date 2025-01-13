document.addEventListener('DOMContentLoaded', () => {
  const pesertaMenu = document.getElementById('pesertaMenu');
  const kelasDropdown = document.getElementById('kelasDropdown');
  const jadwalMenu = document.getElementById('jadwalMenu');
  const jadwalDropdown = document.getElementById('jadwalDropdown');

  // Fungsi untuk toggle visibility submenu
  function toggleDropdown(dropdown) {
    dropdown.classList.toggle('show'); // Menambahkan atau menghapus kelas 'show'
  }

  // Menambahkan event listener untuk menu Peserta
  pesertaMenu.addEventListener('click', (e) => {
    e.preventDefault(); // Mencegah default behavior link
    toggleDropdown(kelasDropdown);
  });

  // Menambahkan event listener untuk menu Jadwal
  jadwalMenu.addEventListener('click', (e) => {
    e.preventDefault(); // Mencegah default behavior link
    toggleDropdown(jadwalDropdown);
  });
});


// Mengambil data JSON dari file (pastikan file data.json berada di server atau dalam akses yang sama)
fetch('../json/peserta/a.json')
  .then((response) => response.json())
  .then((data) => {
    // Menyesuaikan data untuk format yang diperlukan
    const participants = data.map((item) => ({
      nim: item.NIM,
      subject: item.Disp_Matakuliah.trim(), // Menghapus spasi ekstra di akhir
      time: item.Disp_Jam,
      day: item.Disp_Hari,
      class: item.Disp_Kelas,
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
            <td>${participant.class}</td>
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
  })
  .catch((error) => {
    console.error('Error loading data:', error);
  });
