const form = document.getElementById('leakForm');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // Si tu veux forcer la redirection même sans backend, décommente la ligne suivante :
  // window.location.href = 'confirmation.html';

  // Sinon, essaie d'envoyer au backend (fonctionnera si tu es sur Node.js)
  try {
    const response = await fetch('/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      window.location.href = 'confirmation.html';
    } else {
      document.getElementById('message').textContent = "Erreur lors de l'envoi.";
    }
  } catch (error) {
    // Si tu es sur Live Server, on redirige quand même
    window.location.href = 'confirmation.html';
    // Si tu veux afficher une erreur à la place, commente la ligne au-dessus et décommente celle-ci :
    // document.getElementById('message').textContent = "Erreur : impossible d’envoyer le signalement.";
    // console.error(error);
  }
});
