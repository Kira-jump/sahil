import { useState, useEffect } from "react";
import { getText } from "../i18n";

const WUDU_STEPS = [
  { step: 1, icon: "🤲", title: { fr: "Intention (Niyyah)", ar: "النية", en: "Intention" },
    desc: { fr: "Faire l'intention sincère dans le cœur d'accomplir les ablutions.", ar: "استحضار النية في القلب لأداء الوضوء.", en: "Make the sincere intention in your heart to perform ablution." }},
  { step: 2, icon: "💧", title: { fr: "Se laver les mains", ar: "غسل اليدين", en: "Wash the hands" },
    desc: { fr: "Se laver les deux mains jusqu'aux poignets 3 fois, en commençant par la droite.", ar: "غسل الكفين ثلاث مرات مع تخليل الأصابع، يبدأ باليمين.", en: "Wash both hands up to the wrists 3 times, starting with the right." }},
  { step: 3, icon: "🫧", title: { fr: "Rincer la bouche", ar: "المضمضة", en: "Rinse the mouth" },
    desc: { fr: "Se rincer la bouche 3 fois avec de l'eau.", ar: "إدخال الماء في الفم وتحريكه ثلاث مرات.", en: "Rinse the mouth 3 times with water." }},
  { step: 4, icon: "👃", title: { fr: "Rincer le nez", ar: "الاستنشاق", en: "Rinse the nose" },
    desc: { fr: "Aspirer de l'eau dans le nez et la souffler 3 fois.", ar: "استنشاق الماء في الأنف ثم استنثاره ثلاث مرات.", en: "Inhale water into the nose and blow it out 3 times." }},
  { step: 5, icon: "😊", title: { fr: "Se laver le visage", ar: "غسل الوجه", en: "Wash the face" },
    desc: { fr: "Se laver tout le visage 3 fois, du front jusqu'au menton.", ar: "غسل الوجه من منابت الشعر إلى الذقن ثلاث مرات.", en: "Wash the entire face 3 times, from forehead to chin." }},
  { step: 6, icon: "💪", title: { fr: "Se laver les bras", ar: "غسل اليدين إلى المرفقين", en: "Wash the forearms" },
    desc: { fr: "Se laver les bras jusqu'aux coudes 3 fois, en commençant par le droit.", ar: "غسل اليدين إلى المرفقين ثلاث مرات، يبدأ بالأيمن.", en: "Wash arms up to the elbows 3 times, starting with the right." }},
  { step: 7, icon: "🖐️", title: { fr: "Masah (tête)", ar: "مسح الرأس", en: "Masah (head)" },
    desc: { fr: "Passer les mains mouillées sur la tête une fois, de l'avant vers l'arrière.", ar: "مسح الرأس بالماء مرة واحدة من الأمام إلى الخلف.", en: "Pass wet hands over the head once, from front to back." }},
  { step: 8, icon: "👂", title: { fr: "Se laver les oreilles", ar: "مسح الأذنين", en: "Clean the ears" },
    desc: { fr: "Passer les index à l'intérieur des oreilles et les pouces derrière.", ar: "إدخال السبابتين في الأذنين وإمرار الإبهامين خلفهما.", en: "Insert index fingers inside ears and pass thumbs behind them." }},
  { step: 9, icon: "🦵", title: { fr: "Se laver les pieds", ar: "غسل القدمين", en: "Wash the feet" },
    desc: { fr: "Se laver les pieds jusqu'aux chevilles 3 fois, en commençant par le droit.", ar: "غسل القدمين إلى الكعبين ثلاث مرات يبدأ بالأيمن.", en: "Wash feet up to the ankles 3 times, starting with the right." }},
];

