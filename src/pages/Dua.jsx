import { useState, useEffect } from "react";
import { getText } from "../i18n";

const DUAS = [
  {
    id: "wake_up",
    number: 1,
    source: { fr: "Au réveil", ar: "عند الاستيقاظ", en: "Upon waking up" },
    icon: "🌅",
    arabic: "اَلْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    transliteration: "Alhamdu lillahil ladhi ahyana ba'da ma amatana wa ilayhin nushur",
    translation: {
      fr: "Louange à Allah qui nous a redonné la vie après nous avoir fait mourir, et c'est vers Lui que sera la résurrection",
      ar: "الحمد لله الذي أحيانا بعد ما أماتنا وإليه النشور",
      en: "Praise be to Allah who gave us life after causing us to die, and to Him is the resurrection",
    },
    source_ref: "Sahih Al-Bukhari",
  },
  {
    id: "enter_bathroom",
    number: 2,
    source: { fr: "En entrant dans la douche", ar: "عند دخول الحمام", en: "Entering the bathroom" },
    icon: "🚿",
    arabic: "بِسْمِ اللَّهِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
    transliteration: "Bismillah, Allahumma inni a'udhu bika minal khubuthi wal khaba'ith",
    translation: {
      fr: "Au nom d'Allah. Ô Allah, je cherche refuge en Toi contre les démons mâles et femelles",
      ar: "بسم الله، اللهم إني أعوذ بك من الخبث والخبائث",
      en: "In the name of Allah. O Allah, I seek refuge in You from male and female devils",
    },
    source_ref: "Sahih Al-Bukhari & Muslim",
  },
  {
    id: "exit_bathroom",
    number: 3,
    source: { fr: "En sortant de la douche", ar: "عند الخروج من الحمام", en: "Leaving the bathroom" },
    icon: "🚿",
    arabic: "غُفْرَانَكَ",
    transliteration: "Ghufranaka",
    translation: {
      fr: "Je Te demande pardon",
      ar: "غفرانك",
      en: "I ask Your forgiveness",
    },
    source_ref: "Abu Dawud — At-Tirmidhi",
  },
  {
    id: "before_wudu",
    number: 4,
    source: { fr: "Avant les ablutions", ar: "قبل الوضوء", en: "Before ablution" },
    icon: "💧",
    arabic: "بِسْمِ اللَّهِ",
    transliteration: "Bismillah",
    translation: {
      fr: "Au nom d'Allah",
      ar: "بسم الله",
      en: "In the name of Allah",
    },
    source_ref: "Sahih Al-Bukhari",
  },
  {
    id: "after_wudu",
    number: 5,
    source: { fr: "Après les ablutions", ar: "بعد الوضوء", en: "After ablution" },
    icon: "💧",
    arabic: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّداً عَبْدُهُ وَرَسُولُهُ، اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ، سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ",
    transliteration: "Ash-hadu an la ilaha illallahu wahdahu la sharika lahu wa ash-hadu anna Muhammadan abduhu wa rasuluh. Allahumma j'alni minat tawwabina waj'alni minal mutatahhirin. Subhanakal lahumma wa bihamdika ash-hadu an la ilaha illa anta astaghfiruka wa atubu ilayk",
    translation: {
      fr: "Je témoigne qu'il n'y a de dieu qu'Allah seul sans associé et que Muhammad est Son serviteur et Son messager. Ô Allah, fais de moi parmi ceux qui se repentent et parmi ceux qui se purifient. Gloire à Toi ô Allah, je témoigne qu'il n'y a de dieu que Toi, je Te demande pardon et je me repens à Toi",
      ar: "أشهد أن لا إله إلا الله وحده لا شريك له وأشهد أن محمداً عبده ورسوله، اللهم اجعلني من التوابين واجعلني من المتطهرين",
      en: "I bear witness that there is no god but Allah alone with no partner, and that Muhammad is His servant and messenger. O Allah, make me among those who repent and among those who purify themselves. Glory be to You O Allah, I bear witness that there is no god but You, I seek Your forgiveness and repent to You",
    },
    source_ref: "Sahih Muslim",
  },
  {
    id: "leaving_home",
    number: 6,
    source: { fr: "En sortant de la maison", ar: "عند الخروج من المنزل", en: "Leaving the house" },
    icon: "🚪",
    arabic: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أَضِلَّ أَوْ أُضَلَّ، أَوْ أَزِلَّ أَوْ أُزَلَّ، أَوْ أَظْلِمَ أَوْ أُظْلَمَ، أَوْ أَجْهَلَ أَوْ يُجْهَلَ عَلَيَّ",
    transliteration: "Bismillah, tawakkaltu alallah, wa la hawla wa la quwwata illa billah. Allahumma inni a'udhu bika an adilla aw udalla, aw azilla aw uzalla, aw azlima aw uzlama, aw ajhala aw yujhala alayya",
    translation: {
      fr: "Au nom d'Allah, je me confie à Allah, il n'y a de force ni de puissance qu'en Allah. Ô Allah, je cherche refuge en Toi contre le fait de m'égarer ou d'égarer, de glisser ou faire glisser, d'opprimer ou être opprimé, d'agir par ignorance ou qu'on agisse par ignorance envers moi",
      ar: "بسم الله، توكلت على الله، ولا حول ولا قوة إلا بالله",
      en: "In the name of Allah, I put my trust in Allah, there is no might nor power except with Allah. O Allah, I seek refuge in You from going astray or leading others astray, from slipping or causing others to slip, from wronging or being wronged, from acting in ignorance or being treated with ignorance",
    },
    source_ref: "Abu Dawud — At-Tirmidhi",
  },
  {
    id: "going_mosque",
    number: 7,
    source: { fr: "En allant à la mosquée", ar: "في الطريق إلى المسجد", en: "Going to the mosque" },
    icon: "🕌",
    arabic: "اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُوراً، وَفِي لِسَانِي نُوراً، وَفِي سَمْعِي نُوراً، وَفِي بَصَرِي نُوراً، وَمِنْ فَوْقِي نُوراً، وَمِنْ تَحْتِي نُوراً، وَعَنْ يَمِينِي نُوراً، وَعَنْ شِمَالِي نُوراً، وَمِنْ أَمَامِي نُوراً، وَمِنْ خَلْفِي نُوراً، وَاجْعَلْ فِي نَفْسِي نُوراً، وَأَعْظِمْ لِي نُوراً، وَعَظِّمْ لِي نُوراً، وَاجْعَلْ لِي نُوراً، وَاجْعَلْنِي نُوراً، اللَّهُمَّ أَعْطِنِي نُوراً، وَاجْعَلْ فِي عَصَبِي نُوراً، وَفِي لَحْمِي نُوراً، وَفِي دَمِي نُوراً، وَفِي شَعْرِي نُوراً، وَفِي بَشَرِي نُوراً، اللَّهُمَّ اجْعَلْ لِي نُوراً فِي قَبْرِي، وَزِدْنِي نُوراً، وَزِدْنِي نُوراً، وَزِدْنِي نُوراً، وَهَبْ لِي نُوراً عَلَى نُور",
    transliteration: "Allahumma j'al fi qalbi nuran, wa fi lisani nuran, wa fi sam'i nuran, wa fi basari nuran, wa min fawqi nuran, wa min tahti nuran, wa an yamini nuran, wa an shimali nuran, wa min amami nuran, wa min khalfi nuran. Wa j'al fi nafsi nuran, wa a'zim li nuran, wa azzim li nuran. Wa j'al li nuran, wa j'alni nuran. Allahumma a'tini nuran, wa j'al fi asabi nuran, wa fi lahmi nuran, wa fi dami nuran, wa fi sha'ri nuran, wa fi bashari nuran. Allahumma j'al li nuran fi qabri, wa zidni nuran, wa zidni nuran, wa zidni nuran. Wa hab li nuran ala nur",
    translation: {
      fr: "Ô Allah, mets de la lumière dans mon cœur, ma langue, mon ouïe, ma vue, au-dessus et en dessous de moi, à ma droite et à ma gauche, devant et derrière moi, dans mon âme. Agrandis pour moi la lumière. Ô Allah, donne-moi de la lumière dans mes nerfs, ma chair, mon sang, mes cheveux, ma peau et dans ma tombe. Augmente ma lumière, augmente ma lumière, augmente ma lumière. Et accorde-moi une lumière sur lumière",
      ar: "اللهم اجعل في قلبي نوراً، وفي لساني نوراً، وفي سمعي نوراً، وفي بصري نوراً",
      en: "O Allah, place light in my heart, tongue, hearing, sight, above and below me, to my right and left, in front and behind me, in my soul. Magnify the light for me. O Allah, grant me light in my nerves, flesh, blood, hair, skin and in my grave. Increase my light, increase my light, increase my light. And grant me light upon light",
    },
    source_ref: "Sahih Al-Bukhari & Muslim",
  },
  {
    id: "entering_mosque",
    number: 8,
    source: { fr: "En entrant à la mosquée", ar: "عند دخول المسجد", en: "Entering the mosque" },
    icon: "🕌",
    arabic: "أَعُوذُ بِاللَّهِ الْعَظِيمِ وَبِوَجْهِهِ الْكَرِيمِ وَسُلْطَانِهِ الْقَدِيمِ مِنَ الشَّيْطَانِ الرَّجِيمِ، بِسْمِ اللَّهِ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    transliteration: "A'udhu billahil azimi, wa biwajhihil karimi, wa sultanihil qadimi, minash shaytanir rajim. Bismillah, was salatu was salamu ala rasulillah. Allahumma ftah li abwaba rahmatik",
    translation: {
      fr: "Je cherche refuge auprès d'Allah le Très Grand, auprès de Son noble Visage et de Son autorité éternelle, contre le diable maudit. Au nom d'Allah, que la paix et les bénédictions soient sur le Messager d'Allah. Ô Allah, ouvre-moi les portes de Ta miséricorde",
      ar: "أعوذ بالله العظيم وبوجهه الكريم وسلطانه القديم من الشيطان الرجيم، بسم الله، والصلاة والسلام على رسول الله، اللهم افتح لي أبواب رحمتك",
      en: "I seek refuge in Allah the Almighty, in His noble Face and His eternal authority, from the accursed devil. In the name of Allah, peace and blessings be upon the Messenger of Allah. O Allah, open for me the doors of Your mercy",
    },
    source_ref: "Abu Dawud — Sahih Al-Jami",
  },
  {
    id: "leaving_mosque",
    number: 9,
    source: { fr: "En sortant de la mosquée", ar: "عند الخروج من المسجد", en: "Leaving the mosque" },
    icon: "🕌",
    arabic: "بِسْمِ اللَّهِ وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ، اللَّهُمَّ اعْصِمْنِي مِنَ الشَّيْطَانِ الرَّجِيمِ",
    transliteration: "Bismillah, was salatu was salamu ala rasulillah. Allahumma inni as'aluka min fadlik. Allahumma isimni minash shaytanir rajim",
    translation: {
      fr: "Au nom d'Allah, que la paix et les bénédictions soient sur le Messager d'Allah. Ô Allah, je Te demande de Ta grâce. Ô Allah, protège-moi du diable maudit",
      ar: "بسم الله والصلاة والسلام على رسول الله، اللهم إني أسألك من فضلك، اللهم اعصمني من الشيطان الرجيم",
      en: "In the name of Allah, peace and blessings be upon the Messenger of Allah. O Allah, I ask You of Your bounty. O Allah, protect me from the accursed devil",
    },
    source_ref: "Ibn Majah — Sahih",
  },
  {
    id: "entering_home",
    number: 10,
    source: { fr: "En rentrant à la maison", ar: "عند دخول المنزل", en: "Entering the house" },
    icon: "🏠",
    arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا",
    transliteration: "Bismillahi walajnaa, wa bismillahi kharajnaa, wa ala rabbina tawakkalna",
    translation: {
      fr: "Au nom d'Allah nous entrons, au nom d'Allah nous sortons, et en notre Seigneur nous nous confions",
      ar: "بسم الله ولجنا، وبسم الله خرجنا، وعلى ربنا توكلنا",
      en: "In the name of Allah we enter, in the name of Allah we leave, and in our Lord we put our trust",
    },
    source_ref: "Abu Dawud",
  },
  {
    id: "before_eating",
    number: 11,
    source: { fr: "Avant de manger", ar: "قبل الأكل", en: "Before eating" },
    icon: "🍽️",
    arabic: "بِسْمِ اللَّهِ",
    transliteration: "Bismillah",
    translation: {
      fr: "Au nom d'Allah",
      ar: "بسم الله",
      en: "In the name of Allah",
    },
    source_ref: "Sahih Al-Bukhari",
  },
  {
    id: "after_eating",
    number: 12,
    source: { fr: "Après le repas", ar: "بعد الأكل", en: "After eating" },
    icon: "🍽️",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
    transliteration: "Alhamdu lillahil ladhi at'amani hadha wa razaqanihi min ghayri hawlin minni wa la quwwatin",
    translation: {
      fr: "Louange à Allah qui m'a nourri de ceci et me l'a accordé sans force ni pouvoir de ma part",
      ar: "الحمد لله الذي أطعمني هذا ورزقنيه من غير حول مني ولا قوة",
      en: "Praise be to Allah who fed me this and provided it for me without any strength or power on my part",
    },
    source_ref: "At-Tirmidhi — Abu Dawud — Ibn Majah",
  },
  {
    id: "before_sleep",
    number: 13,
    source: { fr: "Avant de dormir", ar: "قبل النوم", en: "Before sleeping" },
    icon: "🌙",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    transliteration: "Allahumma anta rabbi la ilaha illa anta, khalaqtani wa ana abduka, wa ana ala ahdika wa wa'dika mastata'tu, a'udhu bika min sharri ma sana'tu, abu'u laka bini'matika alayya, wa abu'u bidhanbi faghfir li, fa innahu la yaghfirudh dhunuba illa anta",
    translation: {
      fr: "Ô Allah, Tu es mon Seigneur, il n'y a de dieu que Toi. Tu m'as créé et je suis Ton serviteur. Je respecte mon engagement envers Toi autant que je le peux. Je cherche refuge en Toi contre le mal que j'ai commis. Je reconnais Tes bienfaits sur moi et je confesse mes péchés, alors pardonne-moi, car nul ne pardonne les péchés sinon Toi",
      ar: "اللهم أنت ربي لا إله إلا أنت، خلقتني وأنا عبدك، وأنا على عهدك ووعدك ما استطعت",
      en: "O Allah, You are my Lord, there is no god but You. You created me and I am Your servant. I uphold Your covenant and promise as best I can. I seek refuge in You from the evil I have done. I acknowledge Your blessings upon me and confess my sins, so forgive me, for none forgives sins except You",
    },
    source_ref: "Sahih Al-Bukhari",
  },
];

