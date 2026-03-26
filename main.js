/* ============================================
   DOUBLE-A DIGITAL — main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================
     CUSTOM CURSOR
  ============================================ */
  const cursor = document.querySelector('.cursor');

  if (cursor && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    const hoverTargets = document.querySelectorAll('a, button, .btn, .work-card, .portfolio-card, .filter-tab, .faq-question, .scroll-top');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
  }

  /* ============================================
     SCROLL TO TOP
  ============================================ */
  const scrollTop = document.querySelector('.scroll-top');

  if (scrollTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTop.classList.add('visible');
      } else {
        scrollTop.classList.remove('visible');
      }
    }, { passive: true });

    scrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================
     HAMBURGER / MOBILE NAV
  ============================================ */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  /* ============================================
     ACTIVE NAV LINK
  ============================================ */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html') || (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ============================================
     INTERSECTION OBSERVER — SCROLL REVEAL
  ============================================ */
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ============================================
     FAQ ACCORDION
  ============================================ */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close all
        faqItems.forEach(i => i.classList.remove('open'));
        // Toggle current
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  /* ============================================
     PORTFOLIO FILTER TABS
  ============================================ */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const portfolioCards = document.querySelectorAll('.portfolio-card[data-category]');

  if (filterTabs.length && portfolioCards.length) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.dataset.filter;

        portfolioCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'block';
            setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'none'; }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(8px)';
            setTimeout(() => { card.style.display = 'none'; }, 200);
          }
        });
      });
    });
  }

  /* ============================================
     CONTACT FORM VALIDATION
  ============================================ */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    const requiredFields = contactForm.querySelectorAll('[required]');

    requiredFields.forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.classList.contains('error')) validateField(field);
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let valid = true;
      requiredFields.forEach(field => {
        if (!validateField(field)) valid = false;
      });

      // Email validation
      const emailField = contactForm.querySelector('input[type="email"]');
      if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
          emailField.classList.add('error');
          valid = false;
        }
      }

      if (valid) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const successMsg = document.querySelector('.form-success');

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
          contactForm.reset();
          submitBtn.textContent = 'Send it →';
          submitBtn.disabled = false;
          if (successMsg) {
            successMsg.style.display = 'block';
            setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
          }
        }, 1200);
      }
    });
  }

  function validateField(field) {
    const value = field.value.trim();
    if (!value) {
      field.classList.add('error');
      return false;
    } else {
      field.classList.remove('error');
      return true;
    }
  }

  /* ============================================
     NAVBAR SCROLL STYLE
  ============================================ */
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
      } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.92)';
      }
    }, { passive: true });
  }

  /* ============================================
     SMOOTH SCROLL FOR ANCHOR LINKS
  ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
