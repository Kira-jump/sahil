import { useState, useEffect, useRef } from "react";
import { getText } from "../i18n";

const DEFAULT_ZIKRS = [
  {
    id: "subhanallah",
    title: { fr: "Subhan Allah", ar: "سُبْحَانَ اللَّهِ", en: "Subhan Allah" },
    arabic: "سُبْحَانَ اللَّهِ",
    translation: { fr: "Gloire à Allah", ar: "سبحان الله", en: "Glory be to Allah" },
    target: 33, category: "general",
  },
  {
    id: "alhamdulillah",
    title: { fr: "Alhamdulillah", ar: "الْحَمْدُ لِلَّهِ", en: "Alhamdulillah" },
    arabic: "الْحَمْدُ لِلَّهِ",
    translation: { fr: "Louange à Allah", ar: "الحمد لله", en: "Praise be to Allah" },
    target: 33, category: "general",
  },
  {
    id: "allahuakbar",
    title: { fr: "Allahu Akbar", ar: "اللَّهُ أَكْبَرُ", en: "Allahu Akbar" },
    arabic: "اللَّهُ أَكْبَرُ",
    translation: { fr: "Allah est le plus grand", ar: "الله أكبر", en: "Allah is the Greatest" },
    target: 34, category: "general",
  },
  {
    id: "after_prayer_1",
    title: { fr: "Après la prière", ar: "بعد الصلاة", en: "After Prayer" },
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    translation: { fr: "Je demande pardon à Allah", ar: "أستغفر الله", en: "I seek forgiveness from Allah" },
    target: 3, category: "after_prayer",
  },
  {
    id: "laylatul_qadr",
    title: { fr: "Laylatul Qadr", ar: "ليلة القدر", en: "Laylatul Qadr" },
    arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
    translation: {
      fr: "O Allah, Tu es Celui qui pardonne et Tu aimes pardonner, alors pardonne-moi",
      ar: "اللهم إنك عفو تحب العفو فاعف عني",
      en: "O Allah, You are Forgiving and love forgiveness, so forgive me",
    },
    target: 100, category: "laylatul_qadr",
  },
];

