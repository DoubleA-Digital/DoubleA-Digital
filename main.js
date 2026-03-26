/* =====================================================
   DOUBLE-A DIGITAL — main.js (v2 full rebuild)
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initScrollTop();
  initNavbar();
  initActiveNav();
  injectModals();
  initScrollReveal();
  initFAQ();
  initPortfolioFilter();
  initSmoothScroll();
});

/* =====================================================
   CURSOR
   ===================================================== */
function initCursor() {
  const cursor = document.querySelector('.cursor');
  if (!cursor || window.innerWidth <= 768) return;

  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });

  const hoverEls = document.querySelectorAll('a, button, .btn, .work-card, .portfolio-card, .ftab, .faq-q, .scroll-top, .addon-check');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
  });
}

/* =====================================================
   SCROLL TO TOP
   ===================================================== */
function initScrollTop() {
  const btn = document.querySelector('.scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* =====================================================
   NAVBAR — scroll style + hamburger
   ===================================================== */
function initNavbar() {
  const nav = document.querySelector('.navbar');
  const ham = document.querySelector('.hamburger');
  const mob = document.querySelector('.mobile-menu');

  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.background = window.scrollY > 20
        ? 'rgba(10,10,10,0.98)'
        : 'rgba(10,10,10,0.94)';
    }, { passive: true });
  }

  if (ham && mob) {
    ham.addEventListener('click', () => {
      const isOpen = mob.classList.toggle('open');
      ham.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    // Close on link click
    mob.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mob.classList.remove('open');
        ham.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

/* =====================================================
   ACTIVE NAV LINK
   ===================================================== */
function initActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

/* =====================================================
   SCROLL REVEAL
   ===================================================== */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

  els.forEach(el => obs.observe(el));
}

/* =====================================================
   FAQ ACCORDION
   ===================================================== */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });
}

/* =====================================================
   PORTFOLIO FILTER
   ===================================================== */
function initPortfolioFilter() {
  const tabs  = document.querySelectorAll('.ftab');
  const cards = document.querySelectorAll('.portfolio-card[data-cat]');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const f = tab.dataset.filter;
      cards.forEach(card => {
        const show = f === 'all' || card.dataset.cat === f;
        card.style.opacity = show ? '1' : '0';
        card.style.transform = show ? 'none' : 'translateY(8px)';
        card.style.pointerEvents = show ? 'auto' : 'none';
        setTimeout(() => {
          card.style.display = show ? 'block' : 'none';
        }, show ? 0 : 200);
      });
    });
  });
}

/* =====================================================
   SMOOTH SCROLL — anchor links
   ===================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* =====================================================
   MODAL / OVERLAY SYSTEM
   ===================================================== */
function injectModals() {
  injectContactOverlay();
  injectDemoModal();
  wireContactTriggers();
  wireDemoTriggers();
}

