// admin.js

// Base URL de ton API
const API_BASE = 'https://leakway-production.up.railway.app/api/reports';

async function login() {
  const username = document.getElementById('admin-username').value;
  const password = document.getElementById('admin-password').value;

  const response = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const result = await response.json();
  if (result.success) {
    localStorage.setItem('token', result.token);
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    loadReports();
  } else {
    document.getElementById('login-error').textContent =
      result.message || 'Erreur de connexion.';
  }
}

async function loadReports() {
  const token = localStorage.getItem('token');
  const response = await fetch(API_BASE, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) {
    console.error('Échec du chargement des rapports:', response.status);
    return;
  }

  const data = await response.json();
  const tbody = document.getElementById('report-table-body');
  tbody.innerHTML = '';

  data.forEach(report => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${report.nom}</td>
      <td>${report.email}</td>
      <td>
        Pirate: <a href="${report.lien}" target="_blank">${report.lien}</a><br>
        Officiel: <a href="${report.lienofficiel}" target="_blank">${report.lienofficiel}</a>
      </td>
      <td>${report.plateforme}</td>
      <td>${report.commentaire || ''}</td>
      <td>
        <button onclick="deleteReport(${report.id})">
          Supprimer
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function deleteReport(id) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.ok) {
    loadReports();
  } else {
    console.error('Échec de la suppression:', response.status);
  }
}

function logout() {
  localStorage.removeItem('token');
  location.reload();
}
