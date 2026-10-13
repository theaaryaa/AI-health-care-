import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '1mb' }));

// Determine if valid Gemini API key is configured
const rawApiKey = process.env.GEMINI_API_KEY;
const isApiKeyConfigured = Boolean(
  rawApiKey &&
  rawApiKey.trim() !== '' &&
  rawApiKey !== 'MY_GEMINI_API_KEY' &&
  !rawApiKey.includes('PLACEHOLDER')
);

let ai: GoogleGenAI | null = null;
if (isApiKeyConfigured && rawApiKey) {
  ai = new GoogleGenAI({
    apiKey: rawApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Emergency red flag detector
const EMERGENCY_KEYWORDS = [
  'chest pain',
  'heart attack',
  'shortness of breath',
  'cannot breathe',
  'difficulty breathing',
  'choking',
  'face drooping',
  'slurred speech',
  'stroke',
  'coughing blood',
  'anaphylaxis',
  'allergic reaction',
  'unconscious',
  'passed out',
  'fainted and not waking',
  'seizure',
  'suicide',
  'kill myself',
  'severe bleeding',
  'heavy bleeding',
  'poisoning',
  'overdose',
  'worst headache of my life',
  'sudden numbness',
  'loss of vision',
];

function detectEmergency(text: string): boolean {
  if (!text) return false;
  const lower = text.toLowerCase();
  return EMERGENCY_KEYWORDS.some((kw) => lower.includes(kw));
}

// System instruction for Gemini model
const HEALTHGUIDE_SYSTEM_INSTRUCTION = `You are AI HealthGuide, a healthcare education assistant. Provide general, evidence-informed health information in simple, clear language. 

STRICT BOUNDARIES:
- You are NOT a doctor and cannot diagnose medical conditions, prescribe medication, or replace professional healthcare.
- Do NOT make treatment decisions or recommend specific medication dosages or prescription drugs.
- Do NOT claim certainty when evidence is insufficient. Explain uncertainty honestly.
- Do NOT invent medical facts, sources, citations, or research findings.
- Encourage users to consult qualified healthcare professionals for personal medical questions or persistent symptoms.
- If the user describes potentially urgent or life-threatening symptoms (such as chest pain, breathing difficulty, signs of stroke, severe bleeding, or loss of consciousness), prioritize concise emergency guidance and recommend immediate professional assessment rather than continuing a normal casual conversation.
- Never suggest that a symptom is harmless solely because it is not recognized as an emergency.
- Do not request identifying information, patient names, phone numbers, or confidential medical records.
- Keep responses well-structured with clear headings:
  1. Educational Overview
  2. Potential General Factors (Non-diagnostic)
  3. Safe Supportive & Self-Care Measures (Non-pharmacological, e.g. hydration, rest, posture)
  4. When to Consult a Qualified Doctor
  5. Clarifying Questions (if helpful)`;

// Curated educational knowledge base for Demo Mode fallback
function getCuratedDemoResponse(userQuery: string, duration?: string): { reply: string; isEmergency: boolean } {
  const query = userQuery.toLowerCase();
  const durationText = duration && duration !== 'General inquiry / No symptoms' ? ` (Reported duration: ${duration})` : '';

  if (detectEmergency(query)) {
    return {
      isEmergency: true,
      reply: `### 🚨 CRITICAL MEDICAL SAFETY NOTICE

The symptoms you described may indicate a **potential medical emergency**. 

**Action Required Immediately:**
- **In India:** Call **112** (National Emergency Services) or **102** (Ambulance) immediately.
- **In the United States / Canada:** Call **911**.
- **In the United Kingdom:** Call **999**.
- **In the European Union:** Call **112**.
- If you are in another country, contact your local emergency service or proceed immediately to the nearest hospital emergency department.

**Crucial Warning:**
Do not wait for symptoms to resolve or continue chatting with this tool. Automated keyword screening is not a clinical triage system and cannot rule out serious conditions. Please seek immediate in-person medical evaluation.`
    };
  }

  // Dehydration / Hydration
  if (query.includes('water') || query.includes('hydrat') || query.includes('thirst') || query.includes('electrolyte')) {
    return {
      isEmergency: false,
      reply: `### Educational Overview: Hydration & Body Fluid Balance${durationText}

Water is essential for every physiological system in the human body, accounting for roughly 60% of an adult's body weight. Proper hydration supports cellular function, temperature regulation, joint lubrication, cognitive focus, and waste elimination.

#### Key Principles of Daily Hydration:
- **Baseline Needs:** While individual needs vary based on climate, physical activity, and body mass, health organizations typically recommend approximately 2.5 to 3.5 liters (10–14 cups) of total fluid intake per day for men and 2.0 to 2.7 liters (8–11 cups) for women, including moisture from foods.
- **Electrolyte Balance:** Minerals like sodium, potassium, and magnesium work alongside water to maintain osmotic balance and nerve signaling. In cases of excessive sweating or heat exposure, plain water combined with balanced electrolyte-rich foods (e.g. fruits, coconut water) is beneficial.
- **Self-Assessment:** A practical indicator of adequate hydration is urine color; light pale yellow indicates proper fluid balance, whereas dark amber suggests insufficient fluid intake.

#### When to Consult a Physician:
- Inability to retain fluids for more than 24 hours.
- Extreme dizziness, confusion, or absence of urination for over 8 hours.
- Chronic unquenchable thirst, which may warrant screening for metabolic conditions such as diabetes mellitus.`
    };
  }

  // Headache
  if (query.includes('headache') || query.includes('migraine') || query.includes('head pain')) {
    return {
      isEmergency: false,
      reply: `### Educational Overview: General Information on Headaches${durationText}

Headaches are among the most common neurological symptoms experienced globally. Most everyday headaches are "primary" headaches, meaning they are not caused by an underlying organic disease.

#### Common Classifications:
1. **Tension-Type Headaches:** Characterized by a steady, dull ache or band-like pressure around the forehead or back of the head. Often triggered by physical fatigue, emotional stress, eye strain, or poor cervical posture.
2. **Migraine Headaches:** Frequently present as moderate-to-severe throbbing pain, often unilateral, which may be accompanied by sensitivity to light (photophobia), sound (phonophobia), or nausea.
3. **Cervicogenic Headaches:** Referred pain originating from stiffness or muscle spasms in the neck and upper back.

#### Supportive & Non-Pharmacological Measures:
- Resting in a quiet, dimly lit, well-ventilated room.
- Applying a cool compress or gentle warm cloth to the forehead or temples.
- Maintaining consistent hydration and avoiding prolonged skipping of meals.
- Practicing gentle neck stretches and reducing screen glare.

#### Red Flags Requiring Urgent Medical Evaluation:
- Sudden, explosive onset ("thunderclap" headache, reaching peak intensity within seconds).
- Headache accompanied by fever, stiff neck, confusion, weakness, or visual loss.
- New headache pattern developing in individuals over 50 years of age or with a history of cancer.`
    };
  }

  // Cough / Cold
  if (query.includes('cough') || query.includes('cold') || query.includes('throat') || query.includes('flu') || query.includes('congestion')) {
    return {
      isEmergency: false,
      reply: `### Educational Overview: Upper Respiratory Symptoms${durationText}

Coughs and upper respiratory symptoms are frequently the body's natural defense mechanism to clear the airways of mucus, irritants, and microbial pathogens. The vast majority of acute episodes are viral in origin.

#### General Factors:
- **Viral Infections:** Common rhinoviruses, seasonal influenza, or coronaviruses typically run a self-limiting course of 7 to 14 days.
- **Post-Nasal Drip:** Sinus drainage triggering cough receptors in the posterior pharynx, common in allergic rhinitis.
- **Environmental Irritants:** Dry air, smoke, air pollution, or sudden temperature shifts.

#### Safe Supportive Measures:
- Staying well-hydrated with warm liquids such as herbal infusions, clear broth, or warm water.
- Using a clean room humidifier or steam inhalation to soothe irritated mucous membranes.
- Resting voice and prioritizing restorative sleep.
- Saline nasal sprays or rinses to reduce nasal mucosal congestion naturally.

#### When to Consult a Healthcare Professional:
- Cough producing blood or thick rust-colored sputum.
- Associated shortness of breath, wheezing, or chest tightness.
- High fever exceeding 38.5°C (101.3°F) or fever lasting beyond 3 days.
- Symptoms failing to improve after 10–14 days.`
    };
  }

  // Sleep / Stress
  if (query.includes('sleep') || query.includes('insomnia') || query.includes('stress') || query.includes('anxiety') || query.includes('tired')) {
    return {
      isEmergency: false,
      reply: `### Educational Overview: Sleep Hygiene & Stress Management${durationText}

Sleep quality and autonomic nervous system regulation are foundational pillars of cardiovascular health, immune competency, and neurocognitive performance.

#### Evidence-Informed Sleep Hygiene Strategies:
- **Circadian Consistency:** Maintain a fixed wake-up and bedtime schedule, even on weekends, to stabilize your internal biological clock.
- **Morning Sunlight:** Expose your eyes to natural daylight within 30–60 minutes of waking to trigger cortisol awakening response and synchronize melatonin secretion for the evening.
- **Digital Sunset:** Minimize exposure to blue-wavelength screens 60–90 minutes before bedtime or use blue-light filtering modes.
- **Optimal Sleep Environment:** Keep the bedroom cool (approx. 18–20°C / 65–68°F), dark, and quiet.

#### Stress Regulation Techniques:
- **Physiological Sigh / Diaphragmatic Breathing:** Two quick nasal inhales followed by a prolonged, relaxed mouth exhale to activate parasympathetic vagal tone.
- **Scheduled Worry Time:** Allocating 10 minutes in the early evening to write down concerns rather than ruminating in bed.

#### When to Consult a Professional:
- Persistent insomnia lasting more than 3 weeks that impairs daytime safety or focus.
- Loud snoring accompanied by daytime fatigue or observed breathing pauses (potential sleep apnea).
- Overwhelming emotional distress or anxiety interfering with daily living.`
    };
  }

  // Generic Educational Fallback
  return {
    isEmergency: false,
    reply: `### Educational Overview: General Health Information${durationText}

Thank you for your question regarding **"${userQuery.trim()}"**.

#### General Educational Perspectives:
- Human physiological symptoms are multifaceted signals resulting from interactions between lifestyle factors (sleep, nutrition, hydration, physical load), environmental conditions, and underlying health profiles.
- When evaluating any bodily change, healthcare providers routinely analyze the **onset**, **duration**, **intensity**, **triggers**, and **associated symptoms**.

#### Safe Supportive Practices:
- Keep a simple symptom log: record when symptoms occur, what makes them better or worse, and their severity on a 1-to-10 scale.
- Prioritize baseline restorative habits: adequate fluid balance, balanced whole-food nutrition, and 7–9 hours of sleep.
- Avoid initiating unverified pharmacological treatments or altering existing prescription regimens without medical supervision.

#### When to Consult a Qualified Doctor:
- Symptoms that progressively worsen, do not improve after several days, or interfere with daily activities.
- The appearance of unexpected "red flag" features such as unexplained weight loss, persistent fever, localized severe pain, or neurological deficits.`
  };
}

// Health Check Endpoint
app.get('/api/health-check', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    appName: 'AI HealthGuide',
    version: '1.0.0',
    model: 'gemini-3.8-flash',
    hasApiKey: isApiKeyConfigured,
    emergencyHelplineIndia: '112',
    timestamp: new Date().toISOString(),
  });
});

