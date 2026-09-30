# 🚢 EMEA Logistics Digital Integration Hub (PoC)

> **Proof of Concept: API Governance, Telematics Visibility & Exception Management for Inland Logistics**  
> **Author:** Danilo Lima · *Digital Liaison Candidate*  
> **Domain:** Global RoRo Logistics & European Supply Chain Integration

---

## 📌 Executive Summary

Coordinating inland automotive cargo from OEM manufacturing facilities (Munich, Gothenburg, Lyon, Stuttgart, Zaragoza, etc.) to critical ocean terminals (Port of Bremerhaven, Port of Zeebrugge, Rotterdam, Antwerp) is time-critical. A vessel loading window (cut-off) cannot afford telemetry blackouts.

In fragmented carrier ecosystems, up to **35% of telematics updates fail** due to legacy silos, expired credentials, or manual spreadsheet handoffs. This repository presents a **Digital Integration Hub** powered by **Azure API Management (APIM)** designed to:
1. Standardize carrier communication into unified REST/JSON schemas.
2. Automate transient failure retries and rate-limiting.
3. Provide operational teams with **Management-by-Exception** dashboards instead of raw noise.

---

## 🚀 Key Features

- **📊 Executive Pitch Deck (5 Interactive Slides):**
  - Strategic business context, operational challenges, proposed APIM solution, technical-to-business alignment, and measurable business ROI.
  - Interactive drill-downs, speaker notes, and print/export view.
- **⚡ Live Operational Exception Dashboard:**
  - Real-time KPI monitors: Total Fleet (20 units), APIM Success Rate SLA, and Critical Delay counter (>60m).
  - 1-click automated Azure APIM remediation simulation for API Errors and Manual Silos.
- **🐍 Python Streamlit Interactive Replica (`app.py`):**
  - Complete Python/Streamlit data science application with dynamic filtering, port delay bar charts, and exception tables.
- **🏛️ Enterprise Solutions Architecture:**
  - Complete architectural mapping (Inland Carriers &rarr; Azure APIM &rarr; Event Hub &rarr; Operations Hub & Vessel Stowage).
  - Production-grade Azure API Management XML Policy snippet (`policies.xml`).

---

## 🛠️ Tech Stack

### Web Application & Pitch Deck
- **Framework:** React 19 + TypeScript
- **Styling:** Tailwind CSS + Lucide Icons
- **Bundler:** Vite

### Data Science & Python Telematics
- **Streamlit** (v1.30+)
- **Pandas & NumPy**

---

## 💻 Getting Started

### 1. Web Application (React + Vite)
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### 2. Streamlit Application (Python)
```bash
# Install python dependencies
pip install -r requirements.txt

# Launch the Streamlit dashboard
streamlit run app.py
```

---

## 📁 Repository Structure

```text
├── app.py                      # Streamlit telemetry dashboard
├── requirements.txt            # Python dependencies
├── src/
│   ├── components/             # React UI components
│   │   ├── presentation/       # 5-Slide Pitch Deck and RoRo visualizer
│   │   ├── Header.tsx          # Corporate utility header
│   │   ├── KpiCards.tsx        # Executive SLA and telemetry cards
│   │   ├── ActionableTable.tsx # 1-click APIM exception remediation
│   │   ├── StreamlitView.tsx   # Interactive Streamlit UI replica
│   │   └── ArchitectureView.tsx# Solutions Architecture & APIM policy
│   ├── data/                   # Mock fleet dataset & configurations
│   ├── types.ts                # TypeScript domain models
│   └── App.tsx                 # Root application container
├── package.json
└── README.md
```

---

## 👤 Author

- **Danilo Lima** — *Digital Liaison Candidate*
- **Role:** Digital Liaison / Solutions Architecture
