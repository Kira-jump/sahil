import { useState, useEffect } from "react";
import { getText } from "../i18n";

export default function Qibla({ lang }) {
  const [heading, setHeading] = useState(null);
  const [qiblaAngle, setQiblaAngle] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const KAABA_LAT = 21.4225;
  const KAABA_LON = 39.8262;

  const calculateQibla = (lat, lon) => {
    const lat1 = (lat * Math.PI) / 180;
    const lat2 = (KAABA_LAT * Math.PI) / 180;
    const dLon = ((KAABA_LON - lon) * Math.PI) / 180;
    const y = Math.sin(dLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
  };

  const getLocation = () => {
    setLoading(true);
    setError(null);
    if (!navigator.geolocation) {
      setError(lang === "fr" ? "Géolocalisation non supportée" : lang === "ar" ? "الموقع غير مدعوم" : "Geolocation not supported");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ lat: latitude, lon: longitude });
        setQiblaAngle(calculateQibla(latitude, longitude));
        setLoading(false);
      },
      () => {
        setError(lang === "fr" ? "Impossible d'obtenir votre position. Autorisez la localisation."
          : lang === "ar" ? "تعذر الحصول على موقعك. الرجاء السماح بالوصول."
          : "Could not get your location. Please allow location access.");
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    const handleOrientation = (e) => {
      if (e.webkitCompassHeading) setHeading(e.webkitCompassHeading);
      else if (e.alpha !== null) setHeading(360 - e.alpha);
    };
    if (window.DeviceOrientationEvent) {
      if (typeof DeviceOrientationEvent.requestPermission === "function") {
        DeviceOrientationEvent.requestPermission().then((s) => {
          if (s === "granted") {
            window.addEventListener("deviceorientationabsolute", handleOrientation);
            window.addEventListener("deviceorientation", handleOrientation);
          }
        }).catch(() => {});
      } else {
        window.addEventListener("deviceorientationabsolute", handleOrientation);
        window.addEventListener("deviceorientation", handleOrientation);
      }
    }
    return () => {
      window.removeEventListener("deviceorientationabsolute", handleOrientation);
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  const compassRotation = heading !== null && qiblaAngle !== null ? qiblaAngle - heading : qiblaAngle || 0;

  return (
    <div className="min-h-screen">
      <div className="px-5 pt-10 pb-4 bg-gradient-to-b from-emerald-900/80 to-transparent">
        <h1 className="font-display text-3xl font-light text-emerald-50">{getText(lang, "qibla")}</h1>
        <p className="font-arabic text-amber-400/70 text-sm mt-1">اتِّجَاهُ الْقِبْلَةِ</p>
      </div>

      <div className="px-4 flex flex-col items-center gap-6">
        <div className="relative w-72 h-72 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-emerald-700/40" />
          <div className="absolute inset-4 rounded-full border border-emerald-800/30" />

          <div
            className="absolute inset-8 rounded-full bg-gradient-to-br from-emerald-900 to-emerald-950 border border-emerald-700/30 flex items-center justify-center transition-transform duration-300"
            style={{ transform: `rotate(${-compassRotation}deg)` }}
          >
            {["N","E","S","W"].map((dir, i) => (
              <span key={dir}
                className={`absolute text-xs font-bold font-body ${dir === "N" ? "text-amber-400" : "text-emerald-400/50"}`}
                style={{
                  top: i === 0 ? "8px" : i === 2 ? "auto" : "50%",
                  bottom: i === 2 ? "8px" : "auto",
                  left: i === 3 ? "8px" : i === 1 ? "auto" : "50%",
                  right: i === 1 ? "8px" : "auto",
                  transform: ["N","S"].includes(dir) ? "translateX(-50%)" : "translateY(-50%)",
                }}>
                {dir}
              </span>
            ))}
            <div className="relative w-2 h-24 flex flex-col items-center">
              <div className="flex-1 w-1.5 bg-gradient-to-t from-emerald-500 to-emerald-300 rounded-t-full" />
              <div className="flex-1 w-1.5 bg-gradient-to-b from-red-500 to-red-700 rounded-b-full" />
            </div>
          </div>

          {qiblaAngle !== null && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-500"
              style={{ transform: `rotate(${compassRotation}deg)` }}>
              <div className="absolute top-2 flex flex-col items-center">
                <span className="text-2xl">🕋</span>
                <div className="w-0.5 h-20 bg-gradient-to-b from-amber-400 to-transparent" />
              </div>
            </div>
          )}

          <div className="w-3 h-3 rounded-full bg-amber-400 z-10 shadow-lg" />
        </div>

        {qiblaAngle !== null ? (
          <div className="w-full bg-emerald-900/30 rounded-2xl p-4 border border-emerald-800/30 text-center">
            <p className="text-emerald-400/50 text-xs uppercase tracking-widest font-body mb-1">{getText(lang, "direction")}</p>
            <p className="font-display text-5xl text-amber-400 font-light">{Math.round(qiblaAngle)}°</p>
            {location && <p className="text-emerald-400/40 text-xs font-body mt-2">{location.lat.toFixed(4)}°, {location.lon.toFixed(4)}°</p>}
            {heading !== null && (
              <p className="text-emerald-400/40 text-xs font-body mt-1">
                {lang === "fr" ? "Cap actuel" : lang === "ar" ? "الاتجاه الحالي" : "Current heading"}: {Math.round(heading)}°
              </p>
            )}
          </div>
        ) : (
          <div className="w-full bg-emerald-900/30 rounded-2xl p-6 border border-emerald-800/30 text-center">
            <p className="text-3xl mb-3">🧭</p>
            <p className="text-emerald-200/70 text-sm font-body mb-4">
              {lang === "fr" ? "Appuyez pour trouver la direction de la Qibla"
                : lang === "ar" ? "اضغط لإيجاد اتجاه القبلة"
                : "Press to find the Qibla direction"}
            </p>
            {error && <p className="text-red-400/70 text-xs font-body mb-3">{error}</p>}
          </div>
        )}

        <button onClick={getLocation} disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-emerald-700 to-emerald-600 rounded-2xl text-white font-body font-medium disabled:opacity-50">
          {loading
            ? (lang === "fr" ? "Localisation..." : lang === "ar" ? "جارٍ التحديد..." : "Locating...")
            : (lang === "fr" ? "📍 Trouver ma Qibla" : lang === "ar" ? "📍 حدد قبلتي" : "📍 Find my Qibla")}
        </button>

        <p className="text-emerald-400/30 text-xs font-body text-center">
          {lang === "fr" ? "Utilise votre GPS et l'orientation de l'appareil"
            : lang === "ar" ? "يستخدم GPS وتوجه الجهاز"
            : "Uses your GPS and device orientation"}
        </p>
      </div>
    </div>
  );
}
