/**
 * All portfolio content lives here so the site can be re-targeted to a
 * different job posting by editing data only — no component changes needed.
 *
 * Every claim below is taken from the resume. Do not add skills or results
 * that cannot be backed up in an interview.
 */

export type Lang = 'th' | 'en'
export type Localized = Record<Lang, string>

export type ProjectTag = 'ai' | 'integration' | 'web' | 'vision'

export interface Project {
  id: string
  year: number
  title: Localized
  problem: Localized
  built: Localized[]
  stack: string[]
  tags: ProjectTag[]
}

export type FitLevel = 'strong' | 'hands-on'

export interface FitItem {
  requirement: Localized
  level: FitLevel
  evidence: Localized
  /** Project ids that back up this claim */
  proof: string[]
  preferred?: boolean
}

export const profile = {
  name: 'Teetach Chuenkamonrat',
  initials: 'TC',
  targetRole: 'Full-Stack & AI Automation Engineer',
  headline: {
    th: 'นักพัฒนา Full-Stack ที่สร้างระบบ AI ใช้งานจริง — เชื่อม LLM, OCR และ LINE เข้ากับเว็บแอป',
    en: 'Full-stack developer who ships practical AI — wiring LLMs, OCR and LINE into real web apps.',
  } satisfies Localized,
  summary: {
    th: 'จบวิทยาการคอมพิวเตอร์ ม.เกษตรศาสตร์ ศรีราชา มีประสบการณ์ฝึกงาน Full-stack และทำโปรเจกต์ที่ใช้ Gemini, ChatGPT API และ Google Vision ร่วมกับ LINE Messaging API ใช้ Claude Code ในการพัฒนาเป็นประจำ',
    en: 'Computer Science graduate (Kasetsart University, Sriracha) with a full-stack internship and hands-on projects combining Gemini, ChatGPT and Google Vision APIs with LINE Messaging API. Uses Claude Code as part of the daily workflow.',
  } satisfies Localized,

  quickFacts: [
    { label: { th: 'การศึกษา', en: 'Education' }, value: { th: 'วท.บ. วิทยาการคอมพิวเตอร์ (2025)', en: 'B.Sc. Computer Science (2025)' } },
    { label: { th: 'ประสบการณ์', en: 'Experience' }, value: { th: 'ฝึกงาน Full-stack 4 เดือน', en: '4-month full-stack internship' } },
    { label: { th: 'โปรเจกต์ AI', en: 'AI projects' }, value: { th: '2 ระบบที่ใช้ LLM API', en: '2 systems built on LLM APIs' } },
    { label: { th: 'ภาษา', en: 'Languages' }, value: { th: 'ไทย (เจ้าของภาษา), อังกฤษ (ใช้งานได้)', en: 'Thai (native), English (working)' } },
  ] satisfies { label: Localized; value: Localized }[],

  /** Contact parts are kept split and joined only on user action (see Contact.tsx). */
  contact: {
    emailUser: 'ch.teetach',
    emailDomain: 'gmail.com',
    phoneParts: ['081', '621', '7947'],
    location: { th: 'ชลบุรี', en: 'Chonburi, Thailand' } satisfies Localized,
  },

  resumePdf: '/Teetach-Chuenkamonrat-Resume.pdf',
  /** Optional portrait in /public (e.g. '/photo.jpg'). Falls back to initials art when empty. */
  photo: '/photo.jpg' as string,

  /** *text* renders as emphasis (see components/Rich.tsx) */
  tagline: {
    th: 'เป้าหมายของผมคือ *เขียนโค้ดที่ดูแลง่าย สะอาด* และ *นำ AI มาช่วยงานจริง* ให้ทีมทำงานได้เร็วขึ้น',
    en: 'My goal is to *write maintainable, clean code* and *put AI to practical use* so teams can move faster.',
  } satisfies Localized,
  aboutIntro: {
    th: 'สวัสดีครับ ผม Teetach *นักพัฒนา Full-stack* ที่ชอบเชื่อม *LLM, OCR และ LINE* เข้ากับระบบที่ใช้งานได้จริง',
    en: "Hello! I'm Teetach, a *full-stack developer* who enjoys wiring *LLMs, OCR and LINE* into systems people actually use.",
  } satisfies Localized,
} as const

