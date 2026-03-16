import { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import Zikr from "./pages/Zikr";
import Dua from "./pages/Dua";
import Learn from "./pages/Learn";
import Prayer from "./pages/Prayer";
import Qibla from "./pages/Qibla";
import Settings from "./pages/Settings";
import Splash from "./pages/Splash";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [lang, setLang] = useState(() => localStorage.getItem("sabil_lang") || "fr");

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <Splash />;

  return (
    <HashRouter>
      <div className="min-h-dvh bg-emerald-950 text-emerald-50 flex flex-col max-w-md mx-auto relative">
        <div className="flex-1 pb-20">
          <Routes>
            <Route path="/" element={<Home lang={lang} />} />
            <Route path="/zikr" element={<Zikr lang={lang} />} />
            <Route path="/dua" element={<Dua lang={lang} />} />
            <Route path="/learn" element={<Learn lang={lang} />} />
            <Route path="/prayer" element={<Prayer lang={lang} />} />
            <Route path="/qibla" element={<Qibla lang={lang} />} />
            <Route path="/settings" element={<Settings lang={lang} setLang={setLang} />} />
          </Routes>
        </div>
        <BottomNav lang={lang} />
      </div>
    </HashRouter>
  );
}
