# Teetach Chuenkamonrat — Portfolio

Portfolio ที่ปรับให้ตรงกับตำแหน่ง **Full-Stack & AI Automation Engineer** — React 19 + TypeScript + Vite · ดีไซน์โทนมืดแบบ monochrome (ฟอนต์ mono ขนาดใหญ่, ปุ่ม pill, ตารางที่กลับสีเมื่อ hover) · รองรับภาษาไทย/อังกฤษ

## เริ่มต้นใช้งาน

```bash
npm install
npm run dev        # เปิด dev server
npm run build      # type-check + build ไปที่ dist/
npm run preview    # ดู build จริงพร้อม security headers
npm run lint
```

## โครงสร้าง

```
src/
  data/profile.ts      ← เนื้อหาทั้งหมด (แก้ที่นี่ที่เดียวเมื่อสมัครงานตำแหน่งอื่น)
  i18n/strings.ts      ← ข้อความ UI ภาษาไทย/อังกฤษ
  components/          ← Header, Hero, ProjectCarousel (+ dialog), About, RoleFit, Work, Contact
  hooks/storage.ts     ← localStorage แบบปลอดภัย
security-headers.json  ← security headers (ใช้ร่วมกันทั้ง Vite preview, _headers, vercel.json)
```

### ปรับให้ตรงกับงานใหม่
1. แก้ `profile.targetRole`, `tagline` และ `aboutIntro` ใน `src/data/profile.ts`
2. แก้รายการ `fit` ให้เป็นคุณสมบัติจากประกาศงานใหม่ โดยผูก `proof` กับ id ของโปรเจกต์
3. ใส่เฉพาะสิ่งที่อธิบายได้ตอนสัมภาษณ์เท่านั้น
4. ใส่รูปโปรไฟล์: วางไฟล์ไว้ที่ `public/photo.jpg` แล้วตั้ง `profile.photo = '/photo.jpg'` 

ข้อความใน `*...*` จะแสดงเป็นตัวเอียงเน้น (render ผ่าน React node ไม่ใช้ `dangerouslySetInnerHTML`)

## Security

- **CSP เข้มงวด** — `script-src 'self'` ไม่มี inline script และไม่มี third-party script/tracker
- **ฟอนต์ self-hosted** (`@fontsource`) ไม่มีการเรียก Google Fonts และปิด `assetsInlineLimit` เพื่อไม่ให้ไฟล์ถูกฝังเป็น `data:` URI ซึ่ง CSP จะบล็อก
- **Security headers**: HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, COOP/CORP
  - Netlify / Cloudflare Pages → `dist/_headers` ถูกสร้างตอน build
  - Vercel → `vercel.json` (ถ้าแก้ `security-headers.json` ต้องอัปเดตไฟล์นี้ให้ตรงกัน)
  - GitHub Pages → ใช้ CSP ผ่าน `<meta>` ที่ inject ตอน build
- **ไม่มี backend / ไม่มีฟอร์ม** จึงไม่มี attack surface ฝั่งเซิร์ฟเวอร์ (`form-action 'none'`)
- **ป้องกันบอทเก็บอีเมล/เบอร์โทร** — ประกอบข้อมูลติดต่อเมื่อผู้ใช้กดปุ่มเท่านั้น
- **ไม่เปิดเผยข้อมูลส่วนตัวเกินจำเป็น** (ไม่แสดงวันเกิดและที่อยู่เต็มบนเว็บ)
- ไม่ใช้ `dangerouslySetInnerHTML`, ปิด source map ใน production
- **CI** (GitHub Actions): lint → type-check → build → `npm audit` และ Dependabot อัปเดต dependency อัตโนมัติ

## Deploy

ไฟล์ static ใน `dist/` deploy ได้ทุกที่ เช่น Vercel, Netlify หรือ Cloudflare Pages (แนะนำ เพราะรองรับ security headers)