export const fit: FitItem[] = [
  {
    requirement: { th: 'ใช้งาน LLM API (Claude, Gemini, OpenAI)', en: 'Practical LLM API experience (Claude, Gemini, OpenAI)' },
    level: 'strong',
    evidence: {
      th: 'ใช้ Gemini API สรุปฉลากยา และ ChatGPT API ดึงเลขทะเบียน อย. จากรูปภาพ',
      en: 'Gemini API to summarise drug labels; ChatGPT API to extract FDA numbers from images.',
    },
    proof: ['pharma-bot', 'fda-validator'],
  },
  {
    requirement: { th: 'REST API, Webhook และการเชื่อมต่อระบบภายนอก', en: 'REST APIs, webhooks & third-party integrations' },
    level: 'strong',
    evidence: {
      th: 'LINE Messaging API (webhook), Google Vision API และสร้าง SearchFDA API เอง',
      en: 'LINE Messaging API webhooks, Google Vision API, and a custom-built SearchFDA API.',
    },
    proof: ['pharma-bot', 'fda-validator', 'solar-shop'],
  },
  {
    requirement: { th: 'เชื่อมต่อ Slack / LINE สำหรับงาน Operations', en: 'Slack / LINE integrations for operations' },
    level: 'strong',
    evidence: {
      th: 'LINE Bot ส่งใบสั่งซื้อ (PO) ไปยังร้านอัตโนมัติเมื่อมีคำสั่งซื้อ และ LINE OA สำหรับคุยกับลูกค้า',
      en: 'LINE bot that pushes purchase orders to the store automatically, plus LINE OA for buyer communication.',
    },
    proof: ['solar-shop'],
  },
  {
    requirement: { th: 'LLM Pipeline สำหรับดึงและจำแนกข้อมูล', en: 'LLM pipelines for data extraction & classification' },
    level: 'strong',
    evidence: {
      th: 'Pipeline: OCR → LLM สรุป → จัดประเภทบรรจุภัณฑ์ → บันทึก MySQL → export ชุดข้อมูล',
      en: 'Pipeline: OCR → LLM summary → packaging classification → MySQL → dataset export.',
    },
    proof: ['pharma-bot'],
  },
  {
    requirement: { th: 'Web App ด้วย React / Next.js', en: 'Web apps with React / Next.js' },
    level: 'hands-on',
    evidence: {
      th: 'ใช้ React และ Nuxt.js (SSR framework แบบเดียวกับ Next.js) — เว็บนี้สร้างด้วย React + TypeScript',
      en: 'React and Nuxt.js (the Vue counterpart of Next.js). This site is built with React + TypeScript.',
    },
    proof: ['solar-shop'],
  },
  {
    requirement: { th: 'Git, PR workflow และ GitHub Actions', en: 'Git, PR workflows & GitHub Actions' },
    level: 'hands-on',
    evidence: {
      th: 'ใช้ Git/SourceTree ในทุกโปรเจกต์ และเว็บนี้มี CI บน GitHub Actions (lint, type-check, build, audit)',
      en: 'Git/SourceTree on every project; this site ships with a GitHub Actions CI (lint, type-check, build, audit).',
    },
    proof: ['solar-shop'],
  },
  {
    requirement: { th: 'Claude Code', en: 'Claude Code' },
    level: 'hands-on',
    evidence: {
      th: 'ใช้ Anthropic Claude Code เป็นเครื่องมือช่วยพัฒนาในงานประจำวัน',
      en: 'Uses Anthropic Claude Code as an AI-assisted development tool day to day.',
    },
    proof: [],
    preferred: true,
  },
  {
    requirement: { th: 'Computer Vision (YOLO, OCR)', en: 'Computer vision (YOLO, OCR)' },
    level: 'hands-on',
    evidence: {
      th: 'OCR ด้วย Google Vision, จำแนกประเภทบรรจุภัณฑ์จากภาพ และ export label ในรูปแบบ YOLO',
      en: 'OCR with Google Vision, image-based packaging classification, and YOLO-format label export.',
    },
    proof: ['pharma-bot'],
    preferred: true,
  },
]

