import React, { useState } from 'react';
import { 
  Info, 
  ShieldCheck, 
  AlertTriangle, 
  Send, 
  Check, 
  Code2, 
  Lock, 
  Cpu, 
  HeartHandshake,
  MessageSquare,
  Sparkles
} from 'lucide-react';

interface AboutProjectProps {
  onOpenDisclaimerModal: () => void;
}

export const AboutProject: React.FC<AboutProjectProps> = ({ onOpenDisclaimerModal }) => {
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    category: 'General Feedback',
    comment: '',
  });
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.comment.trim()) return;

    setIsSubmitting(true);
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback),
      });
      setFeedbackSent(true);
    } catch {
      setFeedbackSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-fadeIn max-w-5xl mx-auto">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-800/60 border border-teal-500/40 text-teal-200 text-xs font-semibold">
          <Info className="w-3.5 h-3.5" />
          <span>About AI HealthGuide & Architecture</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Project Objective, Architecture & Safety Governance
        </h1>
        <p className="text-teal-100/90 text-sm sm:text-base max-w-3xl leading-relaxed">
          AI HealthGuide is an academic demonstration and healthcare information assistant created to explore ethical, safe, and transparent AI integration in health literacy.
        </p>
      </div>

      {/* Problem Statement & Objectives */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600">The Healthcare Challenge</span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">Problem Statement & Purpose</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">The Problem</h3>
            <p>
              When individuals experience unfamiliar physical sensations or symptoms, their first instinct is often to consult search engines. Standard web search results frequently surface either catastrophic worst-case diagnoses (causing severe "cyberchondria" anxiety) or unverified homeopathic cures.
            </p>
            <p>
              Furthermore, patients frequently arrive at physician consultations without organized symptom histories, forgetting crucial details regarding symptom onset, duration, and triggering events.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Our Solution & Objectives</h3>
            <p>
              <strong>AI HealthGuide</strong> was engineered as an objective, non-diagnostic educational decision aid. It bridges the communication gap by:
            </p>
            <ul className="space-y-1.5 list-disc pl-4 text-slate-700">
              <li>Organizing patient symptom timelines (duration, frequency, associated signs).</li>
              <li>Providing structured physiological overviews grounded in public health consensus.</li>
              <li>Recommending non-pharmacological supportive habits (hydration, rest, ergonomics).</li>
              <li>Clearly delineating red-flag symptoms that necessitate immediate physician consultation.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Technical Stack Specifications */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Engineering Foundation</span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">Full-Stack Technology Stack</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
              <Code2 className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Frontend Layer</h4>
            <p className="text-slate-600">
              React 19 + TypeScript 5.8 with Tailwind CSS v4, Lucide icons, and responsive layouts.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Cpu className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Server-Side Proxy</h4>
            <p className="text-slate-600">
              Express.js running on Node.js with Vite middleware integration in development and compiled static assets in production.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Gemini AI Model</h4>
            <p className="text-slate-600">
              Google GenAI SDK (<code>@google/genai</code>) utilizing <code>gemini-3.8-flash</code> for high-speed, cost-effective reasoning.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Privacy & Security</h4>
            <p className="text-slate-600">
              Zero persistent data storage; ephemeral in-memory state; API keys strictly confined to server-side secrets.
            </p>
          </div>
        </div>
      </section>

      {/* System Limitations & Privacy Boundaries */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* System Limitations */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-amber-700">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-base text-slate-900">System Limitations & Scope</h3>
          </div>
          <ul className="space-y-2 text-xs text-slate-600 leading-relaxed list-disc pl-4">
            <li>
              <strong>No Clinical Diagnosis:</strong> This application cannot examine physical signs, review radiological scans, or draw blood, and therefore cannot diagnose.
            </li>
            <li>
              <strong>No Prescription Authority:</strong> The AI will never recommend specific prescription drug dosages or therapeutic pharmaceutical regimens.
            </li>
            <li>
              <strong>Probabilistic Nature:</strong> Large language models generate text based on statistical language patterns and may occasionally misinterpret unusual symptoms.
            </li>
            <li>
              <strong>Incomplete Emergency Detection:</strong> Keyword filters cannot detect all life-threatening emergencies or atypical clinical presentations.
            </li>
          </ul>
        </div>

        {/* Privacy & Confidentiality Statement */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-teal-700">
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            <h3 className="font-bold text-base text-slate-900">Privacy & Confidentiality Notice</h3>
          </div>
          <ul className="space-y-2 text-xs text-slate-600 leading-relaxed list-disc pl-4">
            <li>
              <strong>No Persistent Database:</strong> In our initial architecture, conversations are processed ephemerally in RAM and wiped on session clear.
            </li>
            <li>
              <strong>Zero Secret Leaks:</strong> The Gemini API key is never bundled in frontend code or shared with external analytics trackers.
            </li>
            <li>
              <strong>Do Not Enter Personal PII:</strong> Users are expressly reminded not to enter names, phone numbers, home addresses, or confidential hospital files.
            </li>
            <li>
              <strong>Client-Side Export:</strong> Conversation export files are generated directly within the user's browser memory as plain text files.
            </li>
          </ul>
        </div>

      </section>

      {/* Feedback & Inquiries Section */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">User & Evaluator Feedback</span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">Share Your Feedback & Suggestions</h2>
          </div>
          <HeartHandshake className="w-6 h-6 text-teal-600" />
        </div>

        {feedbackSent ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center space-y-2">
            <Check className="w-8 h-8 text-emerald-600 mx-auto" />
            <h3 className="font-bold text-base">Thank You for Your Feedback!</h3>
            <p className="text-xs text-emerald-800 max-w-md mx-auto">
              Your feedback helps us refine health literacy clarity, emergency prompts, and system safety constraints.
            </p>
            <button
              onClick={() => {
                setFeedbackSent(false);
                setFeedback({ name: '', email: '', category: 'General Feedback', comment: '' });
              }}
              className="mt-2 text-xs font-semibold text-teal-700 hover:underline"
            >
              Submit Another Response
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitFeedback} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Name (Optional):</label>
                <input
                  type="text"
                  value={feedback.name}
                  onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
                  placeholder="Your Name / Evaluator Name"
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-teal-500/20 text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Role / Designation:</label>
                <select
                  value={feedback.category}
                  onChange={(e) => setFeedback({ ...feedback, category: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-teal-500/20 text-slate-900 bg-white"
                >
                  <option value="College Project Evaluator">College Project Evaluator</option>
                  <option value="Medical / Healthcare Professional">Healthcare Professional</option>
                  <option value="Student / Peer Reviewer">Student / Peer Reviewer</option>
                  <option value="General Public User">General Public User</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Email (Optional):</label>
                <input
                  type="email"
                  value={feedback.email}
                  onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
                  placeholder="contact@university.edu"
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-teal-500/20 text-slate-900"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Feedback or Suggestions:</label>
              <textarea
                rows={3}
                value={feedback.comment}
                onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
                placeholder="Share your comments on response clarity, safety boundaries, or user experience..."
                required
                className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-teal-500/20 text-slate-900 resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-400">
                Feedback is acknowledged ephemerally by the backend API.
              </span>
              <button
                type="submit"
                disabled={isSubmitting || !feedback.comment.trim()}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Feedback'}</span>
              </button>
            </div>
          </form>
        )}
      </section>

    </div>
  );
};
