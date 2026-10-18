// Dashboard chrome only: never translate project data, documents, chat or logs.
(() => {
  const ar = {
    'AI Director stopped twice in a row — read lastReply / the chat, then `make` again to retry.':'توقف المخرج مرتين متتاليتين. اقرأ الرد الأخير في المحادثة، ثم شغّل make مجددًا لإعادة المحاولة.',
    'Director asked something before writing the brief — answer with `ask`; autopilot continues after.':'طلب المخرج معلومات قبل كتابة الموجز. أجب باستخدام ask ويُستأنف التشغيل التلقائي بعدها.',
    'Brief ready (BRIEF.md). Review it, then `make` again to continue, or `ask` for changes.':'الموجز جاهز (BRIEF.md). راجعه ثم استخدم make للإكمال أو ask لطلب تعديلات.',
    'No storyboard frames yet — Director needs an answer: reply with `ask`; autopilot continues after.':'لا توجد لقطات للوحة المشاهد بعد. يحتاج المخرج إجابة باستخدام ask ويُستأنف التشغيل التلقائي بعدها.',
    'Storyboard ready (4 key frames). Review them, then `make` again to build, or `ask` for changes.':'لوحة المشاهد جاهزة (أربع لقطات). راجعها ثم استخدم make للبناء أو ask لطلب تعديلات.',
    'The selected Director engine is not ready':'محرك المخرج المختار غير جاهز',
    'AI Director stopped twice in a row — read lastReply / the chat, then':'توقف المخرج مرتين متتاليتين. اقرأ الرد الأخير في المحادثة، ثم استخدم',
    'again to retry.':'مجددًا لإعادة المحاولة.',
    'Director asked something before writing the brief — answer with':'طلب المخرج معلومات قبل كتابة الموجز. أجب باستخدام',
    '; autopilot continues after.':'؛ ويستأنف التشغيل التلقائي بعدها.',
    'Brief ready (BRIEF.md). Review it, then':'الموجز جاهز (BRIEF.md). راجعه ثم استخدم',
    'again to continue, or':'مجددًا للإكمال، أو','for changes.':'لطلب تعديلات.',
    'No storyboard frames yet — Director needs an answer: reply with':'لا توجد لقطات للوحة المشاهد بعد. يحتاج المخرج إجابة باستخدام',
    'Storyboard ready (4 key frames). Review them, then':'لوحة المشاهد جاهزة (أربع لقطات). راجعها ثم استخدم',
    'again to build, or':'مجددًا للبناء، أو','Built. Review it in Studio or render it.':'اكتمل البناء. راجعه في الاستوديو أو صدّره.',
    'Interface language':'لغة الواجهة',
    'Install FFmpeg for Windows from ffmpeg.org and add its bin folder to PATH (ffmpeg + ffprobe).':'ثبّت FFmpeg لويندوز من ffmpeg.org وأضف مجلد bin إلى PATH ليعمل ffmpeg وffprobe.',
    'Install Python 3 from python.org with Add Python to PATH enabled, then run':'ثبّت Python 3 من python.org وفعّل Add Python to PATH، ثم شغّل',
    'Install Codex CLI.':'ثبّت Codex CLI.',
    'Install Antigravity CLI from antigravity.google/download, then run':'ثبّت Antigravity CLI من antigravity.google/download، ثم شغّل',
    'once to sign in. The IDE alone is not the CLI.':'مرة واحدة لتسجيل الدخول. تثبيت IDE وحده لا يوفر CLI.',
    'Add it in the dashboard → Settings (or set ELEVENLABS_API_KEY).':'أضفه من لوحة التحكم ← الإعدادات، أو اضبط ELEVENLABS_API_KEY.',
    'Install and set up Claude Code (claude.com/claude-code).':'ثبّت Claude Code وجهّزه من claude.com/claude-code.',
    'Run':'شغّل','once to sign in.':'مرة واحدة لتسجيل الدخول.',
    'Codex CLI, Claude Code CLI or Antigravity CLI is required to power the AI Director.':'يتطلب المخرج Codex CLI أو Claude Code CLI أو Antigravity CLI.',
    'Set up Codex CLI, Claude Code or Antigravity CLI to chat with the Director':'جهّز Codex CLI أو Claude Code أو Antigravity CLI للتحدث مع المخرج',
    'Install and log in to Codex CLI, Claude Code or Antigravity CLI. Everything else here works without it: Preview, Render, screenshots, sound design and voice-over (from the command line).':'ثبّت Codex CLI أو Claude Code CLI أو Antigravity CLI وسجّل الدخول. تعمل أدوات المعاينة والتصدير والتقاط الصور والصوت من الطرفية دون المخرج.',
    'npm packages':'حزم npm',"Remotion's headless Chrome":'متصفح Chrome للتصدير','ElevenLabs API key':'مفتاح ElevenLabs',
    'installed':'مثبّت','missing':'غير موجود','not installed':'غير مثبّت','not found':'غير موجود','not set (optional)':'غير مضبوط (اختياري)',
    'python3 not found':'لم يُعثر على Python','numpy/scipy missing':'مكتبتا numpy/scipy غير موجودتين','logged in':'مسجّل الدخول','not logged in':'لم يُسجّل الدخول',
    'everything':'جميع الوظائف','rendering, stills, screenshots':'التصدير والصور الثابتة والتقاط الصور','audio mastering, voice-over timing':'معالجة الصوت وتوقيت التعليق الصوتي',
    'sound design (npm run sfx)':'تصميم الصوت (npm run sfx)','the Director chat (Claude engine)':'محادثة المخرج (Claude)','the Director chat (Codex engine)':'محادثة المخرج (Codex)',
    'the Director chat (Antigravity engine)':'محادثة المخرج (Antigravity)','voice-over':'التعليق الصوتي','for':'من أجل',
    'installed · sign-in checked on first run':'مثبّت · يُتحقق من تسجيل الدخول عند التشغيل الأول',
    'Write something first.':'اكتب رسالة أولًا.','Unknown video.':'الفيديو غير موجود.','Unknown brand.':'العلامة التجارية غير موجودة.',
    "That doesn't look like a web address.":'أدخل رابط موقع إلكتروني صحيحًا.',"That folder doesn't exist on this device.":'هذا المجلد غير موجود على الجهاز.',
    "Pick the product's own folder, not the whole disk or home folder.":'اختر مجلد المنتج نفسه؛ لا تختَر القرص بأكمله أو مجلد المستخدم.',
    "That's this video machine itself — pick the product's folder.":'هذا مجلد أداة الفيديو نفسها؛ اختر مجلد المنتج.',
    'Names are lowercase letters, numbers and dashes, starting with a letter.':'استخدم أحرفًا إنجليزية صغيرة وأرقامًا وشرطات، وابدأ بحرف.',
    'Stop the Director before changing engines.':'أوقف المخرج قبل تغيير المحرك.','The Director is already working on this video.':'يعمل المخرج على هذا الفيديو بالفعل.',
    'Add your ElevenLabs API key first.':'أضف مفتاح ElevenLabs أولًا.','Bad upload.':'الملف المرفوع غير صالح.',"Can't delete that.":'لا يمكن حذف هذا الملف.',
    'Bad format.':'الأبعاد غير صالحة.','Frames look like 0-89.':'اكتب نطاق الإطارات مثل 0-89.','Frames look like 0, 60, 120.':'اكتب أرقام الإطارات مثل 0, 60, 120.',
    'A voice ID is letters and numbers, like NOpBlnGInO9m6vDvFkFC.':'يتكون معرّف الصوت من أحرف وأرقام، مثل NOpBlnGInO9m6vDvFkFC.',
    'No such job.':'المهمة غير موجودة.','A render is running for this — cancel it first.':'يجري تصدير هذا الفيديو؛ ألغِ التصدير أولًا.',
    'The Director is working on this — stop it first.':'يعمل المخرج على هذا الفيديو؛ أوقفه أولًا.',
    'Eleven v4 (best quality)':'Eleven v4 (أفضل جودة)','Eleven v4 Turbo (fast)':'Eleven v4 Turbo (سريع)',
    'video machine':'صناعة فيديوهات متحركة','Studio off':'الاستوديو متوقف','Studio running':'الاستوديو يعمل',
    'Settings':'الإعدادات','Open Studio':'فتح الاستوديو','New brand':'علامة تجارية جديدة','Brands':'العلامات التجارية','Render queue':'قائمة التصدير',
    'Brand (app or product)':'العلامة التجارية (تطبيق أو منتج)','Video name':'اسم الفيديو','— optional, defaults to the next videoNN':'— اختياري، يُستخدم اسم الفيديو التالي تلقائيًا',
    'Cancel':'إلغاء','Create':'إنشاء','Close':'إغلاق','Save':'حفظ','Delete':'حذف','Delete?':'هل تريد الحذف؟','Type':'اكتب','to confirm':'للتأكيد',
    'Creates the brand kit and its first video from the starter.':'ينشئ هوية العلامة التجارية وفيديوها الأول من القالب.',
    "Uses this brand's colours, fonts and files.":'يستخدم ألوان هذه العلامة وخطوطها وملفاتها.',
    'Appearance':'المظهر','How this dashboard looks. System follows your device.':'مظهر لوحة التحكم. يتبع خيار النظام إعدادات جهازك.',
    'Appearance is remembered in this browser. Voice-over settings are saved on this device in':'يُحفظ المظهر في هذا المتصفح. تُحفظ إعدادات التعليق الصوتي على هذا الجهاز في',
    '(not in git, never shown to the Director).':'(خارج Git ولا تُعرض على المخرج).',
    'System':'النظام','Light':'فاتح','Dark':'داكن','ElevenLabs voice-over':'التعليق الصوتي عبر ElevenLabs',
    'The Director uses this to narrate videos with Eleven v4 — emotions, pacing and non-verbal cues included.':'يستخدم المخرج Eleven v4 للتعليق الصوتي، مع التحكم في التعبير والإيقاع والمؤثرات الصوتية.',
    'API key':'مفتاح API','Default voice ID':'معرّف الصوت الافتراضي','Model':'النموذج','System check':'فحص النظام',
    'What this device has for each part of the machine. Run':'يفحص متطلبات تشغيل الأداة على هذا الجهاز. شغّل',
    "to install what's missing.":'لتثبيت المتطلبات الناقصة.','Checking…':'جارٍ الفحص…','Test voice':'تجربة الصوت',
    'No brands yet.':'لا توجد علامات تجارية بعد.','Make a motion video':'أنشئ فيديو متحركًا',
    'Every video lives in a brand. Pick one from the sidebar, or start a new brand.':'ينتمي كل فيديو إلى علامة تجارية. اختر فيديو من القائمة الجانبية أو أنشئ علامة جديدة.',
    'New brand, or + next to a brand for another video.':'أنشئ علامة جديدة، أو اضغط + بجوار علامة لإضافة فيديو.',
    'Build':'بناء','Ask the Director to fill the brief, copy and scenes.':'اطلب من المخرج كتابة الموجز والنصوص والمشاهد.',
    'Preview & render':'المعاينة والتصدير','Scrub it in Studio, then render MP4s here.':'عاين الفيديو في الاستوديو، ثم صدّره بصيغة MP4 هنا.',
    'Pick a video to preview and render it here.':'اختر فيديو لمعاينته وتصديره هنا.','Code':'الكود','Files':'الملفات','Output':'المخرجات','Director':'المخرج',
    'Delete this video and all its files':'حذف هذا الفيديو وجميع ملفاته','Chat with your AI Director':'تحدث مع مخرجك الذكي',
    "Describe the video or give notes. It edits this video's files and Studio updates live.":'صف الفيديو أو اكتب ملاحظاتك. يعدّل المخرج ملفاته وتتحدث المعاينة مباشرة.',
    'Message Director…':'اكتب رسالة للمخرج…','Send':'إرسال','Thinking':'مستوى التفكير','Medium':'متوسط','High':'عالٍ','Extra high':'عالٍ جدًا',
    'Enter to send · Shift+Enter for a new line':'Enter للإرسال · Shift+Enter لسطر جديد','Video settings':'إعدادات الفيديو',
    'The Director follows these automatically':'يتبع المخرج هذه الإعدادات تلقائيًا',
    'Tell your Director what this video should be.':'أخبر المخرج بما تريد عرضه في هذا الفيديو.',
    'It writes the brief first and waits for your OK, then builds the scenes and checks its own frames. Add the product link and files under Materials so it uses the real thing.':'يكتب الموجز أولًا وينتظر موافقتك، ثم يبني المشاهد ويراجعها. أضف رابط المنتج وملفاته ضمن المواد ليعتمد على مصادره الحقيقية.',
    'App Store promo that shows the main features':'إعلان لمتجر التطبيقات يعرض الميزات الأساسية','Teaser for Instagram Reels':'فيديو تشويقي لريلز إنستغرام',
    'Explain how the app works in 3 simple steps':'اشرح طريقة استخدام التطبيق في ثلاث خطوات بسيطة',
    'Step 1 of 3 · Brief':'المرحلة ١ من ٣ · الموجز','Step 2 of 3 · Storyboard':'المرحلة ٢ من ٣ · لوحة المشاهد','Step 3 of 3 · Build':'المرحلة ٣ من ٣ · البناء',
    'Back to brief':'العودة إلى الموجز','The Director goes back to editing the brief only':'يعود المخرج لتعديل الموجز فقط','New chat':'محادثة جديدة',
    'Clear this chat and start a fresh Director session':'مسح المحادثة وبدء جلسة جديدة مع المخرج',
    'Clear this chat and start a fresh Director session? Files stay as they are.':'هل تريد مسح المحادثة وبدء جلسة جديدة مع المخرج؟ تبقى الملفات كما هي.',
    'Working…':'جارٍ العمل…','Stop':'إيقاف','Brief ready for review':'الموجز جاهز للمراجعة',
    'Read it under Docs below, then approve — or reply with changes. Next, the Director shows you 4 key frames before building everything.':'اقرأ الموجز في المستندات أدناه، ثم وافق عليه أو اطلب تعديلات. يعرض المخرج بعدها أربع لقطات أساسية قبل بناء الفيديو.',
    'Approve brief':'الموافقة على الموجز','Approve storyboard & build':'الموافقة على لوحة المشاهد والبناء',
    'Is this the right look? Approve and the Director builds the whole video in this style, or reply with changes.':'هل هذا هو المظهر المطلوب؟ وافق لبناء الفيديو بهذا الأسلوب أو اكتب التعديلات.',
    'No AI Director engine ready on this machine':'لا يوجد محرك ذكاء اصطناعي جاهز على هذا الجهاز',
    'Codex CLI (ChatGPT) or Claude Code CLI is required to power the AI Director.':'يتطلب المخرج Codex CLI أو Claude Code CLI.',
    'Install and log in to Codex CLI or Claude Code. Everything else here works without it: Preview, Render, screenshots, sound design and voice-over (from the command line).':'ثبّت Codex CLI أو Claude Code وسجّل الدخول. يمكن تشغيل أدوات المعاينة والتصدير والتقاط الصور وتصميم الصوت والتعليق الصوتي دون المخرج.',
    'Set up Codex CLI or Claude Code to chat with the Director':'جهّز Codex CLI أو Claude Code للتحدث مع المخرج',
    'Materials':'المواد','The Director builds from these':'يعتمد المخرج على هذه المواد','Website':'الموقع الإلكتروني','Project folder':'مجلد المشروع','Open':'فتح',
    'Open in file manager':'فتح في مدير الملفات',"That folder isn't there anymore.":'هذا المجلد لم يعد موجودًا.',
    'The Director can read it and copy assets out — never changes it. Copy the folder path from your file manager.':'يقرأ المخرج المجلد وينسخ مواده دون تعديله. انسخ مساره من مدير الملفات.',
    'Upload to':'رفع إلى','This video only':'هذا الفيديو فقط','Drop files here':'أفلت الملفات هنا','or click to choose':'أو اضغط لاختيارها',
    'Logo, screenshots, fonts, sounds — sorted into img/, fonts/, sfx/ automatically':'شعار وصور وخطوط وأصوات — تُرتّب تلقائيًا في img/ وfonts/ وsfx/',
    'Upload failed':'فشل رفع الملفات','Download':'تنزيل','Preview':'المعاينة','opens in Studio':'تفتح في الاستوديو','Render':'التصدير','All':'الكل',
    'vertical':'عمودي','horizontal':'أفقي','square':'مربع','portrait':'طولي','Quick check · first 3 s':'فحص سريع · أول ٣ ثوانٍ',
    'Film look · motion blur':'مظهر سينمائي · ضبابية الحركة','(~8× slower)':'(أبطأ بنحو ٨ مرات)',
    'Blends 8 sub-frames per frame so fast moves blur like a real camera. Rendering takes about 8× longer.':'يدمج ثماني لقطات فرعية لكل إطار لمحاكاة ضبابية الحركة. يستغرق التصدير نحو ثمانية أضعاف الوقت.',
    'Render MP4':'تصدير MP4','Stills':'صور ثابتة','Make stills':'إنشاء صور ثابتة','Stills: 0, 60, 120':'إطارات الصور: 0, 60, 120',
    'Outputs':'المخرجات','Nothing rendered yet — renders and stills show up here.':'لا توجد مخرجات بعد. تظهر الفيديوهات والصور الثابتة هنا.',
    'Brief':'الموجز','Brand kit':'هوية العلامة','Docs':'المستندات','Hide log':'إخفاء السجل','Log':'السجل',
    'running':'قيد التشغيل','queued':'في الانتظار','waiting':'في الانتظار','done':'مكتمل','failed':'فشل','cancelled':'ملغى','paused':'متوقف مؤقتًا','stopped':'متوقف',
    'Renders and stills you start appear here with live progress.':'تظهر هنا مهام تصدير الفيديوهات والصور مع متابعة تقدمها.',
    'Starting Studio…':'جارٍ تشغيل الاستوديو…',"Studio didn't start — try `npm run studio` in a terminal.":'لم يبدأ الاستوديو. جرّب npm run studio في الطرفية.',
    'Style':'الأسلوب','Saved styles work on any video, any brand':'يمكن تطبيق الأساليب المحفوظة على أي فيديو أو علامة','Choose':'اختيار','— No style (new) —':'— دون أسلوب (جديد) —',
    'Name':'الاسم','Description':'الوصف','e.g. Calm & cinematic':'مثلًا: هادئ وسينمائي',
    'Describe the look and feel: motion, pacing, transitions, typography, mood, sound…':'صف المظهر: الحركة والإيقاع والانتقالات والخطوط والأجواء والصوت…',
    'Save with the same name to update it · a new name makes a new style · the Director uses it from your next message':'احفظ بالاسم نفسه لتحديث الأسلوب، أو باسم جديد لإنشاء أسلوب آخر. يستخدمه المخرج من رسالتك التالية.',
    'Save style':'حفظ الأسلوب','Style saved and applied':'حُفظ الأسلوب وطُبّق','Style deleted':'حُذف الأسلوب','Style applied to this video':'طُبّق الأسلوب على هذا الفيديو','No style for this video':'لا يوجد أسلوب محدد لهذا الفيديو',
    'Video':'الفيديو','Format':'الأبعاد','Both':'كلاهما','Length':'المدة','s':'ث','Target length in seconds':'المدة المطلوبة بالثواني',
    'Output format — updates the video right away':'أبعاد المخرجات — تُحدّث الفيديو مباشرة','Language':'اللغة','Voice':'الصوت','English':'الإنجليزية','English — American accent':'الإنجليزية — لهجة أمريكية',
    'Language of all on-screen text':'لغة النصوص الظاهرة في الفيديو','Language and accent of the voice-over':'لغة التعليق الصوتي ولهجته','Voice-over':'التعليق الصوتي',
    'Needs an ElevenLabs API key':'يتطلب مفتاح ElevenLabs','On — the Director narrates this video':'مفعّل — يضيف المخرج تعليقًا صوتيًا للفيديو','Off':'متوقف','Off — needs an ElevenLabs key':'متوقف — يتطلب مفتاح ElevenLabs',
    'Add your key in':'أضف مفتاحك في','to turn it on.':'لتفعيله.','Voice ID':'معرّف الصوت','empty = default':'فارغ = الافتراضي',
    'Voice ID for this video — leave empty to use the default from Settings':'معرّف صوت هذا الفيديو — اتركه فارغًا لاستخدام الصوت الافتراضي من الإعدادات',
    'Hear this voice':'استمع إلى هذا الصوت','custom voice':'صوت مخصص','using default':'استخدام الصوت الافتراضي',
    'Saved — the Director uses it from your next message':'حُفظت الإعدادات — يستخدمها المخرج من رسالتك التالية',
    'Get it at elevenlabs.io → Developers → API keys.':'احصل عليه من elevenlabs.io ← Developers ← API keys.','Checking with ElevenLabs…':'جارٍ التحقق لدى ElevenLabs…',
    'Settings saved':'حُفظت الإعدادات','Website saved':'حُفظ الموقع','Project folder saved':'حُفظ مجلد المشروع','Render queued':'أُضيف التصدير إلى قائمة الانتظار','Stills queued':'أُضيفت الصور إلى قائمة الانتظار',
    'Delete brand':'حذف العلامة التجارية','Delete video':'حذف الفيديو','This deletes the video and everything that belongs to it.':'يحذف هذا الفيديو وجميع الملفات التابعة له.',
    'This deletes the brand kit and':'يحذف هذا هوية العلامة التجارية و','its only video':'فيديوها الوحيد','its settings':'إعداداتها',
    'Code —':'الكود —','Files —':'الملفات —','Renders —':'الفيديوهات المصدّرة —','Director chat':'محادثة المخرج','Director chats':'محادثات المخرج',
    'Everything moves to the':'تُنقل جميع الملفات إلى','Trash':'سلة المحذوفات',', so you can still get it back.':'، ويمكنك استعادتها لاحقًا.',
    'Created':'تم الإنشاء','AI engine':'محرك الذكاء الاصطناعي','Change engine':'تغيير المحرك','Engine changed':'تم تغيير المحرك',
    'Settings — ElevenLabs voice-over':'الإعدادات — التعليق الصوتي عبر ElevenLabs',
  };
  const patterns = [
    [/^Codex cannot write to its local data folder\. Close the dashboard server and launch Start\.bat from Windows under your normal user account, then retry\. Diagnostic details:\n([\s\S]*)$/,(_,details)=>`لا يستطيع Codex الكتابة في مجلد بياناته المحلي. أغلق خادم الأداة وشغّل Start.bat من ويندوز بحسابك المعتاد، ثم أعد المحاولة. تفاصيل التشخيص:\n${details}`],
    [/^(\d+)s · (.+)$/,(_,x,y)=>`${x} ث · ${y}`],
    [/^Built\. Render queued \(job (\d+)\)\.$/,(_,x)=>`اكتمل البناء. أُضيف التصدير إلى قائمة الانتظار (المهمة ${x}).`],
    [/^The selected Director engine \((.+)\) is not ready\. Install it and log in, or choose another engine\.$/,(_,x)=>`المحرك المختار (${x}) غير جاهز. ثبّته وسجّل الدخول أو اختر محركًا آخر.`],
    [/^Couldn't resume the previous Codex session — send your message again to start fresh\.$/,()=>`تعذر استئناف جلسة Codex السابقة. أرسل رسالتك مجددًا لبدء جلسة جديدة.`],
    [/^Starting (.+)…$/,(_,x)=>`جارٍ تشغيل ${x}…`],[/^Thinking…$/,()=>`جارٍ التفكير…`],[/^Stopped\.$/,()=>`تم الإيقاف.`],
    [/^New video in (.+)$/, (_,x)=>`فيديو جديد في ${x}`],
    [/^Delete (.+) and all its videos$/,(_,x)=>`حذف ${x} وجميع فيديوهاته`],
    [/^Delete the brand “(.+)”\?$/,(_,x)=>`هل تريد حذف العلامة التجارية «${x}»؟`],
    [/^Delete the style “(.+)” from the library\? Videos using it go back to no style\.$/,(_,x)=>`هل تريد حذف الأسلوب «${x}» من المكتبة؟ تُلغى إضافته إلى الفيديوهات التي تستخدمه.`],
    [/^Delete (.+)\?\s*It goes to the Trash, so you can still get it back\.$/s,(_,x)=>`هل تريد حذف ${x}؟\n\nيُنقل إلى سلة المحذوفات ويمكن استعادته.`],
    [/^Delete (.+)\?$/,(_,x)=>`هل تريد حذف ${x}؟`],
    [/^Type (.+) exactly to confirm\.$/,(_,x)=>`اكتب ${x} كما هو للتأكيد.`],
    [/^Message Director \((.+)\)…$/,(_,x)=>`رسالة للمخرج (${x})…`],
    [/^Storyboard ready: (\d+) key frames$/,(_,x)=>`لوحة المشاهد جاهزة: ${x} لقطات أساسية`],
    [/^Brand · every (.+) video$/,(_,x)=>`العلامة · جميع فيديوهات ${x}`],
    [/^Brand files · (\d+)$/,(_,x)=>`ملفات العلامة · ${x}`],[/^This video · (\d+)$/,(_,x)=>`هذا الفيديو · ${x}`],
    [/^(\d+) formats? · (\d+) renders?$/,(_,x,y)=>`${x} أبعاد · ${y} فيديوهات مصدّرة`],
    [/^· (\d+) files$/,(_,x)=>`· ${x} ملفات`],[/^all (\d+) videos$/,(_,x)=>`جميع فيديوهاتها (${x})`],
    [/^Uploading (.+) — (\d+)%$/,(_,x,y)=>`جارٍ رفع ${x} — ${y}%`],[/^Uploaded (\d+) files?$/,(_,x)=>`تم رفع ${x} ملفات`],
    [/^Saved to (.+)$/,(_,x)=>`يُحفظ في ${x}`],[/^Using “(.+)”$/,(_,x)=>`الأسلوب المستخدم: «${x}»`],
    [/^Created (.+)$/,(_,x)=>`تم إنشاء ${x}`],[/^Deleted (.+) — it's in the Trash$/,(_,x)=>`حُذف ${x} — موجود في سلة المحذوفات`],[/^Deleted (.+)$/,(_,x)=>`حُذف ${x}`],
    [/^Saved \((.+)\) — paste a new key to replace it$/,(_,x)=>`محفوظ (${x}) — الصق مفتاحًا جديدًا لاستبداله`],
    [/^✓ (?:Key works|Saved) · default voice: (.+)$/,(_,x)=>`✓ تم التحقق والحفظ · الصوت الافتراضي: ${x}`],
    [/^Format: (.+) — Preview and Render updated$/,(_,x)=>`الأبعاد: ${x} — تم تحديث المعاينة والتصدير`],
    [/^Open (.+) in Studio$/,(_,x)=>`فتح ${ar[x] || x} في الاستوديو`],
    [/^took (.+)$/,(_,x)=>`استغرق ${x}`],
    [/^Autopilot (.+)$/,(_,x)=>`التشغيل التلقائي: ${{running:'يعمل',paused:'متوقف مؤقتًا','waiting for an answer':'ينتظر إجابة','stopped with a problem':'توقف بسبب مشكلة',done:'مكتمل',stopped:'متوقف'}[x] || x}`],
    [/^· an agent is driving this video from the command line and approves each step itself(.*)$/,(_,x)=>`· يدير وكيل هذا الفيديو من الطرفية ويوافق على مراحله تلقائيًا${x}`],
  ];
  let lang; try { lang = localStorage.getItem('uiLanguage'); } catch {}
  if (!['ar','en'].includes(lang)) lang = navigator.language.startsWith('ar') ? 'ar' : 'en';
  const original = new WeakMap();
  const attrs = new WeakMap();
  const excluded = 'script,style,svg,code,pre,.doc,.msg.user,.msg.claude,.log,.bn,.vid>span:first-child,.crumbs,.hero h2,.file .nm,.out .meta b,#confirmWord,#uiLanguage option,#styleSel option:not([value=""]),textarea';
  function translate(text) {
    if (lang !== 'ar') return text;
    const s = text.trim();
    if (s.startsWith('→ ')) return text.replace(s, '← ' + translate(s.slice(2)));
    const value = ar[s] ?? patterns.reduce((v,[re,fn])=>v ?? (re.test(s) ? s.replace(re,fn) : undefined),undefined);
    return value === undefined ? text : text.replace(s,value);
  }
  function localize() {
    observer.disconnect();
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const n = walker.currentNode;
      if (n.parentElement?.closest(excluded + ',.language-select .select-option,.language-select .select-trigger>span') || !n.textContent.trim()) continue;
      const prev = original.get(n);
      const source = prev && n.textContent === prev.output ? prev.source : n.textContent;
      const output = translate(source);
      original.set(n,{source,output});
      if (n.textContent !== output) n.textContent = output;
    }
    document.querySelectorAll('[title],[placeholder],[aria-label]').forEach(el=>{
      const prev = attrs.get(el) || {};
      for (const key of ['title','placeholder','aria-label']) {
        if (!el.hasAttribute(key)) continue;
        const value = el.getAttribute(key);
        const source = prev[key] && value === prev[key].output ? prev[key].source : value;
        const output = translate(source);
        prev[key] = {source,output};
        if (value !== output) el.setAttribute(key,output);
      }
      attrs.set(el,prev);
    });
    document.querySelector('#uiLanguage').value = lang;
    observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['title','placeholder','aria-label']});
  }
  const observer = new MutationObserver(localize);
  window.dashboardI18n = {translate, get language(){return lang;}};
  document.querySelector('#uiLanguage').addEventListener('change',e=>{
    lang = e.target.value;
    try { localStorage.setItem('uiLanguage',lang); } catch {}
    localize();
  });
  localize();
})();
