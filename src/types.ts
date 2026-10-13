export type Role = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  timestamp: string;
  duration?: string;
  topic?: string;
  isEmergency?: boolean;
  isDemoMode?: boolean;
  modelUsed?: string;
}

export interface HealthTopic {
  id: string;
  title: string;
  category: 'Habits & Nutrition' | 'Sleep & Stress' | 'Common Symptoms' | 'Preventive Care' | 'Emergency Awareness';
  readTime: string;
  summary: string;
  fullContent: string;
  keyPoints: string[];
  whenToConsult: string[];
  sourceName: string;
  sourceUrl: string;
  iconName: string;
}

export interface EmergencyRedFlag {
  category: string;
  signs: string[];
  action: string;
  urgencyLevel: 'CRITICAL_EMERGENCY' | 'URGENT_EVALUATION' | 'PROMPT_CONSULTATION';
}

export interface EmergencyContact {
  country: string;
  hotline: string;
  service: string;
  notes: string;
}

export interface TestCase {
  id: string;
  name: string;
  category: 'Educational' | 'Symptom' | 'Safety' | 'Boundary' | 'System';
  prompt: string;
  duration?: string;
  expectedBehavior: string;
  status: 'idle' | 'running' | 'passed' | 'failed';
  actualResult?: string;
  notes?: string;
  executionTimeMs?: number;
}
