# Property.ly 🏠

منصة عقارية ثنائية اللغة (عربي/إنجليزي) تنطلق من ليبيا وتمتد عبر الشرق الأوسط ثم العالم.
A bilingual (Arabic/English) real estate platform starting from Libya and spanning the Middle East, then the world.

> Live: [property.ly](https://property.ly)

## ✨ الميزات / Features

- 🌍 ثنائية اللغة بالكامل: `/ar` (RTL) و `/en` (LTR) — Fully bilingual with `/ar` (RTL) and `/en` (LTR)
- 🎨 تصميم فاخر من shadcn/ui + Magic UI (كحلي وذهبي) — Premium shadcn/ui + Magic UI design (navy & gold)
- 🔎 بحث وفلاتر متعددة — Search with multiple filters
- 🏘️ تصفح المدن والعقارات المميزة — Cities and featured properties
- 💱 أسعار الصرف اليومية — Daily exchange rates
- 📊 مؤشرات السوق من بيانات حكومية مفتوحة — Market stats from open government data
- 📱 متجاوب كلياً مع وضع ليلي — Fully responsive with dark mode

## 🛠 التقنية / Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack, Cache Components) |
| Language | TypeScript |
| UI | shadcn/ui (Base UI) + Magic UI + Tailwind CSS 4 |
| i18n | next-intl (ar/en, RTL support) |
| Theme | next-themes (dark/light) |
| Deployment | Vercel |

## 🚀 التشغيل / Getting Started

```bash
npm install
npm run dev
```

- Arabic: <http://localhost:3000/ar>
- English: <http://localhost:3000/en>

## 📁 البنية / Structure

```
messages/            # ar.json + en.json (translations)
src/
├── app/[locale]/    # bilingual routes
├── components/      # shadcn + Magic UI + site components
├── data/            # Phase-0 seed data
├── i18n/            # next-intl routing & request config
├── lib/             # utils (formatting)
└── proxy.ts         # locale detection (Next 16 proxy)
```

## 🗺 خارطة الطريق / Roadmap

- [x] Phase 0 — الأساس: i18n، التصميم، الصفحة الرئيسية (Phase 0: foundation, i18n, design, home page)
- [ ] Phase 1 — MVP: قاعدة بيانات، إضافة إعلانات، تصفح وفلاتر، تفاصيل العقار، خريطة
- [ ] Phase 2 — البيانات: تغذية الوسطاء، scrapers مراقبة، مؤشرات السوق، أسعار صرف حية
- [ ] Phase 3 — النمو: SEO ثنائي اللغة، صفحات مدن
- [ ] Phase 4 — الربح: إعلانات مميزة، اشتراكات الوسطاء
- [ ] Phase 5 — التوسع الغربي: أمريكا/كندا/بريطانيا

## 📄 الترخيص / License

[MIT](./LICENSE)