// ── CONTACT OVERLAY ──────────────────────────────────
function injectContactOverlay() {
  const html = `
  <div class="modal-backdrop" id="contact-backdrop" role="dialog" aria-modal="true" aria-label="Contact us">
    <div class="contact-overlay-panel">
      <!-- Left dark panel -->
      <div class="col-left dotgrid">
        <button class="modal-close" id="contact-close" aria-label="Close contact">&#x2715;</button>
        <span class="logo-aa"><span class="a1">A</span><span class="a2">A</span></span>
        <h2>Let's build something.</h2>
        <p>Tell us about your business. We'll get back to you within 24 hours and start building your free demo.</p>

        <div class="contact-info-item">
          <div class="ci-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <div>
            <h4>Business Email</h4>
            <a href="mailto:hello@double-adigital.com">hello@double-adigital.com</a>
          </div>
        </div>

        <div class="contact-info-item">
          <div class="ci-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div>
            <h4>Location</h4>
            <p>Simi Valley, CA</p>
          </div>
        </div>

        <div class="divider"></div>
        <p class="personal-title">Or reach us personally:</p>

        <div class="contact-info-item">
          <div>
            <h4>Aarush</h4>
            <a href="mailto:aarush.gurram@gmail.com">aarush.gurram@gmail.com</a><br>
            <a href="tel:+18052841628" style="margin-top:3px;display:inline-block;">(805) 284-1628</a>
          </div>
        </div>
        <div class="contact-info-item">
          <div>
            <h4>Ajay</h4>
            <a href="mailto:ajay.jille@gmail.com">ajay.jille@gmail.com</a><br>
            <a href="tel:+18058131783" style="margin-top:3px;display:inline-block;">(805) 813-1783</a>
          </div>
        </div>

        <div class="socials" style="margin-top:24px;">
          <a href="#" class="soc-icon" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
          </a>
          <a href="#" class="soc-icon" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>
      </div>

      <!-- Right form panel -->
      <div class="col-right">
        <h2 class="form-title">Tell us about your project.</h2>
        <p class="form-sub">We'll get back to you within 24 hours and start your free demo.</p>

        <form id="contact-form" novalidate>
          <div class="form-row">
            <div class="form-group">
              <label for="c-name">Your Name *</label>
              <input type="text" id="c-name" name="name" placeholder="Jane Smith" required>
              <span class="err-msg">Required</span>
            </div>
            <div class="form-group">
              <label for="c-biz">Business Name *</label>
              <input type="text" id="c-biz" name="business" placeholder="Smith's Coffee" required>
              <span class="err-msg">Required</span>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="c-email">Email *</label>
              <input type="email" id="c-email" name="email" placeholder="jane@smithscoffee.com" required>
              <span class="err-msg">Valid email required</span>
            </div>
            <div class="form-group">
              <label for="c-phone">Phone</label>
              <input type="tel" id="c-phone" name="phone" placeholder="(805) 555-0100">
            </div>
          </div>
          <div class="form-group">
            <label for="c-service">What do you need? *</label>
            <select id="c-service" name="service" required>
              <option value="" disabled selected>Select a service</option>
              <option>Website</option>
              <option>Web App</option>
              <option>E-Commerce / Online Ordering</option>
              <option>Not sure yet</option>
            </select>
            <span class="err-msg">Required</span>
          </div>
          <div class="form-group">
            <label for="c-budget">Budget Range</label>
            <select id="c-budget" name="budget">
              <option value="" disabled selected>Select a range</option>
              <option>Under $500</option>
              <option>$500 – $850</option>
              <option>$850 – $1,250</option>
              <option>$1,250+</option>
              <option>Not sure yet</option>
            </select>
          </div>
          <div class="form-group">
            <label for="c-msg">Message *</label>
            <textarea id="c-msg" name="message" placeholder="Tell us about your business and what you're looking for..." required></textarea>
            <span class="err-msg">Required</span>
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;margin-top:4px;">Send it →</button>
          <div class="form-success" id="contact-success">Message sent! We'll be in touch within 24 hours.</div>
        </form>
      </div>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('beforeend', html);

  // Close handlers
  const backdrop = document.getElementById('contact-backdrop');
  const closeBtn = document.getElementById('contact-close');

  closeBtn.addEventListener('click', closeContactOverlay);
  backdrop.addEventListener('click', e => { if (e.target === backdrop) closeContactOverlay(); });

  // Form
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (validateForm(form)) {
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        form.reset();
        btn.textContent = 'Send it →';
        btn.disabled = false;
        document.getElementById('contact-success').style.display = 'block';
        setTimeout(() => document.getElementById('contact-success').style.display = 'none', 5000);
      }, 1200);
    }
  });
}

function openContactOverlay() {
  const bd = document.getElementById('contact-backdrop');
  bd.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeContactOverlay() {
  const bd = document.getElementById('contact-backdrop');
  bd.classList.remove('active');
  document.body.style.overflow = '';
}

function wireContactTriggers() {
  document.querySelectorAll('[data-contact], a[href="contact.html"]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      openContactOverlay();
    });
  });
}

// ── DEMO MODAL ────────────────────────────────────────
function injectDemoModal() {
  const html = `
  <div class="modal-backdrop center-always" id="demo-backdrop" role="dialog" aria-modal="true" aria-label="Get a free demo">
    <div class="demo-modal-panel">
      <button class="modal-close modal-close-dark" id="demo-close" aria-label="Close">&#x2715;</button>

      <!-- Step indicators -->
      <div class="demo-steps-indicator">
        <div class="step-dot-ind active" id="ind-1"></div>
        <div class="step-dot-ind" id="ind-2"></div>
        <div class="step-dot-ind" id="ind-3"></div>
      </div>

      <!-- STEP 1 -->
      <div class="demo-step active" id="demo-step-1">
        <h2>Let's get started.</h2>
        <p class="step-sub">Tell us a bit about yourself — no commitment needed.</p>
        <form id="demo-form-1" novalidate>
          <div class="form-row">
            <div class="form-group">
              <label for="d-name">Your Name *</label>
              <input type="text" id="d-name" name="name" placeholder="Jane Smith" required>
              <span class="err-msg">Required</span>
            </div>
            <div class="form-group">
              <label for="d-biz">Business Name *</label>
              <input type="text" id="d-biz" name="business" placeholder="Smith's Coffee" required>
              <span class="err-msg">Required</span>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="d-email">Email *</label>
              <input type="email" id="d-email" name="email" placeholder="jane@smithscoffee.com" required>
              <span class="err-msg">Valid email required</span>
            </div>
            <div class="form-group">
              <label for="d-phone">Phone</label>
              <input type="tel" id="d-phone" name="phone" placeholder="(805) 555-0100">
            </div>
          </div>
          <div class="form-group">
            <label for="d-type">Business Type</label>
            <select id="d-type" name="btype">
              <option value="" disabled selected>Select your industry</option>
              <option>Restaurant</option>
              <option>Salon / Beauty</option>
              <option>Auto Shop</option>
              <option>Gym / Fitness</option>
              <option>Plumbing / Trades</option>
              <option>Retail</option>
              <option>Other</option>
            </select>
          </div>
          <div class="form-group">
            <label for="d-plan">Which plan interests you?</label>
            <select id="d-plan" name="plan">
              <option value="" disabled selected>Select a plan</option>
              <option value="Starter">Starter — $500</option>
              <option value="Growth">Growth — $850 (Most Popular)</option>
              <option value="Pro">Pro — $1,250</option>
              <option value="Not sure">Not sure yet</option>
            </select>
          </div>
          <div class="demo-nav">
            <span></span>
            <button type="submit" class="btn btn-primary">Next →</button>
          </div>
        </form>
      </div>

      <!-- STEP 2 -->
      <div class="demo-step" id="demo-step-2">
        <h2>Any extras?</h2>
        <p class="step-sub">All optional — add what fits your needs.</p>

        <label class="addon-check" id="addon-rush">
          <input type="checkbox" id="chk-rush">
          <div class="addon-check-label">
            <h4>Rush Delivery</h4>
            <p>Get your demo in 2–3 business days instead of the standard 5–7</p>
          </div>
          <span class="addon-price-tag">+$249</span>
        </label>

        <label class="addon-check" id="addon-pages-wrap">
          <input type="checkbox" id="chk-pages">
          <div class="addon-check-label">
            <h4>Extra Pages</h4>
            <p>Need more pages beyond your plan's limit?</p>
            <div class="extra-pages-input" id="extra-pages-input">
              <input type="number" id="extra-pages-count" min="1" max="50" placeholder="0">
              <span id="extra-pages-total">× $25/page = $0</span>
            </div>
          </div>
          <span class="addon-price-tag" id="pages-price-tag">$25/page</span>
        </label>

        <label class="addon-check" id="addon-logo">
          <input type="checkbox" id="chk-logo">
          <div class="addon-check-label">
            <h4>Logo Design</h4>
            <p>We'll design a logo that matches your new site</p>
          </div>
          <span class="addon-price-tag addon-free">Free</span>
        </label>

        <label class="addon-check" id="addon-social">
          <input type="checkbox" id="chk-social">
          <div class="addon-check-label">
            <h4>Social Media Kit</h4>
            <p>Profile images, covers, and post templates for major platforms</p>
          </div>
          <span class="addon-price-tag addon-free">Free</span>
        </label>

        <div class="demo-nav">
          <button class="btn-back" id="demo-back-1">← Back</button>
          <button class="btn btn-primary" id="demo-submit">Submit Request →</button>
        </div>
      </div>

      <!-- STEP 3 — Confirmation -->
      <div class="demo-step" id="demo-step-3">
        <div class="confirm-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h2>You're all set, <span id="confirm-name">there</span>!</h2>
        <p class="step-sub">We'll reach out within 24 hours to kick things off.</p>

        <div class="confirm-summary">
          <h4>Your Request Summary</h4>
          <ul id="confirm-list"></ul>
        </div>

        <button class="btn btn-primary" id="demo-done" style="width:100%;justify-content:center;margin-top:8px;">Done ✓</button>
      </div>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('beforeend', html);

  // Close handlers
  const bd = document.getElementById('demo-backdrop');
  document.getElementById('demo-close').addEventListener('click', closeDemoModal);
  bd.addEventListener('click', e => { if (e.target === bd) closeDemoModal(); });
  document.getElementById('demo-done').addEventListener('click', closeDemoModal);

  // Step 1 submit
  document.getElementById('demo-form-1').addEventListener('submit', e => {
    e.preventDefault();
    if (validateForm(document.getElementById('demo-form-1'))) {
      showDemoStep(2);
    }
  });

  // Back button
  document.getElementById('demo-back-1').addEventListener('click', () => showDemoStep(1));

  // Step 2 submit
  document.getElementById('demo-submit').addEventListener('click', () => submitDemoStep2());

  // Extra pages toggle
  const chkPages = document.getElementById('chk-pages');
  const extraInput = document.getElementById('extra-pages-input');
  const extraCount = document.getElementById('extra-pages-count');
  const extraTotal = document.getElementById('extra-pages-total');

  chkPages.addEventListener('change', () => {
    extraInput.classList.toggle('show', chkPages.checked);
  });
  extraCount.addEventListener('input', () => {
    const n = parseInt(extraCount.value) || 0;
    extraTotal.textContent = `× $25/page = $${n * 25}`;
  });
}

