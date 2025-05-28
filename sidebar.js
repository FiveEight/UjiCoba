
  // Toggle buka/tutup dropdown saat klik tombol
  document.querySelectorAll('.dropbtn').forEach(button => {
    button.addEventListener('click', () => {
      const parent = button.closest('.dropdown');
      parent.classList.toggle('open');
    });
  });

  // Tandai tombol dan link yang aktif berdasarkan URL
  const currentPage = window.location.pathname.split("/").pop().toLowerCase();

  document.querySelectorAll('.dropdown').forEach(dropdown => {
    const links = dropdown.querySelectorAll('a');
    links.forEach(link => {
      const linkPage = link.getAttribute('href').toLowerCase().trim();
      if (linkPage === currentPage) {
        link.classList.add('active'); // submenu aktif
        dropdown.querySelector('.dropbtn').classList.add('active'); // tombol aktif
        dropdown.classList.add('open'); // buka menu
      }
    });
  });

  // Tandai link aktif di luar dropdown (dashboard, informasi, dll)
  document.querySelectorAll('.sidebar > a').forEach(link => {
    const linkPage = link.getAttribute('href').toLowerCase().trim();
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });

  // Tombol tambah proposal, pastikan elemen ini memang ada sebelum addEventListener
  const btnTambah = document.getElementById('btnTambahProposal');
  if (btnTambah) {
    btnTambah.addEventListener('click', function () {
      window.location.href = 'tambah_proposal.html';
    });
  }

  function renderTable(data) {
      const tableBody = document.getElementById('proposal-body');
      if (data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6">Belum ada proposal</td></tr>';
        return;
      }
      tableBody.innerHTML = '';

      data.forEach((item, index) => {
        const row = `
          <tr>
            <td>${index + 1}</td>
            <td>${item.judul}</td>
            <td>${item.skema || '-'}</td>
            <td>${item.dana}</td>
            <td>${item.status || 'Menunggu'}</td>
            <td>
              <button onclick="lihatProposal(${index})" title="Lihat Proposal" style="cursor:pointer; background:none; border:none; font-size:18px;">
                &#128065;
              </button>
            </td>
          </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
      });
    }

    function lihatProposal(index) {
      const proposals = JSON.parse(localStorage.getItem('proposalList')) || [];
      const data = proposals[index];
      localStorage.setItem('selectedProposal', JSON.stringify(data));
      window.location.href = 'DetailProposal.html';
    }

    window.onload = function () {
      const proposals = JSON.parse(localStorage.getItem('proposalList')) || [];
      renderTable(proposals);

      // Search filter
      const btnCari = document.getElementById('btnCari');
      const searchInput = document.getElementById('searchInput');

      btnCari.addEventListener('click', function () {
        const keyword = searchInput.value.toLowerCase().trim();
        const filtered = proposals.filter(p => p.judul.toLowerCase().includes(keyword));
        renderTable(filtered);
      });
    };

    // Ambil semua ID proposal yang ingin dicek status-nya
  const proposalIds = ["PR001", "PR002"]; // Tambahkan ID lain sesuai kebutuhan

  proposalIds.forEach(proposalId => {
    const status = localStorage.getItem("statusProposal_" + proposalId);
    if (status) {
      const statusElement = document.getElementById("status-" + proposalId);
      if (statusElement) {
        statusElement.textContent = status;
      }
    }
  });
const btnLogout = document.getElementById('btnLogout');
if (btnLogout) {
  btnLogout.addEventListener('click', () => {
    const yakinLogout = confirm('Apakah Anda yakin ingin logout?');
    if (yakinLogout) {
      localStorage.removeItem('userLogin'); // hapus session/login kalau ada
      localStorage.removeItem('selectedProposal');
      window.location.href = 'login.html';
    }
    // kalau cancel, gak terjadi apa-apa
  });
}
