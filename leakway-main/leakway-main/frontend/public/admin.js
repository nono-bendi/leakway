async function login() {
  const username = document.getElementById('admin-username').value;
  const password = document.getElementById('admin-password').value;

  const response = await fetch('https://leakway.onrender.com/api/reports/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const result = await response.json();
  if (result.success) {
    localStorage.setItem('token', result.token);
    loadReports();
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
  } else {
    document.getElementById('login-error').textContent = result.message || 'Erreur de connexion.';
  }
}

async function loadReports() {
  const token = localStorage.getItem('token');
  const response = await fetch('https://leakway.onrender.com/api/reports', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await response.json();
  const tbody = document.getElementById('report-table-body');
  tbody.innerHTML = '';

  data.forEach(report => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${report.nom}</td>
      <td>${report.email}</td>
      <td>
        Pirate: <a href="${report.lien_pirate}" target="_blank">${report.lien_pirate}</a><br>
        Officiel: <a href="${report.lien_officiel}" target="_blank">${report.lien_officiel}</a>
      </td>
      <td>${report.plateforme}</td>
      <td>${report.commentaire || ''}</td>
      <td><button onclick="deleteReport(${report.id})">Supprimer</button></td>
    `;
    tbody.appendChild(tr);
  });
}

async function deleteReport(id) {
  const token = localStorage.getItem('token');
  await fetch(`https://leakway.onrender.com/api/reports/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  loadReports();
}

function logout() {
  localStorage.removeItem('token');
  location.reload();
}
