/* ==========================================================================
   SITE CONTENT
   Everything on the site is drawn from this file. Text that differs between
   languages is written as { en: "...", lv: "..." }. Plain strings are used
   for both languages. Search for "TODO" to find what still needs your input.
   ========================================================================== */

const SITE = {
  name: "Alans Ikaunieks",

  // Demo requests and the "Email me" button go to this address.
  email: "aikaunieks2@gmail.com",

  github: "23DP3AIkau",

  // Optional: full LinkedIn URL. Leave "" to hide it.
  linkedin: "",

  // Optional: a photo of you, e.g. "assets/img/alans.jpg". Leave "" to hide it.
  photo: "",

  role: {
    en: "Programming student in Riga, Latvia",
    lv: "Programmēšanas students Rīgā",
  },

  intro: {
    en: "I'm a fourth-year programming student at Rīgas Valsts tehnikums, and I build web apps with Laravel, Vue and MySQL.",
    lv: "Esmu ceturtā kursa programmēšanas students Rīgas Valsts tehnikumā un veidoju tīmekļa lietotnes ar Laravel, Vue un MySQL.",
  },

  availability: {
    en: "I'm looking for a programming internship starting in November 2026, and I'm open to a part-time junior role.",
    lv: "Meklēju programmēšanas praksi, sākot no 2026. gada novembra, un esmu atvērts arī nepilnas slodzes darbam jaunākā programmētāja amatā.",
  },

  about: {
    en: "In my free time I work on my own projects and make 3D models.",
    lv: "Brīvajā laikā veidoju savus projektus un arī 3D modeļus.",
  },
};

/* --------------------------------------------------------------------------
   PROJECTS (shown in this order)

   visibility: "public" shows a link to the code on GitHub (repoUrl)
               "private" shows "Private repository"
   site:       live website address (optional)
   demo:       true adds a "Request a live demo" button, for sites whose
               servers are usually switched off
   image:      screenshot path (optional). If the file is missing, a simple
               placeholder with the site address is shown instead.
   caseStudy:  an object gives the project its own write-up page
               (project.html?id=<id>). null means no write-up page.

   Optional inside caseStudy (shown only when filled in):
   images:   [{ src: "assets/img/pixelboris-shop.png", alt: { en, lv }, caption: { en, lv } }]
   snippets: [{ title: "Trade model", lang: "php", code: `...` }]
   video:    "https://youtu.be/..."
   -------------------------------------------------------------------------- */