const PRAYERS = [
  { name: { fr: "Fajr", ar: "الفجر", en: "Fajr" }, rakats: { fr: "2 Sunnah + 2 Fard", ar: "2 سنة + 2 فرض", en: "2 Sunnah + 2 Fard" }, time: { fr: "À l'aube", ar: "عند الفجر", en: "At dawn" }, icon: "🌅" },
  { name: { fr: "Dhuhr", ar: "الظهر", en: "Dhuhr" }, rakats: { fr: "4 Sunnah + 4 Fard + 2 Sunnah + 2 Nafl", ar: "4 سنة + 4 فرض + 2 سنة + 2 نافلة", en: "4 Sunnah + 4 Fard + 2 Sunnah + 2 Nafl" }, time: { fr: "À midi", ar: "عند الظهيرة", en: "At noon" }, icon: "☀️" },
  { name: { fr: "Asr", ar: "العصر", en: "Asr" }, rakats: { fr: "4 Sunnah + 4 Fard", ar: "4 سنة + 4 فرض", en: "4 Sunnah + 4 Fard" }, time: { fr: "L'après-midi", ar: "بعد الظهر", en: "Afternoon" }, icon: "🌤️" },
  { name: { fr: "Maghrib", ar: "المغرب", en: "Maghrib" }, rakats: { fr: "3 Fard + 2 Sunnah + 2 Nafl", ar: "3 فرض + 2 سنة + 2 نافلة", en: "3 Fard + 2 Sunnah + 2 Nafl" }, time: { fr: "Au coucher du soleil", ar: "عند المغرب", en: "At sunset" }, icon: "🌇" },
  { name: { fr: "Isha", ar: "العشاء", en: "Isha" }, rakats: { fr: "4 Sunnah + 4 Fard + 2 Sunnah + 2 Nafl + 3 Witr", ar: "4 سنة + 4 فرض + 2 سنة + 2 نافلة + 3 وتر", en: "4 Sunnah + 4 Fard + 2 Sunnah + 2 Nafl + 3 Witr" }, time: { fr: "La nuit", ar: "في الليل", en: "At night" }, icon: "🌙" },
];