// Main Chat Endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages, duration, topic } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: 'Invalid request: "messages" array is required and must not be empty.',
      });
    }

    const lastMessage = messages[messages.length - 1];
    const userQuery = typeof lastMessage?.content === 'string' ? lastMessage.content.trim() : '';

    if (!userQuery) {
      return res.status(400).json({
        error: 'Input cannot be empty. Please enter your health question or symptom description.',
      });
    }

    if (userQuery.length > 2500) {
      return res.status(400).json({
        error: 'Input is too long. Please limit your inquiry to 2,500 characters to ensure safe processing.',
      });
    }

    // Immediate Red Flag check
    const isEmergency = detectEmergency(userQuery);

    // If Gemini API is NOT configured or demo mode is active
    if (!isApiKeyConfigured || !ai) {
      const demoResult = getCuratedDemoResponse(userQuery, duration);
      return res.json({
        reply: demoResult.reply,
        isEmergency: demoResult.isEmergency || isEmergency,
        isDemoMode: true,
        modelUsed: 'Curated Evidence-Grounded Knowledge Engine (Demo Mode)',
        notice:
          'Running in Curated Educational Mode. To enable live Gemini 3.8 Flash generation, configure GEMINI_API_KEY in the AI Studio Secrets panel.',
      });
    }

    // Build context for Gemini
    const contextPrompt = `User Query: "${userQuery}"
${duration ? `Reported Symptom Duration: ${duration}` : ''}
${topic ? `Selected Category / Focus: ${topic}` : ''}

Please respond strictly in accordance with your healthcare education assistant guidelines. Provide structured, educational, non-diagnostic guidance with clear section headings. Include a note on when to seek in-person medical care.`;

    // Call Gemini 3.8 Flash via @google/genai SDK
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contextPrompt,
      config: {
        systemInstruction: HEALTHGUIDE_SYSTEM_INSTRUCTION,
        temperature: 0.4, // Cautious, evidence-grounded temperature
      },
    });

    const replyText = response.text || 'Unable to generate response. Please try rephrasing your question.';
    const modelEmergencyDetected = isEmergency || detectEmergency(replyText);

    return res.json({
      reply: replyText,
      isEmergency: modelEmergencyDetected,
      isDemoMode: false,
      modelUsed: 'gemini-3.8-flash',
    });
  } catch (error: any) {
    console.error('Error generating healthcare response:', error);
    // Fall back safely to curated educational response
    const fallback = getCuratedDemoResponse(req.body?.messages?.[req.body.messages.length - 1]?.content || '');
    return res.status(200).json({
      reply: fallback.reply,
      isEmergency: fallback.isEmergency,
      isDemoMode: true,
      errorOccurred: true,
      notice: 'An API processing error occurred. Falling back to the verified educational knowledge base.',
    });
  }
});

// Feedback Endpoint
app.post('/api/feedback', (req: Request, res: Response) => {
  const { rating, comment, category } = req.body;
  // Acknowledge feedback (ephemeral)
  return res.json({
    status: 'success',
    message: 'Thank you for your feedback! It helps improve health education clarity.',
    receivedAt: new Date().toISOString(),
  });
});

// In development, hook up Vite middleware; in production, serve built static assets
async function setupVite() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[AI HealthGuide] Server running on http://0.0.0.0:${PORT}`);
    console.log(`[AI HealthGuide] Gemini API Status: ${isApiKeyConfigured ? 'Connected (gemini-3.8-flash)' : 'Demo/Curated Mode'}`);
  });
}

setupVite().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
