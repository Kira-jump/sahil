import { useState, useEffect } from "react";
import { getText } from "../i18n";

const DUAS = [
  {
    id: "morning_1", category: "morning",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ",
    transliteration: "Asbahna wa asbahal mulku lillah",
    translation: {
      fr: "Nous voici au matin et le royaume appartient à Allah",
      ar: "أصبحنا وأصبح الملك لله",
      en: "We have reached the morning and the kingdom belongs to Allah",
    },
    source: { fr: "Dua du matin", ar: "دعاء الصباح", en: "Morning Dua" },
  },
  {
    id: "morning_2", category: "morning",
    arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا",
    transliteration: "Allahumma bika asbahna wa bika amsayna",
    translation: {
      fr: "Ô Allah, c'est grâce à Toi que nous vivons le matin et le soir",
      ar: "اللهم بك أصبحنا وبك أمسينا",
      en: "O Allah, by You we reach morning and by You we reach evening",
    },
    source: { fr: "Dua du matin", ar: "دعاء الصباح", en: "Morning Dua" },
  },
  {
    id: "evening_1", category: "evening",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ",
    transliteration: "Amsayna wa amsal mulku lillah",
    translation: {
      fr: "Nous voici au soir et le royaume appartient à Allah",
      ar: "أمسينا وأمسى الملك لله",
      en: "We have reached the evening and the kingdom belongs to Allah",
    },
    source: { fr: "Dua du soir", ar: "دعاء المساء", en: "Evening Dua" },
  },
  {
    id: "sleep", category: "evening",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika Allahumma amutu wa ahya",
    translation: {
      fr: "En Ton Nom, ô Allah, je meurs et je vis",
      ar: "باسمك اللهم أموت وأحيا",
      en: "In Your name, O Allah, I die and I live",
    },
    source: { fr: "Avant de dormir", ar: "قبل النوم", en: "Before sleeping" },
  },
  {
    id: "eating", category: "general",
    arabic: "بِسْمِ اللَّهِ",
    transliteration: "Bismillah",
    translation: {
      fr: "Au nom d'Allah",
      ar: "بسم الله",
      en: "In the name of Allah",
    },
    source: { fr: "Avant de manger", ar: "قبل الأكل", en: "Before eating" },
  },
  {
    id: "after_eating", category: "general",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا",
    transliteration: "Alhamdu lillahil ladhi at'amana wa saqana",
    translation: {
      fr: "Louange à Allah qui nous a nourris et désaltérés",
      ar: "الحمد لله الذي أطعمنا وسقانا",
      en: "Praise be to Allah who fed us and gave us drink",
    },
    source: { fr: "Après avoir mangé", ar: "بعد الأكل", en: "After eating" },
  },
  {
    id: "anxiety", category: "general",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",
    transliteration: "Allahumma inni a'udhu bika minal hammi wal hazan",
    translation: {
      fr: "Ô Allah, je cherche refuge en Toi contre l'anxiété et la tristesse",
      ar: "اللهم إني أعوذ بك من الهم والحزن",
      en: "O Allah, I seek refuge in You from anxiety and grief",
    },
    source: { fr: "En cas d'anxiété", ar: "عند القلق", en: "For anxiety" },
  },
  {
    id: "travel", category: "general",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا",
    transliteration: "Subhanal ladhi sakhkhara lana hadha",
    translation: {
      fr: "Gloire à Celui qui nous a soumis ceci",
      ar: "سبحان الذي سخر لنا هذا",
      en: "Glory be to Him Who subjected this for us",
    },
    source: { fr: "En voyage", ar: "في السفر", en: "During travel" },
  },
];

export default function Dua({ lang }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem("sabil_fav_duas") || "[]")
  );
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    localStorage.setItem("sabil_fav_duas", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFav = (id) => {
    setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
  };

  const categories = [
    { key: "all", label: { fr: "Tout", ar: "الكل", en: "All" } },
    { key: "morning", label: { fr: "Matin", ar: "صباح", en: "Morning" } },
    { key: "evening", label: { fr: "Soir", ar: "مساء", en: "Evening" } },
    { key: "general", label: { fr: "Général", ar: "عام", en: "General" } },
    { key: "favorites", label: { fr: "Favoris ⭐", ar: "المفضلة ⭐", en: "Favorites ⭐" } },
  ];

  const filtered = DUAS.filter((d) => {
    if (filter === "favorites") return favorites.includes(d.id);
    if (filter !== "all" && d.category !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return d.arabic.includes(q) || d.translation[lang]?.toLowerCase().includes(q) || d.source[lang]?.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen">
      <div className="px-5 pt-10 pb-4 bg-gradient-to-b from-emerald-900/80 to-transparent">
        <h1 className="font-display text-3xl font-light text-emerald-50">{getText(lang, "dua")}</h1>
        <p className="font-arabic text-amber-400/70 text-sm mt-1">الأدعية والأذكار</p>
      </div>

      <div className="px-4 mb-3">
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder={getText(lang, "search")}
          className="w-full bg-emerald-900/50 border border-emerald-800/50 rounded-2xl px-4 py-3 text-sm text-emerald-50 font-body outline-none focus:border-emerald-600 placeholder:text-emerald-400/30" />
      </div>

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
        {filtered.length === 0 && (
          <p className="text-center text-emerald-400/40 text-sm font-body py-8">
            {lang === "fr" ? "Aucun résultat" : lang === "ar" ? "لا نتائج" : "No results"}
          </p>
        )}
        {filtered.map((dua) => (
          <div key={dua.id} className="bg-emerald-900/30 rounded-2xl border border-emerald-800/30 overflow-hidden">
            <button onClick={() => setExpanded(expanded === dua.id ? null : dua.id)} className="w-full p-4 text-left">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="text-emerald-400/50 text-xs font-body mb-1">{dua.source[lang]}</p>
                  <p className="font-arabic text-lg text-amber-300 leading-loose">{dua.arabic}</p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button onClick={(e) => { e.stopPropagation(); toggleFav(dua.id); }} className="text-lg">
                    {favorites.includes(dua.id) ? "⭐" : "☆"}
                  </button>
                  <span className="text-emerald-400/40 text-xs">{expanded === dua.id ? "▲" : "▼"}</span>
                </div>
              </div>
            </button>
            {expanded === dua.id && (
              <div className="px-4 pb-4 border-t border-emerald-800/30 pt-3 space-y-2">
                <p className="text-emerald-300/70 text-sm font-body italic">{dua.transliteration}</p>
                <p className="text-emerald-50/80 text-sm font-body">{dua.translation[lang]}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
