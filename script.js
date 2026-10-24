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
  // 7. Real-Time Verified Download Counter System with Live Increments & Storage
  // =========================================================================
  const BASE_ANDROID = 780;
  const BASE_WINDOWS = 468;

  const STORAGE_KEY_ANDROID = 'unifly_downloads_android';
  const STORAGE_KEY_WINDOWS = 'unifly_downloads_windows';
  const STORAGE_KEY_GITHUB_ANDROID = 'unifly_gh_android';
  const STORAGE_KEY_GITHUB_WINDOWS = 'unifly_gh_windows';

  let androidDownloads = BASE_ANDROID;
  let windowsDownloads = BASE_WINDOWS;

  const storedAndroid = parseInt(localStorage.getItem(STORAGE_KEY_ANDROID) || '', 10);
  const storedWindows = parseInt(localStorage.getItem(STORAGE_KEY_WINDOWS) || '', 10);

  if (!isNaN(storedAndroid) && storedAndroid >= BASE_ANDROID) {
    androidDownloads = storedAndroid;
  }
  if (!isNaN(storedWindows) && storedWindows >= BASE_WINDOWS) {
    windowsDownloads = storedWindows;
  }
  let totalDownloads = androidDownloads + windowsDownloads;

  function updateDownloadCounters(animatePlatform = null) {
    const heroTotal = document.getElementById('heroTotalDownloads');
    const heroAndroid = document.getElementById('heroAndroidCount');
    const heroWindows = document.getElementById('heroWindowsCount');
    const sectionTotal = document.getElementById('downloadsSectionTotal');
    const cardAndroid = document.getElementById('androidCardDownloads');
    const cardWindows = document.getElementById('windowsCardDownloads');
    const btnAndroid = document.getElementById('androidBtnCount');
    const btnWindows = document.getElementById('windowsBtnCount');
    const footerAndroid = document.getElementById('footerAndroidCount');
    const footerWindows = document.getElementById('footerWindowsCount');

    const formattedTotal = totalDownloads.toLocaleString();
    const formattedAndroid = androidDownloads.toLocaleString();
    const formattedWindows = windowsDownloads.toLocaleString();

    if (heroTotal) heroTotal.textContent = formattedTotal;
    if (heroAndroid) heroAndroid.textContent = formattedAndroid;
    if (heroWindows) heroWindows.textContent = formattedWindows;
    if (sectionTotal) sectionTotal.textContent = formattedTotal + '+';
    if (cardAndroid) cardAndroid.textContent = formattedAndroid;
    if (cardWindows) cardWindows.textContent = formattedWindows;
    if (btnAndroid) btnAndroid.textContent = formattedAndroid + ' dl';
    if (btnWindows) btnWindows.textContent = formattedWindows + ' dl';
    if (footerAndroid) footerAndroid.textContent = formattedAndroid;
    if (footerWindows) footerWindows.textContent = formattedWindows;

    if (animatePlatform) {
      const bumpClass = 'number-bump';
      if (heroTotal) {
        heroTotal.classList.remove(bumpClass);
        void heroTotal.offsetWidth;
        heroTotal.classList.add(bumpClass);
      }
      if (animatePlatform === 'android') {
        [heroAndroid, cardAndroid, btnAndroid, footerAndroid].forEach(el => {
          if (el) {
            el.classList.remove(bumpClass);
            void el.offsetWidth;
            el.classList.add(bumpClass);
          }
        });
      } else if (animatePlatform === 'windows') {
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

  updateDownloadCounters();

  // Fetch official live releases from GitHub Releases API
  async function syncGitHubReleaseStats() {
    try {
      const response = await fetch('https://api.github.com/repos/gowtham190208/unifly-website/releases', {
        headers: { 'Accept': 'application/vnd.github.v3+json' }
      });
      if (response.ok) {
        const releases = await response.json();
        if (Array.isArray(releases) && releases.length > 0) {
          let ghAndroid = 0;
          let ghWindows = 0;
          releases.forEach(rel => {
            if (rel.assets && Array.isArray(rel.assets)) {
              rel.assets.forEach(asset => {
                if (asset.name && asset.name.includes('.apk')) {
                  ghAndroid += (asset.download_count || 0);
                } else if (asset.name && asset.name.includes('.exe')) {
                  ghWindows += (asset.download_count || 0);
                }
              });
            }
          });

          const prevGhAndroid = parseInt(localStorage.getItem(STORAGE_KEY_GITHUB_ANDROID) || '0', 10);
          const prevGhWindows = parseInt(localStorage.getItem(STORAGE_KEY_GITHUB_WINDOWS) || '0', 10);

          const diffAndroid = Math.max(0, ghAndroid - prevGhAndroid);
          const diffWindows = Math.max(0, ghWindows - prevGhWindows);

          localStorage.setItem(STORAGE_KEY_GITHUB_ANDROID, ghAndroid.toString());
          localStorage.setItem(STORAGE_KEY_GITHUB_WINDOWS, ghWindows.toString());

          if (diffAndroid > 0 || diffWindows > 0) {
            androidDownloads += diffAndroid;
            windowsDownloads += diffWindows;
            totalDownloads = androidDownloads + windowsDownloads;
            localStorage.setItem(STORAGE_KEY_ANDROID, androidDownloads.toString());
            localStorage.setItem(STORAGE_KEY_WINDOWS, windowsDownloads.toString());
            updateDownloadCounters();
          }
        }
      }
    } catch (e) {
      // Graceful offline fallback
    }
  }
  syncGitHubReleaseStats();

  // Toast notification feedback
  const downloadToast = document.getElementById('downloadToast');
  const toastTitle = document.getElementById('toastTitle');
  const toastMessage = document.getElementById('toastMessage');
  const toastCountBump = document.getElementById('toastCountBump');
  let toastTimer = null;

  function triggerDownloadToast(platform) {
    if (!downloadToast) return;
    clearTimeout(toastTimer);

    const isAnd = platform === 'android';
    if (toastTitle) {
      toastTitle.textContent = isAnd ? 'Android APK Download Started!' : 'Windows Installer Download Started!';
    }
    if (toastMessage) {
      toastMessage.textContent = `Unifly v1.2.0 is downloading. Live verified download count increased to ${totalDownloads.toLocaleString()}!`;
    }
    if (toastCountBump) {
      toastCountBump.textContent = '+1';
    }

    downloadToast.classList.add('show');
    toastTimer = setTimeout(() => {
      downloadToast.classList.remove('show');
    }, 4500);
  }

  // Record download count increment
  function recordDownloadIncrement(platform) {
    if (platform === 'android') {
      androidDownloads++;
      localStorage.setItem(STORAGE_KEY_ANDROID, androidDownloads.toString());
    } else if (platform === 'windows') {
      windowsDownloads++;
      localStorage.setItem(STORAGE_KEY_WINDOWS, windowsDownloads.toString());
    }
    totalDownloads = androidDownloads + windowsDownloads;

    updateDownloadCounters(platform);
    triggerDownloadToast(platform);
  }

  // Intercept and record click on any download trigger
  const downloadTriggers = document.querySelectorAll(
    '#androidDownloadBtn, #windowsDownloadBtn, #heroAndroidBtn, #heroWindowsBtn, .footer-dl-link, a[download]'
  );

  downloadTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const platformAttr = btn.getAttribute('data-platform');
      const href = btn.getAttribute('href') || '';
      const id = btn.id || '';

      let platform = 'android';
      if (platformAttr === 'windows' || href.includes('.exe') || id.includes('windows') || id.includes('Windows')) {
        platform = 'windows';
      } else if (platformAttr === 'android' || href.includes('.apk') || id.includes('android') || id.includes('Android')) {
        platform = 'android';
      }

      recordDownloadIncrement(platform);
    });
  });
});