export const projects: Project[] = [
  {
    id: 'pharma-bot',
    year: 2024,
    title: { th: 'LINE Chatbot + เว็บติดฉลากยา', en: 'LINE Chatbot & Web for Pharmaceutical Labels' },
    problem: {
      th: 'ผู้ใช้อ่านฉลากยาแล้วไม่เข้าใจวิธีใช้ คำเตือน และข้อบ่งใช้',
      en: 'People struggle to understand usage, warnings and indications printed on drug labels.',
    },
    built: [
      { th: 'LINE Chatbot รับรูปฉลากยาและตอบกลับเป็นสรุปที่อ่านง่าย', en: 'LINE chatbot that receives a label photo and replies with a plain-language summary.' },
      { th: 'ดึงข้อความด้วย Google Vision API แล้วสรุปด้วย Gemini API', en: 'Text extraction with Google Vision API, summarisation with Gemini API.' },
      { th: 'จำแนกประเภทบรรจุภัณฑ์ (กล่อง ขวด ซอง) และเก็บภาพแบบ Base64 พร้อม metadata ใน MySQL', en: 'Classifies packaging (box, bottle, sachet); stores Base64 images and metadata in MySQL.' },
      { th: 'เว็บจัดการ label และ export เป็น XML / YOLO สำหรับเทรนโมเดล AI', en: 'Web UI to manage labels and export XML / YOLO datasets for model training.' },
    ],
    stack: ['Python', 'PHP', 'JavaScript', 'MySQL', 'Google Vision', 'Gemini API', 'LINE API'],
    tags: ['ai', 'integration', 'vision', 'web'],
  },
  {
    id: 'fda-validator',
    year: 2024,
    title: { th: 'ระบบตรวจสอบเลขทะเบียน อย.', en: 'Thai FDA Number Validator' },
    problem: {
      th: 'การตรวจสอบเลข อย. จากรูปสินค้าด้วยมือใช้เวลานานและผิดพลาดง่าย',
      en: 'Checking FDA registration numbers from product photos by hand is slow and error-prone.',
    },
    built: [
      { th: 'เว็บแอป C# / .NET 8 รับรูปภาพและใช้ ChatGPT API ดึงเลขทะเบียน อย.', en: 'C# / .NET 8 web app that reads uploaded images with the ChatGPT API to extract FDA numbers.' },
      { th: 'เชื่อมกับ SearchFDA API ที่สร้างเอง เพื่อแสดงข้อมูลสินค้าแบบเรียลไทม์', en: 'Integrated a custom-built SearchFDA API to show product details in real time.' },
      { th: 'บันทึกประวัติการค้นหาและผลลัพธ์ลง SQL Server', en: 'Persists search history and results in SQL Server.' },
    ],
    stack: ['C#', '.NET 8', 'SQL Server', 'ChatGPT API', 'REST API'],
    tags: ['ai', 'integration', 'vision', 'web'],
  },
  {
    id: 'solar-shop',
    year: 2025,
    title: { th: 'เว็บ E-commerce + LINE Bot และ LINE OA', en: 'E-commerce Website with LINE Bot & LINE OA' },
    problem: {
      th: 'ร้านขายแผงโซลาร์ต้องรับคำสั่งซื้อและสื่อสารกับลูกค้าผ่านหลายช่องทางด้วยมือ',
      en: 'A solar-panel retailer handled orders and buyer messages manually across channels.',
    },
    built: [
      { th: 'เว็บ E-commerce สำหรับขายแผงโซลาร์ด้วย Nuxt.js / Vue', en: 'E-commerce site for solar panels built with Nuxt.js / Vue.' },
      { th: 'LINE Bot ส่งใบสั่งซื้อ (PO) ไปยังร้านอัตโนมัติเมื่อลูกค้าสั่งซื้อ', en: 'LINE bot automatically sends a purchase order to the store when a customer buys.' },
      { th: 'LINE OA สำหรับสื่อสารกับผู้ซื้อ', en: 'LINE OA for communicating with buyers.' },
    ],
    stack: ['Nuxt.js', 'Vue', 'LINE API', 'Git', 'SourceTree'],
    tags: ['integration', 'web'],
  },
]

export const experience = [
  {
    company: 'Ahead Company Limited',
    role: { th: 'Full-stack Web Developer (ฝึกงาน)', en: 'Full-stack Web Developer (Internship)' } satisfies Localized,
    period: { th: 'เม.ย. – ก.ค. 2024', en: 'Apr – Jul 2024' } satisfies Localized,
    duration: { th: '4 เดือน', en: '4 months' } satisfies Localized,
    focus: 'Full-stack web',
    points: [
      { th: 'ร่วมพัฒนาโปรเจกต์ที่บริษัทมอบหมาย', en: 'Contributed to company-assigned projects.' },
    ] satisfies Localized[],
  },
]

export const education = [
  {
    school: { th: 'มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา', en: 'Kasetsart University, Sriracha Campus' } satisfies Localized,
    degree: { th: 'วท.บ. วิทยาการคอมพิวเตอร์ · GPA 3.16', en: 'B.Sc. Computer Science · GPA 3.16' } satisfies Localized,
    period: '2021 – 2025',
  },
  {
    school: { th: 'โรงเรียนสารสาสน์วิเทศชลบุรี', en: 'Sarasas Witaed Chonburi School' } satisfies Localized,
    degree: { th: 'มัธยมศึกษาปีที่ 1–6', en: 'Secondary school, years 1–6' } satisfies Localized,
    period: '',
  },
]

export const skills: { group: Localized; items: string[] }[] = [
  { group: { th: 'AI & LLM', en: 'AI & LLM' }, items: ['Gemini API', 'ChatGPT API', 'Google Vision OCR', 'Claude Code', 'YOLO datasets'] },
  { group: { th: 'ภาษาโปรแกรม', en: 'Languages' }, items: ['Python', 'JavaScript', 'C#', 'PHP', 'SQL', 'C / C++'] },
  { group: { th: 'เว็บ', en: 'Web' }, items: ['React', 'Vue', 'Nuxt.js', 'Node.js', 'ASP.NET / .NET 8'] },
  { group: { th: 'ฐานข้อมูล & เชื่อมต่อ', en: 'Data & Integrations' }, items: ['MySQL', 'SQL Server', 'REST API', 'LINE Messaging API', 'Webhooks'] },
  { group: { th: 'เครื่องมือ', en: 'Tooling' }, items: ['Git', 'SourceTree', 'Figma'] },
]

export const strengths: Localized[] = [
  { th: 'บริหารเวลาได้ดี ส่งงานตรงกำหนด', en: 'Strong time management — delivers on schedule.' },
  { th: 'เรียนรู้ด้วยตัวเองได้เร็วเมื่อได้รับแนวทาง', en: 'Self-learns quickly when given direction.' },
  { th: 'ปรับตัวเข้ากับสภาพแวดล้อมใหม่ได้เร็ว', en: 'Adapts quickly to new environments.' },
]