function showDemoStep(n) {
  document.querySelectorAll('.demo-step').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.step-dot-ind').forEach((d, i) => {
    d.classList.toggle('active', i === n - 1);
    d.classList.toggle('done', i < n - 1);
  });
  document.getElementById(`demo-step-${n}`).classList.add('active');
}

function submitDemoStep2() {
  const name     = document.getElementById('d-name').value.trim().split(' ')[0] || 'there';
  const plan     = document.getElementById('d-plan').value || 'Not selected';
  const rush     = document.getElementById('chk-rush').checked;
  const logo     = document.getElementById('chk-logo').checked;
  const social   = document.getElementById('chk-social').checked;
  const pages    = document.getElementById('chk-pages').checked;
  const pagesCt  = parseInt(document.getElementById('extra-pages-count').value) || 0;

  document.getElementById('confirm-name').textContent = name;

  const items = [];
  items.push(`Plan: ${plan}`);
  if (rush)  items.push('Rush delivery (+$249)');
  if (pages && pagesCt > 0) items.push(`${pagesCt} extra page${pagesCt > 1 ? 's' : ''} (+$${pagesCt * 25})`);
  if (logo)  items.push('Logo design (free)');
  if (social) items.push('Social media kit (free)');

  const list = document.getElementById('confirm-list');
  list.innerHTML = items.map(i => `<li>${i}</li>`).join('');
  showDemoStep(3);
}

