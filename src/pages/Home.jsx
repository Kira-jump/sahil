import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getText } from "../i18n";

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return { fr: "Bonjour", ar: "صباح الخير", en: "Good morning" };
  if (h < 18) return { fr: "Bon après-midi", ar: "مساء الخير", en: "Good afternoon" };
  return { fr: "Bonsoir", ar: "مساء الخير", en: "Good evening" };
};

const getDayName = (lang) => {
  const days = {
    fr: ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"],
    ar: ["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
    en: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
  };
  return days[lang][new Date().getDay()];
};

export default function Home({ lang }) {
  const [stats, setStats] = useState({ total: 0, today: 0 });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("sabil_zikr_sessions") || "[]");
    const today = new Date().toDateString();
    const todayCount = saved
      .filter(s => new Date(s.date).toDateString() === today)
      .reduce((sum, s) => sum + s.count, 0);
    const total = saved.reduce((sum, s) => sum + s.count, 0);
    setStats({ total, today: todayCount });
  }, []);

  const greeting = getGreeting();

  const quickLinks = [
    { to: "/zikr", icon: "📿", label: { fr: "Zikr", ar: "ذكر", en: "Dhikr" }, color: "from-emerald-700 to-emerald-800" },
    { to: "/dua", icon: "🤲", label: { fr: "Dua", ar: "دعاء", en: "Dua" }, color: "from-teal-700 to-teal-800" },
    { to: "/prayer", icon: "🕌", label: { fr: "Prière", ar: "صلاة", en: "Prayer" }, color: "from-emerald-800 to-green-900" },
    { to: "/learn", icon: "📖", label: { fr: "Apprendre", ar: "تعلم", en: "Learn" }, color: "from-green-700 to-emerald-800" },
    { to: "/qibla", icon: "🧭", label: { fr: "Qibla", ar: "قبلة", en: "Qibla" }, color: "from-amber-700 to-amber-800" },
    { to: "/settings", icon: "⚙️", label: { fr: "Réglages", ar: "إعدادات", en: "Settings" }, color: "from-slate-700 to-slate-800" },
  ];

  return (
    <div className="min-h-screen pattern-bg">
      <div className="relative px-5 pt-12 pb-6 bg-gradient-to-b from-emerald-900/80 to-transparent">
        <p className="text-emerald-400/70 text-sm font-body mb-1">{getDayName(lang)}</p>
        <h1 className="font-display text-3xl font-light text-emerald-50">{greeting[lang]}</h1>
        <div className="mt-4 ornament-line">
          <span className="font-arabic text-amber-400/80 text-base text-center leading-loose">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </span>
        </div>
      </div>

      <div className="px-4 space-y-5 stagger">
        <div className="bg-gradient-to-br from-emerald-800/60 to-emerald-900/60 rounded-2xl p-4 border border-emerald-700/30 backdrop-blur-sm">
          <p className="text-emerald-400/60 text-xs font-body uppercase tracking-widest mb-3">
            {getText(lang, "stats_week")}
          </p>
          <div className="flex gap-4">
            <div className="flex-1 text-center">
              <p className="font-display text-4xl text-amber-400 font-light">{stats.today}</p>
              <p className="text-emerald-400/50 text-xs mt-1">
                {lang === "fr" ? "Aujourd'hui" : lang === "ar" ? "اليوم" : "Today"}
              </p>
            </div>
            <div className="w-px bg-emerald-700/40" />
            <div className="flex-1 text-center">
              <p className="font-display text-4xl text-emerald-300 font-light">{stats.total}</p>
              <p className="text-emerald-400/50 text-xs mt-1">{getText(lang, "total_zikr")}</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-emerald-400/60 text-xs font-body uppercase tracking-widest mb-3 px-1">
            {lang === "fr" ? "Navigation rapide" : lang === "ar" ? "تنقل سريع" : "Quick access"}
          </p>
          <div className="grid grid-cols-3 gap-3">
            {quickLinks.map(({ to, icon, label, color }) => (
              <Link
                key={to}
                to={to}
                className={`bg-gradient-to-br ${color} rounded-2xl p-4 flex flex-col items-center gap-2 card-hover border border-white/5`}
              >
                <span className="text-2xl">{icon}</span>
                <span className="text-xs font-body text-white/80">{label[lang]}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-900/30 to-emerald-900/30 rounded-2xl p-4 border border-amber-700/20">
          <p className="text-amber-400/70 text-xs uppercase tracking-widest mb-2 font-body">
            {lang === "fr" ? "Rappel du jour" : lang === "ar" ? "تذكير اليوم" : "Daily reminder"}
          </p>
          <p className="font-arabic text-lg text-emerald-50 leading-loose text-center">
            سُبْحَانَ اللَّهِ وَبِحَمْدِهِ
          </p>
          <p className="text-emerald-400/60 text-sm text-center mt-1 font-body">
            {lang === "fr" ? "Gloire à Allah et louange à Lui"
              : lang === "ar" ? "سبحان الله وبحمده"
              : "Glory be to Allah and praise be to Him"}
          </p>
        </div>
      </div>
    </div>
  );
}
