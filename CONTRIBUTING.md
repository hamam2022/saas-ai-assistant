# 🤝 دليل المساهمة - Contributing Guide

نرحب بمساهماتكم في تطوير **AI WhatsApp Assistant**! هذا الدليل سيساعدك على فهم كيفية المساهمة بشكل فعال.

## 🎯 أنواع المساهمات المرحب بها

### 🐛 الإبلاغ عن الأخطاء
- استخدم [GitHub Issues](https://github.com/your-username/saas-ai-assistant/issues)
- قدم وصف مفصل للخطأ
- أرفق screenshots إذا كان ذلك مفيداً
- حدد خطوات إعادة إنتاج الخطأ

### ✨ اقتراح مميزات جديدة
- ابدأ بفتح [Discussion](https://github.com/your-username/saas-ai-assistant/discussions)
- اشرح المميزة المقترحة بالتفصيل
- وضح الفائدة من هذه المميزة
- قدم أمثلة على الاستخدام

### 🔧 تحسين الكود
- إصلاح الأخطاء
- تحسين الأداء
- إضافة تعليقات ووثائق
- تحديث المكتبات

### 📚 تحسين الوثائق
- تحديث README
- إضافة أمثلة
- ترجمة المحتوى
- إصلاح الأخطاء الإملائية

## 🚀 كيفية المساهمة

### 1. إعداد البيئة المحلية

```bash
# استنساخ المشروع
git clone https://github.com/your-username/saas-ai-assistant.git
cd saas-ai-assistant

# تثبيت المتطلبات
npm install
cd apps/backend && npm install
cd ../frontend && npm install

# إعداد متغيرات البيئة
cp apps/backend/.env.example apps/backend/.env
# قم بتعديل .env بالمفاتيح المطلوبة

# تشغيل النظام
npm run dev
```

### 2. إنشاء Branch جديد

```bash
# إنشاء branch للمميزة الجديدة
git checkout -b feature/amazing-feature

# أو للإصلاح
git checkout -b fix/bug-description
```

### 3. تطوير التعديلات

```bash
# تطوير التعديلات
# اختبار التعديلات محلياً
npm test

# التأكد من جودة الكود
npm run lint
npm run format
```

### 4. Commit التغييرات

```bash
git add .
git commit -m "feat: add amazing new feature"

# أو للإصلاحات
git commit -m "fix: resolve authentication issue"
```

### 5. Push ورفع Pull Request

```bash
git push origin feature/amazing-feature
```

ثم اذهب إلى GitHub وافتح Pull Request.

## 📝 معايير الكود

### JavaScript/TypeScript
- استخدم **TypeScript** للكود الجديد
- اتبع **ESLint** configuration الموجودة
- استخدم **Prettier** للتنسيق
- أضف **type annotations** واضحة

### التعليقات
```javascript
/**
 * تحليل الصورة باستخدام OpenAI Vision API
 * @param imageBuffer - بيانات الصورة
 * @param language - لغة التحليل (افتراضي: العربية)
 * @returns وصف الصورة بالعربية
 */
async function analyzeImage(imageBuffer, language = 'ar') {
    // Implementation here
}
```

### تسمية الملفات والمتغيرات
```javascript
// أسماء الملفات: camelCase
userProfileManager.js
imageAnalysisService.js

// أسماء المتغيرات: camelCase
const userProfile = {};
const analysisResult = {};

// أسماء الثوابت: SNAKE_CASE
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const DEFAULT_LANGUAGE = 'ar';
```

## 🧪 الاختبارات

### تشغيل الاختبارات
```bash
# تشغيل جميع الاختبارات
npm test

# تشغيل اختبارات محددة
npm test -- --grep "Image Analysis"

# تشغيل مع coverage
npm run test:coverage
```

### كتابة اختبارات جديدة
```javascript
describe('Image Analysis Service', () => {
    it('should analyze image correctly', async () => {
        const result = await analyzeImage(testImageBuffer);
        expect(result).toHaveProperty('description');
        expect(result.description).toBeTruthy();
    });
});
```

## 📋 معايير Pull Request

### عنوان PR
```
feat: add voice message transcription
fix: resolve database connection issue
docs: update installation guide
refactor: improve error handling
```

### وصف PR
يجب أن يشمل:
- **ما الذي تم تغييره**
- **لماذا تم التغيير**
- **كيفية الاختبار**
- **Screenshots** إذا كان مناسباً

### مثال:
```markdown
## التغييرات
- إضافة خدمة تحويل الرسائل الصوتية لنص
- دعم تنسيقات MP3 و WAV
- تحسين دقة التحويل للعربية

## السبب
- طلب من المستخدمين لدعم الرسائل الصوتية
- تحسين تجربة المستخدم

## الاختبار
1. أرسل رسالة صوتية للبوت
2. تحقق من التحويل الصحيح للنص
3. اختبر مع ملفات صوتية مختلفة
```

## 🔍 مراجعة الكود

### معايير المراجعة
- **الوظائف**: هل تعمل كما هو متوقع؟
- **الأداء**: هل هناك تحسينات ممكنة؟
- **الأمان**: هل هناك ثغرات أمنية؟
- **الوضوح**: هل الكود قابل للفهم؟
- **الاختبارات**: هل تغطي الوظائف الجديدة؟

### عملية المراجعة
1. **مراجعة تلقائية**: تشغيل الاختبارات والـ linting
2. **مراجعة بشرية**: من قبل المطورين الآخرين
3. **اختبار integration**: في بيئة staging
4. **موافقة نهائية**: من maintainers

## 🏷 نظام Releases

### Semantic Versioning
- **MAJOR** (1.0.0): تغييرات جذرية غير متوافقة
- **MINOR** (0.1.0): مميزات جديدة متوافقة
- **PATCH** (0.0.1): إصلاحات متوافقة

### مثال changelog
```markdown
## [1.2.0] - 2025-08-05

### Added
- دعم الرسائل الصوتية
- واجهة إدارة المستخدمين

### Fixed
- مشكلة الاتصال بقاعدة البيانات
- تحسين دقة تحليل الصور

### Changed
- تحديث UI للوحة التحكم
```

## 🆘 الحصول على المساعدة

### قنوات التواصل
- **GitHub Issues**: للأخطاء والمشاكل التقنية
- **GitHub Discussions**: للأسئلة والمناقشات
- **Discord**: [رابط الخادم](#) للدردشة المباشرة

### نصائح للحصول على مساعدة فعالة
1. **ابحث أولاً**: قد تكون المشكلة محلولة مسبقاً
2. **كن محدداً**: قدم تفاصيل كافية
3. **أرفق الكود**: استخدم code blocks
4. **كن صبوراً**: قد نحتاج وقت للرد

## 🙏 شكر وتقدير

نقدر جهود جميع المساهمين في هذا المشروع. مساهمتك، مهما كانت صغيرة، تساعد في تحسين المشروع للجميع.

### قائمة المساهمين
يمكنك رؤية جميع المساهمين في [صفحة Contributors](https://github.com/your-username/saas-ai-assistant/graphs/contributors).

---

**شكراً لك على مساهمتك! 🚀**