export default function Zikr({ lang }) {
  const [zikrs, setZikrs] = useState(() => {
    const saved = localStorage.getItem("sabil_zikrs");
    return saved ? JSON.parse(saved) : DEFAULT_ZIKRS;
  });
  const [activeId, setActiveId] = useState(null);
  const [counts, setCounts] = useState(() => JSON.parse(localStorage.getItem("sabil_counts") || "{}"));
  const [paused, setPaused] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTarget, setNewTarget] = useState("33");
  const [filter, setFilter] = useState("all");
  const [popId, setPopId] = useState(null);

  const categories = [
    { key: "all", label: { fr: "Tout", ar: "الكل", en: "All" } },
    { key: "general", label: { fr: "Général", ar: "عام", en: "General" } },
    { key: "after_prayer", label: { fr: "Après prière", ar: "بعد الصلاة", en: "After prayer" } },
    { key: "laylatul_qadr", label: { fr: "Qadr", ar: "القدر", en: "Qadr" } },
  ];

  useEffect(() => { localStorage.setItem("sabil_zikrs", JSON.stringify(zikrs)); }, [zikrs]);
  useEffect(() => { localStorage.setItem("sabil_counts", JSON.stringify(counts)); }, [counts]);

  const increment = (id) => {
    if (paused && activeId === id) return;
    setCounts((prev) => {
      const current = prev[id] || 0;
      const zikr = zikrs.find((z) => z.id === id);
      const newCount = current + 1;
      if (zikr && newCount % zikr.target === 0) {
        const sessions = JSON.parse(localStorage.getItem("sabil_zikr_sessions") || "[]");
        sessions.push({ id, count: zikr.target, date: new Date().toISOString() });
        localStorage.setItem("sabil_zikr_sessions", JSON.stringify(sessions));
      }
      return { ...prev, [id]: newCount };
    });
    setPopId(id);
    setTimeout(() => setPopId(null), 200);
    navigator?.vibrate?.(30);
  };

  const reset = (id) => { setCounts((prev) => ({ ...prev, [id]: 0 })); setPaused(false); };

  const addZikr = () => {
    if (!newTitle.trim()) return;
    const id = Date.now().toString();
    setZikrs((prev) => [...prev, {
      id,
      title: { fr: newTitle, ar: newTitle, en: newTitle },
      arabic: newTitle,
      translation: { fr: "", ar: "", en: "" },
      target: parseInt(newTarget) || 33,
      category: "general",
    }]);
    setNewTitle(""); setNewTarget("33"); setShowAdd(false);
  };

  const deleteZikr = (id) => {
    setZikrs((prev) => prev.filter((z) => z.id !== id));
    if (activeId === id) setActiveId(null);
  };

  const filtered = filter === "all" ? zikrs : zikrs.filter((z) => z.category === filter);
  const activeZikr = zikrs.find((z) => z.id === activeId);

  return (
    <div className="min-h-screen">
      <div className="px-5 pt-10 pb-4 bg-gradient-to-b from-emerald-900/80 to-transparent">
        <h1 className="font-display text-3xl font-light text-emerald-50">{getText(lang, "zikr")}</h1>
        <p className="font-arabic text-amber-400/70 text-sm mt-1">ذِكْرُ اللَّهِ</p>
      </div>

      {activeZikr && (
        <div className="mx-4 mb-4 bg-gradient-to-br from-emerald-800 to-emerald-900 rounded-3xl p-6 border border-emerald-600/30 shadow-xl">
          <p className="text-emerald-400/60 text-xs uppercase tracking-widest mb-2 font-body">
            {lang === "fr" ? "En cours" : lang === "ar" ? "جارٍ" : "Active"}
          </p>
          <p className="font-arabic text-2xl text-amber-300 leading-loose text-center mb-1">{activeZikr.arabic}</p>
          <p className="text-emerald-400/60 text-sm text-center mb-4 font-body">{activeZikr.translation[lang]}</p>

          <div className="flex justify-center">
            <button
              onClick={() => increment(activeId)}
              className={`w-44 h-44 flex flex-col items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 shadow-2xl border border-emerald-500/30 active:scale-95 transition-transform ${popId === activeId ? "pop" : ""}`}
            >
              <span className="font-display text-6xl font-light text-white">{counts[activeId] || 0}</span>
              <span className="text-emerald-300/50 text-xs font-body">/ {activeZikr.target}</span>
            </button>
          </div>

          <div className="mt-4 h-1.5 bg-emerald-950 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(((counts[activeId] || 0) % activeZikr.target / activeZikr.target) * 100, 100)}%` }}
            />
          </div>
          <p className="text-center text-emerald-400/50 text-xs mt-1 font-body">
            {Math.floor((counts[activeId] || 0) / activeZikr.target)} × {activeZikr.target}
          </p>

          <div className="flex gap-2 mt-4">
            <button onClick={() => setPaused(!paused)}
              className="flex-1 py-2 rounded-xl bg-emerald-800/60 text-emerald-300 text-sm font-body border border-emerald-700/30">
              {paused ? getText(lang, "resume") : getText(lang, "pause")}
            </button>
            <button onClick={() => reset(activeId)}
              className="flex-1 py-2 rounded-xl bg-emerald-800/60 text-emerald-300 text-sm font-body border border-emerald-700/30">
              {getText(lang, "reset")}
            </button>
            <button onClick={() => setActiveId(null)}
              className="flex-1 py-2 rounded-xl bg-emerald-800/60 text-emerald-400/50 text-sm font-body border border-emerald-700/30">
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-2 px-4 mb-4 overflow-x-auto">
        {categories.map(({ key, label }) => (
          <button key={key} onClick={() => setFilter(key)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-body transition-all ${
              filter === key ? "bg-emerald-600 text-white" : "bg-emerald-900/50 text-emerald-400/60 border border-emerald-800/50"
            }`}>
            {label[lang]}
          </button>
        ))}
      </div>

      <div className="px-4 space-y-3 pb-4">
        {filtered.map((z) => (
          <div key={z.id} className={`rounded-2xl border transition-all ${
            activeId === z.id ? "border-emerald-500/50 bg-emerald-800/50" : "border-emerald-800/30 bg-emerald-900/30"
          }`}>
            <button onClick={() => setActiveId(z.id === activeId ? null : z.id)} className="w-full p-4 text-left">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-arabic text-lg text-amber-300 leading-loose">{z.arabic}</p>
                  <p className="text-emerald-400/60 text-xs font-body mt-0.5">
                    {typeof z.title === "object" ? z.title[lang] : z.title} • {z.target} {getText(lang, "times")}
                  </p>
                </div>
                <span className="font-display text-2xl text-emerald-300 ml-3">{counts[z.id] || 0}</span>
              </div>
            </button>
            {!DEFAULT_ZIKRS.find((d) => d.id === z.id) && (
              <div className="px-4 pb-3">
                <button onClick={() => deleteZikr(z.id)} className="text-red-400/60 text-xs font-body">
                  {getText(lang, "delete")}
                </button>
              </div>
            )}
          </div>
        ))}

        {showAdd ? (
          <div className="bg-emerald-900/50 rounded-2xl p-4 border border-emerald-700/30">
            <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
              placeholder={getText(lang, "zikr_title")}
              className="w-full bg-emerald-950 rounded-xl px-4 py-2.5 text-emerald-50 text-sm font-body border border-emerald-800/50 mb-3 outline-none focus:border-emerald-600" />
            <input type="number" value={newTarget} onChange={(e) => setNewTarget(e.target.value)}
              placeholder={getText(lang, "zikr_count")}
              className="w-full bg-emerald-950 rounded-xl px-4 py-2.5 text-emerald-50 text-sm font-body border border-emerald-800/50 mb-3 outline-none focus:border-emerald-600" />
            <div className="flex gap-2">
              <button onClick={addZikr} className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-body">
                {getText(lang, "add")}
              </button>
              <button onClick={() => setShowAdd(false)} className="flex-1 py-2.5 bg-emerald-900/50 text-emerald-400 rounded-xl text-sm font-body border border-emerald-800/50">
                {getText(lang, "cancel")}
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => setShowAdd(true)}
            className="w-full py-4 rounded-2xl border-2 border-dashed border-emerald-700/40 text-emerald-500/60 text-sm font-body flex items-center justify-center gap-2">
            <span className="text-xl">+</span> {getText(lang, "new_zikr")}
          </button>
        )}
      </div>
    </div>
  );
}
