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
  const autoAdaptIndicator = document.getElementById('autoAdaptIndicator');
  const adaptText = document.getElementById('adaptText');
  const heroAndroidBtn = document.getElementById('heroAndroidBtn');
  const heroWindowsBtn = document.getElementById('heroWindowsBtn');
  const tabAndroid = document.getElementById('tabAndroid');
  const tabWindows = document.getElementById('tabWindows');
  const androidSteps = document.getElementById('androidSteps');
  const windowsSteps = document.getElementById('windowsSteps');

  let userManuallyToggledDevice = false;
  let userManuallyToggledInstallTab = false;

  btnDeviceDesktop?.addEventListener('click', () => { 
    userManuallyToggledDevice = true; 
    if (adaptText) adaptText.textContent = 'Laptop / Desktop (Manual view)';
  });
  btnDeviceMobile?.addEventListener('click', () => { 
    userManuallyToggledDevice = true; 
    if (adaptText) adaptText.textContent = 'Mobile Phone (Manual view)';
  });

  tabAndroid?.addEventListener('click', () => { userManuallyToggledInstallTab = true; });
  tabWindows?.addEventListener('click', () => { userManuallyToggledInstallTab = true; });

  function handleResponsiveDeviceAdaptation() {
    const isMobileViewport = window.innerWidth < 768;
    
    // Automatically adapt hero preview simulation if not manually toggled
    if (!userManuallyToggledDevice) {
      if (isMobileViewport) {
        setDeviceMode('mobile', 'receipt');
        if (adaptText) adaptText.textContent = '⚡ Auto-adapted for your screen (Mobile View)';
      } else {
        setDeviceMode('desktop', 'pos');
        if (adaptText) adaptText.textContent = '⚡ Auto-adapted for your screen (Laptop / Desktop View)';
      }
    }

    // Automatically adapt hero action button emphasis
    if (heroAndroidBtn && heroWindowsBtn) {
      if (isMobileViewport) {
        heroAndroidBtn.className = 'btn btn-primary btn-lg';
        heroWindowsBtn.className = 'btn btn-secondary btn-lg';
      } else {
        heroAndroidBtn.className = 'btn btn-primary btn-lg';
        heroWindowsBtn.className = 'btn btn-secondary btn-lg';
      }
    }

    // Automatically adapt "How to Install" tab if not manually clicked
    if (!userManuallyToggledInstallTab) {
      if (isMobileViewport) {
        if (tabAndroid && tabWindows && androidSteps && windowsSteps) {
          tabAndroid.classList.add('active');
          tabAndroid.setAttribute('aria-selected', 'true');
          tabWindows.classList.remove('active');
          tabWindows.setAttribute('aria-selected', 'false');
          androidSteps.style.display = 'grid';
          windowsSteps.style.display = 'none';
        }
      } else {
        if (tabAndroid && tabWindows && androidSteps && windowsSteps) {
          tabWindows.classList.add('active');
          tabWindows.setAttribute('aria-selected', 'true');
          tabAndroid.classList.remove('active');
          tabAndroid.setAttribute('aria-selected', 'false');
          windowsSteps.style.display = 'grid';
          androidSteps.style.display = 'none';
        }
      }
    }
  }

  // Initial adaptation
  handleResponsiveDeviceAdaptation();

  // Resize listener with debouncing
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      handleResponsiveDeviceAdaptation();
    }, 120);
  }, { passive: true });

  // OS Detection: Highlight recommended device download button
  const userAgent = navigator.userAgent || '';
  const isAndroid = /Android/i.test(userAgent);
  const isWindowsOS = /Windows/i.test(userAgent);

  if (isAndroid) {
    const androidBtn = document.getElementById('androidDownloadBtn');
    if (androidBtn && !androidBtn.querySelector('.os-rec-badge')) {
      const badge = document.createElement('span');
      badge.className = 'os-rec-badge';
      badge.style.cssText = 'display:block; font-size: 0.72rem; font-weight: 700; background: #DCFCE7; color: #166534; padding: 2px 8px; border-radius: 999px; margin-top: 4px;';
      badge.textContent = '⚡ Recommended for this Android device';
      androidBtn.appendChild(badge);
    }
  } else if (isWindowsOS) {
    const windowsBtn = document.getElementById('windowsDownloadBtn');
    if (windowsBtn && !windowsBtn.querySelector('.os-rec-badge')) {
      const badge = document.createElement('span');
      badge.className = 'os-rec-badge';
      badge.style.cssText = 'display:block; font-size: 0.72rem; font-weight: 700; background: #DBEAFE; color: #1E40AF; padding: 2px 8px; border-radius: 999px; margin-top: 4px;';
      badge.textContent = '⚡ Recommended for this Windows PC';
      windowsBtn.appendChild(badge);
    }
  }

  // 4. Device Switcher Tabs in "How to Download"
  const tabButtons = document.querySelectorAll('.tab-btn');

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

  // =========================================================================
  // 7. Real Database-Backed Live Download Counter & SSE Real-Time Sync
  // =========================================================================
  const PROD_API_BASE = 'https://shop-management-billing-app.onrender.com';
  const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && window.location.port === '8000'
    ? ''
    : PROD_API_BASE;

  // Real-time Database Download Statistics State (No fake or hardcoded numbers)
  let downloadStats = {
    windows_unique_downloads: 0,
    android_unique_downloads: 0,
    total_unique_downloads: 0,
    windows_anonymous_downloads: 0,
    android_anonymous_downloads: 0,
    windows_total_downloads: 0,
    android_total_downloads: 0,
    total_downloads: 0
  };

  // -------------------------------------------------------------------------
  // 7A. Authenticated Account State & Modal Management
  // -------------------------------------------------------------------------
  const STORAGE_KEY_AUTH_TOKEN = 'unifly_auth_token';
  const STORAGE_KEY_AUTH_USER = 'unifly_auth_user';

  function getStoredAuth() {
    const token = localStorage.getItem(STORAGE_KEY_AUTH_TOKEN);
    let user = null;
    try {
      const userStr = localStorage.getItem(STORAGE_KEY_AUTH_USER);
      if (userStr) user = JSON.parse(userStr);
    } catch (e) {
      user = null;
    }
    return { token, user };
  }

  function setStoredAuth(token, user) {
    if (token) localStorage.setItem(STORAGE_KEY_AUTH_TOKEN, token);
    if (user) localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(user));
    renderAuthUI();
  }

  function clearStoredAuth() {
    localStorage.removeItem(STORAGE_KEY_AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEY_AUTH_USER);
    renderAuthUI();
  }

  const userAuthBadge = document.getElementById('userAuthBadge');
  const authUserName = document.getElementById('authUserName');
  const authLogoutBtn = document.getElementById('authLogoutBtn');
  const accountModalTriggerBtn = document.getElementById('accountModalTriggerBtn');
  const accountBtnText = document.getElementById('accountBtnText');
  const authModal = document.getElementById('authModal');
  const closeAuthModalBtn = document.getElementById('closeAuthModalBtn');
  const modalLoggedInView = document.getElementById('modalLoggedInView');
  const modalUserEmail = document.getElementById('modalUserEmail');
  const modalUserId = document.getElementById('modalUserId');
  const modalUserRole = document.getElementById('modalUserRole');
  const modalSignOutBtn = document.getElementById('modalSignOutBtn');
  const authLoginForm = document.getElementById('authLoginForm');
  const authEmailInput = document.getElementById('authEmailInput');
  const authPasswordInput = document.getElementById('authPasswordInput');
  const authErrorMessage = document.getElementById('authErrorMessage');
  const fillDemoAdminBtn = document.getElementById('fillDemoAdminBtn');
  const loginSubmitBtn = document.getElementById('loginSubmitBtn');

  function renderAuthUI() {
    const { token, user } = getStoredAuth();
    if (token && user) {
      if (userAuthBadge) userAuthBadge.style.display = 'inline-flex';
      if (authUserName) authUserName.textContent = `${user.full_name || user.email} (#${user.id})`;
      if (accountBtnText) accountBtnText.textContent = `Account #${user.id}`;

      if (modalLoggedInView) modalLoggedInView.style.display = 'block';
      if (modalUserEmail) modalUserEmail.textContent = user.email || '';
      if (modalUserId) modalUserId.textContent = `#${user.id}`;
      if (modalUserRole) modalUserRole.textContent = user.role || 'seller';
      if (authLoginForm) authLoginForm.style.display = 'none';
    } else {
      if (userAuthBadge) userAuthBadge.style.display = 'none';
      if (accountBtnText) accountBtnText.textContent = 'Sign In (Account Tracking)';

      if (modalLoggedInView) modalLoggedInView.style.display = 'none';
      if (authLoginForm) authLoginForm.style.display = 'block';
    }
  }

  function openAuthModal() {
    if (authModal) {
      authModal.classList.add('open');
      authModal.setAttribute('aria-hidden', 'false');
      renderAuthUI();
    }
  }

  function closeAuthModal() {
    if (authModal) {
      authModal.classList.remove('open');
      authModal.setAttribute('aria-hidden', 'true');
      if (authErrorMessage) authErrorMessage.style.display = 'none';
    }
  }

  accountModalTriggerBtn?.addEventListener('click', openAuthModal);
  closeAuthModalBtn?.addEventListener('click', closeAuthModal);
  authLogoutBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    clearStoredAuth();
    triggerToast('Signed Out', 'You are now browsing as an unauthenticated visitor.', '');
  });
  modalSignOutBtn?.addEventListener('click', () => {
    clearStoredAuth();
    triggerToast('Signed Out', 'You are now browsing as an unauthenticated visitor.', '');
  });

  authModal?.addEventListener('click', (e) => {
    if (e.target === authModal) closeAuthModal();
  });

  fillDemoAdminBtn?.addEventListener('click', () => {
    if (authEmailInput) authEmailInput.value = 'gowtham@admin.com';
    if (authPasswordInput) authPasswordInput.value = 'gowtham@123.in';
    if (authErrorMessage) authErrorMessage.style.display = 'none';
  });

  authLoginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!authEmailInput || !authPasswordInput) return;

    const email = authEmailInput.value.trim();
    const password = authPasswordInput.value;

    if (loginSubmitBtn) {
      loginSubmitBtn.disabled = true;
      loginSubmitBtn.innerHTML = '<span>Signing In...</span>';
    }
    if (authErrorMessage) authErrorMessage.style.display = 'none';

    try {
      const res = await fetch(`${API_BASE}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || 'Invalid email or password.');
      }

      const data = await res.json();
      setStoredAuth(data.access_token, data.user);
      triggerToast('Signed In Successfully!', `Welcome ${data.user.full_name || data.user.email} (#${data.user.id}). Unique downloads will now be tracked to your account!`, '✓');
      closeAuthModal();
    } catch (err) {
      if (authErrorMessage) {
        authErrorMessage.textContent = err.message || 'Authentication failed. Please check credentials.';
        authErrorMessage.style.display = 'block';
      }
    } finally {
      if (loginSubmitBtn) {
        loginSubmitBtn.disabled = false;
        loginSubmitBtn.innerHTML = '<span>Sign In to Account</span>';
      }
    }
  });

  // Initial Auth UI state
  renderAuthUI();

  // -------------------------------------------------------------------------
  // 7B. Live Download Counters UI Updater
  // -------------------------------------------------------------------------
  function updateDownloadCountersUI(stats, animatePlatform = null) {
    const heroTotal = document.getElementById('heroTotalDownloads');
    const heroAndroid = document.getElementById('heroAndroidCount');
    const heroWindows = document.getElementById('heroWindowsCount');
    const cardAndroid = document.getElementById('androidCardDownloads');
    const cardWindows = document.getElementById('windowsCardDownloads');
    const androidDeliveries = document.getElementById('androidTotalDeliveries');
    const windowsDeliveries = document.getElementById('windowsTotalDeliveries');
    const btnAndroid = document.getElementById('androidBtnCount');
    const btnWindows = document.getElementById('windowsBtnCount');
    const footerAndroid = document.getElementById('footerAndroidCount');
    const footerWindows = document.getElementById('footerWindowsCount');

    const formattedTotalUnique = stats.total_unique_downloads.toLocaleString();
    const formattedAndroidUnique = stats.android_unique_downloads.toLocaleString();
    const formattedWindowsUnique = stats.windows_unique_downloads.toLocaleString();
    const formattedAndroidTotal = (stats.android_total_downloads || stats.android_unique_downloads).toLocaleString();
    const formattedWindowsTotal = (stats.windows_total_downloads || stats.windows_unique_downloads).toLocaleString();

    if (heroTotal) heroTotal.textContent = formattedTotalUnique;
    if (heroAndroid) heroAndroid.textContent = formattedAndroidUnique;
    if (heroWindows) heroWindows.textContent = formattedWindowsUnique;
    if (cardAndroid) cardAndroid.textContent = formattedAndroidUnique;
    if (cardWindows) cardWindows.textContent = formattedWindowsUnique;
    if (androidDeliveries) androidDeliveries.textContent = formattedAndroidTotal;
    if (windowsDeliveries) windowsDeliveries.textContent = formattedWindowsTotal;
    if (btnAndroid) btnAndroid.textContent = `${formattedAndroidUnique} unique`;
    if (btnWindows) btnWindows.textContent = `${formattedWindowsUnique} unique`;
    if (footerAndroid) footerAndroid.textContent = formattedAndroidUnique;
    if (footerWindows) footerWindows.textContent = formattedWindowsUnique;

    if (animatePlatform) {
      const bumpClass = 'number-bump';
      if (heroTotal) {
        heroTotal.classList.remove(bumpClass);
        void heroTotal.offsetWidth;
        heroTotal.classList.add(bumpClass);
      }
      if (animatePlatform === 'android' || animatePlatform === 'all') {
        [heroAndroid, cardAndroid, btnAndroid, footerAndroid].forEach(el => {
          if (el) {
            el.classList.remove(bumpClass);
            void el.offsetWidth;
            el.classList.add(bumpClass);
          }
        });
      }
      if (animatePlatform === 'windows' || animatePlatform === 'all') {
        [heroWindows, cardWindows, btnWindows, footerWindows].forEach(el => {
          if (el) {
            el.classList.remove(bumpClass);
            void el.offsetWidth;
            el.classList.add(bumpClass);
          }
        });
      }
    }
  }

  function setSyncStatus(status) {
    const statusDot = document.getElementById('liveSyncStatusDot');
    const statusBadge = document.getElementById('liveSyncStatusBadge');
    if (!statusBadge) return;

    if (status === 'connected') {
      statusBadge.textContent = '🟢 Live Synced';
      statusBadge.style.background = '#DCFCE7';
      statusBadge.style.color = '#166534';
      if (statusDot) statusDot.style.background = '#10B981';
    } else if (status === 'reconnecting') {
      statusBadge.textContent = '🟡 Reconnecting...';
      statusBadge.style.background = '#FEF3C7';
      statusBadge.style.color = '#92400E';
      if (statusDot) statusDot.style.background = '#F59E0B';
    } else if (status === 'offline') {
      statusBadge.textContent = '⚪ Cached Count';
      statusBadge.style.background = '#F3F4F6';
      statusBadge.style.color = '#4B5563';
      if (statusDot) statusDot.style.background = '#9CA3AF';
    }
  }

  // -------------------------------------------------------------------------
  // 7C. Initial Statistics Fetch (Database-Backed)
  // -------------------------------------------------------------------------
  async function fetchDownloadStats() {
    try {
      const response = await fetch(`${API_BASE}/api/v1/downloads/stats`, {
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        const data = await response.json();
        downloadStats = { ...downloadStats, ...data };
        updateDownloadCountersUI(downloadStats);
        setSyncStatus('connected');
        return true;
      }
    } catch (e) {
      // Graceful offline fallback
      setSyncStatus('offline');
    }
    return false;
  }

  // -------------------------------------------------------------------------
  // 7D. Real-Time Server-Sent Events (SSE) Stream
  // -------------------------------------------------------------------------
  let sseSource = null;
  let sseReconnectTimer = null;

  function initRealtimeSSEStream() {
    if (typeof EventSource === 'undefined') return;

    try {
      if (sseSource) {
        sseSource.close();
      }

      sseSource = new EventSource(`${API_BASE}/api/v1/downloads/live-stream`);

      sseSource.onopen = () => {
        setSyncStatus('connected');
        clearTimeout(sseReconnectTimer);
      };

      sseSource.onmessage = (event) => {
        try {
          if (!event.data || event.data.trim() === 'ping') return;
          const freshStats = JSON.parse(event.data);
          if (freshStats && typeof freshStats.total_unique_downloads === 'number') {
            const isIncreased = freshStats.total_unique_downloads > downloadStats.total_unique_downloads ||
                                freshStats.total_downloads > downloadStats.total_downloads;
            
            let platformToAnimate = null;
            if (freshStats.windows_unique_downloads > downloadStats.windows_unique_downloads) {
              platformToAnimate = 'windows';
            } else if (freshStats.android_unique_downloads > downloadStats.android_unique_downloads) {
              platformToAnimate = 'android';
            } else if (isIncreased) {
              platformToAnimate = 'all';
            }

            downloadStats = { ...downloadStats, ...freshStats };
            updateDownloadCountersUI(downloadStats, platformToAnimate);
            setSyncStatus('connected');
          }
        } catch (err) {
          // Ignore malformed heartbeats
        }
      };

      sseSource.onerror = () => {
        setSyncStatus('reconnecting');
        if (sseSource) sseSource.close();
        clearTimeout(sseReconnectTimer);
        sseReconnectTimer = setTimeout(initRealtimeSSEStream, 6000);
      };
    } catch (err) {
      setSyncStatus('reconnecting');
    }
  }

  // Initial Fetch & SSE Activation
  fetchDownloadStats().then(() => {
    initRealtimeSSEStream();
  });

  // Periodic Resilience Polling (every 20s as fallback)
  setInterval(() => {
    fetchDownloadStats();
  }, 20000);

  // -------------------------------------------------------------------------
  // 7E. Toast Notification Feedback
  // -------------------------------------------------------------------------
  const downloadToast = document.getElementById('downloadToast');
  const toastTitle = document.getElementById('toastTitle');
  const toastMessage = document.getElementById('toastMessage');
  const toastCountBump = document.getElementById('toastCountBump');
  let toastTimer = null;

  function triggerToast(title, message, bump = '+1') {
    if (!downloadToast) return;
    clearTimeout(toastTimer);

    if (toastTitle) toastTitle.textContent = title;
    if (toastMessage) toastMessage.textContent = message;
    if (toastCountBump) toastCountBump.textContent = bump || '✓';

    downloadToast.classList.add('show');
    toastTimer = setTimeout(() => {
      downloadToast.classList.remove('show');
    }, 5500);
  }

  // -------------------------------------------------------------------------
  // 7F. Accurate Download Tracking & Controlled Endpoint Navigation
  // -------------------------------------------------------------------------
  function handleDownloadClick(platform) {
    const { token, user } = getStoredAuth();
    const isWindows = platform === 'windows';
    const platformLabel = isWindows ? 'Windows Setup (.exe)' : 'Android APK';

    // Construct controlled delivery URL
    const targetUrl = `${API_BASE}/api/v1/downloads/file/${platform}${token ? `?token=${encodeURIComponent(token)}` : ''}`;

    if (user && token) {
      triggerToast(
        `${platformLabel} Download Initiated`,
        `Account #${user.id} (${user.email}) verified. Recorded with atomic database duplicate prevention!`,
        '+1'
      );
    } else {
      triggerToast(
        `${platformLabel} Download Initiated`,
        'Delivering official package. (Tip: Sign in with your Unifly account to record as a verified unique user!)',
        '↓'
      );
    }

    // Trigger download delivery through the verified controlled endpoint
    const dlFrame = document.createElement('iframe');
    dlFrame.style.display = 'none';
    dlFrame.src = targetUrl;
    document.body.appendChild(dlFrame);
    setTimeout(() => {
      document.body.removeChild(dlFrame);
    }, 15000);
  }

  // Intercept all download links & buttons across the site
  const downloadTriggers = document.querySelectorAll(
    '#androidDownloadBtn, #windowsDownloadBtn, #heroAndroidBtn, #heroWindowsBtn, .footer-dl-link'
  );

  downloadTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const platformAttr = btn.getAttribute('data-platform');
      const href = btn.getAttribute('href') || '';
      const id = btn.id || '';

      let platform = 'android';
      if (platformAttr === 'windows' || href.includes('windows') || href.includes('.exe') || id.toLowerCase().includes('windows')) {
        platform = 'windows';
      } else if (platformAttr === 'android' || href.includes('android') || href.includes('.apk') || id.toLowerCase().includes('android')) {
        platform = 'android';
      }

      handleDownloadClick(platform);
    });
  });
});

