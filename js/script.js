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

const ctx = document.getElementById('scheduleChart').getContext('2d');

const scheduleChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Kelas A', 'Kelas B', 'Kelas C', 'Kelas D', 'Kelas E', "Kelas F"], // Nama kelas
    datasets: [
      {
        label: 'Senin',
        data: [
          [13, 15.5], // Kelas A (08:00 - 10:30)
          null,
          null,
          null,
          null,
          null,
        ],
        backgroundColor: '#3498db',
      },
      {
        label: 'Selasa',
        data: [
          null,
          null,
          null,
          [7, 9.5],
          [7, 9.5],
          null,
        ],
        backgroundColor: '#1abc9c',
      },
      {
        label: 'Kamis',
        data: [
          null,
          [10, 12.5],
          null,
          null,
          null,
          null,
        ],
        backgroundColor: '#e74c3c',
      },
      {
        label: 'Rabu',
        data: [
          null,
          null,
          null,
          null,
          null,
          [7, 9.5],
        ],
        backgroundColor: '#e74c3c',
      },
      {
        label: 'Jumat',
        data: [
          null,
          null,
          [10, 12.5],
          null,
          null, // Kelas E (10:00 - 12:30)
          null,
        ],
        backgroundColor: '#9b59b6',
      },
    ],
  },
  options: {
    indexAxis: 'y', // Membuat grafik horizontal
    responsive: true,
    scales: {
      x: {
        type: 'linear',
        min: 6, // Awal jam (07:30)
        max: 16, // Akhir jam (18:00)
        title: {
          display: true,
          text: 'Jam',
        },
        ticks: {
          callback: function (value) {
            const hours = Math.floor(value);
            const minutes = (value % 1) * 60;
            return `${hours}:${minutes === 0 ? '00' : minutes}`;
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Kelas',
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const [start, end] = context.raw || [];
            const startHours = Math.floor(start);
            const startMinutes = (start % 1) * 60;
            const endHours = Math.floor(end);
            const endMinutes = (end % 1) * 60;

            return `${context.dataset.label}: ${startHours}:${startMinutes === 0 ? '00' : startMinutes} - ${endHours}:${endMinutes === 0 ? '00' : endMinutes}`;
          },
        },
      },
      legend: {
        display: true,
        position: 'top',
      },
    },
  },
});
