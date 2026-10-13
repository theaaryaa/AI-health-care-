import { HealthTopic } from '../types';

export const HEALTH_LIBRARY_TOPICS: HealthTopic[] = [
  {
    id: 'hydration-habits',
    title: 'Hydration Science & Daily Body Fluid Balance',
    category: 'Habits & Nutrition',
    readTime: '4 min read',
    summary: 'Why water is vital for cellular metabolism, temperature regulation, and joint health, with practical guidelines for daily fluid intake.',
    fullContent: `Water accounts for approximately 60% of an adult's total body mass. Every vital organ system—from kidney filtration and cardiovascular blood volume to cognitive neurotransmission and skin integrity—relies on consistent hydration.

Fluid requirements are dynamic and vary depending on climate humidity, metabolic rate, physical exertion, and dietary sodium intake. While the popular "8 glasses a day" guideline is an accessible rule of thumb, public health guidelines recommend a total daily fluid intake of approximately 2.5 to 3.5 liters for adult males and 2.0 to 2.7 liters for adult females, including water derived from nutrient-dense whole foods like fruits and vegetables.

Dehydration occurs when fluid loss outpaces fluid intake, leading to reduced plasma volume, electrolyte imbalances, and impaired thermoregulation. Even mild dehydration (1–2% loss of body mass) can trigger cognitive fatigue, mild headaches, reduced physical endurance, and impaired mood.`,
    keyPoints: [
      'Maintain steady fluid intake throughout the day rather than drinking large quantities in single instances.',
      'Monitor urine color: pale yellow indicates optimal hydration, while dark honey or amber indicates need for fluids.',
      'In warm climates or during prolonged exercise, incorporate electrolyte sources alongside plain water.',
      'Limit high-sugar and energy drinks that can cause osmotic dehydration.'
    ],
    whenToConsult: [
      'Persistent inability to keep fluids down due to severe vomiting or diarrhea exceeding 24 hours.',
      'Signs of severe dehydration: sunken eyes, lack of sweat or tears, confusion, or absence of urination for >8 hours.',
      'Excessive, unquenchable thirst accompanied by frequent urination, which may indicate metabolic issues like diabetes.'
    ],
    sourceName: 'World Health Organization (WHO) — Water and Nutrition Guidelines',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets',
    iconName: 'Droplets'
  },
  {
    id: 'sleep-hygiene',
    title: 'Sleep Hygiene & Circadian Rhythm Alignment',
    category: 'Sleep & Stress',
    readTime: '5 min read',
    summary: 'Evidence-based strategies to optimize sleep quality, support restorative slow-wave sleep, and reinforce your natural biological clock.',
    fullContent: `Sleep is an active physiological process critical for cellular repair, memory consolidation, immunological defense, and neurotoxin clearance via the glymphatic system. Chronic sleep restriction is epidemiologically linked to heightened cardiovascular risk, metabolic dysregulation, and weakened immune responses.

Our sleep-wake cycle is governed by the suprachiasmatic nucleus (SCN) of the hypothalamus, which syncs to external cues (zeitgebers), predominantly daylight. Disruptions from artificial blue light emitted by digital screens suppress nighttime melatonin synthesis, delaying sleep latency.

Optimal sleep architecture includes alternating cycles of Non-Rapid Eye Movement (NREM) and Rapid Eye Movement (REM) sleep, each playing distinctive restorative roles in brain and tissue rejuvenation.`,
    keyPoints: [
      'Keep a consistent wake-up time 7 days a week to anchor your circadian rhythm.',
      'Seek 15–30 minutes of natural outdoor daylight within an hour of waking to stimulate cortisol awakening response.',
      'Institute a 60-minute "digital sunset" before bed, avoiding bright screens and stimulating work.',
      'Maintain a dark, quiet, and cool sleeping environment (ideal room temperature between 18°C and 20°C).'
    ],
    whenToConsult: [
      'Chronic insomnia (difficulty falling or staying asleep) persisting for more than 3 to 4 weeks.',
      'Loud chronic snoring, choking sensations, or observed pauses in breathing during sleep (indicative of obstructive sleep apnea).',
      'Extreme daytime sleepiness leading to involuntary nodding off while driving or working.'
    ],
    sourceName: 'Centers for Disease Control and Prevention (CDC) — Sleep and Sleep Disorders',
    sourceUrl: 'https://www.cdc.gov/sleep/index.html',
    iconName: 'Moon'
  },
  {
    id: 'stress-physiology',
    title: 'Stress Physiology & Autonomic Nervous System Regulation',
    category: 'Sleep & Stress',
    readTime: '5 min read',
    summary: 'Understand the biological fight-or-flight response, chronic cortisol elevation, and practical somatic techniques to engage parasympathetic calming.',
    fullContent: `The stress response is an adaptive evolutionary survival mechanism mediated by the sympathetic-adreno-medullary (SAM) axis and the hypothalamic-pituitary-adrenal (HPA) axis. When perceived threats arise, cortisol, epinephrine, and norepinephrine surge, accelerating heart rate, elevating blood pressure, and diverting energy away from digestion and immune surveillance.

While acute stress prepares the organism for rapid action, chronic psychological stress maintains elevated glucocorticoid levels. This continuous stimulation can contribute to chronic systemic inflammation, vascular endothelial stiffness, tension headaches, gastrointestinal dysmotility, and mood disorders.

Activating the parasympathetic nervous system ("rest and digest") helps downregulate sympathetic tone, slowing heart rate and restoring physiological equilibrium through the vagus nerve.`,
    keyPoints: [
      'Practice the physiological sigh: two deep nasal inhalations followed by an extended oral exhalation.',
      'Engage in regular aerobic physical movement (e.g. brisk walking) to metabolize circulating stress hormones.',
      'Incorporate structured micro-breaks and boundary settings during mentally demanding work.',
      'Foster social connection and communication with trusted peers or mentors.'
    ],
    whenToConsult: [
      'Severe, persistent anxiety or depressive mood that impairs day-to-day work, relationships, or personal safety.',
      'Physical symptoms such as panic attacks, palpitations, or unexplained tremors.',
      'Using unprescribed substances or alcohol as a primary coping mechanism for psychological tension.'
    ],
    sourceName: 'National Health Service (NHS UK) — Stress Management and Mental Wellbeing',
    sourceUrl: 'https://www.nhs.uk/mental-health/',
    iconName: 'Brain'
  },
  {
    id: 'tension-headaches',
    title: 'Understanding Common Headaches: Tension vs. Migraine',
    category: 'Common Symptoms',
    readTime: '4 min read',
    summary: 'A clinical educational comparison between everyday tension-type headaches and migraines, including self-care approaches and warning signs.',
    fullContent: `Headaches are among the most prevalent disorders of the nervous system. The vast majority of headaches are classified as primary headaches, meaning they are benign syndromes rather than symptoms of another underlying medical disease.

Tension-type headaches (TTH) are the most widespread, characterized by mild-to-moderate, non-pulsating, bilateral band-like tightness around the forehead, temples, or base of the neck. They are often triggered by musculoskeletal strain, prolonged poor computer posture, eye strain, dehydration, or psychological fatigue.

Migraines, by contrast, are complex neurovascular events characterized by moderate-to-severe throbbing pain, typically unilateral, lasting 4 to 72 hours. Migraines are frequently aggravated by routine physical activity and accompanied by photophobia (light sensitivity), phonophobia (sound sensitivity), nausea, or sensory auras.`,
    keyPoints: [
      'Rest in a quiet, darkened space with cool forehead compresses during headache episodes.',
      'Maintain regular meal times and consistent hydration; hypoglycemia and dehydration are frequent triggers.',
      'Check desk ergonomic posture: monitor at eye height, relaxed shoulders, and periodic neck stretches.',
      'Avoid relying on daily over-the-counter pain relievers, which can provoke medication-overuse (rebound) headaches.'
    ],
    whenToConsult: [
      'Sudden severe "thunderclap" headache that peaks in intensity within seconds.',
      'Headache accompanied by systemic symptoms: high fever, stiff neck, rash, confusion, or focal weakness.',
      'Headaches following recent head trauma or progressive worsening in individuals over 50 years of age.'
    ],
    sourceName: 'World Health Organization (WHO) — Headache Disorders Fact Sheet',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/headache-disorders',
    iconName: 'Activity'
  },
  {
    id: 'upper-respiratory-infections',
    title: 'Upper Respiratory Symptoms: Common Cold vs. Seasonal Flu',
    category: 'Common Symptoms',
    readTime: '5 min read',
    summary: 'Differentiating viral cold symptoms, influenza, and allergies, with guidance on non-pharmacological comfort and complication monitoring.',
    fullContent: `Acute upper respiratory tract infections (URTIs) involve viral infection of the nasal mucosa, pharynx, larynx, and major airways. Over 200 distinct virus strains can cause the common cold, with rhinoviruses accounting for up to 50% of cases.

The common cold typically presents with a gradual onset: scratchy throat followed by rhinorrhea (runny nose), sneezing, nasal congestion, and mild fatigue. Fever is generally absent or low-grade in adults.

Influenza (the flu), caused by influenza viruses A and B, typically strikes abruptly with high fever (38°C–40°C), severe myalgia (body aches), extreme prostration, dry cough, and chills. Because antibiotics only target bacteria, they have zero therapeutic efficacy against viral colds or influenza and should never be taken without a physician's prescription.`,
    keyPoints: [
      'Hydration is paramount: warm broths, teas, and water thin mucus secretions and soothe irritated pharyngeal tissues.',
      'Steam inhalation and saline nasal sprays provide drug-free relief for blocked sinus passages.',
      'Prioritize strict rest to conserve metabolic energy for immune response.',
      'Practice frequent hand washing and cover coughs to prevent transmission to vulnerable individuals.'
    ],
    whenToConsult: [
      'Shortness of breath, wheezing, or audible whistling when inhaling or exhaling.',
      'Fever higher than 38.5°C (101.3°F) that does not decrease or persists for more than 72 hours.',
      'Chest pain or pressure during normal breathing.',
      'Inability to swallow liquids or severe pain localized to one side of the throat.'
    ],
    sourceName: 'Ministry of Health and Family Welfare (MoHFW India) — Seasonal Illness Guidelines',
    sourceUrl: 'https://main.mohfw.gov.in/',
    iconName: 'Wind'
  },
  {
    id: 'digestive-wellness',
    title: 'Digestive Health & Functional Gut Comfort',
    category: 'Common Symptoms',
    readTime: '4 min read',
    summary: 'The science of gut microbiome diversity, dietary fiber, mild indigestion mechanisms, and when gastrointestinal symptoms require clinical review.',
    fullContent: `The gastrointestinal (GI) tract is a complex metabolic and immunological system housing trillions of commensal microorganisms collectively known as the gut microbiome. The gut communicates bidirectionally with the central nervous system via the "gut-brain axis" mediated by the vagus nerve and neurochemical transmitters.

Mild digestive discomfort—such as post-prandial bloating, transient gas, or mild heartburn—frequently stems from rapid eating, swallowing excess air, consuming high-fat or heavily spiced meals, or psychological stress slowing gastric motility.

Incorporating prebiotic soluble and insoluble dietary fibers gradually supports short-chain fatty acid (SCFA) production, which nourishes colonocytes and preserves the mucosal barrier.`,
    keyPoints: [
      'Chew food thoroughly and eat in a calm, seated environment to reduce aerophagia (air swallowing).',
      'Increase dietary fiber gradually alongside adequate water intake to prevent sudden bloating.',
      'Avoid lying flat immediately after substantial meals; allow 2–3 hours before reclining to prevent acid reflux.',
      'Maintain regular physical activity, which naturally promotes healthy peristaltic gut motility.'
    ],
    whenToConsult: [
      'Black, tarry stools or visible red blood in bowel movements or vomit.',
      'Unexplained, involuntary significant weight loss or persistent loss of appetite.',
      'Severe, sharp, or localized abdominal pain (such as in the lower right abdomen).',
      'Persistent difficulty or painful swallowing (dysphagia).'
    ],
    sourceName: 'National Health Service (NHS UK) — Digestive Health Advice',
    sourceUrl: 'https://www.nhs.uk/live-well/eat-well/digestive-health/',
    iconName: 'ShieldAlert'
  },
  {
    id: 'preventive-screenings',
    title: 'Preventive Health: Annual Checkups & Screening Milestones',
    category: 'Preventive Care',
    readTime: '5 min read',
    summary: 'A proactive overview of routine blood pressure checks, lipid profiles, diabetes screenings, and cancer screening timelines.',
    fullContent: `Preventive healthcare shifts the clinical focus from treating established disease to identifying risk factors and asymptomatic pathology at their earliest, most treatable stages. Many chronic non-communicable diseases—including essential hypertension, type 2 diabetes mellitus, and dyslipidemia—progress silently for years without producing overt symptoms.

Regular monitoring of fundamental vital signs and metabolic biomarkers empowers individuals and primary care physicians to make informed lifestyle modifications or early pharmacological interventions.

Vaccinations across adulthood (such as seasonal influenza, tetanus-diphtheria boosters, and HPV) also represent cornerstone preventive measures with proven epidemiological efficacy.`,
    keyPoints: [
      'Blood Pressure: Annual check starting at age 18 (ideal target generally below 120/80 mmHg).',
      'Fasting Blood Glucose / HbA1c: Periodic screening starting at age 35, or earlier with family risk factors.',
      'Lipid Panel: Fasting cholesterol profile starting in young adulthood to assess cardiovascular atherosclerosis risk.',
      'Immunizations: Maintain up-to-date boosters based on age and clinical occupational guidelines.'
    ],
    whenToConsult: [
      'Schedule a routine annual wellness checkup with a primary care physician to establish your personal baseline.',
      'Discuss specific family histories of cardiovascular events or early-onset malignancies with your physician.'
    ],
    sourceName: 'World Health Organization (WHO) — Noncommunicable Diseases & Prevention',
    sourceUrl: 'https://www.who.int/health-topics/noncommunicable-diseases',
    iconName: 'ClipboardCheck'
  },
  {
    id: 'emergency-red-flags',
    title: 'Critical Red Flags: Recognizing Life-Threatening Emergencies',
    category: 'Emergency Awareness',
    readTime: '6 min read',
    summary: 'A vital educational guide on cardiac, stroke (F.A.S.T.), and respiratory red flags that require calling emergency services without delay.',
    fullContent: `In acute medicine, minutes matter. While many common bodily discomforts are benign and self-limiting, certain signs indicate urgent hemodynamic, neurological, or respiratory compromise. In these circumstances, using internet health assistants or attempting self-treatment is dangerous and must never replace calling professional emergency dispatchers.

Cardiovascular Emergencies: Ischemia of the myocardium (heart attack) typically presents with central crushing chest tightness, pressure, or squeezing that may radiate to the left arm, shoulder, jaw, neck, or upper abdomen, often with cold sweats and nausea.

Stroke (Cerebrovascular Accident): Acute interruption of cerebral blood supply. Rapid recognition using the F.A.S.T. protocol is essential:
- F (Face drooping): One side of the mouth droops when smiling.
- A (Arm weakness): One arm drifts downward when raised.
- S (Speech difficulty): Slurred, garbled speech or inability to formulate words.
- T (Time to call): Immediately contact emergency medical services.`,
    keyPoints: [
      'Never drive yourself to an emergency facility if experiencing suspected cardiac or stroke symptoms; dispatch an ambulance equipped with paramedic life-support.',
      'In India, memorize and dial 112 (National Unified Emergency Number) or 102 (Ambulance).',
      'In the United States and Canada, call 911; in the UK, call 999; in the European Union, call 112.',
      'Never give solid food or liquids to someone who is drowsy, confused, or having trouble breathing.'
    ],
    whenToConsult: [
      'Immediate emergency dispatch (112 / 911 / 999) for any signs of chest pain, stroke, severe respiratory distress, or severe trauma.',
      'Do not delay emergency care while seeking information on this or any other website.'
    ],
    sourceName: 'International Federation of Red Cross & Red Crescent — First Aid Standards',
    sourceUrl: 'https://www.ifrc.org/our-work/disaster-preparedness/first-aid',
    iconName: 'AlertTriangle'
  }
];
