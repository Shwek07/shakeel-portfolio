/* ==========================================================================
   Language switching (English / Dutch)

   No library. Every translatable string lives in the object below and is
   pulled into the page through data attributes:

     data-i18n="key"              -> replaces the element's text
     data-i18n-html="key"         -> replaces the element's HTML (for <strong>)
     data-i18n-aria-label="key"   -> replaces the aria-label
     data-i18n-alt="key"          -> replaces an image alt

   The chosen language is saved in localStorage under its own key, separate
   from the theme, so the two never overwrite each other.

   English is what is written in the HTML, so the page still reads correctly
   if this script never runs.
   ========================================================================== */

(function () {
  'use strict';

  var STORAGE_KEY = 'shakeel-lang';
  var DEFAULT_LANG = 'en';

  var translations = {
    en: {
      /* --- shared --- */
      'skip': 'Skip to content',
      'nav.aria': 'Main navigation',
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.work': 'Work',
      'nav.contact': 'Contact',
      'nav.menu.open': 'Open menu',
      'nav.menu.close': 'Close menu',
      'nav.menu.aria': 'Menu',
      'theme.toDark': 'Switch to dark theme',
      'theme.toLight': 'Switch to light theme',
      'lang.aria': 'Language',
      'lang.en': 'English',
      'lang.nl': 'Dutch',
      'footer.email': 'Email',
      'footer.github': 'GitHub',
      'footer.whatsapp': 'WhatsApp',
   
      'footer.updated': 'Last updated May 2026',
      'footer.backToTop': 'Back to top',

      /* --- meta --- */
      'meta.home.title': 'Shakeel Ramdhiansing — Software engineering student',
      'meta.home.desc': 'Portfolio of Shakeel Ramdhiansing, a third-year Software Engineering student from Suriname who builds Modern scalable web applications — from idea to production.',
      'meta.about.title': 'About — Shakeel Ramdhiansing',
      'meta.about.desc': 'Background, education and interests of Shakeel Ramdhiansing, a Software Engineering student at Unasat in Suriname.',
      'meta.work.title': 'Work — Shakeel Ramdhiansing',
      'meta.work.desc': 'Projects built by Shakeel Ramdhiansing with the technologies used and links to the live sites.',
      'meta.contact.title': 'Contact — Shakeel Ramdhiansing',
      'meta.contact.desc': 'Get in touch with Shakeel Ramdhiansing by email, phone, WhatsApp or GitHub.',

      /* --- home: hero --- */
      'home.role': 'Software engineering student &amp; web developer',
      'home.title': 'I build web applications that',
      'home.titleAccent': 'solve real problems.',
      'home.stackLabel': 'Tech stack',
      'home.imageAlt': 'Shakeel working on a laptop with code on the screen',
      'home.stats.aria': 'At a glance',
      'home.stats.years': '7+',
      'home.stats.yearsLabel': 'Years learning',
      'home.stats.projects': '15+',
      'home.stats.projectsLabel': 'Projects built',
      'home.stats.focus': 'Focus',
      'home.stats.focusLabel': 'Web development',
      'home.stats.learning': 'Always learning',
      'home.stats.learningLabel': 'Always improving',
      'home.lead': 'Third-year Software Engineering student at Unasat with a passion for building systems that make everyday processes simple and efficient.',
      'home.cta.work': 'View my work',
      'home.cta.contact': 'Contact me',
      'home.portraitAlt': 'Portrait photo of Shakeel Ramdhiansing',
      'home.facts.based': 'Based in',
      'home.facts.basedValue': 'Suriname',
      'home.facts.building': 'Building',
      'home.facts.buildingValue': 'Web applications &amp; digital tools',
      'home.facts.code': 'Code',

      /* --- home: currently --- */
      'home.currently.title': 'Currently',
      'home.currently.heading': 'What I\u2019m up to',
      'home.currently.intro': 'This portfolio grows with my studies, so this part changes the most.',
      'home.currently.studying': 'Studying',
      'home.currently.studyingValue': 'Software Engineering at Unasat',
      'home.currently.studyingExtra': 'third year',
      'home.currently.working': 'Working',
      'home.currently.workingValue': 'I am currently searching for a internship for finishing my 4th year',
      'home.currently.workingExtra': 'Software Engineer',
      'home.currently.building': 'Building',
      'home.currently.buildingValue': 'Modern scalable web applications',
      'home.currently.buildingExtra': 'from idea to production',
      'home.currently.learning': 'Learning',
      'home.currently.learningValue': 'Java, Next.js',
      'home.currently.learningExtra': 'and database design with SQL',

      /* --- home: work --- */
      'home.work.title': 'Selected work',
      'home.work.heading': 'Projects I\u2019m proud of',
      'home.work.intro': 'Two projects that show best what I like building. The rest is on the work page.',
      'home.work.all': 'All four projects',

      /* --- home: what I work with --- */
      'home.tools.title': 'Technologies',
      'home.tools.heading': 'What I build with',
      'home.tools.note': 'The tools I actually use in school projects and my own.',
      'home.tools.frontend': 'Frontend',
      'home.tools.backend': 'Backend &amp; data',
      'home.tools.database': 'Database',
      'home.tools.tools': 'Tools',

      /* --- home: experience + contact --- */
      'home.experience.title': 'Experience',
      'home.experience.heading': 'Where I have worked',
      'home.experience.note': 'Two roles at the university, alongside my studies.',
      'home.experience.more': 'More about my background',
      'home.contact.title': 'Let\u2019s connect',
      'home.contact.heading1': 'Have a project in mind?',
      'home.contact.heading2': 'Let\u2019s build something great together.',
      'home.contact.lead': 'The quickest way to reach me is by email. WhatsApp works too.',
      'home.contact.emailCta': 'Send an email',
      'home.contact.whatsappCta': 'WhatsApp me',
      'home.contact.text': 'I am open to internships, collaborations and projects I can learn from. Email or WhatsApp me anytime.',

      /* --- projects (names and technologies stay as they are) --- */
      'proj.autobot.desc': 'A car parts platform where you first select your car and then only see the parts that actually fit it. There is a chatbot that helps you search, you can log in with your Google account and you can reserve the parts you find instead of ordering straight away.',
      'proj.sranankapper.desc': 'A booking platform for barbershops where customers can find the shops that are listed, browse the services they offer, pick a time and book an appointment without having to call first.',
      'proj.sharpedge.desc': 'A website for a photography business, with an overview of what is offered and a booking flow for a shoot. This one leaned the most on the design side: the layout and the photography had to carry it.',
      'proj.bookflow.desc': 'A landing page for a booking platform meant for salons, barbers and other service businesses. The idea was one place where a business can be found and booked, instead of every shop needing its own site.',
      'proj.live': 'Live site',
      'proj.todoStack': 'add tech stack',
      'proj.shotAlt': 'Screenshot of',

      /* --- experience + education entries --- */
      'exp.marcom.role': 'Marketing &amp; Communication',
      'exp.marcom.org': 'Anton de Kom University of Suriname',
      'exp.marcom.date': 'Sept 2023 — now',
      'exp.marcom.shortDesc': 'Designing flyers, logos and other visual material for different departments and events.',
      'exp.marcom.desc': 'I work as a graphic designer on flyers, logos and other visual material for different purposes within the university. It has been good practice for detail work and for thinking about who is going to look at the thing I am making.',
      'exp.intern.role': 'ICT Intern',
      'exp.intern.org': 'Anton de Kom University of Suriname',
      'exp.intern.date': 'Jun 2023 — Aug 2023',
      'exp.intern.shortDesc': 'Worked on a document approval system that replaced the manual process of handling and approving purchase receipts.',
      'exp.intern.desc': 'During my internship I worked on a document approval system. It was built to digitise the manual process of managing and approving purchase receipts and make it a lot less time-consuming.',
      'edu.hbo.degree': 'Software Engineering (HBO)',
      'edu.hbo.org': 'Unasat — Suriname',
      'edu.hbo.date': '2023 — now',
      'edu.hbo.status': 'Third year',
      'edu.mbo.degree': 'Applicatie Ontwerper (MBO)',
      'edu.mbo.org': 'Natin-MBO, ICT — Suriname',
      'edu.mbo.date': '2019 — 2023',
      'edu.mbo.status': 'Completed',

      /* --- about page --- */
      'about.eyebrow': 'About',
      'about.title': 'A bit more about me',
      'about.lead': 'I’m Shakeel, a Software Engineering student at UNASAT in Suriname. I enjoy building things for the web, whether it’s for university, a personal project or a real-world idea. Alongside software development, I also work in graphic design at the university, which has given me a strong interest in both how a product works and how it looks.',
      'about.background.title': 'Background',
      'about.background.p1': 'I started in ICT at Natin-MBO, where I finished the Applicatie Ontwerper programme in 2023. Right after that I continued at Unasat with Software Engineering at HBO level and I am now in my third year there.',
      'about.enjoy.title': 'What I enjoy',
      'about.enjoy.p1': 'One of my favourite parts of development is turning something that would normally take several manual steps into something simple and easy to use. ',
      'about.enjoy.p2': 'I also really enjoy front-end development. My design work has a big influence on that. I naturally pay attention to things like spacing, typography, visual hierarchy, animations, hover states and loading states. Those small details can make a website feel much more polished.',
      'about.interests.title': 'Interests',
      'about.interests.p1': 'Outside of my coursework, I spend a lot of time exploring web design and front-end development. I like looking at how modern websites are structured, how they use animation without becoming distracting and what makes a website feel fast and enjoyable to use.',
      'about.interests.p2': 'I’m also interested in building small digital tools for local businesses. I like the idea of creating simple software that can take some of that work away and make things easier for both the business and its customers.',
      'about.education.title': 'Education',
      'about.experience.title': 'Experience',
      'about.learning.title': 'Learning now',
      'about.learning.p1': 'I’m still learning and that’s something I actually enjoy about software development. There is always another technology to understand, another problem to solve or another way to improve something I’ve already built.',
      'about.learning.p2': 'For now, my goal is simple: keep building, keep learning and become a developer who cares about both the code behind a product and the experience of the person using it.',

      /* --- work page --- */
      'work.eyebrow': 'Work',
      'work.title': 'Projects',
      'work.lead': 'Four projects I built during my studies and in my own time. All of them are live, so you can click through them yourself.',
      'work.next.title': 'Next',
      'work.next.text': 'I keep adding to this page as I finish new things. If you want to know what I am working on at the moment, the <a class="link link--accent" href="index.html">home page</a> has a short overview, or you can just <a class="link link--accent" href="contact.html">get in touch</a>.',

      /* --- contact page --- */
      'contact.eyebrow': 'Contact',
      'contact.title': 'Get in touch',
      'contact.lead': 'If you want to talk about an internship, a project, or something you saw on this site, send me a message. Email or WhatsApp is the quickest way to reach me.',
      'contact.details.title': 'Details',
      'contact.key.email': 'Email',
      'contact.key.phone': 'Phone',
      'contact.key.whatsapp': 'WhatsApp',
      'contact.key.github': 'GitHub',
      'form.title': 'Send a message',
      'form.disclaimer': 'This form has no back-end behind it. When you send it, it opens your own mail app with the message already filled in, so you can see exactly what goes out.',
      'form.name': 'Your name',
      'form.email': 'Your email',
      'form.message': 'Message',
      'form.submit': 'Prepare message',
      'form.note': 'Nothing was sent from this page — there is no server behind the form yet. Your message is ready to go from your own mail app:',
      'form.noteLink': 'Open it in my mail app',
      'form.error.name': 'Please fill in your name.',
      'form.error.email': 'Please fill in a valid email address.',
      'form.error.message': 'Please write a short message.',
      'form.subject': 'Portfolio message from'
    },

    nl: {
      /* --- shared --- */
      'skip': 'Naar de inhoud',
      'nav.aria': 'Hoofdnavigatie',
      'nav.home': 'Home',
      'nav.about': 'Over mij',
      'nav.work': 'Werk',
      'nav.contact': 'Contact',
      'nav.menu.open': 'Menu openen',
      'nav.menu.close': 'Menu sluiten',
      'nav.menu.aria': 'Menu',
      'theme.toDark': 'Schakel naar donker thema',
      'theme.toLight': 'Schakel naar licht thema',
      'lang.aria': 'Taal',
      'lang.en': 'Engels',
      'lang.nl': 'Nederlands',
      'footer.email': 'E-mail',
      'footer.github': 'GitHub',
      'footer.whatsapp': 'WhatsApp',
      'footer.updated': 'Laatst bijgewerkt in mei 2026',
      'footer.backToTop': 'Terug naar boven',

      /* --- meta --- */
      'meta.home.title': 'Shakeel Ramdhiansing — student Software Engineering',
      'meta.home.desc': 'Portfolio van Shakeel Ramdhiansing, derdejaars student Software Engineering uit Suriname die noderne, schaalbare webapplicaties bouwt — van idee tot productie.',
      'meta.about.title': 'Over mij — Shakeel Ramdhiansing',
      'meta.about.desc': 'Achtergrond, opleiding en interesses van Shakeel Ramdhiansing, student Software Engineering aan Unasat in Suriname.',
      'meta.work.title': 'Werk — Shakeel Ramdhiansing',
      'meta.work.desc': 'Projecten van Shakeel Ramdhiansing met de gebruikte technieken en links naar de live sites.',
      'meta.contact.title': 'Contact — Shakeel Ramdhiansing',
      'meta.contact.desc': 'Neem contact op met Shakeel Ramdhiansing via e-mail, telefoon, WhatsApp of GitHub.',

      /* --- home: hero --- */
      'home.role': 'Student software engineering &amp; webdeveloper',
      'home.title': 'Ik bouw webapplicaties die',
      'home.titleAccent': 'echte problemen oplossen.',
      'home.stackLabel': 'Tech stack',
      'home.imageAlt': 'Shakeel achter zijn laptop met code op het scherm',
      'home.stats.aria': 'In één oogopslag',
      'home.stats.years': '7+',
      'home.stats.yearsLabel': 'Jaar aan het leren',
      'home.stats.projects': '15+',
      'home.stats.projectsLabel': 'Projecten gebouwd',
      'home.stats.focus': 'Focus',
      'home.stats.focusLabel': 'Webdevelopment',
      'home.stats.learning': 'Altijd leren',
      'home.stats.learningLabel': 'Altijd verbeteren',
      'home.lead': 'Derdejaars student Software Engineering aan Unasat, met een voorliefde voor het bouwen en ontwerpen van systemen die alledaagse processen eenvoudig en efficiënt maken.',
      'home.cta.work': 'Bekijk mijn werk',
      'home.cta.contact': 'Neem contact op',
      'home.portraitAlt': 'Portretfoto van Shakeel Ramdhiansing',
      'home.facts.based': 'Woont in',
      'home.facts.basedValue': 'Suriname',
      'home.facts.building': 'Bouwen aan',
      'home.facts.buildingValue': 'Webapplicaties &amp; digitale tools',
      'home.facts.code': 'Code',

      /* --- home: currently --- */
      'home.currently.title': 'Op dit moment',
      'home.currently.heading': 'Waar ik nu mee bezig ben',
      'home.currently.intro': 'Dit portfolio groeit mee met mijn studie, dus dit stuk verandert het vaakst.',
      'home.currently.studying': 'Studie',
      'home.currently.studyingValue': 'Software Engineering aan Unasat',
      'home.currently.studyingExtra': 'derde jaar',
      'home.currently.working': 'Werk',
      'home.currently.workingValue': 'Ik ben momenteel op zoek naar een stage om mijn vierde jaar af te ronden.',
      'home.currently.workingExtra': 'Software Engineer',
      'home.currently.building': 'Bouwen',
      'home.currently.buildingValue': 'Moderne, schaalbare webapplicaties',
      'home.currently.buildingExtra': 'van idee tot productie',
      'home.currently.learning': 'Leren',
      'home.currently.learningValue': 'Java, Next.js',
      'home.currently.learningExtra': 'en databaseontwerp met SQL',

      /* --- home: work --- */
      'home.work.title': 'Geselecteerd werk',
      'home.work.heading': 'Projecten waar ik trots op ben',
      'home.work.intro': 'Twee projecten die het beste laten zien wat ik graag bouw. De rest staat op de werkpagina.',
      'home.work.all': 'Alle vier de projecten',

      /* --- home: what I work with --- */
      'home.tools.title': 'Technologieën',
      'home.tools.heading': 'Waar ik mee bouw',
      'home.tools.note': 'De tools die ik echt gebruik in schoolprojecten en eigen projecten.',
      'home.tools.frontend': 'Frontend',
      'home.tools.backend': 'Backend &amp; data',
      'home.tools.database': 'Database',
      'home.tools.tools': 'Tools',

      /* --- home: experience + contact --- */
      'home.experience.title': 'Ervaring',
      'home.experience.heading': 'Waar ik heb gewerkt',
      'home.experience.note': 'Twee functies op de universiteit, naast mijn studie.',
      'home.experience.more': 'Meer over mijn achtergrond',
      'home.contact.title': 'Even contact',
      'home.contact.heading1': 'Heb je een project in gedachten?',
      'home.contact.heading2': 'Dan bouwen we samen iets moois.',
      'home.contact.lead': 'Via e-mail bereik je me het snelst. WhatsApp kan ook.',
      'home.contact.emailCta': 'Stuur een e-mail',
      'home.contact.whatsappCta': 'WhatsApp me',
      'home.contact.text': 'Ik sta open voor stages, samenwerkingen en projecten waar ik van kan leren. Mail of WhatsApp me wanneer je wilt.',

      /* --- projects --- */
      'proj.autobot.desc': 'Een platform voor auto-onderdelen waarbij je eerst je auto kiest en daarna alleen de onderdelen ziet die er echt op passen. Er zit een chatbot in die helpt met zoeken, je kunt inloggen met je Google-account en je kunt onderdelen reserveren in plaats van direct bestellen.',
      'proj.sranankapper.desc': 'Een boekingsplatform voor barbershops waar klanten de aangesloten zaken kunnen vinden, hun diensten kunnen bekijken, een tijd kiezen en een afspraak maken zonder eerst te bellen.',
      'proj.sharpedge.desc': 'Een website voor een fotografiebedrijf, met een overzicht van het aanbod en een boekingsflow voor een shoot. Bij dit project lag de nadruk het meest op het ontwerp: de opmaak en de foto’s moesten het dragen.',
      'proj.bookflow.desc': 'Een landingspagina voor een boekingsplatform voor salons, barbers en andere dienstverleners. Het idee was één plek waar een zaak gevonden en geboekt kan worden, in plaats van dat elke zaak een eigen site nodig heeft.',
      'proj.live': 'Live site',
      'proj.todoStack': 'stack toevoegen',
      'proj.shotAlt': 'Schermafbeelding van',

      /* --- experience + education entries --- */
      'exp.marcom.role': 'Marketing &amp; Communicatie',
      'exp.marcom.org': 'Anton de Kom Universiteit van Suriname',
      'exp.marcom.date': 'sept 2023 — nu',
      'exp.marcom.shortDesc': 'Flyers, logo’s en ander visueel materiaal ontwerpen voor verschillende afdelingen en evenementen.',
      'exp.marcom.desc': 'Ik werk als grafisch ontwerper aan flyers, logo’s en ander visueel materiaal voor uiteenlopende doelen binnen de universiteit. Het is goede oefening in oog voor detail en in nadenken over wie er straks naar kijkt.',
      'exp.intern.role': 'ICT-stagiair',
      'exp.intern.org': 'Anton de Kom Universiteit van Suriname',
      'exp.intern.date': 'jun 2023 — aug 2023',
      'exp.intern.shortDesc': 'Meegewerkt aan een goedkeuringssysteem voor documenten, dat het handmatige proces rond inkoopbonnen verving.',
      'exp.intern.desc': 'Tijdens mijn stage heb ik meegewerkt aan een goedkeuringssysteem voor documenten. Het is gebouwd om het handmatige proces van het beheren en goedkeuren van inkoopbonnen te digitaliseren en een stuk minder tijd te laten kosten.',
      'edu.hbo.degree': 'Software Engineering (hbo)',
      'edu.hbo.org': 'Unasat — Suriname',
      'edu.hbo.date': '2023 — nu',
      'edu.hbo.status': 'Derde jaar',
      'edu.mbo.degree': 'Applicatie Ontwerper (mbo)',
      'edu.mbo.org': 'Natin-MBO, ICT — Suriname',
      'edu.mbo.date': '2019 — 2023',
      'edu.mbo.status': 'Afgerond',

      /* --- about page --- */
      'about.eyebrow': 'Over mij',
      'about.title': 'Iets meer over mij',
      'about.lead': 'Ik ben Shakeel, student Software Engineering aan UNASAT in Suriname. Ik bouw graag dingen voor het web, of dat nu voor school is, een eigen project of een echt idee uit de praktijk. Naast softwareontwikkeling werk ik ook in de grafische vormgeving op de universiteit, waardoor ik geïnteresseerd ben geraakt in zowel hoe een product werkt als hoe het eruitziet.',
      'about.background.title': 'Achtergrond',
      'about.background.p1': 'Ik ben in de softwareontwikkeling terechtgekomen bij NATIN-MBO, waar ik mijn opleiding in 2023 heb afgerond. Daarna ben ik verdergegaan aan UNASAT, waar ik nu in mijn derde jaar Software Engineering op HBO-niveau studeer.',
      'about.enjoy.title': 'Wat ik leuk vind',
      'about.enjoy.p1': 'Een van mijn favoriete aspecten van softwareontwikkeling is het omzetten van iets dat normaal gesproken meerdere handmatige stappen vereist, naar iets eenvoudigs en gebruiksvriendelijks.',
      'about.enjoy.p2': 'Ik geniet ook erg van front-end development. Mijn ontwerpwerk heeft daar een grote invloed op. Ik let van nature op zaken als spatiëring, typografie, visuele hiërarchie, animaties, hover-effecten en laadtijden. Die kleine details kunnen een website een veel professionelere uitstraling geven.',
      'about.interests.title': 'Interesses',
      'about.interests.p1': 'Naast mijn studie besteed ik veel tijd aan webdesign en front-end development. Ik vind het interessant om te kijken naar de structuur van moderne websites, hoe animaties worden gebruikt zonder afleidend te zijn, en wat een website snel en prettig in gebruik maakt.',
      'about.interests.p2': 'Ik ben ook geïnteresseerd in het bouwen van kleine digitale tools voor lokale bedrijven. Ik vind het een goed idee om eenvoudige software te ontwikkelen die een deel van dat werk kan overnemen en het zowel voor het bedrijf als voor de klanten gemakkelijker kan maken.',
      'about.education.title': 'Opleiding',
      'about.experience.title': 'Ervaring',
      'about.learning.title': 'Wat ik nu leer',
      'about.learning.p1': 'Ik leer nog steeds bij en dat is iets wat ik juist zo leuk vind aan softwareontwikkeling. Er is altijd wel weer een nieuwe technologie om te begrijpen, een nieuw probleem om op te lossen of een nieuwe manier om iets te verbeteren wat ik al heb gebouwd.',
      'about.learning.p2': 'Voorlopig is mijn doel simpel: blijven bouwen, blijven leren en een ontwikkelaar worden die zowel oog heeft voor de code achter een product als voor de gebruikerservaring.',

      /* --- work page --- */
      'work.eyebrow': 'Werk',
      'work.title': 'Projecten',
      'work.lead': 'Vier projecten die ik tijdens mijn studie en in mijn eigen tijd heb gebouwd. Ze staan allemaal live, dus je kunt er zelf doorheen klikken.',
      'work.next.title': 'Verder',
      'work.next.text': 'Ik vul deze pagina aan zodra ik iets nieuws af heb. Wil je weten waar ik nu aan werk, dan staat er een kort overzicht op de <a class="link link--accent" href="index.html">homepage</a>, of je kunt gewoon <a class="link link--accent" href="contact.html">contact opnemen</a>.',

      /* --- contact page --- */
      'contact.eyebrow': 'Contact',
      'contact.title': 'Neem contact op',
      'contact.lead': 'Wil je het hebben over een stage, een project of iets wat je op deze site hebt gezien, stuur me dan een bericht. Via e-mail of WhatsApp bereik je me het snelst.',
      'contact.details.title': 'Gegevens',
      'contact.key.email': 'E-mail',
      'contact.key.phone': 'Telefoon',
      'contact.key.whatsapp': 'WhatsApp',
      'contact.key.github': 'GitHub',
      'form.title': 'Stuur een bericht',
      'form.disclaimer': 'Achter dit formulier zit geen back-end. Als je het verstuurt, opent het je eigen mailprogramma met het bericht er al in, zodat je precies ziet wat er verstuurd wordt.',
      'form.name': 'Je naam',
      'form.email': 'Je e-mailadres',
      'form.message': 'Bericht',
      'form.submit': 'Bericht klaarzetten',
      'form.note': 'Er is niets vanaf deze pagina verstuurd — er zit nog geen server achter het formulier. Je bericht staat klaar in je eigen mailprogramma:',
      'form.noteLink': 'Openen in mijn mailprogramma',
      'form.error.name': 'Vul je naam in.',
      'form.error.email': 'Vul een geldig e-mailadres in.',
      'form.error.message': 'Schrijf een kort bericht.',
      'form.subject': 'Bericht via portfolio van'
    }
  };

  var listeners = [];
  var current = DEFAULT_LANG;

  function readSaved() {
    try {
      var value = localStorage.getItem(STORAGE_KEY);
      return translations[value] ? value : null;
    } catch (error) {
      return null;
    }
  }

  function save(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (error) {
      /* Saving is a nice-to-have. */
    }
  }

  function t(key) {
    var pack = translations[current] || translations[DEFAULT_LANG];
    if (pack[key] !== undefined) return pack[key];
    if (translations[DEFAULT_LANG][key] !== undefined) return translations[DEFAULT_LANG][key];
    return key;
  }

  /* Some strings contain &amp; or &rsquo;, so text goes in through innerHTML
     after the entities are resolved. These strings are ours, never visitor
     input, so there is nothing to escape here. */
  function setText(element, value) {
    element.innerHTML = value;
  }

  function apply() {
    var root = document.documentElement;
    root.setAttribute('lang', current);

    document.querySelectorAll('[data-i18n]').forEach(function (element) {
      setText(element, t(element.getAttribute('data-i18n')));
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (element) {
      element.innerHTML = t(element.getAttribute('data-i18n-html'));
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach(function (element) {
      element.setAttribute('aria-label', t(element.getAttribute('data-i18n-aria-label')));
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(function (element) {
      element.setAttribute('alt', t(element.getAttribute('data-i18n-alt')));
    });

    /* Page title and meta description */
    var page = root.getAttribute('data-page');
    if (page) {
      document.title = t('meta.' + page + '.title');
      var description = document.querySelector('meta[name="description"]');
      if (description) description.setAttribute('content', t('meta.' + page + '.desc'));
    }

    /* Keep the language buttons in sync (there is one set in the header and
       one in the mobile menu). */
    document.querySelectorAll('[data-lang]').forEach(function (button) {
      var isCurrent = button.getAttribute('data-lang') === current;
      button.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
    });

    listeners.forEach(function (fn) {
      fn(current);
    });
  }

  function set(lang) {
    if (!translations[lang] || lang === current) return;
    current = lang;
    save(lang);
    apply();
  }

  window.I18n = {
    t: t,
    current: function () {
      return current;
    },
    set: set,
    /* Used by contact.js so its messages follow the language too. */
    onChange: function (fn) {
      listeners.push(fn);
    }
  };

  current = readSaved() || DEFAULT_LANG;
  apply();

  document.querySelectorAll('[data-lang]').forEach(function (button) {
    button.addEventListener('click', function () {
      set(button.getAttribute('data-lang'));
    });
  });
})();
