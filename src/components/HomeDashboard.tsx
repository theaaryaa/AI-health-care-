import React from 'react';
import { 
  HeartPulse, 
  MessageSquare, 
  BookOpen, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight, 
  PhoneCall, 
  Sparkles, 
  Droplets, 
  Moon, 
  Activity, 
  Clock, 
  Lock,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { HEALTH_LIBRARY_TOPICS } from '../data/healthLibrary';

interface HomeDashboardProps {
  onNavigate: (tab: string) => void;
  onSelectPrompt: (prompt: string, duration?: string, topic?: string) => void;
  isApiKeyConfigured: boolean;
  onOpenEmergencyModal: () => void;
  onOpenDisclaimerModal: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onNavigate,
  onSelectPrompt,
  isApiKeyConfigured,
  onOpenEmergencyModal,
  onOpenDisclaimerModal,
}) => {
  const featuredTopics = HEALTH_LIBRARY_TOPICS.slice(0, 3);

  const samplePrompts = [
    {
      title: 'Daily Hydration Balance',
      prompt: 'What are evidence-based habits for daily fluid intake and electrolyte balance?',
      category: 'Nutrition & Habits',
      icon: Droplets,
    },
    {
      title: 'Sleep Hygiene Protocols',
      prompt: 'How can I improve sleep quality using circadian rhythm principles?',
      category: 'Sleep & Stress',
      icon: Moon,
    },
    {
      title: 'Tension Headache Symptoms',
      prompt: 'What causes tension headaches and what supportive non-drug measures help?',
      category: 'Common Symptoms',
      icon: Activity,
    },
  ];

  return (
    <div className="space-y-10 pb-12 animate-fadeIn">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-950 text-white shadow-xl">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 py-12 sm:px-10 sm:py-16 lg:py-20 text-center sm:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-700/60 border border-teal-500/40 text-teal-200 text-xs font-medium tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-teal-300" />
                <span>Evidence-Informed Healthcare Information Assistant</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Empowering Informed Health Conversations with <span className="text-emerald-300">AI HealthGuide</span>
              </h1>

              <p className="text-base sm:text-lg text-teal-100/90 max-w-2xl leading-relaxed">
                Understand general health topics, organize symptom descriptions before your doctor appointments, and discover reliable health education with built-in medical safety guardrails.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-center sm:justify-start">
                <button
                  onClick={() => onNavigate('chat')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-teal-950 font-bold text-base transition-all duration-150 shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 text-teal-950" />
                  <span>Ask a Health Question</span>
                  <ArrowRight className="w-4 h-4 text-teal-950 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('library')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-teal-800/80 hover:bg-teal-700/80 text-white font-semibold text-base border border-teal-600/50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-5 h-5 text-teal-200" />
                  <span>Browse Health Library</span>
                </button>
              </div>

              {/* Status & Privacy Pill */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-teal-200/80 justify-center sm:justify-start">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Zero Patient Data Stored</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Strict Non-Diagnostic Safety</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HeartPulse className="w-4 h-4 text-emerald-400" />
                  <span>Emergency 112 Ready (India)</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Card */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-5 text-left space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-bold text-teal-200 uppercase tracking-wider">Safety Architecture</span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${isApiKeyConfigured ? 'bg-emerald-400/20 text-emerald-300' : 'bg-amber-400/20 text-amber-300'}`}>
                    {isApiKeyConfigured ? 'Gemini 3.8 Flash' : 'Curated Demo'}
                  </span>
                </div>

                <div className="space-y-3 text-xs text-teal-100/90">
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-teal-500/20 text-emerald-300 flex items-center justify-center shrink-0">1</div>
                    <p><strong className="text-white">Educational Scope:</strong> Explains mechanisms without prescribing or diagnosing.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-teal-500/20 text-emerald-300 flex items-center justify-center shrink-0">2</div>
                    <p><strong className="text-white">Red-Flag Interception:</strong> Detects critical symptoms and escalates immediately.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-teal-500/20 text-emerald-300 flex items-center justify-center shrink-0">3</div>
                    <p><strong className="text-white">Zero Tracking:</strong> In-memory session processing protects personal confidentiality.</p>
                  </div>
                </div>

                <button
                  onClick={onOpenEmergencyModal}
                  className="w-full mt-2 py-2 px-3 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/30 text-rose-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-rose-300" />
                  <span>Emergency Hotline: Call 112</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Prominent Medical Safety Disclaimer Callout */}
      <section className="rounded-2xl bg-amber-50/80 border border-amber-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-amber-950">Important Medical Disclaimer & Safety Notice</h2>
              <p className="text-xs sm:text-sm text-amber-800 mt-0.5 leading-relaxed">
                AI HealthGuide provides general educational information and does not provide medical diagnoses, treatment plans, or prescriptions. In a medical emergency, call <strong>112 in India</strong>, <strong>911 in the US</strong>, or your local emergency dispatch immediately.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenDisclaimerModal}
            className="shrink-0 px-4 py-2 rounded-lg bg-white hover:bg-amber-100/60 text-amber-900 border border-amber-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            Review Terms & Scope
          </button>
        </div>
      </section>

      {/* Quick-Access Navigation Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Essential Features</h2>
            <p className="text-xs sm:text-sm text-slate-500">Explore the main components of the healthcare assistant</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: AI Health Assistant */}
          <div 
            onClick={() => onNavigate('chat')}
            className="group rounded-2xl bg-white p-6 border border-slate-200/90 hover:border-teal-400 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all duration-200">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-teal-700 transition-colors">
                AI Health Information Assistant
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Describe symptoms with duration context and receive structured, evidence-informed educational overviews.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-600">
              <span>Start Consultation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Health Library */}
          <div 
            onClick={() => onNavigate('library')}
            className="group rounded-2xl bg-white p-6 border border-slate-200/90 hover:border-teal-400 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-700 transition-colors">
                Health Education Library
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Curated reference articles on hydration, sleep, common symptoms, and preventive health linked to WHO and CDC sources.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
              <span>Browse 8 Topics</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Safety & Emergency */}
          <div 
            onClick={() => onNavigate('emergency')}
            className="group rounded-2xl bg-white p-6 border border-slate-200/90 hover:border-rose-400 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-rose-600 group-hover:text-white transition-all duration-200">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-rose-700 transition-colors">
                Safety & Urgent Care Guide
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Learn to recognize stroke (F.A.S.T.) and cardiac red flags, plus a verified directory of emergency hotlines (India: 112).
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-rose-600">
              <span>View Emergency Hub</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Academic Resources */}
          <div 
            onClick={() => onNavigate('academic')}
            className="group rounded-2xl bg-white p-6 border border-slate-200/90 hover:border-emerald-400 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-200">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
                College Project Deck & Demo
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Complete 15-20 min live presentation script, Mermaid architecture diagram, slide deck outline, and team details.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600">
              <span>Academic Resources</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* Sample Health Questions Quick Start */}
      <section className="rounded-2xl bg-gradient-to-r from-slate-50 to-teal-50/40 border border-slate-200 p-6 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Quick-Start Educational Questions</h2>
            <p className="text-xs sm:text-sm text-slate-500">Click any example to see how AI HealthGuide structures health guidance</p>
          </div>
          <button
            onClick={() => onNavigate('chat')}
            className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>Open Custom Chat</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {samplePrompts.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                onClick={() => {
                  onSelectPrompt(item.prompt, 'General inquiry / No symptoms', item.category);
                }}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-teal-400 hover:shadow-xs transition-all cursor-pointer group text-left space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors" />
                </div>
                <h3 className="font-semibold text-sm text-slate-900 group-hover:text-teal-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">
                  "{item.prompt}"
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Health Library Highlights */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Featured Educational Guides</h2>
            <p className="text-xs sm:text-sm text-slate-500">Grounded in public health research from the WHO, CDC, and NHS</p>
          </div>
          <button
            onClick={() => onNavigate('library')}
            className="text-sm font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Topics</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredTopics.map((topic) => (
            <div
              key={topic.id}
              className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {topic.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {topic.readTime}
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900 leading-snug">
                  {topic.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {topic.summary}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 truncate max-w-[170px]" title={topic.sourceName}>
                  {topic.sourceName.split('—')[0]}
                </span>
                <button
                  onClick={() => onNavigate('library')}
                  className="text-xs font-semibold text-teal-600 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Highlights / College Project Badges */}
      <section className="rounded-2xl bg-slate-900 text-white p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-left">
          
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center mx-auto sm:mx-0">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">Zero Data Storage Guarantee</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              In-memory request lifecycle ensures zero patient identifiable data (PII) is written to databases or third-party trackers.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto sm:mx-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">Full-Stack Server Proxy</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Backend Express router protects Gemini API credentials and performs safety boundary sanitization before client delivery.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-9 h-9 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto sm:mx-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">Emergency Red-Flag Interceptor</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Immediate escalation protocol displays emergency contact information (112 in India, 911 in the US) for acute clinical presentations.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};
