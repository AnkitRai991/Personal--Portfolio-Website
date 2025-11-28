/* Basic interactive behaviors:
   - mobile nav toggle
   - smooth scrolling
   - project modal preview
   - animate skill bars when section visible
   - simple contact form front-end validation
   - dynamic year
*/

document.addEventListener('DOMContentLoaded', () => {
  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // nav toggle (mobile)
  const nav = document.getElementById('mainNav');
  const navToggle = document.getElementById('navToggle');
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    navToggle.classList.toggle('open');
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (ev) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        ev.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav when link clicked
        if (nav.classList.contains('open')) nav.classList.remove('open');
      }
    });
  });

  // Project modal preview
  const modal = document.getElementById('projectModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('.view-project').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      const img = card.getAttribute('data-img');
      const title = card.getAttribute('data-title');
      const desc = card.getAttribute('data-desc');

      modalImg.src = img;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden','false');
    });
  });

  modalClose.addEventListener('click', () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden','true');
    }
  });

  // Animate skill bars when in view
  const skillBars = document.querySelectorAll('.skill-bar');
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const value = bar.getAttribute('data-value') || bar.dataset.value;
        const span = bar.querySelector('span');
        span.style.width = value + '%';
        skillsObserver.unobserve(bar);
      }
    });
  }, {threshold: 0.25});

  skillBars.forEach(sb => skillsObserver.observe(sb));

  // Contact form (frontend-only)
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      alert('Please complete all fields before sending.');
      return;
    }
    // As no backend: show success message and reset
    alert('Thanks ' + name + '! Your message has been noted (demo). Please email: ankitrai122002@gmail.com for real contact.');
    form.reset();
  });

  // Download resume demo (link to GitHub repo or placeholder)
  document.getElementById('downloadResume').addEventListener('click', () => {
    // If you have resume.pdf in folder, change the link below to resume.pdf
    window.open('https://github.com/AnkitRai991', '_blank');
  });

});
