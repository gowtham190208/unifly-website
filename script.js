/**
 * Unifly AI Company — Launch Website Client Logic
 * Product: Unifly Shop Management
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Copyright Year
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Header Elevation on Scroll
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Mobile Navigation Drawer Toggle & Focus Management
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    hamburgerBtn?.classList.add('is-active');
    hamburgerBtn?.setAttribute('aria-expanded', 'true');
    mobileDrawer?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    hamburgerBtn?.classList.remove('is-active');
    hamburgerBtn?.setAttribute('aria-expanded', 'false');
    mobileDrawer?.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburgerBtn?.addEventListener('click', () => {
    const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Close drawer when clicking backdrop
  mobileDrawer?.addEventListener('click', (e) => {
    if (e.target === mobileDrawer) {
      closeMobileMenu();
    }
  });

  // Close drawer when clicking any link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close drawer on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer?.classList.contains('open')) {
      closeMobileMenu();
      hamburgerBtn?.focus();
    }
  });

  // 3b. Hero Screenshot Tab Switcher & Adaptive Device Preview
  const screenTabButtons = document.querySelectorAll('.screen-tab-btn');
  const heroScreenImg = document.getElementById('heroScreenImg');
  const screenTitle = document.getElementById('screenTitle');
  const mockupFrame = document.querySelector('.mockup-frame');
  const btnDeviceDesktop = document.getElementById('btnDeviceDesktop');
  const btnDeviceMobile = document.getElementById('btnDeviceMobile');

  const screensData = {
    pos: {
      src: 'assets/images/unifly_pos_screen.png',
      alt: 'Unifly Shop Management — Point-of-Sale (POS) Counter',
      title: 'Unifly Shop Management — Point-of-Sale (POS) Counter',
      mode: 'desktop'
    },
    dashboard: {
      src: 'assets/images/unifly_dashboard_screen.png',
      alt: 'Unifly Shop Management — Real-Time Store Dashboard & Gemini AI',
      title: 'Unifly Shop Management — Real-Time Store Dashboard & Gemini AI',
      mode: 'desktop'
    },
    receipt: {
      src: 'assets/images/unifly_receipt_screen.png',
      alt: 'Unifly Shop Management — Thermal & Digital Receipt Preview (80mm/58mm)',
      title: 'Unifly Shop Management — Thermal & Digital Receipt Preview (80mm/58mm)',
      mode: 'mobile'
    },
    marketplace: {
      src: 'assets/images/unifly_marketplace_screen.png',
      alt: 'Unifly Shop Management — Customer Marketplace & Counter Pickup',
      title: 'Unifly Shop Management — Customer Marketplace & Counter Pickup',
      mode: 'mobile'
    }
  };

  function setDeviceMode(mode, triggerScreenKey = null) {
    if (!mockupFrame) return;

    if (mode === 'mobile') {
      mockupFrame.classList.remove('mode-desktop');
      mockupFrame.classList.add('mode-mobile');
      btnDeviceMobile?.classList.add('active');
      btnDeviceDesktop?.classList.remove('active');

      // If switching to mobile and current view is a wide desktop, switch to receipt or marketplace
      const currentActive = document.querySelector('.screen-tab-btn.active')?.getAttribute('data-screen');
      if (!triggerScreenKey && (currentActive === 'pos' || currentActive === 'dashboard')) {
        switchScreen('receipt');
      }
    } else {
      mockupFrame.classList.remove('mode-mobile');
      mockupFrame.classList.add('mode-desktop');
      btnDeviceDesktop?.classList.add('active');
      btnDeviceMobile?.classList.remove('active');

      // If switching to desktop and current view is a mobile screen, switch to POS or Dashboard
      const currentActive = document.querySelector('.screen-tab-btn.active')?.getAttribute('data-screen');
      if (!triggerScreenKey && (currentActive === 'receipt' || currentActive === 'marketplace')) {
        switchScreen('pos');
      }
    }
  }

  function switchScreen(screenKey) {
    const screenInfo = screensData[screenKey];
    if (!screenInfo || !heroScreenImg) return;

    // Update screen tab button active states
    screenTabButtons.forEach(btn => {
      if (btn.getAttribute('data-screen') === screenKey) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    // Animate image swap
    heroScreenImg.style.transition = 'opacity 0.18s ease';
    heroScreenImg.style.opacity = '0.3';
    setTimeout(() => {
      heroScreenImg.src = screenInfo.src;
      heroScreenImg.alt = screenInfo.alt;
      if (screenTitle) screenTitle.textContent = screenInfo.title;
      heroScreenImg.style.opacity = '1';
    }, 150);

    // Synchronize device frame
    if (screenInfo.mode === 'mobile') {
      mockupFrame?.classList.remove('mode-desktop');
      mockupFrame?.classList.add('mode-mobile');
      btnDeviceMobile?.classList.add('active');
      btnDeviceDesktop?.classList.remove('active');
    } else {
      mockupFrame?.classList.remove('mode-mobile');
      mockupFrame?.classList.add('mode-desktop');
      btnDeviceDesktop?.classList.add('active');
      btnDeviceMobile?.classList.remove('active');
    }
  }

  // Device toggle buttons click
  btnDeviceDesktop?.addEventListener('click', () => setDeviceMode('desktop'));
  btnDeviceMobile?.addEventListener('click', () => setDeviceMode('mobile'));

  // Screen tab buttons click
  screenTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const screenKey = btn.getAttribute('data-screen');
      switchScreen(screenKey);
    });
  });

  // Responsive Viewport & Device Auto-Detection
  let userManuallyToggled = false;
  btnDeviceDesktop?.addEventListener('click', () => { userManuallyToggled = true; });
  btnDeviceMobile?.addEventListener('click', () => { userManuallyToggled = true; });

  function handleResponsiveDeviceAdaptation() {
    if (userManuallyToggled) return;
    const isMobileViewport = window.innerWidth < 768;
    if (isMobileViewport) {
      setDeviceMode('mobile', 'receipt');
    } else {
      setDeviceMode('desktop', 'pos');
    }
  }

  // Initial adaptation
  handleResponsiveDeviceAdaptation();

  // Resize listener
  window.addEventListener('resize', () => {
    handleResponsiveDeviceAdaptation();
  }, { passive: true });

  // OS Detection: Highlight recommended device download button
  const userAgent = navigator.userAgent || '';
  const isAndroid = /Android/i.test(userAgent);
  const isWindowsOS = /Windows/i.test(userAgent);

  if (isAndroid) {
    const androidBtn = document.getElementById('androidDownloadBtn');
    if (androidBtn) {
      const badge = document.createElement('span');
      badge.style.cssText = 'display:block; font-size: 0.72rem; font-weight: 700; background: #DCFCE7; color: #166534; padding: 2px 8px; border-radius: 999px; margin-top: 4px;';
      badge.textContent = '⚡ Recommended for this Android device';
      androidBtn.appendChild(badge);
    }
  } else if (isWindowsOS) {
    const windowsBtn = document.getElementById('windowsDownloadBtn');
    if (windowsBtn) {
      const badge = document.createElement('span');
      badge.style.cssText = 'display:block; font-size: 0.72rem; font-weight: 700; background: #DBEAFE; color: #1E40AF; padding: 2px 8px; border-radius: 999px; margin-top: 4px;';
      badge.textContent = '⚡ Recommended for this Windows PC';
      windowsBtn.appendChild(badge);
    }
  }

  // 4. Device Switcher Tabs in "How to Download"
  const tabButtons = document.querySelectorAll('.tab-btn');
  const androidSteps = document.getElementById('androidSteps');
  const windowsSteps = document.getElementById('windowsSteps');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const targetDevice = btn.getAttribute('data-target');
      if (targetDevice === 'android') {
        if (androidSteps) androidSteps.style.display = 'grid';
        if (windowsSteps) windowsSteps.style.display = 'none';
      } else if (targetDevice === 'windows') {
        if (androidSteps) androidSteps.style.display = 'none';
        if (windowsSteps) windowsSteps.style.display = 'grid';
      }
    });
  });

  // 5. Contact Form Submission & Accessible Feedback
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const subjectInput = document.getElementById('contactSubject');
      const messageInput = document.getElementById('contactMessage');

      const name = nameInput?.value.trim() || '';
      const email = emailInput?.value.trim() || '';
      const subject = subjectInput?.value.trim() || '';
      const message = messageInput?.value.trim() || '';

      // Validate inputs
      if (!name || !email || !subject || !message) {
        showStatus('error', 'Please fill out all required fields.');
        return;
      }

      // Check email format
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showStatus('error', 'Please provide a valid email address.');
        emailInput?.focus();
        return;
      }

      // Safe, transparent contact handling:
      // Construct mailto link with encoded parameters and offer direct mail dispatch
      const mailtoUrl = `mailto:gowthamilaiyaraja@gmail.com?subject=${encodeURIComponent(
        `[Unifly Shop Management Inquiry] ${subject}`
      )}&body=${encodeURIComponent(
        `From: ${name} (${email})\n\nMessage:\n${message}`
      )}`;

      showStatus(
        'success',
        `Thank you, ${name}! Opening your email client to send your message directly to gowthamilaiyaraja@gmail.com...`
      );

      // Trigger user's default email client
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 700);

      // Reset form
      contactForm.reset();
    });
  }

  function showStatus(type, message) {
    if (!formStatus) return;
    formStatus.className = `form-status ${type}`;
    formStatus.textContent = message;
    formStatus.setAttribute('role', type === 'error' ? 'alert' : 'status');
    formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // 6. Navigation Active Link Tracking (Intersection Observer)
  const navSections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        desktopNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  navSections.forEach(section => observer.observe(section));
});
