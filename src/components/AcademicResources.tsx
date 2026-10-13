import React, { useState } from 'react';
import { 
  GraduationCap, 
  Presentation, 
  FileCode, 
  Clock, 
  Users, 
  Copy, 
  Check, 
  Printer, 
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

export const AcademicResources: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'architecture' | 'script' | 'slides' | 'team'>('architecture');
  const [copiedCode, setCopiedCode] = useState(false);

  // Editable team & college fields stored in local component state for demo/print
  const [teamInfo, setTeamInfo] = useState({
    studentName: 'Aarya Sarvade',
    rollNumber: 'CS-2026-084',
    department: 'Department of Computer Science & Engineering',
    collegeName: 'College of Engineering & Technology',
    mentorName: 'Dr. S. K. Sharma (Project Supervisor)',
    submissionDate: 'October 2026',
    projectTitle: 'AI HealthGuide — AI-Powered Healthcare Information Assistant',
  });

  const mermaidArchitectureCode = `graph TD
    User["User Client (Web Browser / Mobile)"] --> |HTTPS / React 19 UI| Frontend["Frontend Layer (Vite + Tailwind CSS)"]
    
    subgraph Frontend Components
      UI_Home["Home Dashboard"]
      UI_Chat["AI Health Information Assistant"]
      UI_Lib["Health Education Library"]
      UI_Emerg["Safety & Urgent Care Guide"]
      UI_Tests["10-Point QA Verification Suite"]
    end
    Frontend --> UI_Chat
    
    subgraph Server Security Layer (Express & Node.js)
      Proxy["Server API Proxy (/api/chat)"]
      RedFlagDetector["Red-Flag Emergency Interceptor (Cardiac, Stroke, Trauma)"]
      Sanitizer["Payload Validator (Length Limits & Injection Filter)"]
      CuratedEngine["Curated Educational Knowledge Base (Safe Fallback Engine)"]
    end
    
    UI_Chat --> |POST /api/chat (No API Key Exposed)| Proxy
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
    
    Proxy --> |Non-Diagnostic Response + Disclaimer| UI_Chat`;

  const handleCopyMermaid = () => {
    navigator.clipboard.writeText(mermaidArchitectureCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-12 animate-fadeIn max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-800/60 border border-teal-500/40 text-teal-200 text-xs font-semibold">
              <GraduationCap className="w-3.5 h-3.5 text-teal-300" />
              <span>Academic Defense, Presentation & Evaluation Hub</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              College Project Documentation & Presentation Suite
            </h1>
            <p className="text-teal-100/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              Complete resources for academic evaluations, project vivas, hackathons, and technical defense, including system architecture, presentation script, and slides.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="self-start sm:self-center px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>

        {/* Sub-Tabs */}
        <div className="pt-4 border-t border-white/10 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setActiveSubTab('architecture')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'architecture'
                ? 'bg-emerald-400 text-teal-950 shadow-md'
                : 'bg-white/5 hover:bg-white/10 text-teal-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>System Architecture Diagram</span>
          </button>

          <button
            onClick={() => setActiveSubTab('script')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'script'
                ? 'bg-emerald-400 text-teal-950 shadow-md'
                : 'bg-white/5 hover:bg-white/10 text-teal-100'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>15–20 Min Demo Script</span>
          </button>

          <button
            onClick={() => setActiveSubTab('slides')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'slides'
                ? 'bg-emerald-400 text-teal-950 shadow-md'
                : 'bg-white/5 hover:bg-white/10 text-teal-100'
            }`}
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>10-Slide Deck Outline</span>
          </button>

          <button
            onClick={() => setActiveSubTab('team')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'team'
                ? 'bg-emerald-400 text-teal-950 shadow-md'
                : 'bg-white/5 hover:bg-white/10 text-teal-100'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Team & College Submission Details</span>
          </button>
        </div>
      </div>

      {/* Sub-Tab 1: Architecture Diagram */}
      {activeSubTab === 'architecture' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Technical Architecture</span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">End-to-End System Architecture</h2>
              </div>
              <button
                onClick={handleCopyMermaid}
                className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 font-semibold text-xs border border-teal-200 transition-colors flex items-center gap-1 self-start sm:self-auto cursor-pointer"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied Mermaid Code' : 'Copy Mermaid Code'}</span>
              </button>
            </div>

            {/* Architecture Visual Cards Flow */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 space-y-2">
                <span className="font-bold text-teal-900 block text-sm">1. Client Layer</span>
                <p className="text-teal-800">
                  React 19 + TypeScript + Tailwind CSS responsive interface with duration context, topic filters, and input constraints.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-2">
                <span className="font-bold text-blue-900 block text-sm">2. Express Security Proxy</span>
                <p className="text-blue-800">
                  Server-side proxy strictly protects GEMINI_API_KEY. Sanitizes input (&lt;2500 chars) and blocks sensitive PII leakages.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-2">
                <span className="font-bold text-rose-900 block text-sm">3. Emergency Interceptor</span>
                <p className="text-rose-800">
                  Pre-execution & post-execution red-flag filters for acute cardiac, stroke, and trauma events; routes to 112 India dispatch.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-2">
                <span className="font-bold text-purple-900 block text-sm">4. Gemini 3.8 Flash SDK</span>
                <p className="text-purple-800">
                  Inference via @google/genai with strict medical boundary system prompt, non-prescriptive formatting, and fallback engine.
                </p>
              </div>
            </div>

            {/* Raw Mermaid Code Block */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Mermaid Diagram Source Code (Paste into Mermaid Live Editor or LaTeX)</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-900 text-teal-200 text-xs font-mono overflow-x-auto leading-relaxed">
                {mermaidArchitectureCode}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 2: 15-20 Min Demo Script */}
      {activeSubTab === 'script' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Evaluator Cue Sheet</span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">15–20 Minute College Project Demonstration Script</h2>
            <p className="text-xs text-slate-500 mt-1">
              Follow this timed guide during project vivas, lab presentations, or hackathon judging.
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-700">
            {/* Phase 1 */}
            <div className="border-l-4 border-teal-500 pl-4 space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>Phase 1: Introduction, Problem Statement & Objectives</span>
                <span className="text-xs text-teal-700 bg-teal-50 px-2 py-0.5 rounded">00:00 – 03:00 (3 mins)</span>
              </div>
              <p className="text-slate-600">
                <strong>Speaker:</strong> "Respected evaluators, today people routinely search their medical symptoms online, often encountering alarmist web forums, unreliable advice, or dangerous self-medication trends. Our project, <em>AI HealthGuide</em>, addresses this by creating an evidence-informed healthcare education assistant that clarifies general symptoms, organizes health observations, and teaches users when to seek qualified medical care—without ever diagnosing, prescribing, or replacing clinicians."
              </p>
              <p className="text-[11px] text-slate-500">
                <em>Action:</em> Display Home Dashboard hero section and highlight the core safety principles.
              </p>
            </div>

            {/* Phase 2 */}
            <div className="border-l-4 border-teal-500 pl-4 space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>Phase 2: Architectural Safety Boundaries & Secret Management</span>
                <span className="text-xs text-teal-700 bg-teal-50 px-2 py-0.5 rounded">03:00 – 06:00 (3 mins)</span>
              </div>
              <p className="text-slate-600">
                <strong>Speaker:</strong> "A fundamental engineering requirement is data security. In our application, client browsers NEVER touch the Gemini API key. All requests route through an Express server proxy that validates payload length, sanitizes input, and enforces a strict system instruction prompt. If the API key is not configured, the system transparently falls back to our curated educational database rather than failing or hallucinating."
              </p>
              <p className="text-[11px] text-slate-500">
                <em>Action:</em> Point out the Gemini 3.8 Flash / Curated Demo status pill in the top header.
              </p>
            </div>

            {/* Phase 3 */}
            <div className="border-l-4 border-teal-500 pl-4 space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>Phase 3: Live Symptom & Health Education Interaction</span>
                <span className="text-xs text-teal-700 bg-teal-50 px-2 py-0.5 rounded">06:00 – 11:00 (5 mins)</span>
              </div>
              <p className="text-slate-600">
                <strong>Speaker:</strong> "Let's demonstrate how a user interacts with the system. We select a symptom duration of '1 to 3 days' and enter: <em>'I have had a mild dry cough and scratchy throat without fever.'</em> Notice how AI HealthGuide formats its response: an educational overview, non-diagnostic potential factors, non-pharmacological supportive habits (hydration, steam), and clear red-flag symptoms requiring a physician."
              </p>
              <p className="text-[11px] text-slate-500">
                <em>Action:</em> Submit query in the AI Health Assistant, demonstrate response formatting, copy button, and export text file.
              </p>
            </div>

            {/* Phase 4 */}
            <div className="border-l-4 border-rose-500 pl-4 space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>Phase 4: Emergency Red-Flag Interception & India 112 Hotline</span>
                <span className="text-xs text-rose-700 bg-rose-50 px-2 py-0.5 rounded">11:00 – 14:00 (3 mins)</span>
              </div>
              <p className="text-slate-600">
                <strong>Speaker:</strong> "Now, let's test safety guardrails by entering a potential cardiac emergency: <em>'Crushing chest pain radiating to left arm and cold sweating.'</em> Watch how our safety interceptor immediately halts casual dialogue, displays our prominent red emergency banner, and instructs the user to call 112 in India immediately without delaying care."
              </p>
              <p className="text-[11px] text-slate-500">
                <em>Action:</em> Submit cardiac prompt, demonstrate red alert banner, and navigate to the Urgent Care Guide hub to show F.A.S.T. stroke protocol.
              </p>
            </div>

            {/* Phase 5 */}
            <div className="border-l-4 border-teal-500 pl-4 space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>Phase 5: Automated QA Verification Suite & Evaluation Q&A</span>
                <span className="text-xs text-teal-700 bg-teal-50 px-2 py-0.5 rounded">14:00 – 18:00 (4 mins)</span>
              </div>
              <p className="text-slate-600">
                <strong>Speaker:</strong> "To ensure rigorous quality assurance, we built an integrated 10-point test suite right into the application. We can click 'Run All 10 Tests' to verify empty input handling, long input bounds, mobile layout, and ephemeral session clearing. As you can see, all 10 tests execute live with measured latency."
              </p>
              <p className="text-[11px] text-slate-500">
                <em>Action:</em> Switch to the Test Suite tab, click Run All 10 Tests, and answer evaluator questions.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 3: 10-Slide Deck Outline */}
      {activeSubTab === 'slides' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Slide Deck Blueprint</span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">10-Slide Presentation Deck for Project Defense / Viva</h2>
            <p className="text-xs text-slate-500 mt-1">
              Use these slide outlines when creating your PowerPoint, Google Slides, or PDF presentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 text-sm">Slide 1: Title & Project Identity</span>
              <ul className="space-y-1 text-slate-600 list-disc pl-4">
                <li>Project Name: AI HealthGuide — AI-Powered Healthcare Information Assistant</li>
                <li>Candidate & Guide Credentials, Department, Academic Year 2026</li>
                <li>Core Motto: "Empowering Informed Health Conversations"</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 text-sm">Slide 2: Problem Statement & Motivation</span>
              <ul className="space-y-1 text-slate-600 list-disc pl-4">
                <li>Patients struggle to interpret everyday symptoms before seeing clinicians</li>
                <li>Search engines often show catastrophic misdiagnoses or dubious cures</li>
                <li>Need for a disciplined, non-diagnostic educational decision aid</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 text-sm">Slide 3: Project Objectives & Scope</span>
              <ul className="space-y-1 text-slate-600 list-disc pl-4">
                <li>Structured symptom clarification with duration tracking</li>
                <li>Evidence-grounded education linked to WHO, CDC, and MoHFW</li>
                <li>Immediate escalation to emergency hotlines (112 in India)</li>
                <li>Strict non-diagnostic and non-prescriptive ethical boundaries</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 text-sm">Slide 4: Technology Stack & Tools</span>
              <ul className="space-y-1 text-slate-600 list-disc pl-4">
                <li>Frontend: React 19, TypeScript, Tailwind CSS, Lucide Icons</li>
                <li>Backend: Express.js, Node.js, Vite Dev Middleware</li>
                <li>AI Engine: Google GenAI SDK (@google/genai) with Gemini 3.8 Flash</li>
                <li>Safety: In-memory session processing (Zero PII retention)</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 text-sm">Slide 5: System Architecture & Data Flow</span>
              <ul className="space-y-1 text-slate-600 list-disc pl-4">
                <li>Decoupled client-server design ensuring API key privacy</li>
                <li>Multi-stage screening: Input Sanitizer &gt; Red-Flag Filter &gt; Gemini Inference</li>
                <li>Curated Educational Knowledge Base fallback engine</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 text-sm">Slide 6: Healthcare Safety Guardrails</span>
              <ul className="space-y-1 text-slate-600 list-disc pl-4">
                <li>Explicit system instruction prompt prohibiting prescription & diagnosis</li>
                <li>Keyword interception for cardiac, stroke (F.A.S.T.), and trauma symptoms</li>
                <li>Mandatory visible disclaimers on every assistant output</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 text-sm">Slide 7: Key Features Demonstration</span>
              <ul className="space-y-1 text-slate-600 list-disc pl-4">
                <li>AI Health Assistant with duration context & topic pills</li>
                <li>Searchable Health Education Library with verified references</li>
                <li>Urgent Care Guide with interactive triage simulator</li>
                <li>Session export and 1-click conversation purge</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 text-sm">Slide 8: Quality Assurance & Testing Suite</span>
              <ul className="space-y-1 text-slate-600 list-disc pl-4">
                <li>10 documented test cases executed in-app</li>
                <li>Tested boundary conditions: empty input (HTTP 400), long input (&gt;2500 chars)</li>
                <li>Demonstrated graceful demo mode and network resilience</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 text-sm">Slide 9: Limitations & Ethical Considerations</span>
              <ul className="space-y-1 text-slate-600 list-disc pl-4">
                <li>Not a medical device or regulated clinical software</li>
                <li>Keyword screening can miss subtle or atypical emergencies</li>
                <li>Requires human clinical judgment for all health determinations</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 text-sm">Slide 10: Conclusion & Future Scope</span>
              <ul className="space-y-1 text-slate-600 list-disc pl-4">
                <li>Demonstrated successful synthesis of AI with strict medical safety rules</li>
                <li>Future scope: Multi-language regional support (Hindi, Marathi, Tamil, etc.)</li>
                <li>Summary: An accessible, privacy-centric health education companion</li>
              </ul>
            </div>

          </div>
        </div>
      )}

      {/* Sub-Tab 4: Team & College Submission Details */}
      {activeSubTab === 'team' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Academic Submission Sheet</span>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">Project Evaluation & Team Information</h2>
              <p className="text-xs text-slate-500 mt-1">
                Editable form fields for your college submission, project dossier, and evaluator cover page:
              </p>
            </div>
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Dossier</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Project Title:</label>
              <input
                type="text"
                value={teamInfo.projectTitle}
                onChange={(e) => setTeamInfo({ ...teamInfo, projectTitle: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-200 text-slate-900 font-semibold focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Student / Developer Name:</label>
              <input
                type="text"
                value={teamInfo.studentName}
                onChange={(e) => setTeamInfo({ ...teamInfo, studentName: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-200 text-slate-900 font-semibold focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Roll / Registration Number:</label>
              <input
                type="text"
                value={teamInfo.rollNumber}
                onChange={(e) => setTeamInfo({ ...teamInfo, rollNumber: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-200 text-slate-900 font-semibold focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Department:</label>
              <input
                type="text"
                value={teamInfo.department}
                onChange={(e) => setTeamInfo({ ...teamInfo, department: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-200 text-slate-900 font-semibold focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">College / Institution / Incubator:</label>
              <input
                type="text"
                value={teamInfo.collegeName}
                onChange={(e) => setTeamInfo({ ...teamInfo, collegeName: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-200 text-slate-900 font-semibold focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Project Guide / Supervisor:</label>
              <input
                type="text"
                value={teamInfo.mentorName}
                onChange={(e) => setTeamInfo({ ...teamInfo, mentorName: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-200 text-slate-900 font-semibold focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Submission Month & Year:</label>
              <input
                type="text"
                value={teamInfo.submissionDate}
                onChange={(e) => setTeamInfo({ ...teamInfo, submissionDate: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-200 text-slate-900 font-semibold focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
          </div>

          {/* Formatted Dossier Card for Printing */}
          <div className="mt-6 p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="text-center space-y-1 border-b border-slate-200 pb-4">
              <h3 className="font-bold text-base text-slate-900 uppercase tracking-wide">
                {teamInfo.collegeName}
              </h3>
              <p className="text-xs text-slate-600 font-medium">{teamInfo.department}</p>
              <p className="text-sm font-bold text-teal-800 pt-1">{teamInfo.projectTitle}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <strong className="block text-slate-500">Submitted by:</strong>
                <span className="font-bold text-slate-900">{teamInfo.studentName}</span>
                <span className="block text-slate-600">Roll No: {teamInfo.rollNumber}</span>
              </div>
              <div>
                <strong className="block text-slate-500">Project Supervisor:</strong>
                <span className="font-bold text-slate-900">{teamInfo.mentorName}</span>
                <span className="block text-slate-600">Date: {teamInfo.submissionDate}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
              <span>Framework: React 19 + Express + Gemini 3.8 Flash SDK</span>
              <span>Classification: Healthcare Informational Decision Aid</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
