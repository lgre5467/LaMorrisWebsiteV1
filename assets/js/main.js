// Basic enhancements: current year, active nav, mobile toggle, contact form mailto, projects loader
(function() {
  // Current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Active link highlighting
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  // Mobile menu toggle
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Contact form mailto fallback + validation
  const form = document.getElementById('contact-form');
  const mailtoLink = document.getElementById('mailto-link');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      let ok = true;

      const setErr = (id, msg) => {
        const el = document.getElementById(id);
        if (el) el.textContent = msg || '';
      };

      setErr('err-name'); setErr('err-email'); setErr('err-message');

      if (!name.value.trim()) {{ ok = false; setErr('err-name', 'Please enter your name.'); }}
      if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {{ ok = false; setErr('err-email', 'Please enter a valid email.'); }}
      if (!message.value.trim()) {{ ok = false; setErr('err-message', 'Please enter a message.'); }}

      if (!ok) return;

      const subject = encodeURIComponent('Portfolio contact from ' + name.value.trim());
      const body = encodeURIComponent(message.value + '\n\n— ' + name.value + ' (' + email.value + ')');
      const href = 'mailto:youremail@example.com?subject=' + subject + '&body=' + body;
      window.location.href = href;
    });

    if (mailtoLink) {
      mailtoLink.addEventListener('click', (e) => {
        e.preventDefault();
        const name = (document.getElementById('name') || {{ value: '' }}).value;
        const email = (document.getElementById('email') || {{ value: '' }}).value;
        const message = (document.getElementById('message') || {{ value: '' }}).value;
        const subject = encodeURIComponent('Portfolio contact from ' + (name || ''));
        const body = encodeURIComponent((message || '') + '\n\n— ' + (name || '') + (email ? ' (' + email + ')' : ''));
        const href = 'mailto:youremail@example.com?subject=' + subject + '&body=' + body;
        window.location.href = href;
      });
    }
  }

  // Projects loader (from assets/js/projects.json)
  const projectsContainer = document.getElementById('projects');
  if (projectsContainer) {
    const src = projectsContainer.getAttribute('data-source');
    fetch(src).then(r => r.json()).then(items => {
      items.forEach(p => {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <ul class="bulleted">
            ${p.highlights.map(h=>`<li>${h}</li>`).join('')}
          </ul>
          <div class="project-links">
            ${p.links.map(l=>`<a class="btn btn-ghost" href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`).join('')}
          </div>
        `;
        projectsContainer.appendChild(card);
      });
    }).catch(err => {
      const note = document.createElement('p');
      note.textContent = 'Unable to load projects. Check assets/js/projects.json';
      projectsContainer.appendChild(note);
    });
  }
})();
