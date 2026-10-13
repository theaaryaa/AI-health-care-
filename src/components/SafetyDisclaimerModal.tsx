import React from 'react';
import { AlertTriangle, ShieldCheck, X, PhoneCall, CheckCircle } from 'lucide-react';

interface SafetyDisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafetyDisclaimerModal: React.FC<SafetyDisclaimerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 p-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Medical Safety & Educational Disclaimer</h2>
              <p className="text-xs text-slate-500">Please read carefully before using AI HealthGuide</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-sm text-slate-600 leading-relaxed">
          
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-3">
            <PhoneCall className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-rose-950">Immediate Life-Threatening Emergencies</h3>
              <p className="mt-1 text-xs text-rose-800 leading-normal">
                If you or someone nearby is experiencing severe chest pain, sudden difficulty breathing, stroke symptoms (face drooping, arm weakness, slurred speech), heavy bleeding, or loss of consciousness:
                <strong className="block mt-1 text-rose-950 font-bold">
                  In India: Call 112 or 102 immediately. In the US: Call 911. In the UK: Call 999. In the EU: Call 112.
                </strong>
                Do not wait for symptoms to improve and do not use this app during an emergency.
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              1. Not a Medical Device or Clinical Diagnostic Tool
            </h4>
            <p>
              AI HealthGuide is strictly an informational and educational decision aid. It is designed to assist users in understanding general health concepts, organizing symptom timelines for discussion with clinicians, and locating credible health education resources. It does not provide medical diagnoses, treatment protocols, or personalized therapeutic advice.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-teal-600" />
              2. Non-Prescriptive & No Medication Advice
            </h4>
            <p>
              AI HealthGuide will never recommend specific prescription medications, drug dosages, or medical therapies. Any supportive tips mentioned (such as fluid intake, rest, or posture) are non-pharmacological general wellness principles. Always consult a licensed doctor or pharmacist before starting, stopping, or altering any medication.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              3. Screening Limitation Disclosure
            </h4>
            <p>
              Automated keyword detection and artificial intelligence screening mechanisms are fundamentally incomplete. They cannot detect all life-threatening emergencies, subtle clinical nuances, or atypical symptom presentations. The absence of an automated emergency alert does not imply that a medical condition is harmless.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              4. Privacy & Confidentiality Notice
            </h4>
            <p>
              This application does not permanently store personal patient records. All chat sessions remain ephemeral in your browser's session memory. To protect your privacy, never enter full names, phone numbers, government identification numbers, addresses, or sensitive health records into the query field.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
            By using AI HealthGuide, you acknowledge that you have read, understood, and agree to these safety boundaries and that this tool never replaces the clinical judgment of a qualified medical provider.
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-100 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-colors shadow-xs"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
