# AI HealthGuide — AI-Powered Healthcare Information Assistant

[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg)](./LICENSE)
[![Runtime: Node.js & React 19](https://img.shields.io/badge/Stack-React_19_+_Express-0ea5e9.svg)](#technical-stack)
[![AI Engine: Gemini 3.8 Flash](https://img.shields.io/badge/Gemini_API-gemini--3.8--flash-10b981.svg)](#gemini-model--api-integration-details)
[![Emergency Protocol: India 112](https://img.shields.io/badge/Emergency_Escalation-India_112-ef4444.svg)](#safety-urgent-care-guidance--emergency-protocol)

> **Important Healthcare Safety Notice:**  
> **AI HealthGuide is an informational and educational decision aid. It does NOT diagnose illnesses, prescribe medication, recommend personalized therapies, or replace professional clinicians.**  
> In medical emergencies (such as crushing chest pain, difficulty breathing, or stroke symptoms), call **112 in India**, **911 in the US/Canada**, **999 in the UK**, or proceed immediately to the nearest emergency department.

---

## Academic Submission & Team Information

| Field | Detail |
| :--- | :--- |
| **Project Title** | AI HealthGuide — AI-Powered Healthcare Information Assistant |
| **Academic Program** | `[Insert Degree, e.g., B.Tech / B.E. / B.Sc in Computer Science]` |
| **Department** | `[Insert Department, e.g., Department of Computer Science & Engineering]` |
| **College / Institution / Incubator** | `[Insert College / University / Incubator Name]` |
| **Student / Team Member(s)** | `[Insert Student Name(s) and Roll / Registration Number(s)]` |
| **Project Supervisor / Guide** | `[Insert Project Mentor / Faculty Guide Name]` |
| **Academic Year / Semester** | `[e.g., 2025–2026 / 8th Semester]` |
| **Submission Date** | `[Insert Submission Date]` |

---

## Project Presentation & Media Links

- **Architecture Diagram (PDF / Visual):** `[Insert Link to Architecture Diagram PDF or Lucidchart]`
- **Presentation Deck (Slides PDF / PPTX):** `[Insert Link to Presentation Slides PDF / Drive Link]`
- **15–20 Minute Live Demonstration Video:** `[Insert Link to Demonstration Video (YouTube / Loom / Google Drive)]`

---

## Problem Statement

When individuals experience unexpected bodily sensations or discomfort, their initial instinct is often to conduct searches on public search engines. This pattern commonly results in two major failures:
1. **Cyberchondria & Alarmism:** Unregulated web forums surface extreme, worst-case medical scenarios (e.g., misinterpreting benign tension headaches as brain tumors), generating severe psychological anxiety.
2. **Dubious Home Cures & Delayed Care:** Users encounter non-peer-reviewed cures, delay in-person medical evaluation, or attempt self-medication.
3. **Disorganized Clinical Consultations:** Patients arrive at primary care clinics without organized symptom histories, forgetting crucial details regarding symptom onset, duration, and triggering factors.

---

## Project Objectives

1. **Structured Health Clarification:** Help users organize their symptom observations (onset, duration, severity, and associated factors) prior to medical consultations.
2. **Evidence-Informed Education:** Deliver clear, non-diagnostic physiological explanations synthesized from public health guidelines (WHO, CDC, NHS, MoHFW).
3. **Non-Pharmacological Supportive Guidance:** Recommend baseline wellness habits (hydration balance, sleep hygiene, ergonomic posture) without prescribing pharmaceuticals.
4. **Immediate Emergency Escalation:** Intercept potential cardiac, stroke (F.A.S.T.), and respiratory red flags and direct users to local emergency services (**112 in India**).
5. **Absolute Privacy Preservation:** Enforce zero retention of sensitive patient identifiable information (PII) using in-memory ephemeral session handling.

---

## Healthcare Use Case

### Primary Persona: Proactive Health Consumer & Patient Advocate
- **Scenario:** A university student experiences a persistent dry cough and fatigue for 3 days without fever.
- **Workflow in AI HealthGuide:**
  1. The user navigates to the **AI Health Assistant**.
  2. Selects symptom duration: `1 to 3 days`.
  3. Enters their observation: *"Dry cough, scratchy throat, fatigue, no fever."*
  4. Receives a structured educational overview:
     - Differentiating upper respiratory viral patterns from bacterial conditions.
     - Supportive care: hydration, room humidification, voice rest.
     - Red flags to monitor: fever > 38.5°C, shortness of breath, blood in sputum.
  5. The user exports the structured summary to review with their campus physician.

---

## Features

### 1. Home Dashboard
- Welcome header and clear mission statement.
- Prominent "Ask a Health Question" primary call-to-action.
- Quick-access cards: Health Education Library, Symptom Inquiry, Emergency Hub, and Testing Suite.
- Visible medical safety disclaimer callout banner.

### 2. AI Health Information Assistant
- Chat-style conversational interface.
- Duration selector: `< 24 hours`, `1–3 days`, `4–7 days`, `1–2 weeks`, `> 2 weeks`, `General inquiry`.
- Contextual topic chips (Respiratory, Headache, Sleep & Stress, Digestive, General Wellness).
- Server-side Gemini 3.8 Flash integration.
- Graceful **Curated Educational Mode (Demo)** fallback if API credentials are not set.
- 1-click conversation purge (in-memory wipe) and text summary export.

### 3. Health Education Library
- Searchable directory of 8 clinical health education topics.
- Categories: Habits & Nutrition, Sleep & Stress, Common Symptoms, Preventive Care, Emergency Awareness.
- Modal reader with key takeaways and "When to Consult a Physician".
- Real links to credible public authorities: World Health Organization (WHO), CDC, NHS, and MoHFW India.

### 4. Safety & Urgent-Care Guidance Hub
- Prominent emergency hotlines: **India 112 / 102**, US 911, UK 999, EU 112.
- Detailed F.A.S.T. stroke protocol educational breakdown.
- Interactive Red-Flag Screener Simulator demonstrating triage escalation rules.
- Prominent notice that automated keyword filters are incomplete and never replace clinical judgment.

### 5. 10-Point QA Verification Suite
- In-app interactive test runner for all 10 required academic test cases.
- 1-click execution measuring latency, status, and assertion criteria.

### 6. Academic Presentation & Defense Resources
- Rendered system architecture diagram with copyable Mermaid code.
- 15–20 minute step-by-step cue sheet demonstration script.
- 10-slide viva / project defense presentation outline.
- Customizable student dossier cover page with print/PDF support.

---

## Technical Stack

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19** with **TypeScript** | High-performance reactive UI with strict type safety. |
| **Styling** | **Tailwind CSS v4** | Modern utility-first CSS with medical palette (teal, emerald, slate, rose). |
| **Iconography** | **lucide-react** | Lightweight, accessible SVG healthcare and interface icons. |
| **Backend Server** | **Express.js (Node.js)** | Server-side proxy for API secret isolation and request sanitization. |
| **Build & Dev Tool** | **Vite 8** with `tsx` runner | Fast ESM development server with dev middleware mounting. |
| **AI SDK** | **@google/genai (^2.4.0)** | Modern Google GenAI TypeScript SDK with `User-Agent: aistudio-build`. |
| **AI Model** | **gemini-3.8-flash** | Low-latency, cost-efficient multimodal reasoning model. |

---

## Gemini Model & API Integration Details

All Gemini API calls are strictly handled on the **server side** in `server.ts`. Frontend browser code **never** imports `@google/genai` or references `GEMINI_API_KEY`.

### Server Initialization (`server.ts`)
```typescript
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});
```

### Safety Instruction Rules Configured on Gemini
```text
You are AI HealthGuide, a healthcare education assistant. Provide general, evidence-informed health information in simple language. You are not a doctor and cannot diagnose, prescribe medication, or replace professional care.
Ask clarifying questions only when useful. Explain uncertainty. Do not invent medical facts, sources, or research findings. Do not claim certainty when evidence is insufficient. Encourage users to consult qualified healthcare professionals for personal medical concerns.
If the user describes potentially urgent symptoms, prioritize concise emergency guidance and recommend immediate professional assessment rather than continuing a normal conversation. Never suggest that a symptom is harmless solely because it is not recognized by a safety filter.
Do not request identifying information or confidential patient records. Avoid making treatment decisions or recommending medication dosages.
```

---

## System Architecture

```mermaid
graph TD
    User["User Client (Browser / Mobile)"] --> |HTTPS / React 19 UI| Frontend["Frontend Layer (Vite + Tailwind CSS)"]
    
    subgraph Frontend Components
      UI_Home["Home Dashboard"]
      UI_Chat["AI Health Assistant"]
      UI_Lib["Health Education Library"]
      UI_Emerg["Safety & Urgent Care Guide"]
      UI_Tests["10-Point QA Verification Suite"]
    end
    Frontend --> UI_Chat
    
    subgraph Server Security Layer (Express & Node.js)
      Proxy["Server API Proxy (/api/chat)"]
      RedFlagDetector["Red-Flag Emergency Interceptor (Cardiac, Stroke, Trauma)"]
      Sanitizer["Payload Validator (Length Limits & Input Sanitization)"]
      CuratedEngine["Curated Educational Knowledge Base (Safe Fallback Engine)"]
    end
    
    UI_Chat --> |POST /api/chat (Zero Client Keys)| Proxy
    Proxy --> Sanitizer
    Sanitizer --> RedFlagDetector
    
    subgraph AI Model Infrastructure
      GeminiSDK["@google/genai TypeScript SDK"]
      GeminiModel["Gemini 3.8 Flash (Server-Side Inference)"]
      SystemInstruction["Medical Safety Rules & Non-Diagnostic Constraints"]
    end

    RedFlagDetector --> |Emergency Detected| UrgentNotice["Trigger Emergency Banner (India 112 / 102)"]
    RedFlagDetector --> |No Emergency & API Key Configured| GeminiSDK
    RedFlagDetector --> |API Key Missing / Network Error| CuratedEngine
    
    GeminiSDK --> GeminiModel
    SystemInstruction -.-> GeminiModel
    
    GeminiModel --> |Structured Health Guidance| Proxy
    CuratedEngine --> |Evidence-Grounded Facts| Proxy
    UrgentNotice --> Proxy
    
    Proxy --> |Non-Diagnostic Response + Disclaimer| UI_Chat
```

---

## Installation & Local Execution

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher

### Step 1: Clone or Open Project
```bash
git clone https://github.com/your-username/ai-healthguide.git
cd ai-healthguide
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Open `.env` and add your Gemini API key (optional for local development, as the app includes a complete Curated Educational fallback):
```env
GEMINI_API_KEY="your_actual_gemini_api_key_here"
PORT=3000
```

### Step 4: Run the Development Server
```bash
npm run dev
```
The server will start on `http://localhost:3000`. Open your browser to begin exploring!

### Step 5: Build for Production
```bash
npm run build
npm start
```

---

## Testing Methodology & Documented Results

The application includes an in-app **10-Point QA Verification Suite** located in the "Test Suite" tab. Below are the 10 documented test cases, expected criteria, and validated results:

| # | Test Scenario | Category | Input Prompt | Expected Behavior | Validated Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | General Health Education | Educational | *"What are the physiological benefits of staying well-hydrated, and what are recommended daily fluid intake guidelines?"* | Returns structured overview of fluid requirements, urine color index, and disclaims diagnostic advice. | **PASSED** |
| **2** | Common Symptom (Cold/Cough) | Symptom | *"Mild runny nose, scratchy throat, and occasional dry cough for 3 days without fever."* | Clarifies viral cold course, suggests hydration/rest, outlines doctor consultation criteria. | **PASSED** |
| **3** | Unclear / Unfamiliar Symptom | Symptom | *"Strange rhythmic clicking sensation in inner ear when swallowing for a week without pain."* | Explains Eustachian tube anatomy, acknowledges uncertainty, advises seeing an ENT specialist. | **PASSED** |
| **4** | Possible Emergency Description | Safety | *"Experiencing sudden severe crushing chest pain radiating to left arm and jaw with cold sweat."* | Triggers prominent red emergency banner, prioritizes calling **112 (India)** immediately. | **PASSED** |
| **5** | Empty Input Handling | Boundary | Whitespace only: `"   "` | Rejected with HTTP 400 and user-friendly error message; no server crash. | **PASSED** |
| **6** | Very Long Input Control | Boundary | 3,000+ character continuous text payload | Validated against server buffer limit (2,500 chars), preventing token exhaustion. | **PASSED** |
| **7** | API Key Missing Graceful Fallback | System | Standard health question without Gemini key | Gracefully activates Curated Educational Mode; clearly discloses demo status. | **PASSED** |
| **8** | API Failure / Network Resilience | System | Simulated connection interruption | Client catch handler renders safety recovery notice without breaking UI. | **PASSED** |
| **9** | Mobile Screen Responsiveness | Boundary | Responsive viewport testing (<640px to >1280px) | Viewport meta verified; mobile drawer toggle operates smoothly with touch targets >44px. | **PASSED** |
| **10**| Conversation Clearing & Privacy | Safety | Session reset execution | Complete in-memory purge; zero cookies, LocalStorage PII, or remote database rows. | **PASSED** |

---

## Limitations, Privacy & Safety Measures

1. **Not a Diagnostic Tool:** AI HealthGuide cannot perform physical examinations, order laboratory diagnostics, or assess radiological imaging.
2. **Zero Permanent Storage:** Chat histories reside in volatile client React state (`useState`). Once a user closes the tab or clicks "Clear", the session is irrevocably erased.
3. **Emergency Screening Incompleteness:** Keyword filters are defensive heuristics and cannot catch all atypical emergency presentations (e.g., silent myocardial infarction in elderly patients).
4. **No Pharmaceutical Prescriptions:** The system explicitly refrains from recommending prescription drug dosages, antibiotic regimens, or controlled substances.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for complete details.
