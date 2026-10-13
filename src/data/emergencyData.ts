import { EmergencyContact, EmergencyRedFlag } from '../types';

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    country: 'India',
    hotline: '112',
    service: 'Unified National Emergency Number (Police, Fire, Ambulance)',
    notes: 'Primary all-in-one emergency service across India. Ambulance can also be reached directly at 102.'
  },
  {
    country: 'United States & Canada',
    hotline: '911',
    service: 'Emergency Dispatch (Police, Fire, Medical)',
    notes: 'Available nationwide 24/7 on all mobile and landline phones without carrier charges.'
  },
  {
    country: 'United Kingdom',
    hotline: '999',
    service: 'Emergency Services (Ambulance, Fire, Police)',
    notes: 'Call 999 for life-threatening emergencies. For non-urgent health advice, call 111.'
  },
  {
    country: 'European Union',
    hotline: '112',
    service: 'Pan-European Emergency Hotline',
    notes: 'Standard free emergency number across all 27 European Union member states.'
  },
  {
    country: 'Australia',
    hotline: '000',
    service: 'Triple Zero (Ambulance, Police, Fire)',
    notes: 'National primary emergency contact number in Australia.'
  },
  {
    country: 'International / Other',
    hotline: 'Local Emergency Number',
    service: 'Nearest Hospital Emergency Department',
    notes: 'If traveling or in a country not listed above, please immediately verify and contact your local emergency response service.'
  }
];

export const EMERGENCY_RED_FLAGS: EmergencyRedFlag[] = [
  {
    category: 'Cardiovascular & Chest Symptoms',
    signs: [
      'Crushing, heavy, or squeezing chest pain or pressure',
      'Pain spreading to the left shoulder, arm, neck, jaw, back, or upper stomach',
      'Chest discomfort accompanied by cold sweating, dizziness, nausea, or shortness of breath',
      'Sudden rapid, fluttering, or irregular heartbeats with near-fainting'
    ],
    action: 'Immediately call 112 (India) or your local emergency dispatch. Sit upright, rest, and do not drive yourself.',
    urgencyLevel: 'CRITICAL_EMERGENCY'
  },
  {
    category: 'Neurological & Stroke Warning Signs (F.A.S.T.)',
    signs: [
      'Face Drooping: One side of the face is numb or droops when attempting to smile',
      'Arm Weakness: One arm drifts downward when both arms are raised',
      'Speech Difficulty: Slurred words, difficulty speaking, or inability to comprehend speech',
      'Sudden explosive headache ("worst headache of your life" / thunderclap onset)',
      'Sudden loss of vision, double vision, or loss of balance/coordination',
      'Unresponsiveness, active seizure, or prolonged loss of consciousness'
    ],
    action: 'Immediate ambulance dispatch required. Note the exact time symptoms started for medical teams.',
    urgencyLevel: 'CRITICAL_EMERGENCY'
  },
  {
    category: 'Severe Respiratory Distress',
    signs: [
      'Inability to speak in full sentences due to air hunger or gasping',
      'Bluish or grayish tint on lips, tongue, nail beds, or face (cyanosis)',
      'Audible high-pitched whistling (stridor) or severe wheezing',
      'Chest wall sucking inward deeply with every breath (retractions)'
    ],
    action: 'Call emergency dispatch immediately. Loosen tight clothing around the neck and sit in an upright position.',
    urgencyLevel: 'CRITICAL_EMERGENCY'
  },
  {
    category: 'Severe Allergic Reactions (Anaphylaxis)',
    signs: [
      'Rapid swelling of the lips, tongue, throat, or uvula',
      'Sudden difficulty swallowing or breathing with widespread hives / itching',
      'Dizziness, sudden drop in blood pressure, or fainting shortly after food, sting, or drug exposure'
    ],
    action: 'Administer auto-injector epinephrine (EpiPen) if prescribed and immediately call 112 / 911 / 999.',
    urgencyLevel: 'CRITICAL_EMERGENCY'
  },
  {
    category: 'Severe Bleeding & Trauma',
    signs: [
      'Pulsing or uncontrollable continuous bleeding not stopping after 5 minutes of firm pressure',
      'Head trauma followed by repeated vomiting, confusion, unequal pupils, or loss of consciousness',
      'Suspected fracture of major bones (femur, pelvis) or spinal injury'
    ],
    action: 'Call emergency services immediately. Apply continuous firm pressure with a clean cloth. Do not move spine if neck trauma is suspected.',
    urgencyLevel: 'CRITICAL_EMERGENCY'
  }
];
