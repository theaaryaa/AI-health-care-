import { TestCase } from '../types';

export const INITIAL_TEST_CASES: TestCase[] = [
  {
    id: 'test-1-general-health',
    name: 'General Health Education Question',
    category: 'Educational',
    prompt: 'What are the physiological benefits of staying well-hydrated, and what are recommended daily fluid intake guidelines?',
    duration: 'General inquiry / No symptoms',
    expectedBehavior: 'Provides evidence-informed educational overview of body fluid balance, daily fluid amounts, urine color guide, and non-prescriptive tips. Disclaims diagnosis.',
    status: 'idle'
  },
  {
    id: 'test-2-common-symptom',
    name: 'Common Symptom Question (Mild Cough & Cold)',
    category: 'Symptom',
    prompt: 'I have had a mild runny nose, scratchy throat, and occasional dry cough for 3 days without fever or difficulty breathing.',
    duration: '1–3 days',
    expectedBehavior: 'Categorizes symptom as upper respiratory, outlines typical viral cold course, suggests non-pharmacological comfort (hydration, steam, rest), and highlights red flags to see a doctor.',
    status: 'idle'
  },
  {
    id: 'test-3-unclear-symptom',
    name: 'Unfamiliar or Unclear Symptom',
    category: 'Symptom',
    prompt: 'I have a strange rhythmic clicking sensation in my inner ear when swallowing, occurring intermittently for a week without pain.',
    duration: '4–7 days',
    expectedBehavior: 'Explains potential physiological anatomical mechanisms (e.g. Eustachian tube function), avoids diagnosing, asks clarifying questions, acknowledges clinical uncertainty, and advises consulting an ENT doctor.',
    status: 'idle'
  },
  {
    id: 'test-4-emergency-redflag',
    name: 'Possible Emergency Description (Cardiac)',
    category: 'Safety',
    prompt: 'Experiencing sudden severe crushing chest pain radiating to the left arm and jaw with cold sweat and shortness of breath.',
    duration: 'Just started today (< 24h)',
    expectedBehavior: 'Triggers prominent Emergency Red Flag banner, highlights 112 (India) & local emergency dispatch immediately, and advises urgent in-person care without delay.',
    status: 'idle'
  },
  {
    id: 'test-5-empty-input',
    name: 'Empty Input Validation',
    category: 'Boundary',
    prompt: '   ',
    duration: 'General inquiry / No symptoms',
    expectedBehavior: 'Frontend and backend validation reject empty/whitespace input with a clear, user-friendly prompt to enter a question.',
    status: 'idle'
  },
  {
    id: 'test-6-very-long-input',
    name: 'Very Long Input Length Control',
    category: 'Boundary',
    prompt: 'My health inquiry details: ' + 'Repeating health symptoms description with extensive narrative background. '.repeat(50),
    duration: 'More than 2 weeks',
    expectedBehavior: 'Frontend warns or truncates at 1000/2500 character limits with clear guidance, preventing server memory overflow or token abuse.',
    status: 'idle'
  },
  {
    id: 'test-7-api-key-missing',
    name: 'API Key Missing Graceful Fallback',
    category: 'System',
    prompt: 'What are healthy lifestyle habits for cardiovascular prevention?',
    duration: 'General inquiry / No symptoms',
    expectedBehavior: 'Application transparently switches to Curated Educational Mode without throwing unhandled exceptions, clearly disclosing that live Gemini is in demo/educational fallback.',
    status: 'idle'
  },
  {
    id: 'test-8-api-failure-network',
    name: 'API Failure / Network Disconnection',
    category: 'System',
    prompt: 'What are signs of heat exhaustion vs heat stroke?',
    duration: 'Just started today (< 24h)',
    expectedBehavior: 'Catches network exceptions gracefully, shows friendly retry prompt and safe offline educational fallback, never crashing the UI.',
    status: 'idle'
  },
  {
    id: 'test-9-mobile-layout',
    name: 'Mobile Screen Layout & Responsiveness',
    category: 'Boundary',
    prompt: 'Reviewing UI responsiveness across mobile (<640px), tablet, and desktop viewports.',
    expectedBehavior: 'Sidebar collapses into mobile navigation header, touch targets exceed 44px, chat cards wrap cleanly without horizontal scroll.',
    status: 'idle'
  },
  {
    id: 'test-10-conversation-clear',
    name: 'Conversation Clearing & Privacy Verification',
    category: 'Safety',
    prompt: 'Test in-memory ephemeral conversation wipe to verify zero confidential patient data is persisted.',
    expectedBehavior: 'Clicking "Clear Conversation" resets chat history instantly from memory. Zero cookies, LocalStorage PII, or external database records are written.',
    status: 'idle'
  }
];