const PROJECTS = [
  {
    id: "sellova",
    name: "Sellova",
    visibility: "private",
    status: { en: "In development", lv: "Izstrādē" },
    summary: {
      en: "A classifieds and marketplace website that combines what ss.lv and eBay do in one place.",
      lv: "Sludinājumu un tirdzniecības portāls, kas vienuviet apvieno ss.lv un eBay iespējas.",
    },
    stack: [], // TODO: e.g. ["PHP", "Laravel", "Vue", "MySQL"]
    site: "https://sellova.eu",
    demo: true,
    // TODO: save a screenshot of sellova.eu as assets/img/sellova.png
    image: "assets/img/sellova.png",
    imageAlt: { en: "The Sellova home page", lv: "Sellova sākumlapa" },
    caseStudy: null,
  },

  {
    id: "pixelboris",
    name: "PixelBoris",
    visibility: "public",
    repoUrl: "https://github.com/23DP3MKhap/PIxelBourse-",
    status: { en: "In development", lv: "Izstrādē" },
    summary: {
      en: "A browser game where clicking an image raises its value, and players buy, sell and trade images in a shared shop.",
      lv: "Pārlūka spēle, kurā, klikšķinot uz attēla, pieaug tā vērtība, un spēlētāji pērk, pārdod un maina attēlus kopīgā veikalā.",
    },
    role: { en: "Backend developer", lv: "Backend izstrādātājs" },
    team: {
      en: "Team of 4: two on the backend, two on the frontend",
      lv: "4 cilvēku komanda: divi strādā pie backend, divi pie frontend",
    },
    stack: ["PHP", "Laravel", "MySQL"],
    image: "",

    caseStudy: {
      sections: [
        {
          heading: { en: "The idea", lv: "Ideja" },
          paragraphs: [
            {
              en: "PixelBoris is an entertainment project with its own internal economy. Players upload images, put effort into them, and trade them with each other. An image is worth as much as the work people have put into it.",
              lv: "PixelBoris ir izklaides projekts ar savu iekšējo ekonomiku. Spēlētāji augšupielādē attēlus, iegulda tajos darbu un mainās ar tiem. Attēls ir tik vērtīgs, cik daudz darba tajā ieguldīts.",
            },
          ],
        },
        {
          heading: { en: "How it works", lv: "Kā tas darbojas" },
          list: [
            [
              { en: "Clicker", lv: "Klikeris" },
              {
                en: "Pick an image from your collection and click it. Every click is added to the image's stats and raises its value. One click earns one coin.",
                lv: "Izvēlies attēlu no savas kolekcijas un klikšķini uz tā. Katrs klikšķis tiek pieskaitīts attēla statistikai un palielina tā vērtību. Viens klikšķis nopelna vienu monētu.",
              },
            ],
            [
              { en: "Shop", lv: "Veikals" },
              {
                en: "List an image for coins, for a trade, or for both. Selling for coins has a 25% commission.",
                lv: "Izliec attēlu pārdošanā par monētām, maiņai vai abiem. Pārdodot par monētām, tiek ieturēta 25% komisija.",
              },
            ],
            [
              { en: "Trading", lv: "Maiņa" },
              {
                en: "Offer one of your images in exchange for another player's listed image.",
                lv: "Piedāvā kādu no saviem attēliem apmaiņā pret cita spēlētāja izlikto attēlu.",
              },
            ],
            [
              { en: "Stats stay with the image", lv: "Statistika paliek pie attēla" },
              {
                en: "When an image changes owner, it keeps everything the previous owner built up.",
                lv: "Kad attēls nonāk pie cita īpašnieka, tas saglabā visu, ko iepriekšējais īpašnieks tajā ieguldījis.",
              },
            ],
          ],
        },
        {
          heading: { en: "Who it's for", lv: "Kam tas paredzēts" },
          paragraphs: [
            {
              en: "Young people and active internet users. We see room for it in Latvia, where social media use is high and more people buy things online every year.",
              lv: "Jauniešiem un aktīviem interneta lietotājiem. Redzam tam potenciālu Latvijā, kur sociālos tīklus lieto ļoti daudz un arvien vairāk cilvēku iepērkas internetā.",
            },
            {
              en: "Products we compared it with: Cookie Clicker, Steam Community Market, Roblox, Fortnite and Minecraft. PixelBoris puts user-made content, a virtual economy and item trading into one simple system.",
              lv: "Produkti, ar kuriem to salīdzinājām: Cookie Clicker, Steam Community Market, Roblox, Fortnite un Minecraft. PixelBoris apvieno lietotāju veidotu saturu, virtuālu ekonomiku un preču maiņu vienā vienkāršā sistēmā.",
            },
          ],
        },
        {
          heading: { en: "My part", lv: "Mans ieguldījums" },
          paragraphs: [
            {
              en: "I work on the backend together with one other developer, using Laravel and MySQL. Two teammates build the frontend. We plan and split the work on a shared Trello board.",
              lv: "Kopā ar vēl vienu izstrādātāju strādāju pie backend, izmantojot Laravel un MySQL. Divi komandas biedri veido frontend. Darbu plānojam un sadalām kopīgā Trello dēlī.",
            },
            // TODO: add 2–3 concrete things you built, e.g. the trade flow or the listing API.
          ],
        },
      ],

      images: [],
      snippets: [],
      video: "",
    },
  },

  {
    id: "masinas-dienasgramata",
    name: "Mašīnas dienasgrāmata",
    subtitle: { en: "Car diary", lv: "" },
    visibility: "private",
    status: { en: "Planning", lv: "Plānošana" },
    summary: {
      en: "An app for keeping a car's records in one place, like when the next technical inspection is due.",
      lv: "Lietotne automašīnas datu glabāšanai vienuviet, piemēram, lai zinātu, kad jāveic nākamā tehniskā apskate.",
    },
    note: {
      en: "We're defining the minimum requirements and the design, and splitting the work evenly across the team.",
      lv: "Šobrīd nosakām minimālās prasības un dizainu un vienlīdzīgi sadalām darbu komandā.",
    },
    role: { en: "Developer", lv: "Izstrādātājs" },
    team: { en: "Team of 4", lv: "4 cilvēku komanda" },
    stack: [],
    image: "",
    caseStudy: null,
  },
];

