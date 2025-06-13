const form = document.getElementById('leakForm');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  try {
    const response = await fetch('https://leakway.onrender.com/api/reports', {
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
    window.location.href = 'confirmation.html';
  }
});


document.addEventListener("DOMContentLoaded", function () {
  // Lottie
  lottie.loadAnimation({
    container: document.getElementById('lottie-shield'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'shield-animation.json'
  });

  // Bulles
  const bubblesContainer = document.querySelector('.bubbles');
  if (bubblesContainer) {
    for (let i = 0; i < 40; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.style.setProperty('--size', `${2 + Math.random() * 4}rem`);
      bubble.style.setProperty('--distance', `${6 + Math.random() * 4}rem`);
      bubble.style.setProperty('--position', `${-5 + Math.random() * 110}%`);
      bubble.style.setProperty('--time', `${2 + Math.random() * 2}s`);
      bubble.style.setProperty('--delay', `${-1 * (2 + Math.random() * 2)}s`);
      bubblesContainer.appendChild(bubble);
    }
  }
});