const PRAYER_STEPS = [
  { step: 1, title: { fr: "Takbir d'ouverture", ar: "تكبيرة الإحرام", en: "Opening Takbir" }, arabic: "اللَّهُ أَكْبَرُ", desc: { fr: "Se lever face à la Qibla, lever les mains aux épaules et dire Allahu Akbar.", ar: "الوقوف مستقبلاً القبلة، رفع اليدين وقول: الله أكبر.", en: "Stand facing Qibla, raise hands to shoulders and say Allahu Akbar." }},
  { step: 2, title: { fr: "Al-Fatiha", ar: "الفاتحة", en: "Al-Fatiha" }, arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ...", desc: { fr: "Lire Sourate Al-Fatiha puis une autre sourate dans les 2 premiers rakat.", ar: "قراءة سورة الفاتحة ثم سورة أخرى في الركعتين الأوليين.", en: "Recite Surah Al-Fatiha then another surah in first 2 rakats." }},
  { step: 3, title: { fr: "Ruku (Inclination)", ar: "الركوع", en: "Ruku (Bowing)" }, arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ", desc: { fr: "Se pencher, mains sur les genoux, dire Subhana Rabbiyal Adhim 3 fois.", ar: "الانحناء مع وضع اليدين على الركبتين وقول: سبحان ربي العظيم 3 مرات.", en: "Bow forward, hands on knees, saying Subhana Rabbiyal Adhim 3 times." }},
  { step: 4, title: { fr: "I'tidal (Redressement)", ar: "الاعتدال", en: "I'tidal (Rising)" }, arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ", desc: { fr: "Se redresser en disant Sami'a Allahu liman Hamidah, puis Rabbana lakal Hamd.", ar: "الرفع من الركوع قائلاً: سمع الله لمن حمده، ثم: ربنا لك الحمد.", en: "Rise saying Sami'a Allahu liman Hamidah, then Rabbana lakal Hamd." }},
  { step: 5, title: { fr: "Sujud (Prosternation)", ar: "السجود", en: "Sujud (Prostration)" }, arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى", desc: { fr: "Se prosterner sur 7 membres : front, nez, 2 paumes, 2 genoux, 2 orteils. Dire Subhana Rabbiyal A'la 3 fois.", ar: "السجود على سبعة أعضاء وقول: سبحان ربي الأعلى 3 مرات.", en: "Prostrate on 7 parts and say Subhana Rabbiyal A'la 3 times." }},
  { step: 6, title: { fr: "Jalsa (Entre 2 prosternations)", ar: "الجلسة بين السجدتين", en: "Jalsa (Sitting)" }, arabic: "رَبِّ اغْفِرْ لِي", desc: { fr: "S'asseoir brièvement en disant Rabbigh firli, puis faire la 2ème prosternation.", ar: "الجلوس بين السجدتين وقول: رب اغفر لي، ثم السجدة الثانية.", en: "Sit briefly saying Rabbigh firli, then perform the second prostration." }},
  { step: 7, title: { fr: "Tashahhud", ar: "التشهد", en: "Tashahhud" }, arabic: "التَّحِيَّاتُ لِلَّهِ...", desc: { fr: "Après 2 rakat, s'asseoir et lire le Tashahhud puis la Salawat sur le Prophète ﷺ.", ar: "بعد الركعتين الجلوس وقراءة التشهد والصلاة على النبي ﷺ.", en: "After 2 rakats, sit and recite Tashahhud then Salawat upon the Prophet ﷺ." }},
  { step: 8, title: { fr: "Salam (Conclusion)", ar: "التسليم", en: "Salam (Closing)" }, arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ", desc: { fr: "Tourner la tête à droite puis à gauche en disant As-salamu alaykum wa rahmatullah.", ar: "الالتفات يمين ثم يساراً قائلاً: السلام عليكم ورحمة الله.", en: "Turn head right then left saying As-salamu alaykum wa rahmatullah." }},
];

export default function Prayer({ lang }) {
  const [tab, setTab] = useState("rakats");
  const [reminders, setReminders] = useState(() => JSON.parse(localStorage.getItem("sabil_reminders") || "[]"));
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newTime, setNewTime] = useState("05:00");
  const [expandedStep, setExpandedStep] = useState(null);

  useEffect(() => { localStorage.setItem("sabil_reminders", JSON.stringify(reminders)); }, [reminders]);

  const addReminder = () => {
    if (!newName.trim()) return;
    setReminders((prev) => [...prev, { id: Date.now(), name: newName, time: newTime, active: true }]);
    setNewName(""); setShowAdd(false);
  };

  const toggleReminder = (id) => setReminders((prev) => prev.map((r) => r.id === id ? { ...r, active: !r.active } : r));
  const deleteReminder = (id) => setReminders((prev) => prev.filter((r) => r.id !== id));

  const tabs = [
    { key: "rakats", label: { fr: "Rakat", ar: "الركعات", en: "Rakats" } },
    { key: "wudu", label: { fr: "Wudu", ar: "الوضوء", en: "Wudu" } },
    { key: "steps", label: { fr: "Comment prier", ar: "كيف تصلي", en: "How to pray" } },
    { key: "reminders", label: { fr: "Rappels", ar: "التذكيرات", en: "Reminders" } },
  ];

  return (
    <div className="min-h-screen">
      <div className="px-5 pt-10 pb-4 bg-gradient-to-b from-emerald-900/80 to-transparent">
        <h1 className="font-display text-3xl font-light text-emerald-50">{getText(lang, "prayer")}</h1>
        <p className="font-arabic text-amber-400/70 text-sm mt-1">الصَّلَاةُ عِمَادُ الدِّينِ</p>
      </div>

      <div className="flex gap-2 px-4 mb-4 overflow-x-auto">
        {tabs.map(({ key, label }) => (
          <button key={key} onClick={() => setTab(key)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-body transition-all ${
              tab === key ? "bg-emerald-600 text-white" : "bg-emerald-900/50 text-emerald-400/60 border border-emerald-800/50"
            }`}>
            {label[lang]}
          </button>
        ))}
      </div>

      <div className="px-4 pb-4">
        {tab === "rakats" && (
          <div className="space-y-3">
            {PRAYERS.map((p) => (
              <div key={p.name.en} className="bg-emerald-900/30 rounded-2xl p-4 border border-emerald-800/30">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <p className="text-amber-300 font-body font-medium">{p.name[lang]}</p>
                    <p className="text-emerald-400/50 text-xs font-body">{p.time[lang]}</p>
                  </div>
                </div>
                <p className="text-emerald-200/70 text-sm font-body">{p.rakats[lang]}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "wudu" && (
          <div className="space-y-3">
            {WUDU_STEPS.map((s) => (
              <div key={s.step} className="bg-emerald-900/30 rounded-2xl p-4 border border-emerald-800/30 flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-700/50 flex items-center justify-center">
                  <span className="text-amber-400 text-xs font-bold">{s.step}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span>{s.icon}</span>
                    <p className="text-emerald-50 font-body font-medium text-sm">{s.title[lang]}</p>
                  </div>
                  <p className="text-emerald-400/60 text-xs font-body leading-relaxed">{s.desc[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "steps" && (
          <div className="space-y-3">
            {PRAYER_STEPS.map((s) => (
              <div key={s.step} className="bg-emerald-900/30 rounded-2xl border border-emerald-800/30 overflow-hidden">
                <button onClick={() => setExpandedStep(expandedStep === s.step ? null : s.step)}
                  className="w-full p-4 text-left flex items-center gap-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-700/40 flex items-center justify-center">
                    <span className="text-amber-400 text-xs font-bold">{s.step}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-emerald-50 font-body text-sm">{s.title[lang]}</p>
                    <p className="font-arabic text-amber-300/70 text-sm mt-0.5">{s.arabic}</p>
                  </div>
                  <span className="text-emerald-400/40 text-xs">{expandedStep === s.step ? "▲" : "▼"}</span>
                </button>
                {expandedStep === s.step && (
                  <div className="px-4 pb-4 border-t border-emerald-800/30 pt-3">
                    <p className="text-emerald-200/70 text-sm font-body leading-relaxed">{s.desc[lang]}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "reminders" && (
          <div className="space-y-3">
            {reminders.map((r) => (
              <div key={r.id} className="bg-emerald-900/30 rounded-2xl p-4 border border-emerald-800/30 flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-emerald-50 font-body text-sm">{r.name}</p>
                  <p className="text-emerald-400/50 text-xs font-body">{r.time}</p>
                </div>
                <button onClick={() => toggleReminder(r.id)}
                  className={`w-10 h-6 rounded-full transition-all relative ${r.active ? "bg-emerald-600" : "bg-emerald-900"}`}>
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${r.active ? "right-1" : "left-1"}`} />
                </button>
                <button onClick={() => deleteReminder(r.id)} className="text-red-400/50 text-sm">✕</button>
              </div>
            ))}
            {showAdd ? (
              <div className="bg-emerald-900/50 rounded-2xl p-4 border border-emerald-700/30">
                <input value={newName} onChange={(e) => setNewName(e.target.value)}
                  placeholder={getText(lang, "prayer_name")}
                  className="w-full bg-emerald-950 rounded-xl px-4 py-2.5 text-emerald-50 text-sm font-body border border-emerald-800/50 mb-3 outline-none" />
                <input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)}
                  className="w-full bg-emerald-950 rounded-xl px-4 py-2.5 text-emerald-50 text-sm font-body border border-emerald-800/50 mb-3 outline-none" />
                <div className="flex gap-2">
                  <button onClick={addReminder} className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-body">{getText(lang, "add")}</button>
                  <button onClick={() => setShowAdd(false)} className="flex-1 py-2.5 bg-emerald-900/50 text-emerald-400 rounded-xl text-sm font-body border border-emerald-800/50">{getText(lang, "cancel")}</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowAdd(true)}
                className="w-full py-4 rounded-2xl border-2 border-dashed border-emerald-700/40 text-emerald-500/60 text-sm font-body flex items-center justify-center gap-2">
                <span className="text-xl">+</span> {getText(lang, "add_reminder")}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
