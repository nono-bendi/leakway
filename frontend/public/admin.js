let token = localStorage.getItem('token');

function login() {
  const username = document.getElementById('admin-username').value;
  const password = document.getElementById('admin-password').value;

  fetch('/api/reports/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        token = data.token;
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        chargerSignalements();
      } else {
        document.getElementById('login-error').innerText = 'Identifiants incorrects';
      }
    })
    .catch(() => {
      document.getElementById('login-error').innerText = 'Erreur serveur.';
    });
}

function logout() {
  localStorage.removeItem('token');
  location.reload();
}

function chargerSignalements() {
  fetch("/api/reports", {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .then((data) => {
      const tableBody = document.querySelector("tbody");
      tableBody.innerHTML = "";

      data.forEach((report) => {
        const tr = document.createElement("tr");

tr.innerHTML = `
  <td data-label="Nom">${report.nom}</td>
  <td data-label="Email">${report.email}</td>
  <td data-label="Lien">${report.lien}</td>
  <td data-label="Plateforme">${report.plateforme}</td>
  <td data-label="Commentaire">${report.commentaire || ""}</td>
  <td data-label="Actions"><button class="delete-btn" onclick="deleteReport(${report.id})">🗑️</button></td>
`;


        tableBody.appendChild(tr);
      });

      document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-id");

          fetch(`/api/reports/${id}`, {
            method: "DELETE",
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
            .then((res) => {
              if (res.ok) {
                btn.closest("tr").remove();
              } else {
                alert("Erreur lors de la suppression.");
              }
            })
            .catch((err) => console.error("Erreur:", err));
        });
      });
    });
}

document.addEventListener("DOMContentLoaded", () => {
  token = localStorage.getItem('token');

  if (!token) {
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('dashboard').classList.add('hidden');
  } else {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    chargerSignalements();
  }
});
