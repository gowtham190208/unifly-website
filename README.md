# Unifly AI Company — Official Launch Website
**Product:** Unifly Shop Management  
**Company:** Unifly AI Company  
**Live Local Preview:** `http://localhost:8088/`

---

## 1. Overview

This is the production-ready official launch website for **Unifly Shop Management**, created for **Unifly AI Company**. It showcases the complete cross-platform retail management software engineered for small and medium retail shops (supermarkets, groceries, fruit & vegetable stalls, apparel boutiques, and general stores).

The website includes:
- **Hero / Header**: Clean white background, Unifly official orange accents (`#FF7900`), dark charcoal text, real app interface showcase with floating feature callouts.
- **About Us**: Honest company and product mission, highlighting core pillars: *Simplicity*, *Productivity*, and *Accessibility*.
- **Features**: Real capabilities reflecting the actual Flutter + FastAPI platform (Smart POS Billing, Real-Time Inventory, 58mm/80mm Thermal & A4 Invoicing, Excel Bulk Ingestion, Monthly Sales & Gross Profit Analytics, Google Gemini AI Assistant, Digital Invoicing, and Shop-counter Online Pickup).
- **Download for Android**: Direct link to the verified release APK (~75 MB), official Google Play Store timeline note, and step-by-step APK installation instructions with security guidance.
- **Download for Windows**: Direct link to the verified Windows desktop package (~15 MB), setup guide for Windows 10/11 x64, and security verification guidance.
- **How to Download & Install**: Interactive tab switcher for Android and Windows with clear, non-technical 3-step installation cards.
- **Contact Us**: Official contact details (`gowthamilaiyaraja@gmail.com`, `+91 96261 84423`) with an accessible, validated message form.
- **Footer**: Dynamic copyright year, quick links, download packages, and security notes.

---

## 2. Directory Structure

```
d:/unifly website/
├── index.html                   # Semantic, accessible, SEO-optimized landing page
├── styles.css                   # Modern CSS design system with tokens, responsive layouts & animations
├── script.js                    # Mobile drawer, device tab switcher, form validation & dynamic year
├── README.md                    # Project documentation & deployment guide
└── assets/
    ├── images/
    │   ├── unifly_full_logo.png # Official Unifly AI Company logo
    │   ├── unifly_icon.png      # Official application icon
    │   ├── unifly_logo.png      # Brand logo
    │   ├── favicon.png          # High-resolution website favicon
    │   ├── unifly_pos_hero_mockup.jpg # POS Billing Counter & Catalog UI
    │   ├── unifly_android_mockup.jpg  # Android mobile application screen
    │   └── unifly_windows_mockup.jpg  # Windows desktop application screen
    └── downloads/
        ├── Unifly-Shop-Management-Android.apk # Verified release APK (~76.4 MB, v1.2.0, SHA256: EE5CD025...)
        └── Unifly-Setup.exe                   # Verified release Windows Installer (~13.0 MB, v1.2.0, SHA256: 45ADF25D...)
```

---

## 3. How to Run Locally

### Option A: Using Python (Recommended)
```bash
cd "d:\unifly website"
python -m http.server 8088
```
Then open [http://localhost:8088](http://localhost:8088) in any modern browser (Chrome, Edge, Firefox, Safari).

### Option B: Using Node.js / npx
```bash
cd "d:\unifly website"
npx serve .
```

### Option C: VS Code Live Server
Right-click `index.html` and click **"Open with Live Server"**.

---

## 4. Production Deployment Options

Because this website is built with vanilla HTML5, CSS3, and modern JavaScript without framework overhead, it can be deployed instantly to any static hosting provider or CDN:

### A. Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` inside `d:\unifly website`
3. Follow prompts for an instant production HTTPS deployment.

### B. Netlify
1. Drag and drop the `d:\unifly website` folder into [Netlify Drop](https://app.netlify.com/drop).
2. Or use Netlify CLI: `npx netlify deploy --prod --dir .`

### C. GitHub Pages
1. Push the folder contents to a GitHub repository (e.g., `unifly-website`).
2. Go to **Settings > Pages > Source**, select `main` branch root `/`, and save.

### D. Production Hosting for Large Release Installers (APK & ZIP)
While the files are bundled in `assets/downloads/` for immediate local and small server testing:
- For high-traffic production launches, host `Unifly-Shop-Management-Android.apk` (~75 MB) and `Unifly-Setup.exe` (~15 MB) on a cloud object store with CDN (e.g., **AWS S3 + CloudFront**, **Cloudflare R2**, **Google Cloud Storage**, or **GitHub Releases**).
- Update the `href` attributes in `index.html` to point to the secure CDN download URLs.

---

## 5. Pre-Launch Configuration Checklist

Before pointing your custom domain (e.g. `unifly.ai` or `uniflyapp.com`):
1. **Google Play Store Listing**:
   - Once the app is published to the Google Play Store, replace the Play Store notice in `#download-android` with the official Google Play badge link.
2. **Contact Form Backend Integration**:
   - The current form provides client-side validation and generates a pre-filled direct email draft to `gowthamilaiyaraja@gmail.com`.
   - If you prefer an automated backend email service, you can hook the form directly to **Formspree** (`https://formspree.io/f/{your-id}`), **EmailJS**, or your existing FastAPI backend endpoint.
3. **Custom Domain & SSL**:
   - Configure DNS A / CNAME records on your registrar pointing to your hosting provider.
   - Ensure HTTPS is enforced with an active SSL certificate.
