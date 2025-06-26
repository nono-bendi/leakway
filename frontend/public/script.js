document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('leakForm');
  const msg  = document.getElementById('message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Vérification des champs HTML5 (required)
    if (!form.checkValidity()) {
      msg.textContent = "Merci de remplir tous les champs requis.";
      return;
    }

    // Récupère les champs du formulaire
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch('https://leakway-production.up.railway.app/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Redirection vers une page de confirmation
        window.location.href = 'confirmation.html';
      } else {
        const error = await response.json();
        msg.textContent = error.error || "Erreur lors de l'envoi.";
      }
    } catch (err) {
      msg.textContent = "Erreur réseau, réessayez plus tard.";
    }
  });
});