function openDemoModal(planValue) {
  if (planValue) {
    const sel = document.getElementById('d-plan');
    if (sel) {
      for (let o of sel.options) {
        if (o.value === planValue) { sel.value = planValue; break; }
      }
    }
  }
  // Reset to step 1
  showDemoStep(1);
  document.getElementById('demo-backdrop').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeDemoModal() {
  document.getElementById('demo-backdrop').classList.remove('active');
  document.body.style.overflow = '';
}

function wireDemoTriggers() {
  document.querySelectorAll('[data-demo]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      openDemoModal(el.dataset.plan || '');
    });
  });
}

/* =====================================================
   ESCAPE KEY — close any open modal
   ===================================================== */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeContactOverlay();
    closeDemoModal();
    // Also close mobile menu
    const mob = document.querySelector('.mobile-menu');
    const ham = document.querySelector('.hamburger');
    if (mob) { mob.classList.remove('open'); ham.classList.remove('open'); document.body.style.overflow = ''; }
  }
});

/* =====================================================
   FORM VALIDATION
   ===================================================== */
function validateForm(form) {
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    const val = field.value.trim();
    if (!val) { field.classList.add('err'); valid = false; }
    else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      field.classList.add('err'); valid = false;
    } else {
      field.classList.remove('err');
    }
  });
  // Re-validate on input
  form.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('input', () => {
      if (field.value.trim()) field.classList.remove('err');
    }, { once: false });
  });
  return valid;
}