/* --------------------------------------------------------------------------
   3D WORK
   Shown at the bottom of the page, folded away until someone opens it.
   -------------------------------------------------------------------------- */

const UGC = {
  intro: {
    en: "A small side project: accessories for the Roblox UGC marketplace, modelled in Blender and textured in Substance 3D Painter.",
    lv: "Neliels blakusprojekts: aksesuāri Roblox UGC tirgum, modelēti programmā Blender un teksturēti ar Substance 3D Painter.",
  },
  items: [
    {
      name: "TearBow",
      image: "assets/img/TearBow.png",
      description: {
        en: "Black bow with two silver chains ending in a glowing teardrop and a sparkle.",
        lv: "Melna bante ar divām sudraba ķēdītēm, kuru galos ir spīdoša asaras lāse un zvaigznīte.",
      },
    },
    {
      name: "StarBow",
      image: "assets/img/StarBow.png",
      description: {
        en: "Black bow with a glowing star outline and a small star on a chain.",
        lv: "Melna bante ar spīdošu zvaigznes kontūru un mazu zvaigznīti uz ķēdītes.",
      },
    },
    {
      name: { en: "Coffin bow and choker", lv: "Zārka bante un kaklarota" },
      image: "assets/img/Coffin bow + coffin choker.png",
      description: {
        en: "Black bow with a coffin charm, paired with a spiked choker and a coffin pendant.",
        lv: "Melna bante ar zārka formas rotu, komplektā ar cieši pieguļošu kaklarotu ar smailēm un zārka piekariņu.",
      },
    },
    {
      name: { en: "Coffin bow and necklace", lv: "Zārka bante un ķēdīte" },
      image: "assets/img/Coffin bow + coffin necklace.png",
      description: {
        en: "The same coffin bow, paired with a chain necklace and a coffin pendant.",
        lv: "Tā pati bante ar zārka rotu, komplektā ar ķēdes kaklarotu un zārka piekariņu.",
      },
    },
  ],
};

/* --------------------------------------------------------------------------
   EXPERIENCE (newest first)
   -------------------------------------------------------------------------- */

const TIMELINE = [
  {
    when: { en: "Now, 4th year", lv: "Šobrīd, 4. kurss" }, // TODO: e.g. "2023 – 2027"
    title: { en: "Programming student", lv: "Programmēšanas students" },
    place: "Rīgas Valsts tehnikums",
    text: {
      en: "Coursework in Python, Java, C#, PHP, Laravel, Vue and MySQL, plus team projects like PixelBoris.",
      lv: "Mācos Python, Java, C#, PHP, Laravel, Vue un MySQL, kā arī strādāju komandas projektos, piemēram, PixelBoris.",
    },
  },
  {
    when: { en: "3 months", lv: "3 mēneši" }, // TODO: add the actual months, e.g. "Jun – Aug 2025"
    title: { en: "Game presenter", lv: "Spēļu vadītājs" },
    place: "Evolution",
    text: {
      en: "Presented live-streamed casino games on camera.",
      lv: "Vadīju tiešraidē straumētas kazino spēles kameras priekšā.",
    },
  },
];

/* --------------------------------------------------------------------------
   SKILLS
   Each list is shown as "A, B and C" ("A, B un C" in Latvian).
   -------------------------------------------------------------------------- */

const SKILLS = [
  { group: { en: "Web", lv: "Tīmekļa izstrāde" }, items: ["PHP", "Laravel", "Vue", "JavaScript", "HTML", "CSS", "MySQL"] },
  { group: { en: "Other languages", lv: "Citas valodas" }, items: ["Python", "Java", "C#"] },
  { group: { en: "Tools", lv: "Rīki" }, items: ["Git", "GitHub", "Trello"] },
  { group: "3D", items: ["Blender", "Substance 3D Painter"] },
];
