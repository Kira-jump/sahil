import { useEffect, useState } from "react";

export default function Splash() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`fixed inset-0 bg-emerald-950 flex flex-col items-center justify-center z-[100] transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative mb-8">
        <div className="w-32 h-32 rounded-full border-2 border-amber-500/30 flex items-center justify-center"
          style={{animation: "pulseSoft 2s ease-in-out infinite"}}>
          <div className="w-24 h-24 rounded-full border border-amber-500/20 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center shadow-lg">
              <span className="text-4xl">☪️</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 rounded-full border border-dashed border-amber-500/20"
          style={{animation: "spin 8s linear infinite"}} />
      </div>

      <h1 className="font-display text-5xl font-light text-emerald-50 tracking-widest mb-2">
        Sabil
      </h1>
      <p className="font-arabic text-xl text-amber-400/80 mb-1">سبيل</p>
      <p className="text-emerald-400/50 text-sm font-body tracking-wider">
        Le Chemin • The Path • الطريق
      </p>

      <div className="flex gap-2 mt-12">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-amber-500/60"
            style={{ animation: `pulseSoft 1.2s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}
      </div>
    </div>
  );
}
