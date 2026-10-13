import React, { useState } from 'react';
import { 
  AlertTriangle, 
  PhoneCall, 
  ShieldAlert, 
  HeartCrack, 
  BrainCircuit, 
  Wind, 
  Flame, 
  HelpCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { EMERGENCY_CONTACTS, EMERGENCY_RED_FLAGS } from '../data/emergencyData';

interface UrgentCareGuideProps {
  onOpenDisclaimerModal: () => void;
  onNavigateToAssistant: (prompt: string) => void;
}

export const UrgentCareGuide: React.FC<UrgentCareGuideProps> = ({
  onOpenDisclaimerModal,
  onNavigateToAssistant,
}) => {
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [interactiveCheck, setInteractiveCheck] = useState<{
    hasChestPain: boolean;
    hasShortBreath: boolean;
    hasStrokeSigns: boolean;
    hasUnconscious: boolean;
    hasHighFever: boolean;
  }>({
    hasChestPain: false,
    hasShortBreath: false,
    hasStrokeSigns: false,
    hasUnconscious: false,
    hasHighFever: false,
  });

  const isEmergencyTriggered =
    interactiveCheck.hasChestPain ||
    interactiveCheck.hasShortBreath ||
    interactiveCheck.hasStrokeSigns ||
    interactiveCheck.hasUnconscious;

  return (
    <div className="space-y-8 pb-12 animate-fadeIn max-w-6xl mx-auto">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-800/60 border border-rose-500/40 text-rose-200 text-xs font-semibold">
          <PhoneCall className="w-3.5 h-3.5 animate-pulse text-rose-300" />
          <span>Immediate Emergency Escalation Protocol</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Safety & Urgent-Care Guidance Hub
        </h1>

        <p className="text-rose-100 text-sm sm:text-base max-w-3xl leading-relaxed">
          In clinical medicine, delay can be dangerous. Certain red-flag symptoms require immediate emergency medical dispatch. If you suspect an acute life-threatening emergency, stop using this application and call emergency medical services immediately.
        </p>

        {/* Primary Contact Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center font-black text-xl shrink-0 shadow-lg">
              112
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-rose-200 font-bold">India Primary Helpline</div>
              <div className="text-lg font-bold text-white">Dial 112 (National Emergency Unified Hotline)</div>
              <p className="text-xs text-rose-200/80">Direct ambulance dispatch is also available at 102.</p>
            </div>
          </div>

          <a
            href="tel:112"
            className="px-5 py-3 rounded-xl bg-white text-rose-950 hover:bg-rose-50 font-bold text-sm text-center transition-colors shadow-md shrink-0 flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-rose-600" />
            <span>Call 112 Immediately</span>
          </a>
        </div>
      </div>

      {/* Critical Limitation & Triage Disclosure Notice */}
      <section className="bg-amber-50/90 rounded-2xl border-2 border-amber-300 p-6 space-y-3 shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1.5 text-xs sm:text-sm text-amber-950">
            <h3 className="font-bold text-base text-amber-950">
              Crucial Notice: Automated Keyword Detection is Incomplete
            </h3>
            <p className="leading-relaxed">
              Automated keyword scanning and AI symptom assistants are <strong>not clinical triage systems</strong>. Algorithms cannot assess vital signs, observe facial color, feel pulses, or evaluate atypical presentations of heart attacks (such as silent ischemia common in women and individuals with diabetes).
            </p>
            <p className="font-semibold text-amber-900 leading-relaxed">
              Never delay seeking urgent professional medical assessment or transport while interacting with AI HealthGuide. If your intuition or clinical instincts suggest that something is seriously wrong, seek immediate in-person emergency care.
            </p>
          </div>
        </div>
      </section>

      {/* Stroke F.A.S.T. Protocol Callout */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Neurological Emergency</span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">The F.A.S.T. Stroke Recognition Protocol</h2>
          </div>
          <span className="text-xs text-rose-600 font-semibold bg-rose-50 border border-rose-200 px-3 py-1 rounded-full self-start sm:self-auto">
            Time Lost = Brain Lost
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600">
          When blood supply to the brain is blocked or ruptured, every passing second results in irreversible neuronal damage. Memorize the four critical letters of F.A.S.T.:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-lg bg-teal-600 text-white font-extrabold flex items-center justify-center text-lg">
              F
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Face Drooping</h3>
            <p className="text-xs text-slate-600">
              Ask the person to smile. Does one side of the face or mouth droop or feel numb? Is the smile uneven?
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-lg bg-teal-600 text-white font-extrabold flex items-center justify-center text-lg">
              A
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Arm Weakness</h3>
            <p className="text-xs text-slate-600">
              Ask the person to raise both arms straight out. Does one arm drift downward or feel weak/numb?
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-lg bg-teal-600 text-white font-extrabold flex items-center justify-center text-lg">
              S
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Speech Slurred</h3>
            <p className="text-xs text-slate-600">
              Is speech slurred, garbled, or difficult to understand? Can they repeat a simple phrase like "The sky is blue"?
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-2">
            <div className="w-10 h-10 rounded-lg bg-rose-600 text-white font-extrabold flex items-center justify-center text-lg">
              T
            </div>
            <h3 className="font-bold text-rose-950 text-sm">Time to Call</h3>
            <p className="text-xs text-rose-800">
              If any of these signs are present, call 112 immediately. Note the exact time symptoms first began for clot-busting medication eligibility.
            </p>
          </div>
        </div>
      </section>

      {/* Red Flags Category Grid */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Life-Threatening Red-Flag Categories</h2>
          <p className="text-xs sm:text-sm text-slate-500">Recognize clinical manifestations requiring urgent medical intervention</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {EMERGENCY_RED_FLAGS.map((flag, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                  Critical Emergency
                </span>
                <span className="text-xs text-slate-400 font-medium">Category {idx + 1}</span>
              </div>

              <h3 className="font-bold text-base text-slate-900">{flag.category}</h3>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-700 block">Warning Signs:</span>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {flag.signs.map((sign, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                <strong className="text-slate-900 block font-semibold mb-0.5">Required Action:</strong>
                {flag.action}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Emergency Self-Check Decision Simulator */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Decision Support Simulator</span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">Interactive Red-Flag Screener Simulator</h2>
          <p className="text-xs text-slate-500 mt-1">
            Check any symptoms to see how clinical guidelines evaluate urgent escalation vs. non-emergency education:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={interactiveCheck.hasChestPain}
              onChange={(e) => setInteractiveCheck({ ...interactiveCheck, hasChestPain: e.target.checked })}
              className="mt-0.5 w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
            />
            <div>
              <strong className="text-slate-900 block">Severe Chest Pressure or Pain</strong>
              <span className="text-slate-500">Crushing tightness, radiating pain to left arm, neck, or jaw.</span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={interactiveCheck.hasShortBreath}
              onChange={(e) => setInteractiveCheck({ ...interactiveCheck, hasShortBreath: e.target.checked })}
              className="mt-0.5 w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
            />
            <div>
              <strong className="text-slate-900 block">Severe Shortness of Breath / Air Hunger</strong>
              <span className="text-slate-500">Unable to complete a sentence, blue discoloration on lips.</span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={interactiveCheck.hasStrokeSigns}
              onChange={(e) => setInteractiveCheck({ ...interactiveCheck, hasStrokeSigns: e.target.checked })}
              className="mt-0.5 w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
            />
            <div>
              <strong className="text-slate-900 block">F.A.S.T. Stroke Signs or Thunderclap Headache</strong>
              <span className="text-slate-500">Face drooping, one-sided weakness, slurred speech, sudden blindness.</span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={interactiveCheck.hasUnconscious}
              onChange={(e) => setInteractiveCheck({ ...interactiveCheck, hasUnconscious: e.target.checked })}
              className="mt-0.5 w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
            />
            <div>
              <strong className="text-slate-900 block">Loss of Consciousness or Active Seizures</strong>
              <span className="text-slate-500">Unresponsive, passed out, or repetitive convulsions.</span>
            </div>
          </label>
        </div>

        {/* Live Simulator Result */}
        <div className={`p-5 rounded-2xl border transition-all ${
          isEmergencyTriggered 
            ? 'bg-rose-50 border-rose-300 text-rose-950 animate-pulse'
            : 'bg-emerald-50 border-emerald-200 text-emerald-950'
        }`}>
          {isEmergencyTriggered ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-rose-900 text-sm sm:text-base">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>SIMULATION RATING: IMMEDIATE CRITICAL EMERGENCY</span>
              </div>
              <p className="text-xs sm:text-sm text-rose-800 leading-relaxed">
                The symptoms selected constitute potential medical emergencies. Do not attempt self-management or wait for AI advice.
                <strong> Call 112 in India immediately</strong> or your local emergency medical service.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm sm:text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>SIMULATION RATING: NO IMMEDIATE EMERGENCY RED FLAGS DETECTED</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                No acute life-threatening red flags were selected in this simulation. You can proceed with standard educational inquiries or explore supportive self-care guidance in the AI Health Assistant.
              </p>
              <button
                onClick={() => onNavigateToAssistant('I would like to understand general health guidelines for my symptoms')}
                className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
              >
                <span>Ask AI HealthGuide</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Global Emergency Numbers Directory */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Worldwide Emergency Contacts Directory</h2>
            <p className="text-xs text-slate-500">Official toll-free emergency dispatch hotlines by jurisdiction</p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Filter Country:</span>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="p-1.5 rounded-lg border border-slate-200 bg-white font-semibold text-slate-800 cursor-pointer"
            >
              <option value="All">All Regions</option>
              {EMERGENCY_CONTACTS.map((c) => (
                <option key={c.country} value={c.country}>
                  {c.country}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EMERGENCY_CONTACTS.filter(
            (c) => selectedCountry === 'All' || c.country === selectedCountry
          ).map((contact, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all ${
                contact.country === 'India'
                  ? 'bg-rose-50/60 border-rose-300 shadow-xs'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900">{contact.country}</span>
                <span className="text-lg font-black text-rose-600 bg-white px-2.5 py-0.5 rounded-md border border-rose-200 shadow-2xs">
                  {contact.hotline}
                </span>
              </div>
              <h4 className="font-semibold text-xs text-slate-800 mb-1">{contact.service}</h4>
              <p className="text-[11px] text-slate-600 leading-normal">{contact.notes}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
