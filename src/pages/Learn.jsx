import { useState } from "react";
import { getText } from "../i18n";

const TOPICS = [
  {
    id: "pillars", icon: "🕌",
    title: { fr: "Les 5 Piliers de l'Islam", ar: "أركان الإسلام الخمسة", en: "The 5 Pillars of Islam" },
    content: {
      fr: "L'Islam est fondé sur cinq piliers :\n\n**1. La Shahada** — La déclaration de foi : Il n'y a de dieu qu'Allah et Muhammad est Son messager.\n\n**2. La Salah** — La prière obligatoire 5 fois par jour : Fajr, Dhuhr, Asr, Maghrib, Isha.\n\n**3. La Zakat** — L'aumône obligatoire (2,5% des économies annuelles).\n\n**4. Le Sawm** — Le jeûne du mois de Ramadan.\n\n**5. Le Hajj** — Le pèlerinage à La Mecque, obligatoire une fois dans la vie.",
      ar: "يقوم الإسلام على خمسة أركان:\n\n**1. الشهادة** — أشهد أن لا إله إلا الله وأن محمداً رسول الله\n\n**2. الصلاة** — خمس صلوات يومياً\n\n**3. الزكاة** — 2.5% من المدخرات السنوية\n\n**4. الصوم** — صيام شهر رمضان\n\n**5. الحج** — حج بيت الله مرة في العمر",
      en: "Islam is built on five pillars:\n\n**1. Shahada** — The declaration: There is no god but Allah and Muhammad is His messenger.\n\n**2. Salah** — Obligatory prayer 5 times daily: Fajr, Dhuhr, Asr, Maghrib, Isha.\n\n**3. Zakat** — Obligatory charity (2.5% of annual savings).\n\n**4. Sawm** — Fasting during Ramadan.\n\n**5. Hajj** — Pilgrimage to Mecca, once in a lifetime.",
    },
  },
  {
    id: "creation", icon: "🌌",
    title: { fr: "La Création — Le Début", ar: "الخلق — البداية", en: "Creation — The Beginning" },
    content: {
      fr: "Avant la création, il n'existait qu'Allah, l'Unique.\n\nAllah a créé les cieux et la terre en six jours. Il a créé les anges à partir de lumière, et les djinns à partir de feu.\n\nEnsuite Il a créé **Adam عليه السلام**, le premier être humain, à partir d'argile. Il lui insuffla Son Esprit et lui enseigna les noms de toutes choses.\n\nAllah ordonna aux anges de se prosterner devant Adam. Tous obéirent sauf **Iblis**, qui refusa par orgueil et fut maudit.\n\nAdam et Hawwa vécurent au Paradis jusqu'à ce qu'ils furent trompés par Shaytan. Allah les fit descendre sur terre.",
      ar: "قبل الخلق لم يكن إلا الله وحده.\n\nخلق الله السماوات والأرض في ستة أيام. خلق الملائكة من نور والجن من نار.\n\nثم خلق **آدم عليه السلام** من طين ونفخ فيه من روحه.\n\nأمر الله الملائكة بالسجود لآدم فسجدوا إلا **إبليس** أبى واستكبر فلُعن.\n\nسكن آدم وحواء الجنة حتى أغواهما الشيطان فأُهبطا إلى الأرض.",
      en: "Before creation, only Allah existed, the One.\n\nAllah created the heavens and earth in six days. He created angels from light and jinn from fire.\n\nThen He created **Adam (peace be upon him)**, the first human, from clay. He breathed His spirit into him.\n\nAllah commanded the angels to prostrate before Adam. All obeyed except **Iblis**, who refused and was cursed.\n\nAdam and Hawwa lived in Paradise until deceived by Shaytan. Allah sent them down to earth.",
    },
  },
  {
    id: "prophets", icon: "📜",
    title: { fr: "Les 25 Prophètes", ar: "الأنبياء الخمسة والعشرون", en: "The 25 Prophets" },
    content: {
      fr: "Allah a envoyé 124 000 prophètes. Voici les 25 mentionnés dans le Coran :\n\nAdam • Idris • Nuh • Hud • Salih • Ibrahim • Lut • Ismail • Ishaq • Yaqub • Yusuf • Shuayb • Ayyub • Musa • Harun • Dhul-Kifl • Dawud • Sulayman • Ilyas • Al-Yasa • Yunus • Zakariya • Yahya • Isa • **Muhammad ﷺ**\n\nLe premier prophète : Adam عليه السلام\nLe dernier et sceau des prophètes : **Muhammad ﷺ**",
      ar: "أرسل الله 124000 نبي. إليك الـ25 المذكورون في القرآن:\n\nآدم • إدريس • نوح • هود • صالح • إبراهيم • لوط • إسماعيل • إسحاق • يعقوب • يوسف • شعيب • أيوب • موسى • هارون • ذو الكفل • داود • سليمان • إلياس • اليسع • يونس • زكريا • يحيى • عيسى • **محمد ﷺ**",
      en: "Allah sent 124,000 prophets. Here are the 25 mentioned in the Quran:\n\nAdam • Idris • Nuh • Hud • Salih • Ibrahim • Lut • Ismail • Ishaq • Yaqub • Yusuf • Shuayb • Ayyub • Musa • Harun • Dhul-Kifl • Dawud • Sulayman • Ilyas • Al-Yasa • Yunus • Zakariya • Yahya • Isa • **Muhammad ﷺ**\n\nFirst prophet: Adam (peace be upon him)\nLast and seal: **Muhammad ﷺ**",
    },
  },
  {
    id: "muhammad", icon: "☪️",
    title: { fr: "Le Prophète Muhammad ﷺ", ar: "النبي محمد ﷺ", en: "Prophet Muhammad ﷺ" },
    content: {
      fr: "Muhammad ﷺ est né à La Mecque en **570 après J.-C.** (Année de l'Éléphant), de la tribu des Quraychites.\n\nÀ **40 ans**, il reçut sa première révélation de l'ange Jibreel dans la grotte de Hira : « Lis ! Au nom de ton Seigneur... »\n\nIl prêcha l'Islam à La Mecque pendant **13 ans**. En **622**, il émigra à Médine (l'Hégire), début du calendrier islamique.\n\nEn **630**, il revint à La Mecque triomphalement. En **632**, il accomplit son Hajj d'Adieu et mourut le 12 Rabi'ul Awwal.",
      ar: "ولد ﷺ في مكة عام **570م** من قبيلة قريش.\n\nفي سن **الأربعين** نزل عليه الوحي في غار حراء: «اقرأ باسم ربك».\n\nدعا إلى الإسلام **13 سنة** في مكة ثم هاجر إلى المدينة عام **622م**.\n\nفتح مكة عام **630م** وحج حجة الوداع عام **632م** ثم انتقل إلى الرفيق الأعلى.",
      en: "Muhammad ﷺ was born in Mecca in **570 CE** (Year of the Elephant), from the Quraysh tribe.\n\nAt **age 40**, he received his first revelation from Jibreel in the cave of Hira: \"Read! In the name of your Lord...\"\n\nHe preached in Mecca for **13 years**. In **622**, he migrated to Medina (the Hijra), start of the Islamic calendar.\n\nIn **630**, he returned to Mecca. In **632**, he performed his Farewell Hajj and passed away on 12 Rabi'ul Awwal.",
    },
  },
  {
    id: "judgment_day", icon: "⚖️",
    title: { fr: "Le Jour du Jugement", ar: "يوم القيامة", en: "The Day of Judgment" },
    content: {
      fr: "Le Jour du Jugement (Yawm Al-Qiyamah) est le jour où Allah ressuscitera toute l'humanité.\n\n**Signes majeurs :**\n• Descente de Issa عليه السلام\n• Apparition du Mahdi\n• Sortie du Dajjal\n• Sortie de Ya'jouj et Ma'jouj\n• Lever du soleil à l'Ouest\n\n**Le déroulement :**\nIsrafil soufflera la trompette. Tous mourront puis seront ressuscités. Chacun recevra son livre de comptes. La balance (Mizan) pèsera les actes. Le Sirat sera traversé.\n\nEnsuite : **Jannah** pour les croyants, **Jahannam** pour les mécréants.",
      ar: "يوم القيامة هو اليوم الذي يبعث الله فيه الخلائق للحساب.\n\n**أشراطه الكبرى:**\n• نزول عيسى عليه السلام\n• ظهور المهدي\n• خروج الدجال\n• خروج يأجوج ومأجوج\n• طلوع الشمس من مغربها\n\n**ثم:** الجنة للمؤمنين والنار للكافرين.",
      en: "The Day of Judgment (Yawm Al-Qiyamah) is when Allah resurrects all of humanity.\n\n**Major signs:**\n• Descent of Isa (peace be upon him)\n• Appearance of the Mahdi\n• Emergence of Dajjal\n• Emergence of Ya'jouj and Ma'jouj\n• Sun rising from the West\n\n**The sequence:**\nIsrafil blows the trumpet. All die then are resurrected. Each receives their book of deeds. Scales (Mizan) weigh deeds. The Sirat is crossed.\n\nThen: **Jannah** for believers, **Jahannam** for disbelievers.",
    },
  },
  {
    id: "quran", icon: "📗",
    title: { fr: "Le Saint Coran", ar: "القرآن الكريم", en: "The Holy Quran" },
    content: {
      fr: "Le Coran est la parole d'Allah, révélée à Muhammad ﷺ via Jibreel sur **23 ans**.\n\n**Faits :**\n• **114** Sourates\n• **6 236** versets\n• Révélé en arabe\n• Première révélation : Al-Alaq\n• Dernière : Al-Maida v.3\n• Plus longue : Al-Baqara (286 v.)\n• Plus courte : Al-Kawthar (3 v.)\n\n**Les 4 Livres sacrés :**\n1. Torah → Musa عليه السلام\n2. Zabur → Dawud عليه السلام\n3. Injil → Isa عليه السلام\n4. **Coran → Muhammad ﷺ** (le dernier et complet)",
      ar: "القرآن كلام الله أُنزل على النبي ﷺ بواسطة جبريل على مدى **23 سنة**.\n\n**114** سورة • **6236** آية • باللغة العربية\n\nأول ما نزل: العلق • آخر ما نزل: المائدة\nأطول سورة: البقرة • أقصر سورة: الكوثر",
      en: "The Quran is the word of Allah, revealed to Muhammad ﷺ through Jibreel over **23 years**.\n\n**Facts:**\n• **114** Surahs\n• **6,236** verses\n• Revealed in Arabic\n• First revelation: Al-Alaq\n• Last: Al-Maida v.3\n• Longest: Al-Baqara (286 v.)\n• Shortest: Al-Kawthar (3 v.)\n\n**The 4 Sacred Books:**\n1. Torah → Musa (pbuh)\n2. Zabur → Dawud (pbuh)\n3. Injil → Isa (pbuh)\n4. **Quran → Muhammad ﷺ** (final and complete)",
    },
  },
];

