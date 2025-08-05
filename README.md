#  AI WhatsApp Assistant - مساعد واتساب ذكي

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![WhatsApp Web](https://img.shields.io/badge/WhatsApp-Web%20API-25D366.svg)](https://web.whatsapp.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991.svg)](https://openai.com/)

##  نظرة عامة

**AI WhatsApp Assistant** هو نظام مساعد ذكي متطور يدمج قوة الذكاء الاصطناعي مع WhatsApp لتوفير تجربة تفاعلية شاملة. يدعم تحليل الصور، الرسائل الصوتية، والردود الطبيعية باللغة العربية.

##  المميزات الرئيسية

###  الذكاء الاصطناعي
- **تحليل الصور المتقدم**: قراءة وفهم محتوى الصور باللغة العربية
- **تحليل الصوتيات**: تحويل الرسائل الصوتية إلى نص وتحليلها
- **ردود طبيعية**: استجابات ذكية باللغة العربية مع فهم السياق
- **تخصيص الشخصية**: ملفات تعريف مخصصة لكل مستخدم

###  واجهات المستخدم
- **لوحة تحكم ويب**: إدارة شاملة للبوت عبر الويب
- **واجهة المحادثة**: تفاعل مباشر مع المستخدمين
- **نظام إدارة المستخدمين**: ملفات تعريف وتفضيلات
- **مراقبة الأداء**: تتبع الاستخدام والإحصائيات

###  التحكم عن بُعد
- **إيقاف/تشغيل البوت** من أي مكان
- **مراقبة الحالة** في الوقت الفعلي
- **إدارة الردود المخصصة**
- **تحديث الإعدادات** عن بُعد

##  التقنيات المستخدمة

| التقنية | الاستخدام | الإصدار |
|---------|-----------|---------|
| **Node.js** | Backend Runtime | 18+ |
| **Express.js** | Web Framework | 4.18+ |
| **WhatsApp Web.js** | WhatsApp Integration | Latest |
| **OpenAI API** | AI Processing | GPT-4 |
| **PM2** | Process Manager | 5.3+ |

##  التشغيل السريع

### 1. تثبيت المتطلبات
`ash
# استنساخ المشروع
git clone https://github.com/hamam2022/saas-ai-assistant.git
cd saas-ai-assistant

# تثبيت الحزم
npm install
cd apps/backend && npm install
cd ../../frontend-simple && npm install
`

### 2. إعداد المتغيرات
`ash
# في مجلد apps/backend
cp .env.example .env
# أضف OPENAI_API_KEY الخاص بك
`

### 3. تشغيل النظام
`ash
# تشغيل الخادم الرئيسي
npm start

# أو تشغيل مع PM2
pm2 start simple-server.js --name "whatsapp-bot"
pm2 start bot-manager.js --name "bot-manager"
`

### 4. الوصول للواجهات
- **لوحة التحكم**: http://localhost:3001
- **واجهة المحادثة**: http://localhost:3001/chat
- **إدارة البوت**: http://localhost:3002

##  هيكل المشروع

`
saas-ai-assistant/
 apps/
    backend/
        simple-server.js      # الخادم الرئيسي
        bot-manager.js        # مدير البوت
        package.json          # متطلبات Backend
        public/
            index.html        # لوحة التحكم
            chat.html         # واجهة المحادثة
            control.html      # تحكم البوت
 frontend-simple/
    package.json              # متطلبات Frontend
    pages/
        index.tsx             # الصفحة الرئيسية
 README.md                     # التوثيق
`

##  الإعدادات المتقدمة

### متغيرات البيئة
`env
OPENAI_API_KEY=your_openai_key_here
PORT=3001
BOT_MANAGER_PORT=3002
NODE_ENV=production
`

##  النشر

### Local Development
`ash
npm run dev
`

### Production Deployment
`ash
# استخدام PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
`

##  المساهمة

نرحب بالمساهمات! يرجى قراءة [دليل المساهمة](CONTRIBUTING.md) للمزيد من التفاصيل.

##  الترخيص

هذا المشروع مرخص تحت [MIT License](LICENSE).

##  الإنجازات

-  **تشغيل مستقر**: يعمل بموثوقية عالية
-  **ردود ذكية**: فهم السياق والرد المناسب
-  **تحكم عن بُعد**: إدارة كاملة من الويب
-  **دعم الوسائط**: صور ورسائل صوتية
-  **واجهات متعددة**: تطبيق ويب وAPI

---

<div align="center">

**صُنع بـ  للمجتمع العربي**

[ إعطاء نجمة](https://github.com/hamam2022/saas-ai-assistant)  [ إبلاغ عن خطأ](https://github.com/hamam2022/saas-ai-assistant/issues)  [ اقتراح ميزة](https://github.com/hamam2022/saas-ai-assistant/issues)

</div>
