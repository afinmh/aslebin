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


fetch('../json/jadwal/a.json')
  .then((response) => response.json())
  .then((data) => {
    // Menyesuaikan data untuk format yang diperlukan
    const participants = data.map((item) => ({
      nim: item["NIM Mahasiswa"], // Mengambil NIM dari JSON
    }));

    // Menghitung jumlah NIM
    const totalNim = participants.length;

    // Menampilkan jumlah NIM di div tertentu
    const nimCountDiv = document.getElementById('nim-count');
    nimCountDiv.textContent = `Jumlah Peserta: ${totalNim}`;

    // Render cards
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = ''; // Clear current cards

    participants.forEach((participant) => {
      const card = document.createElement('div');
      card.classList.add('card');
        
      // Tambahkan NIM ke dalam card
      const cardContent = `
        <div class="card-body">
          <p class="nim">${participant.nim}</p>
        </div>
      `;
      card.innerHTML = cardContent;
        
      cardsContainer.appendChild(card);
    });
  })
  .catch((error) => {
    console.error('Error loading data:', error);
  });


