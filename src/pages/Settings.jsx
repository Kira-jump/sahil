import { useState, useEffect } from "react";
import { getText } from "../i18n";

export default function Settings({ lang, setLang }) {
  const [stats, setStats] = useState({ total: 0, week: 0, days: [] });

  useEffect(() => {
    const sessions = JSON.parse(localStorage.getItem("sabil_zikr_sessions") || "[]");
    const now = new Date();
    const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
    const total = sessions.reduce((s, r) => s + r.count, 0);
    const week = sessions.filter((r) => new Date(r.date) >= weekAgo).reduce((s, r) => s + r.count, 0);
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now - (6 - i) * 24 * 60 * 60 * 1000);
      const count = sessions.filter((r) => new Date(r.date).toDateString() === d.toDateString()).reduce((s, r) => s + r.count, 0);
      return { day: d.toLocaleDateString(lang === "ar" ? "ar-SA" : lang === "fr" ? "fr-FR" : "en-US", { weekday: "short" }), count };
    });
    setStats({ total, week, days });
  }, [lang]);

  const clearData = () => {
    if (confirm(lang === "fr" ? "Effacer toutes les données ?" : lang === "ar" ? "مسح جميع البيانات؟" : "Clear all data?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const maxCount = Math.max(...stats.days.map((d) => d.count), 1);

  const languages = [
    { code: "fr", label: "Français 🇫🇷" },
    { code: "ar", label: "العربية 🇸🇦" },
    { code: "en", label: "English 🇬🇧" },
  ];

  return (
    <div className="min-h-screen">
      <div className="px-5 pt-10 pb-4 bg-gradient-to-b from-emerald-900/80 to-transparent">
        <h1 className="font-display text-3xl font-light text-emerald-50">{getText(lang, "settings")}</h1>
      </div>

      <div className="px-4 space-y-5 pb-8">
        <div className="bg-emerald-900/30 rounded-2xl p-4 border border-emerald-800/30">
          <p className="text-emerald-400/50 text-xs uppercase tracking-widest font-body mb-4">{getText(lang, "stats_week")}</p>
          <div className="flex items-end gap-2 h-24 mb-2">
            {stats.days.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-lg bg-gradient-to-t from-emerald-700 to-emerald-500 transition-all duration-500 min-h-[4px]"
                  style={{ height: `${(d.count / maxCount) * 80}px` }} />
                <span className="text-[9px] text-emerald-400/40 font-body">{d.day}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 pt-3 border-t border-emerald-800/30">
            <div className="text-center">
              <p className="font-display text-2xl text-amber-400">{stats.week}</p>
              <p className="text-xs text-emerald-400/40 font-body">
                {lang === "fr" ? "Cette semaine" : lang === "ar" ? "هذا الأسبوع" : "This week"}
              </p>
            </div>
            <div className="text-center">
              <p className="font-display text-2xl text-emerald-300">{stats.total}</p>
              <p className="text-xs text-emerald-400/40 font-body">{getText(lang, "total_zikr")}</p>
            </div>
          </div>
        </div>

        <div className="bg-emerald-900/30 rounded-2xl p-4 border border-emerald-800/30">
          <p className="text-emerald-400/50 text-xs uppercase tracking-widest font-body mb-3">{getText(lang, "language")}</p>
          <div className="flex gap-2">
            {languages.map(({ code, label }) => (
              <button key={code} onClick={() => { setLang(code); localStorage.setItem("sabil_lang", code); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-body transition-all ${
                  lang === code ? "bg-emerald-600 text-white" : "bg-emerald-950 text-emerald-400/60 border border-emerald-800/50"
                }`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-emerald-900/30 rounded-2xl p-4 border border-emerald-800/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center">
              <span className="text-2xl">☪️</span>
            </div>
            <div>
              <p className="text-emerald-50 font-display text-xl">Sabil</p>
              <p className="font-arabic text-amber-400/60 text-sm">سبيل</p>
            </div>
          </div>
          <p className="text-emerald-400/50 text-xs font-body">{getText(lang, "version")}</p>
          <p className="text-emerald-400/40 text-xs font-body mt-1">
            {lang === "fr" ? "Application islamique — Zikr, Dua, Prière, Qibla"
              : lang === "ar" ? "تطبيق إسلامي — ذكر، دعاء، صلاة، قبلة"
              : "Islamic app — Dhikr, Dua, Prayer, Qibla"}
          </p>
        </div>

        <div className="text-center py-4">
          <p className="font-arabic text-amber-400/40 text-lg">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
        </div>

        <button onClick={clearData}
          className="w-full py-3 rounded-2xl border border-red-900/30 text-red-400/50 text-sm font-body">
          {lang === "fr" ? "Effacer les données" : lang === "ar" ? "مسح البيانات" : "Clear data"}
        </button>
      </div>
    </div>
  );
}
