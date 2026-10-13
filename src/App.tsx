import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeDashboard } from './components/HomeDashboard';
import { ChatAssistant } from './components/ChatAssistant';
import { HealthLibrary } from './components/HealthLibrary';
import { UrgentCareGuide } from './components/UrgentCareGuide';
import { TestingSuite } from './components/TestingSuite';
import { AcademicResources } from './components/AcademicResources';
import { AboutProject } from './components/AboutProject';
import { SafetyDisclaimerModal } from './components/SafetyDisclaimerModal';
import { 
  HeartPulse, 
  PhoneCall, 
  AlertTriangle, 
  ShieldCheck, 
  ExternalLink,
  BookOpen,
  MessageSquare,
  GraduationCap
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isDisclaimerModalOpen, setIsDisclaimerModalOpen] = useState(false);
  const [isApiKeyConfigured, setIsApiKeyConfigured] = useState<boolean>(false);

  // Pre-fill states when user clicks a prompt in Home, Library, or Test suite
  const [prefillPrompt, setPrefillPrompt] = useState<string>('');
  const [prefillDuration, setPrefillDuration] = useState<string>('General inquiry / No symptoms');
  const [prefillTopic, setPrefillTopic] = useState<string>('General Wellness');

  useEffect(() => {
    // Check server status & API key configuration
    fetch('/api/health-check')
      .then((res) => res.json())
      .then((data) => {
        setIsApiKeyConfigured(Boolean(data.hasApiKey));
      })
      .catch((err) => {
        console.warn('Health check unavailable:', err);
        setIsApiKeyConfigured(false);
      });
  }, []);

  const handleSelectPromptFromDashboard = (
    prompt: string,
    duration = 'General inquiry / No symptoms',
    topic = 'General Wellness'
  ) => {
    setPrefillPrompt(prompt);
    setPrefillDuration(duration);
    setPrefillTopic(topic);
    setActiveTab('chat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAskAboutLibraryTopic = (topicTitle: string) => {
    setPrefillPrompt(`Could you provide general educational health guidance regarding: "${topicTitle}"?`);
    setPrefillDuration('General inquiry / No symptoms');
    setPrefillTopic('General Wellness');
    setActiveTab('chat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadTestPromptIntoChat = (prompt: string, duration?: string) => {
    setPrefillPrompt(prompt);
    if (duration) setPrefillDuration(duration);
    setActiveTab('chat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
      
      {/* Top Navigation Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isApiKeyConfigured={isApiKeyConfigured}
        onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
        onOpenDisclaimerModal={() => setIsDisclaimerModalOpen(true)}
      />

      {/* Main Page Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'home' && (
          <HomeDashboard
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectPrompt={handleSelectPromptFromDashboard}
            isApiKeyConfigured={isApiKeyConfigured}
            onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
            onOpenDisclaimerModal={() => setIsDisclaimerModalOpen(true)}
          />
        )}

        {activeTab === 'chat' && (
          <ChatAssistant
            initialPrompt={prefillPrompt}
            initialDuration={prefillDuration}
            initialTopic={prefillTopic}
            isApiKeyConfigured={isApiKeyConfigured}
            onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
            onOpenDisclaimerModal={() => setIsDisclaimerModalOpen(true)}
          />
        )}

        {activeTab === 'library' && (
          <HealthLibrary
            onAskAboutTopic={handleAskAboutLibraryTopic}
            onOpenDisclaimerModal={() => setIsDisclaimerModalOpen(true)}
          />
        )}

        {activeTab === 'emergency' && (
          <UrgentCareGuide
            onOpenDisclaimerModal={() => setIsDisclaimerModalOpen(true)}
            onNavigateToAssistant={(prompt) => {
              handleSelectPromptFromDashboard(prompt);
            }}
          />
        )}

        {activeTab === 'tests' && (
          <TestingSuite
            onLoadTestPromptIntoChat={handleLoadTestPromptIntoChat}
            isApiKeyConfigured={isApiKeyConfigured}
          />
        )}

        {activeTab === 'academic' && (
          <AcademicResources />
        )}

        {activeTab === 'about' && (
          <AboutProject
            onOpenDisclaimerModal={() => setIsDisclaimerModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Col 1: Brand Info */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <span className="font-bold text-lg text-slate-900 tracking-tight">
                  AI <span className="text-teal-600">HealthGuide</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                An AI-powered healthcare information assistant designed for health literacy, symptom clarity, and patient education.
              </p>
              <div className="text-[11px] font-medium text-slate-400">
                Mode: {isApiKeyConfigured ? 'Gemini 3.8 Flash' : 'Curated Educational Mode'}
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-900 uppercase tracking-wider block">Features</span>
              <ul className="space-y-1.5 text-slate-600">
                <li>
                  <button onClick={() => setActiveTab('chat')} className="hover:text-teal-700 cursor-pointer">
                    AI Health Information Assistant
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('library')} className="hover:text-teal-700 cursor-pointer">
                    Health Education Library
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('emergency')} className="hover:text-teal-700 cursor-pointer">
                    Safety & Urgent Care Guide
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('tests')} className="hover:text-teal-700 cursor-pointer">
                    10-Point QA Test Suite
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Academic & Documentation */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-900 uppercase tracking-wider block">College & Defense</span>
              <ul className="space-y-1.5 text-slate-600">
                <li>
                  <button onClick={() => setActiveTab('academic')} className="hover:text-teal-700 cursor-pointer">
                    15–20 Min Demo Script
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('academic')} className="hover:text-teal-700 cursor-pointer">
                    Mermaid Architecture Diagram
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('academic')} className="hover:text-teal-700 cursor-pointer">
                    10-Slide Deck Outline
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('about')} className="hover:text-teal-700 cursor-pointer">
                    Privacy & System Limits
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Emergency Contacts & Disclaimer */}
            <div className="space-y-3 text-xs">
              <span className="font-bold text-slate-900 uppercase tracking-wider block">Emergency Notice</span>
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-rose-950">
                  <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
                  <span>Call 112 in India</span>
                </div>
                <p className="text-[11px] leading-normal text-rose-800">
                  In acute chest pain, stroke symptoms, or severe trauma, call local emergency medical dispatch immediately.
                </p>
              </div>
              <button
                onClick={() => setIsDisclaimerModalOpen(true)}
                className="text-[11px] text-teal-700 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                <span>View Full Medical Disclaimer</span>
              </button>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
            <div>
              © 2026 AI HealthGuide • Academic Demonstration Project • Open Source (MIT)
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Zero PII Retained
              </span>
              <span>•</span>
              <span>Not a Medical Device</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Emergency Hotline Quick Modal */}
      {isEmergencyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
                <PhoneCall className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">Urgent Emergency Hotline</h3>
                <p className="text-xs text-slate-500">Immediate Medical Dispatch Numbers</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 flex items-center justify-between">
                <div>
                  <strong className="block text-rose-950 font-bold text-sm">India National Emergency</strong>
                  <span className="text-rose-800 text-xs">Unified Police, Fire, Medical Hotline</span>
                </div>
                <a
                  href="tel:112"
                  className="px-3.5 py-1.5 rounded-lg bg-rose-600 text-white font-black text-sm shadow-xs"
                >
                  Dial 112
                </a>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <strong className="block text-slate-900 font-semibold">Ambulance (India)</strong>
                  <span className="text-slate-500 text-[11px]">Direct Ambulance Line</span>
                </div>
                <a href="tel:102" className="px-3 py-1 rounded-md bg-slate-200 text-slate-800 font-bold text-xs">
                  Dial 102
                </a>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <strong className="block text-slate-900 font-semibold">United States & Canada</strong>
                  <span className="text-slate-500 text-[11px]">Emergency Dispatch</span>
                </div>
                <a href="tel:911" className="px-3 py-1 rounded-md bg-slate-200 text-slate-800 font-bold text-xs">
                  Dial 911
                </a>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <strong className="block text-slate-900 font-semibold">United Kingdom</strong>
                  <span className="text-slate-500 text-[11px]">Emergency Services</span>
                </div>
                <a href="tel:999" className="px-3 py-1 rounded-md bg-slate-200 text-slate-800 font-bold text-xs">
                  Dial 999
                </a>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-normal">
              If outside these regions, contact your local hospital emergency unit immediately. Do not delay urgent in-person care.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setIsEmergencyModalOpen(false);
                  setActiveTab('emergency');
                }}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold text-teal-700 hover:bg-teal-50"
              >
                View Full Urgent Care Guide
              </button>
              <button
                onClick={() => setIsEmergencyModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Safety Disclaimer Modal */}
      <SafetyDisclaimerModal
        isOpen={isDisclaimerModalOpen}
        onClose={() => setIsDisclaimerModalOpen(false)}
      />

    </div>
  );
}
