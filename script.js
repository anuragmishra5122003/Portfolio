// ========== CUSTOM CURSOR ==========
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX - 5 + 'px';
  cursor.style.top = e.clientY - 5 + 'px';
  follower.style.left = e.clientX - 17 + 'px';
  follower.style.top = e.clientY - 17 + 'px';
});

// ========== NAVBAR SCROLL ==========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ========== HAMBURGER ==========
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ========== TYPED TEXT ==========
const roles = [
  'Web Applications.',
  'AI-Powered Tools.',
  'REST APIs.',
  'Mobile Apps.',
  'Full Stack Solutions.',
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function type() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex--);
  } else {
    typedEl.textContent = current.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === current.length + 1) {
    isDeleting = true;
    setTimeout(type, 1500);
    return;
  }
  if (isDeleting && charIndex === -1) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    charIndex = 0;
    setTimeout(type, 400);
    return;
  }
  setTimeout(type, isDeleting ? 50 : 80);
}
type();

// ========== ID CARD 3D TILT ==========
const idCard = document.getElementById('idCard');
idCard.addEventListener('mousemove', (e) => {
  const rect = idCard.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  const rotateX = (-y / rect.height) * 20;
  const rotateY = (x / rect.width) * 20;
  idCard.style.animation = 'none';
  idCard.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
});

idCard.addEventListener('mouseleave', () => {
  idCard.style.transform = '';
  idCard.style.animation = 'cardSwing 3s ease-in-out infinite';
});
// ========== CERTIFICATE MODAL ==========
function openCert(src) {
  const modal = document.getElementById('certModal');
  const img = document.getElementById('certModalImg');
  img.src = src;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCert() {
  document.getElementById('certModal').classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCert();
});
// ========== CONTACT FORM ==========
function sendEmail() {
  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const subject = document.getElementById('contactSubject').value.trim();
  const message = document.getElementById('contactMessage').value.trim();
  const note = document.getElementById('formNote');

  if (!name || !email || !message) {
    note.textContent = '⚠️ Please fill in all required fields.';
    note.className = 'form-note error';
    return;
  }

  const mailtoLink = `mailto:anuragmishra5122003@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
  window.location.href = mailtoLink;

  note.textContent = '✅ Opening your mail client...';
  note.className = 'form-note success';

  setTimeout(() => {
    note.textContent = '';
    note.className = 'form-note';
  }, 4000);
}
// ========== SCROLL REVEAL ANIMATION ==========
const revealElements = document.querySelectorAll(
  '.section-header, .about-bio-card, .about-stats, .about-info-card, .about-socials, .skill-category, .project-card, .mini-card, .timeline-item, .cert-standalone-card, .contact-method, .contact-form-card'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, index * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ========== ACTIVE NAV LINK ON SCROLL ==========
const sections = document.querySelectorAll('section[id]');
const navLinks2 = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks2.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ========== STAT COUNTER ANIMATION ==========
function animateCounter(el, target, suffix = '') {
  let count = 0;
  const duration = 1500;
  const step = target / (duration / 16);

  const timer = setInterval(() => {
    count += step;
    if (count >= target) {
      count = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(count) + suffix;
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      statNumbers.forEach(stat => {
        const text = stat.textContent;
        const num = parseInt(text);
        const suffix = text.includes('+') ? '+' : '';
        if (!isNaN(num)) animateCounter(stat, num, suffix);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) statsObserver.observe(statsSection);

// ========== SKILL ITEM STAGGER ==========
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const items = entry.target.querySelectorAll('.skill-item');
      items.forEach((item, i) => {
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, i * 50);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-category').forEach(cat => {
  const items = cat.querySelectorAll('.skill-item');
  items.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(12px)';
    item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  });
  skillObserver.observe(cat);
});

// ========== MINI CARD STAGGER ==========
const miniObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = document.querySelectorAll('.mini-card');
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 80);
      });
      miniObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

const miniGrid = document.querySelector('.mini-grid');
if (miniGrid) {
  const miniCards = miniGrid.querySelectorAll('.mini-card');
  miniCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  miniObserver.observe(miniGrid);
}

// ========== SMOOTH CURSOR SCALE ON HOVER ==========
document.querySelectorAll('a, button, .mini-card, .skill-item, .cert-card, .cert-standalone-card, .contact-method').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2.5)';
    cursor.style.background = 'var(--accent-purple)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursor.style.background = 'var(--accent-teal)';
  });
});

// ========== NAVBAR ACTIVE LINK STYLE ==========
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .nav-links a.active {
    color: var(--accent-teal) !important;
  }
  .nav-links a.active::after {
    width: 100% !important;
  }
`;
document.head.appendChild(styleSheet);

// ========== PAGE LOAD ANIMATION ==========
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});
// ========== BACK TO TOP ==========
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});