import React, { useState } from 'react';
import { 
  HeartPulse, 
  BookOpen, 
  MessageSquare, 
  AlertTriangle, 
  Info, 
  FlaskConical, 
  GraduationCap, 
  Menu, 
  X, 
  PhoneCall,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isApiKeyConfigured: boolean;
  onOpenEmergencyModal: () => void;
  onOpenDisclaimerModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isApiKeyConfigured,
  onOpenEmergencyModal,
  onOpenDisclaimerModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: HeartPulse },
    { id: 'chat', label: 'AI Health Assistant', icon: MessageSquare },
    { id: 'library', label: 'Health Library', icon: BookOpen },
    { id: 'emergency', label: 'Safety & Urgent Care', icon: AlertTriangle },
    { id: 'tests', label: 'Test Suite', icon: FlaskConical },
    { id: 'academic', label: 'College Deck & Script', icon: GraduationCap },
    { id: 'about', label: 'About & Privacy', icon: Info },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-teal-100/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform duration-200">
              <HeartPulse className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg sm:text-xl text-slate-900 tracking-tight">
                  AI <span className="text-teal-600">HealthGuide</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                  Edu
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                AI-Powered Healthcare Information Assistant
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-teal-50 text-teal-800 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-teal-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Model Badge */}
            <div 
              title={isApiKeyConfigured ? 'Connected to Gemini 3.8 Flash' : 'Running in Curated Educational Mode'}
              className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                isApiKeyConfigured 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${isApiKeyConfigured ? 'text-emerald-600' : 'text-amber-600'}`} />
              <span>{isApiKeyConfigured ? 'Gemini 3.8 Flash' : 'Curated Demo'}</span>
            </div>

            {/* Emergency Hotline Button */}
            <button
              onClick={onOpenEmergencyModal}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs sm:text-sm font-semibold transition-colors duration-150 shadow-xs"
              title="Emergency Guidance & Helpline (112 in India)"
            >
              <PhoneCall className="w-4 h-4 text-rose-600 animate-pulse" />
              <span>Emergency 112</span>
            </button>

            {/* Safety Disclaimer Button */}
            <button
              onClick={onOpenDisclaimerModal}
              className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              <span>Disclaimer</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-3 px-2 border-t border-slate-100 bg-white space-y-1">
            <div className="mb-2 px-3 py-1.5 rounded-lg bg-slate-50 flex items-center justify-between text-xs text-slate-600">
              <span className="font-medium">System Status:</span>
              <span className={`font-semibold ${isApiKeyConfigured ? 'text-emerald-700' : 'text-amber-700'}`}>
                {isApiKeyConfigured ? 'Gemini 3.8 Flash Live' : 'Curated Educational Mode'}
              </span>
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-800 font-semibold'
                      : 'text-slate-600 hover:text-teal-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  onOpenDisclaimerModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-500 hover:bg-slate-50 rounded-lg"
              >
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>View Full Medical Safety Disclaimer</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
