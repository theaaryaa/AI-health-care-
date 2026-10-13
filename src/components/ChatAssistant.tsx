import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Trash2, 
  Download, 
  AlertTriangle, 
  PhoneCall, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Copy, 
  Check, 
  RefreshCw, 
  HelpCircle,
  ThumbsUp,
  ThumbsDown,
  Info
} from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatAssistantProps {
  initialPrompt?: string;
  initialDuration?: string;
  initialTopic?: string;
  isApiKeyConfigured: boolean;
  onOpenEmergencyModal: () => void;
  onOpenDisclaimerModal: () => void;
}

const DURATION_OPTIONS = [
  'General inquiry / No symptoms',
  'Just started today (< 24 hours)',
  '1 to 3 days',
  '4 to 7 days',
  '1 to 2 weeks',
  'More than 2 weeks',
];

const TOPIC_CHIPS = [
  'General Wellness',
  'Respiratory & Cough',
  'Headache & Migraine',
  'Sleep & Fatigue',
  'Digestive Discomfort',
  'Hydration & Diet',
  'Preventive Health',
];

const RED_FLAG_KEYWORDS = [
  'chest pain',
  'heart attack',
  'cannot breathe',
  'shortness of breath',
  'stroke',
  'face drooping',
  'slurred speech',
  'unconscious',
  'seizure',
  'suicide',
  'severe bleeding',
  'choking',
  'overdose',
  'poisoning',
];

