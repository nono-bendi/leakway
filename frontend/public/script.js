document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('leakForm');
  const msg  = document.getElementById('message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // HTML5 validation (required)
    if (!form.checkValidity()) {
      msg.textContent = "Merci de remplir tous les champs requis.";
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const resp = await fetch('https://leakway-production.up.railway.app/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (resp.ok) {
        // en cas de succès, redirection
        window.location.href = 'confirmation.html';
      } else {
        const err = await resp.json();
        msg.textContent = err.error || "Échec de l'envoi, veuillez vérifier vos champs.";
      }
    } catch (error) {
      msg.textContent = "Erreur réseau, réessayez plus tard.";
    }
  });

  // Si tu veux garder ton animation Lottie :
  const lottieContainer = document.getElementById('lottie-shield');
  if (lottieContainer && window.lottie) {
    lottie.loadAnimation({
      container: lottieContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'shield-animation.json'
    });
  }
});