export default function Dua({ lang }) {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem("sabil_fav_duas") || "[]")
  );
  const [expanded, setExpanded] = useState(null);
  const [showFavOnly, setShowFavOnly] = useState(false);

  useEffect(() => {
    localStorage.setItem("sabil_fav_duas", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFav = (id) => {
    setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
  };

  const filtered = DUAS.filter((d) => {
    if (showFavOnly && !favorites.includes(d.id)) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        d.arabic.includes(q) ||
        d.translation[lang]?.toLowerCase().includes(q) ||
        d.source[lang]?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen">
      <div className="px-5 pt-10 pb-4 bg-gradient-to-b from-emerald-900/80 to-transparent">
        <h1 className="font-display text-3xl font-light text-emerald-50">
          {getText(lang, "dua")}
        </h1>
        <p className="font-arabic text-amber-400/70 text-sm mt-1">الأدعية والأذكار</p>
      </div>

      <div className="px-4 mb-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={getText(lang, "search")}
          className="w-full bg-emerald-900/50 border border-emerald-800/50 rounded-2xl px-4 py-3 text-sm text-emerald-50 font-body outline-none focus:border-emerald-600 placeholder:text-emerald-400/30"
        />
      </div>

      <div className="flex gap-2 px-4 mb-4">
        <button
          onClick={() => setShowFavOnly(false)}
          className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-body transition-all ${
            !showFavOnly ? "bg-emerald-600 text-white" : "bg-emerald-900/50 text-emerald-400/60 border border-emerald-800/50"
          }`}
        >
          {lang === "fr" ? "Tout" : lang === "ar" ? "الكل" : "All"} ({DUAS.length})
        </button>
        <button
          onClick={() => setShowFavOnly(true)}
          className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-body transition-all ${
            showFavOnly ? "bg-amber-600 text-white" : "bg-emerald-900/50 text-emerald-400/60 border border-emerald-800/50"
          }`}
        >
          ⭐ {lang === "fr" ? "Favoris" : lang === "ar" ? "المفضلة" : "Favorites"} ({favorites.length})
        </button>
      </div>

      <div className="px-4 space-y-3 pb-4">
        {filtered.length === 0 && (
          <p className="text-center text-emerald-400/40 text-sm font-body py-8">
            {lang === "fr" ? "Aucun résultat" : lang === "ar" ? "لا نتائج" : "No results"}
          </p>
        )}
        {filtered.map((dua) => (
          <div key={dua.id} className="bg-emerald-900/30 rounded-2xl border border-emerald-800/30 overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === dua.id ? null : dua.id)}
              className="w-full p-4 text-left"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{dua.icon}</span>
                    <span className="text-amber-400/60 text-xs font-body font-semibold">#{dua.number}</span>
                    <span className="text-emerald-400/50 text-xs font-body">{dua.source[lang]}</span>
                  </div>
                  <p className="font-arabic text-lg text-amber-300 leading-loose">
                    {dua.arabic.length > 60 ? dua.arabic.substring(0, 60) + "..." : dua.arabic}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFav(dua.id); }}
                    className="text-xl"
                  >
                    {favorites.includes(dua.id) ? "⭐" : "☆"}
                  </button>
                  <span className="text-emerald-400/40 text-xs">
                    {expanded === dua.id ? "▲" : "▼"}
                  </span>
                </div>
              </div>
            </button>

            {expanded === dua.id && (
              <div className="px-4 pb-4 border-t border-emerald-800/30 pt-3 space-y-3">
                <p className="font-arabic text-lg text-amber-200 leading-loose text-right">
                  {dua.arabic}
                </p>
                <p className="text-emerald-300/70 text-sm font-body italic leading-relaxed">
                  {dua.transliteration}
                </p>
                <p className="text-emerald-50/80 text-sm font-body leading-relaxed">
                  {dua.translation[lang]}
                </p>
                <p className="text-emerald-400/30 text-xs font-body">
                  📚 {dua.source_ref}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
