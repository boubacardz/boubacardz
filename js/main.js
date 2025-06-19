
    // Validation JS côté client (Netlify gère l'envoi)
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    const nom = document.getElementById('nom').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nomRegex = /^[A-Za-zÀ-ÿ '-]{2,100}$/;
    const resultDiv = document.getElementById('formResult');

    // Validation
    if (!nomRegex.test(nom)) {
      e.preventDefault();
      resultDiv.textContent = 'Nom invalide.';
      resultDiv.style.color = 'red';
      return false;
    }
    if (!emailRegex.test(email) || email.length > 150) {
      e.preventDefault();
      resultDiv.textContent = 'Email invalide.';
      resultDiv.style.color = 'red';
      return false;
    }
    if (message.length < 5 || message.length > 2000) {
      e.preventDefault();
      resultDiv.textContent = 'Message invalide.';
      resultDiv.style.color = 'red';
      return false;
    }
    // Affiche un message de confirmation rapide (optionnel)
    resultDiv.textContent = 'Envoi en cours...';
    resultDiv.style.color = 'black';
    // Laisse Netlify gérer l'envoi et la redirection
  });

  // Validation et envoi sécurisé du formulaire via un service tiers (exemple Formspree)
  document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const nom = document.getElementById('nom').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nomRegex = /^[A-Za-zÀ-ÿ '-]{2,100}$/;
    const resultDiv = document.getElementById('formResult');

    // Validation
    if (!nomRegex.test(nom)) {
      resultDiv.textContent = 'Nom invalide.';
      resultDiv.style.color = 'red';
      return;
    }
    if (!emailRegex.test(email) || email.length > 150) {
      resultDiv.textContent = 'Email invalide.';
      resultDiv.style.color = 'red';
      return;
    }
    if (message.length < 5 || message.length > 2000) {
      resultDiv.textContent = 'Message invalide.';
      resultDiv.style.color = 'red';
      return;
    }

    // Désactive le bouton pour éviter la double soumission
    this.querySelector('button[type="submit"]').disabled = true;

    // Envoi via Formspree (remplacez l'URL par la vôtre)
    try {
      const response = await fetch('https://formspree.io/f/xxxxxxx', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(this)
      });
      if (response.ok) {
        resultDiv.textContent = 'Merci pour votre message !';
        resultDiv.style.color = 'green';
        this.reset();
      } else {
        resultDiv.textContent = 'Erreur lors de l’envoi.';
        resultDiv.style.color = 'red';
      }
    } catch (err) {
      resultDiv.textContent = 'Erreur réseau.';
      resultDiv.style.color = 'red';
    }
    this.querySelector('button[type="submit"]').disabled = false;
  });

  // Langue
  const toggleLangBtn = document.getElementById('toggle-lang');
  let currentLang = 'fr';
  toggleLangBtn.addEventListener('click', () => {
    const elements = document.querySelectorAll('[data-lang-fr]');
    if (currentLang === 'fr') {
      elements.forEach(el => {
        el.textContent = el.getAttribute('data-lang-en');
      });
      toggleLangBtn.textContent = 'Fr';
      currentLang = 'en';
    } else {
      elements.forEach(el => {
        el.textContent = el.getAttribute('data-lang-fr');
      });
      toggleLangBtn.textContent = 'En';
      currentLang = 'fr';
    }
  });

  // Menu mobile
  function toggleMobileMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.style.display = (menu.style.display === "none" || menu.style.display === "") ? "flex" : "none";
  }
  window.addEventListener('resize', () => {
    const isMobile = window.innerWidth <= 768;
    document.getElementById('desktopMenu').style.display = isMobile ? 'none' : 'flex';
    document.getElementById('mobileMenu').style.display = 'none';
  });

  // Thème clair/sombre
  const themeToggle = document.getElementById('toggle-theme');
  const themeIcon = themeToggle.querySelector('i');
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeIcon.classList.toggle('fa-moon');
    themeIcon.classList.toggle('fa-sun');
  });