export const ChatAssistant: React.FC<ChatAssistantProps> = ({
  initialPrompt = '',
  initialDuration = 'General inquiry / No symptoms',
  initialTopic = 'General Wellness',
  isApiKeyConfigured,
  onOpenEmergencyModal,
  onOpenDisclaimerModal,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: `### Welcome to AI HealthGuide
I am your healthcare education assistant. I can help you explore general health topics, understand common symptom patterns, and organize your observations before speaking with a licensed doctor.

**How to get started:**
1. Describe your symptom or enter your health question below.
2. Select how long you have experienced the symptom (if applicable).
3. Review the structured educational overview and self-care principles.

⚠️ **Important Reminder:** I am an AI educational tool and cannot diagnose medical conditions, prescribe medication, or replace professional healthcare. In an emergency, call **112 in India** or your local emergency number immediately.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isDemoMode: !isApiKeyConfigured,
      modelUsed: isApiKeyConfigured ? 'gemini-3.8-flash' : 'Curated Educational Knowledge Base',
    },
  ]);

  const [input, setInput] = useState(initialPrompt);
  const [duration, setDuration] = useState(initialDuration);
  const [selectedTopic, setSelectedTopic] = useState(initialTopic);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, 'up' | 'down'>>({});
  const [clearConfirmOpen, setClearConfirmOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Detect if user input has red flags currently typed
  const isInputRedFlag = RED_FLAG_KEYWORDS.some((kw) => input.toLowerCase().includes(kw));

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialPrompt) {
      setInput(initialPrompt);
      if (initialDuration) setDuration(initialDuration);
      if (initialTopic) setSelectedTopic(initialTopic);
      inputRef.current?.focus();
    }
  }, [initialPrompt, initialDuration, initialTopic]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText !== undefined ? customText : input).trim();
    if (!textToSend || isLoading) return;

    if (textToSend.length > 2500) {
      alert('Your inquiry is too long (limit is 2,500 characters). Please condense your question.');
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      duration,
      topic: selectedTopic,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          duration,
          topic: selectedTopic,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to generate response`);
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'No response returned from the server.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isEmergency: data.isEmergency,
        isDemoMode: data.isDemoMode,
        modelUsed: data.modelUsed,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: `### ⚠️ Connection Notice
We could not reach the server at this moment. 

**Safe Next Steps:**
- Check your internet connection and try asking your question again.
- If you are experiencing concerning physical symptoms, please contact a licensed healthcare provider or visit an urgent care center directly.
- In emergencies (such as chest pain or severe difficulty breathing), immediately call **112 (India)** or your local emergency dispatch.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isEmergency: false,
        isDemoMode: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (id: string, type: 'up' | 'down') => {
    setFeedbackGiven((prev) => ({ ...prev, [id]: type }));
    // Send feedback to server
    fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messageId: id, rating: type, timestamp: new Date().toISOString() }),
    }).catch(() => {});
  };

  const handleClearConversation = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content: `### Conversation Cleared
Your in-memory chat session has been reset. Zero conversation logs are retained.

Feel free to ask a new question or describe a health symptom whenever you are ready.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isDemoMode: !isApiKeyConfigured,
      },
    ]);
    setClearConfirmOpen(false);
  };

  const handleExportConversation = () => {
    const textContent = messages
      .map((m) => `[${m.timestamp}] ${m.role === 'user' ? 'USER' : 'AI HEALTHGUIDE'}:\n${m.content}\n${m.duration ? `(Duration: ${m.duration})\n` : ''}\n----------------------------------------\n`)
      .join('\n');

    const header = `AI HealthGuide - Healthcare Education Summary\nExport Date: ${new Date().toLocaleString()}\nIMPORTANT NOTICE: This document is for educational informational purposes only and is NOT a medical diagnosis or prescription. Always consult a qualified doctor.\n========================================\n\n`;

    const blob = new Blob([header + textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HealthGuide_Summary_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 pb-12 animate-fadeIn">
      
      {/* Top Banner / Emergency Warning if typed red flag */}
      {isInputRedFlag && (
        <div className="p-4 rounded-xl bg-rose-50 border-2 border-rose-400 text-rose-900 shadow-sm flex items-start gap-3 animate-pulse">
          <PhoneCall className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <strong className="font-bold text-rose-950 block text-sm">Potential Urgent Medical Red Flag Detected</strong>
            <span>
              If you or someone nearby is experiencing acute chest pain, severe shortness of breath, signs of stroke, or loss of consciousness, please stop chatting and call <strong>112 in India</strong>, <strong>911 in the US</strong>, or your local emergency dispatch immediately!
            </span>
          </div>
        </div>
      )}

      {/* Mode / API Key Status Banner */}
      {!isApiKeyConfigured && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Curated Educational Mode:</strong> Gemini API key is not currently configured. Providing verified, evidence-grounded educational guidance from the built-in health database.
            </span>
          </div>
          <span className="text-[11px] font-semibold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded whitespace-nowrap">
            Safe Fallback Active
          </span>
        </div>
      )}

      {/* Main Chat Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[75vh] min-h-[550px]">
        
        {/* Chat Control Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-slate-700">AI Health Information Assistant</span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-slate-500 hidden sm:inline">
              {isApiKeyConfigured ? 'Powered by Gemini 3.8 Flash' : 'Curated Medical Knowledge Engine'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportConversation}
              className="p-1.5 text-slate-500 hover:text-teal-700 hover:bg-slate-200/60 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
              title="Export Conversation Summary"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>

            <button
              onClick={() => setClearConfirmOpen(true)}
              className="p-1.5 text-slate-500 hover:text-rose-700 hover:bg-rose-50 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
              title="Clear Conversation"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>

            <button
              onClick={onOpenDisclaimerModal}
              className="p-1.5 text-slate-500 hover:text-amber-700 hover:bg-amber-50 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
              title="View Disclaimer"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-gradient-to-b from-white to-slate-50/50">
          {messages.map((message) => {
            const isUser = message.role === 'user';
            const isEmergencyMsg = message.isEmergency;

            return (
              <div
                key={message.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}
              >
                {/* Meta Header */}
                <div className="flex items-center gap-2 text-[11px] text-slate-400 px-1">
                  <span className="font-medium text-slate-600">
                    {isUser ? 'You' : 'AI HealthGuide'}
                  </span>
                  <span>•</span>
                  <span>{message.timestamp}</span>
                  {message.duration && isUser && (
                    <span className="bg-teal-50 text-teal-700 px-1.5 py-0.2 rounded font-medium">
                      Duration: {message.duration}
                    </span>
                  )}
                  {message.modelUsed && !isUser && (
                    <span className="bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-medium">
                      {message.modelUsed.includes('gemini') ? 'Gemini 3.8 Flash' : 'Curated Database'}
                    </span>
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 sm:p-5 text-sm leading-relaxed shadow-xs ${
                    isUser
                      ? 'bg-teal-600 text-white rounded-tr-xs'
                      : isEmergencyMsg
                      ? 'bg-rose-50 border-2 border-rose-400 text-rose-950 rounded-tl-xs'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs'
                  }`}
                >
                  {/* Emergency Callout in bubble if emergency detected */}
                  {isEmergencyMsg && (
                    <div className="mb-3 pb-3 border-b border-rose-200 flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
                      <PhoneCall className="w-4 h-4 text-rose-600 animate-pulse" />
                      <span>Immediate Medical Evaluation Advised (India: Call 112)</span>
                    </div>
                  )}

                  {/* Render content with basic markdown handling */}
                  <div className="space-y-3 prose-sm max-w-none">
                    {message.content.split('\n\n').map((paragraph, idx) => {
                      // Headers
                      if (paragraph.startsWith('### ')) {
                        return (
                          <h4 key={idx} className={`font-bold text-base mt-2 ${isUser ? 'text-white' : 'text-slate-900'}`}>
                            {paragraph.replace('### ', '')}
                          </h4>
                        );
                      }
                      if (paragraph.startsWith('#### ')) {
                        return (
                          <h5 key={idx} className={`font-semibold text-sm mt-2 ${isUser ? 'text-teal-100' : 'text-slate-800'}`}>
                            {paragraph.replace('#### ', '')}
                          </h5>
                        );
                      }
                      // Bullet points
                      if (paragraph.includes('\n- ') || paragraph.startsWith('- ')) {
                        const items = paragraph.split('\n- ').map((item) => item.replace(/^- /, ''));
                        return (
                          <ul key={idx} className="list-disc pl-5 space-y-1 my-2">
                            {items.map((it, iIdx) => (
                              <li key={iIdx}>
                                <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(it) }} />
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      // Numbered lists
                      if (/^\d+\.\s/.test(paragraph)) {
                        const items = paragraph.split(/\n(?=\d+\.\s)/);
                        return (
                          <ol key={idx} className="list-decimal pl-5 space-y-1 my-2">
                            {items.map((it, iIdx) => (
                              <li key={iIdx}>
                                <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(it.replace(/^\d+\.\s*/, '')) }} />
                              </li>
                            ))}
                          </ol>
                        );
                      }
                      // Regular paragraph
                      return (
                        <p key={idx} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(paragraph) }} />
                      );
                    })}
                  </div>

                  {/* Disclaimer Footer for Assistant Messages */}
                  {!isUser && (
                    <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>
                        Educational information only. Does not replace clinical diagnosis or medical care. In an emergency, dial 112 (India) or local emergency services.
                      </span>
                    </div>
                  )}
                </div>

                {/* Assistant Message Actions */}
                {!isUser && (
                  <div className="flex items-center gap-2 text-xs text-slate-400 px-1 pt-1">
                    <button
                      onClick={() => handleCopy(message.id, message.content)}
                      className="hover:text-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
                      title="Copy response text"
                    >
                      {copiedId === message.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600 text-[11px]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[11px]">Copy</span>
                        </>
                      )}
                    </button>

                    <span>•</span>

                    {/* Thumbs up/down */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleFeedback(message.id, 'up')}
                        className={`p-1 rounded hover:bg-slate-100 transition-colors cursor-pointer ${
                          feedbackGiven[message.id] === 'up' ? 'text-teal-600 font-bold' : ''
                        }`}
                        title="Helpful educational information"
                      >
                        <ThumbsUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleFeedback(message.id, 'down')}
                        className={`p-1 rounded hover:bg-slate-100 transition-colors cursor-pointer ${
                          feedbackGiven[message.id] === 'down' ? 'text-rose-600 font-bold' : ''
                        }`}
                        title="Could be improved"
                      >
                        <ThumbsDown className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex flex-col items-start space-y-1.5 animate-pulse">
              <div className="text-[11px] text-slate-400 px-1">
                AI HealthGuide is analyzing healthcare information...
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs p-4 text-xs text-slate-600 space-y-2 max-w-sm">
                <div className="flex items-center gap-2 text-teal-700 font-medium">
                  <RefreshCw className="w-4 h-4 animate-spin text-teal-600" />
                  <span>Synthesizing evidence-informed guidance</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Filtering through clinical safety guidelines and preparing non-diagnostic education...
                </p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input & Context Controls Area */}
        <div className="bg-white border-t border-slate-200 p-3 sm:p-4 space-y-3">
          
          {/* Context Options Bar: Duration & Topic Chips */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            
            {/* Duration Selector */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-slate-500 font-medium">Duration:</span>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="bg-transparent text-slate-800 font-semibold focus:outline-hidden cursor-pointer"
              >
                {DURATION_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Privacy notice badge */}
            <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Do not enter names, phone numbers, or confidential patient records</span>
            </div>
          </div>

          {/* Topic Quick Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
            <span className="text-slate-400 font-medium shrink-0">Focus:</span>
            {TOPIC_CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => setSelectedTopic(chip)}
                className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                  selectedTopic === chip
                    ? 'bg-teal-600 text-white font-medium'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="relative flex items-end gap-2">
            <textarea
              ref={inputRef}
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your health question or symptom (e.g., 'I have had a mild dry cough for 3 days without fever...')"
              className="flex-1 p-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm text-slate-900 placeholder:text-slate-400 resize-none transition-all outline-hidden"
              maxLength={1500}
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isLoading}
              className={`p-3 rounded-xl transition-all duration-150 flex items-center justify-center shrink-0 shadow-sm cursor-pointer ${
                input.trim() && !isLoading
                  ? 'bg-teal-600 hover:bg-teal-700 text-white'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
              title="Send Inquiry"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          {/* Character Counter & Helper */}
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Press Enter to send, Shift + Enter for new line</span>
            <span>{input.length} / 1500 characters</span>
          </div>

        </div>

      </div>

      {/* Clear Confirmation Modal */}
      {clearConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Clear Conversation?</h3>
                <p className="text-xs text-slate-500">This will wipe your current in-memory chat session.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600">
              Zero logs are retained permanently. Confirming will reset the conversation thread completely.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setClearConfirmOpen(false)}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClearConversation}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// Helper for bold and simple markdown rendering
function formatInlineMarkdown(text: string): string {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/`([^`]+)`/g, '<code class="bg-slate-100 px-1 py-0.5 rounded text-xs text-teal-800">$1</code>');
}