export default function Learn({ lang }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="min-h-screen">
      <div className="px-5 pt-10 pb-4 bg-gradient-to-b from-emerald-900/80 to-transparent">
        <h1 className="font-display text-3xl font-light text-emerald-50">{getText(lang, "learn")}</h1>
        <p className="font-arabic text-amber-400/70 text-sm mt-1">
          {lang === "fr" ? "Connais ta religion" : lang === "ar" ? "اعرف دينك" : "Know your religion"}
        </p>
      </div>

      <div className="px-4 space-y-3 pb-4">
        {TOPICS.map((topic) => (
          <div key={topic.id} className="bg-emerald-900/30 rounded-2xl border border-emerald-800/30 overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === topic.id ? null : topic.id)}
              className="w-full p-4 text-left flex items-center gap-3"
            >
              <span className="text-3xl">{topic.icon}</span>
              <div className="flex-1">
                <p className="text-emerald-50 font-body font-medium text-sm">{topic.title[lang]}</p>
              </div>
              <span className="text-emerald-400/40 text-sm">{expanded === topic.id ? "▲" : "▼"}</span>
            </button>

            {expanded === topic.id && (
              <div className="px-4 pb-4 border-t border-emerald-800/30 pt-3">
                <div className="text-emerald-200/80 text-sm font-body leading-relaxed whitespace-pre-line">
                  {topic.content[lang].split("**").map((part, i) =>
                    i % 2 === 1
                      ? <span key={i} className="text-amber-400 font-semibold">{part}</span>
                      : <span key={i}>{part}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
