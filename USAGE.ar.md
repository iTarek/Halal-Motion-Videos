# استخدام الأداة على ويندوز

## التجهيز

تحتاج إلى Node.js 22 أو أحدث، وPython 3، وFFmpeg مع ffprobe. أضف Python ومجلد FFmpeg إلى PATH ثم افتح طرفية جديدة داخل المشروع:

```powershell
npm run setup
npm run doctor -- --json
npm start
```

افتح http://localhost:4000. يمكنك أيضًا استخدام Start.bat بعد التجهيز.

## الواجهة والمحركات

اختر العربية أو English من القائمة أعلى الصفحة. تحفظ الأداة الاختيار في هذا المتصفح، وتعرض العربية من اليمين إلى اليسار. لغة الواجهة مستقلة عن لغة النصوص في الفيديو وعن لغة التعليق الصوتي؛ اضبط هاتين اللغتين ضمن إعدادات الفيديو.

تتوفر ثلاثة محركات للمخرج:

- **Codex:** ثبّت CLI وسجّل الدخول باستخدام `codex login`. تتعرف الأداة أيضًا على نسخة Codex المرفقة بالتطبيق على ويندوز. يمكن تحديد مسار آخر عبر `CODEX_BIN`.
- **Claude Code:** ثبّته وسجّل الدخول باستخدام `claude auth login`.
- **Antigravity:** ثبّت **Antigravity CLI** الرسمي، ثم شغّل `agy` مرة واحدة وسجّل الدخول. تثبيت IDE وحده لا يكفي. يمكن تحديد مسار CLI عبر `ANTIGRAVITY_BIN`. اختر Antigravity من قائمة محرك الذكاء الاصطناعي داخل صفحة الفيديو.

التثبيت الرسمي لـAntigravity: https://www.antigravity.google/docs/cli/install/

يستخدم الربط تشغيل Antigravity الآلي الرسمي ويتبع صلاحياته المحفوظة. إن رفض تشغيل أوامر المشروع، افتح جلسة `agy` وحدد سماحًا لأوامر الأداة المطلوبة من `/permissions`، مثل `npm run typecheck` و`npm run stills` و`npm run review` و`npm run shot` و`npm run sfx` و`npm run voice`. لا تغيّر الأداة إعدادات حساب Antigravity أو مفاتيحه. مرجع الصلاحيات: https://www.antigravity.google/docs/cli/headless/

## أول تجربة

أنشئ علامة تجارية وفيديو، وأضف الموقع الرسمي للمنتج ضمن المواد. اطلب من المخرج موجز فيديو قصير وانتظر مراجعته قبل بناء المشاهد.

من الطرفية، استبدل الرابط والوصف ببيانات منتجك الحقيقي:

```powershell
npm run video -- make my-app next "إعلان عربي يعرض الميزات الموثقة للمنتج" --engine=antigravity --url=https://YOUR-PRODUCT-SITE --length=10 --language=Arabic --voiceover=off --stop-at=brief
npm run video -- status my-app video01 --json
```

للإكمال بعد مراجعة الموجز:

```powershell
npm run video -- make my-app video01 --engine=antigravity
```

بعد اكتمال البناء، صدّر الفيديو:

```powershell
npm run video -- render my-app video01
```

توجد المخرجات في `out/<brand>/<video>/`. يمكن استخدام `--engine=codex` أو `--engine=claude` بالطريقة نفسها. أوقف أي عمل جارٍ قبل تبديل المحرك؛ يبدأ المحرك الجديد جلسة مستقلة.

## المهارة وChatGPT

المحرك الافتراضي هو Claude، ولا يعمل Codex أو Antigravity إلا عند اختياره. يُشغَّل مخرجا Codex وAntigravity مع إيقاف فحص الصلاحيات الخاص بهما (`--dangerously-bypass-approvals-and-sandbox` و`--dangerously-skip-permissions`). على macOS تشغّل لوحة التحكم Codex داخل بيئة معزولة خاصة بها: الكتابة داخل المشروع فقط، ولا قراءة لمفاتيح API أو ملفات المتصفح أو مجلد المستخدم، وتنفّذ اللوحة أمري voice وshot نيابةً عنه. يعمل Antigravity دون قيود على كل الأنظمة، لأنه يحفظ تسجيل دخوله في سلسلة مفاتيح macOS ولا يمكن فتحها له وحده، وكذلك Codex على ويندوز ولينكس؛ وتعرض الصفحة حينها تنبيه «بلا حواجز أمان». بعد تحديث الأداة أعد تشغيل لوحة التحكم. للتشغيل المنفصل بصلاحيات محددة بدل الموافقة العامة، استخدم `npm run antigravity-permissions`.

لتثبيت تعليمات الأداة لدى الوكلاء المحليين: `npm run agent-skill`، ثم ابدأ جلسة جديدة. داخل المشروع تُكتشف المهارة المحلية مباشرة. يتوفر مشغّل دون Bash:

```powershell
node .agents/skills/halal-motion-videos/scripts/video.mjs doctor --json
```

إذا نُسخت المهارة إلى مجلد آخر، اضبط `HALAL_MOTION_VIDEOS` على مسار هذا المشروع.

يعمل محرك Codex محليًا، وهذا لا يربط الأداة تلقائيًا بمحادثة ChatGPT العادية. الربط المباشر يحتاج إضافة MCP منفصلة.
