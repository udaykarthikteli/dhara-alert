# 🏔️ Dhara Alert - AI-Powered Early Warning & Landslide Risk Monitoring System

> **Problem Statement ID**: 26001  
> **Title**: AI-Based early warning and landslide Risk Monitoring System in NER (North Eastern Region)  
> **Target Region**: North Eastern Region of India (Assam, Meghalaya, Sikkim, Nagaland, Manipur, Mizoram, Tripura, Arunachal Pradesh)

---

## 🌟 Key SIH Highlights & Features

1. **⚡ Zero-Auth Frictionless Access**:
   - Citizens and field personnel do **NOT** require any login or complex password walls.
   - Immediate access to emergency warnings, risk heatmaps, and field report submissions.

2. **🤖 Real-time AI/ML Risk Predictive Engine**:
   - Solves **Mohr-Coulomb Shear Stress vs Pore Water Pressure** equations to compute **Factor of Safety (FoS)** and **Landslide Hazard Index (LHI 0-100%)**.
   - Integrates 24h rainfall volume (mm), soil saturation (%), slope inclination (°), micro-seismic tremors, and satellite InSAR ground displacement.

3. **🗺️ Dynamic GIS Risk & Sensor Map**:
   - Interactive Leaflet dark-mode map covering 8 North Eastern States.
   - Real-time IoT sensor nodes, high-risk hazard zones, emergency shelter camps, and live citizen incident pins.

4. **🏔️ Dynamic Physics Particle Background & 2D Slope Simulator**:
   - Canvas-based particle simulation of falling rockfall debris, rain mist, and lightning effects responsive to live disaster risk levels.
   - 2D Cross-Section SVG hill slope failure visualizer showing real-time shear stress vectors.

5. **🌐 Multilingual NER Support (8 Languages)**:
   - Full translation support for **Assamese (অসমীয়া), Khasi, Manipuri (মৈতৈলোন্), Mizo, Nagamese, Bengali (বাংলা), Hindi, and English**.

6. **📱 Mobile-First UX & Offline Support**:
   - PWA Service Worker caching (`sw.js`).
   - Offline local storage report queue (`localStorage` sync when reconnected to network).
   - Mobile sticky bottom navigation bar & swipeable emergency modals.

7. **🚨 Automated Emergency Broadcast & Highway Status**:
   - Live emergency warning ticker.
   - One-click **Emergency SOS Broadcast** simulating push/SMS alert to nearby villagers (5km - 25km radius).
   - National Highway connectivity monitor for critical corridors (NH-27 Shillong-Guwahati, NH-10 Sikkim, NH-29 Dimapur-Kohima, NH-37 Imphal-Jiribam, Tawang Highway).

---

## 🚀 How to Run Locally in VS Code

1. **Extract Zip**:
   Extract `landslide-guard-ner.zip` to any folder on your computer.

2. **Open in VS Code & Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🌐 Deploying to Vercel

This project is fully pre-configured for Vercel deployment via `vercel.json` and Vite build settings.

### Option A: Via Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option B: Via GitHub & Vercel Dashboard
1. Initialize Git and commit files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - LandSlideGuard NER SIH 26001"
   ```
2. Push to your GitHub repository.
3. Import the repository in [Vercel Dashboard](https://vercel.com/new).
4. Vercel will automatically detect Vite settings (`npm run build`, `dist` folder) and deploy your live URL in seconds!

---

## 📁 Repository Directory Structure

```
landslide-guard-ner/
├── public/
│   ├── favicon.svg
│   └── sw.js (PWA Offline Service Worker)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx (Top Header & Multilingual Switcher)
│   │   ├── MobileNav.jsx (Mobile Sticky Tab Bar)
│   │   ├── LandslideCanvasBg.jsx (Physics Particle Rockfall/Rain Canvas)
│   │   ├── SlopePhysicsSimulator.jsx (2D Slope Shear Failure Engine)
│   │   ├── GisRiskMap.jsx (Interactive Leaflet GIS Map for 8 NER States)
│   │   ├── AiPredictorModal.jsx (Interactive AI Hazard Sandbox)
│   │   ├── FieldReportForm.jsx (Geo-tagged Photo Upload & Offline Queue)
│   │   ├── LiveAlertsBanner.jsx (Emergency Broadcast & SOS Ticker)
│   │   ├── RoadStatusBoard.jsx (Highway Connectivity Monitor)
│   │   └── EmergencyContactsModal.jsx (SDMA & NDRF Helplines)
│   ├── context/
│   │   └── LanguageContext.jsx (i18n Multilingual State)
│   ├── data/
│   │   ├── nerDistricts.js (GIS Coordinates, Sensors & Highways)
│   │   └── translations.js (NER Language Dictionary)
│   ├── utils/
│   │   ├── aiRiskEngine.js (Mohr-Coulomb FoS & LHI Math)
│   │   └── offlineStorage.js (Offline PWA Queue)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
├── vercel.json
└── README.md
```

---

## 🎖️ Smart India Hackathon (SIH) Pitch Points
- **Unmatched UI/UX**: Dark-mode glassmorphism theme, particle physics canvas animations, interactive 2D slope engineering cross-sections.
- **Region Specificity**: Tailored specifically for the 8 North Eastern States with native language accessibility and hyper-local highway monitoring.
- **Frictionless Inclusion**: Zero barrier to entry for remote villagers and field officials. Works seamlessly under low network and offline conditions.
