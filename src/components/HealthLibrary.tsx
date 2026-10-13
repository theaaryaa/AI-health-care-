import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  Clock, 
  ExternalLink, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  X,
  Droplets,
  Moon,
  Brain,
  Activity,
  Wind,
  ShieldAlert,
  ClipboardCheck,
  ChevronRight
} from 'lucide-react';
import { HEALTH_LIBRARY_TOPICS } from '../data/healthLibrary';
import { HealthTopic } from '../types';

interface HealthLibraryProps {
  onAskAboutTopic: (topicTitle: string) => void;
  onOpenDisclaimerModal: () => void;
}

const CATEGORIES = [
  'All Categories',
  'Habits & Nutrition',
  'Sleep & Stress',
  'Common Symptoms',
  'Preventive Care',
  'Emergency Awareness',
];

export const HealthLibrary: React.FC<HealthLibraryProps> = ({
  onAskAboutTopic,
  onOpenDisclaimerModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [activeArticle, setActiveArticle] = useState<HealthTopic | null>(null);

  // Filter topics
  const filteredTopics = HEALTH_LIBRARY_TOPICS.filter((topic) => {
    const matchesCategory =
      selectedCategory === 'All Categories' || topic.category === selectedCategory;
    const matchesSearch =
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.fullContent.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplets': return Droplets;
      case 'Moon': return Moon;
      case 'Brain': return Brain;
      case 'Activity': return Activity;
      case 'Wind': return Wind;
      case 'ShieldAlert': return ShieldAlert;
      case 'ClipboardCheck': return ClipboardCheck;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-fadeIn max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900 to-teal-800 rounded-3xl p-6 sm:p-10 text-white shadow-lg space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-700/60 border border-teal-500/40 text-teal-200 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Evidence-Informed Healthcare Reference</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Health Education Library
        </h1>
        <p className="text-teal-100 text-sm sm:text-base max-w-2xl leading-relaxed">
          Explore peer-reviewed principles of preventive wellness, symptom physiology, and evidence-informed health habits linked directly to trusted global public health organizations.
        </p>

        {/* Search Bar */}
        <div className="pt-2 max-w-xl">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics (e.g., 'hydration', 'headache', 'sleep', 'respiratory')..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-400 shadow-md"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap font-medium transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-teal-700 text-white shadow-xs font-semibold'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Topics Grid */}
      {filteredTopics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => {
            const Icon = getTopicIcon(topic.iconName);
            return (
              <div
                key={topic.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-teal-400 p-6 flex flex-col justify-between hover:shadow-md transition-all duration-200 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {topic.readTime}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full inline-block mb-2">
                      {topic.category}
                    </span>
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-teal-700 transition-colors leading-snug">
                      {topic.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {topic.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setActiveArticle(topic)}
                    className="text-xs font-semibold text-teal-600 hover:text-teal-800 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform cursor-pointer"
                  >
                    <span>Read Full Guide</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onAskAboutTopic(topic.title)}
                    className="text-[11px] font-medium text-slate-500 hover:text-teal-700 hover:bg-teal-50 px-2 py-1 rounded transition-colors cursor-pointer"
                    title="Ask AI HealthGuide a specific question on this topic"
                  >
                    Ask Assistant
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-lg">No Health Topics Found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            We couldn't find educational articles matching "{searchQuery}". Try searching for broader terms such as "sleep", "cold", or "hydration".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Categories');
            }}
            className="px-4 py-2 rounded-lg bg-teal-50 text-teal-700 text-xs font-semibold hover:bg-teal-100 transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Credible Sources Reference Section */}
      <section className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-teal-600" />
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">
            Verified Global Health Authorities & References
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          AI HealthGuide synthesizes educational summaries aligned with the evidence published by reputable public health agencies. We do not invent clinical citations or medical claims:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <a
            href="https://www.who.int"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-white border border-slate-200 hover:border-teal-400 hover:shadow-xs transition-all flex items-center justify-between group"
          >
            <div>
              <strong className="block text-slate-900 group-hover:text-teal-700">World Health Org (WHO)</strong>
              <span className="text-[11px] text-slate-500">who.int</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600" />
          </a>

          <a
            href="https://main.mohfw.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-white border border-slate-200 hover:border-teal-400 hover:shadow-xs transition-all flex items-center justify-between group"
          >
            <div>
              <strong className="block text-slate-900 group-hover:text-teal-700">MoHFW India</strong>
              <span className="text-[11px] text-slate-500">mohfw.gov.in</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600" />
          </a>

          <a
            href="https://www.cdc.gov"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-white border border-slate-200 hover:border-teal-400 hover:shadow-xs transition-all flex items-center justify-between group"
          >
            <div>
              <strong className="block text-slate-900 group-hover:text-teal-700">CDC Public Health</strong>
              <span className="text-[11px] text-slate-500">cdc.gov</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600" />
          </a>

          <a
            href="https://www.nhs.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-white border border-slate-200 hover:border-teal-400 hover:shadow-xs transition-all flex items-center justify-between group"
          >
            <div>
              <strong className="block text-slate-900 group-hover:text-teal-700">National Health Service</strong>
              <span className="text-[11px] text-slate-500">nhs.uk</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600" />
          </a>
        </div>
      </section>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-100 p-5 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                  {activeArticle.category}
                </span>
                <span className="text-xs text-slate-400">• {activeArticle.readTime}</span>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Article Content */}
            <div className="p-6 sm:p-8 space-y-6 text-slate-700 text-sm leading-relaxed">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                {activeArticle.title}
              </h2>

              <p className="text-base text-slate-600 font-medium italic border-l-4 border-teal-500 pl-4 py-1">
                "{activeArticle.summary}"
              </p>

              {/* Full Educational Prose */}
              <div className="space-y-4">
                {activeArticle.fullContent.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Key Takeaways */}
              <div className="rounded-xl bg-teal-50/70 border border-teal-200 p-5 space-y-3">
                <h4 className="font-bold text-teal-950 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-700" />
                  Key Evidence-Informed Takeaways
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-teal-900">
                  {activeArticle.keyPoints.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0 mt-2" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* When to Consult a Professional */}
              <div className="rounded-xl bg-amber-50/70 border border-amber-200 p-5 space-y-3">
                <h4 className="font-bold text-amber-950 text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  When to Seek Professional Medical Care
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-amber-900">
                  {activeArticle.whenToConsult.map((consult, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-2" />
                      <span>{consult}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Source Attribution */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
                <div>
                  <strong className="text-slate-700">Source:</strong> {activeArticle.sourceName}
                </div>
                <a
                  href={activeArticle.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-900 font-semibold"
                >
                  <span>Visit Public Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-slate-50 border-t border-slate-100 p-4 flex items-center justify-between">
              <button
                onClick={() => {
                  const title = activeArticle.title;
                  setActiveArticle(null);
                  onAskAboutTopic(title);
                }}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Ask Assistant About This Topic
              </button>

              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
