const form = document.getElementById('leakForm');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('https://leakway-1.onrender.com/api/reports', {
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
    document.getElementById('message').textContent = "Erreur de connexion.";
  }
});


document.addEventListener("DOMContentLoaded", function () {
  // Lottie animation
  const lottieContainer = document.getElementById('lottie-shield');
  if (lottieContainer) {
    lottie.loadAnimation({
      container: lottieContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'shield-animation.json'
    });
  }
});