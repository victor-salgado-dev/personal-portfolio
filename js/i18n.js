/* ==========================================================================
   I18N — translation dictionaries + engine (de / en / es)
   ========================================================================== */

(function () {
  'use strict';

  const translations = {
    /* ------------------------------------------------------------------ DE */
    de: {
      skipToContent: 'Zum Inhalt springen',
      metaTitle: 'Víctor Salgado — Systemadministrator & DevOps Engineer',
      metaDescription: 'Portfolio von Víctor Salgado, Systemadministrator und DevOps Engineer mit Schwerpunkt auf Docker, Kubernetes, CI/CD-Automatisierung und Infrastruktur-Zuverlässigkeit.',

      navAbout: 'Über mich',
      navExperience: 'Erfahrung',
      navSkills: 'Tech Stack',
      navProjects: 'Projekte',
      navContact: 'Kontakt',
      langSwitchAria: 'Sprache ändern',
      themeToggleAria: 'Farbschema umschalten',
      mobileMenuAria: 'Menü öffnen',

      heroAvailability: 'Offen für neue Herausforderungen',
      heroEyebrow: 'Systemadministrator · DevOps Engineer',
      heroHeadline: 'Ich baue Infrastruktur, die einfach funktioniert — und automatisiere den Rest.',
      heroSubhead: 'Systemadministrator & DevOps Engineer mit Fokus auf containerisierte Plattformen, CI/CD-Pipelines und Infrastrukturautomatisierung.',
      heroStatusLine: 'Ich betreue aktuell die Produktivinfrastruktur und E-Commerce-Systeme eines Unternehmens in Deutschland.',
      heroCtaPrimary: 'Projekte ansehen',
      heroCtaSecondary: 'Kontakt aufnehmen',
      heroScrollCue: 'Scrollen',

      currentStackLabel: 'Aktuell im Einsatz',

      aboutEyebrow: '// über mich',
      aboutHeading: 'Über mich',
      aboutParagraph1: 'Ich bin Systemadministrator und DevOps Engineer mit Sitz in Darmstadt und arbeite an der Schnittstelle von Infrastruktur, Automatisierung und Zuverlässigkeit.',
      aboutParagraph2: 'Im Alltag heißt das: Produktivsysteme stabil halten — und im besten Sinne langweilig. Mich reizen die Aspekte der Arbeit, die kaum jemand sieht: der Alarm, der ein Problem früh erkennt; das Playbook, das aus Stunden manueller Arbeit Minuten macht.',
      aboutParagraph3: 'Ich baue meine Kenntnisse in Kubernetes und Infrastructure-as-Code stetig weiter aus und suche ein Team, in dem ich mit wachsender Erfahrung mehr Verantwortung übernehmen kann.',
      aboutFocus1: 'Automatisierung',
      aboutFocus2: 'Zuverlässigkeit',
      aboutFocus3: 'Monitoring',
      aboutFocus4: 'Dokumentation',

      experienceEyebrow: '// erfahrung',
      experienceHeading: 'Erfahrung',
      experienceRole: 'Systemadministrator & DevOps Engineer',
      experienceCompanyPlaceholder: 'Firmenname',
      experienceCurrentBadge: 'Aktuell',
      experienceBullet1: 'Betreibe die produktive Docker- und Kubernetes-Infrastruktur und sorge für durchgehende Verfügbarkeit.',
      experienceBullet2: 'Entwerfe GitLab-CI/CD-Pipelines, die Code ohne manuelle Zwischenschritte vom Commit bis in die Produktion bringen.',
      experienceBullet3: 'Automatisiere Deployments und Konfigurationsmanagement mit Ansible und ersetze manuelle Arbeit durch wiederholbare Playbooks.',
      experienceBullet4: 'Überwache Produktivumgebungen mit Zabbix und erkenne Probleme, bevor sie Nutzer betreffen.',
      experienceBullet5: 'Administriere Linux- und Windows-Server-Infrastruktur in Entwicklungs- und Produktivumgebungen.',
      experienceBullet6: 'Halte die ERP- und E-Commerce-Plattformen JTL-Wawi und Shopware zuverlässig für das Tagesgeschäft am Laufen.',
      experienceBullet7: 'Sichere die Verbindungen zwischen Umgebungen mit WireGuard ab.',
      experienceSecondaryLabel: 'Weitere Erfahrung',
      experienceSecondaryRole: 'IT-Support & Helpdesk',
      experienceSecondaryTag1: 'Helpdesk-Support',
      experienceSecondaryTag2: 'Hardware- & Drucker-Support',
      experienceEducationHeading: 'Ausbildung & Zertifikate',

      skillsEyebrow: '// tech-stack',
      skillsHeading: 'Tech Stack',
      skillsCategoryInfra: 'Infrastruktur',
      skillsCategoryAutomation: 'Automatisierung & CI/CD',
      skillsCategoryMonitoring: 'Monitoring',
      skillsCategoryNetworking: 'Netzwerk',
      skillsCategoryErp: 'ERP & E-Commerce',
      skillsCategoryDev: 'Entwicklung',

      projectsEyebrow: '// projekte',
      projectsHeading: 'Projekte',
      projectsIntro: 'Ein paar Dinge, die ich neben der Arbeit gebaut habe — Full-Stack-Apps, Tools und Experimente.',
      projectsLinkCode: 'Code',
      projectsLinkDemo: 'Live-Demo',
      projectsLinkDownload: 'Download',

      projectQuizTitle: 'Interaktive Quiz-Plattform',
      projectQuizDesc: 'Full-Stack-Quiz-Anwendung mit Nutzer-Authentifizierung und lokal gespeicherter SQLite-Fortschrittsverfolgung.',
      projectChatTitle: 'Echtzeit-Messaging-App',
      projectChatDesc: 'Echtzeit-Chat-Anwendung mit WebSocket-Messaging und einem komponentenbasierten React-Frontend.',
      projectBlogTitle: 'PHP-Blog-Plattform',
      projectBlogDesc: 'Vollständige CRUD-Blog-Engine mit Authentifizierung, Kommentarfunktion und Prepared-Statement-Datenbankabfragen.',
      projectMotorTitle: 'Motor Social',
      projectMotorDesc: 'Soziale Plattform zum Teilen und Entdecken von Inhalten rund um die Welt des Motors.',
      projectPaintTitle: 'JavaFX Zeichenanwendung',
      projectPaintDesc: 'Desktop-Zeichenanwendung mit Formwerkzeugen, PNG-Export sowie Zoom und Pan der Zeichenfläche, entwickelt auf der JVM.',
      projectDetailsButton: 'Technische Details',
      projectsPreviousAria: 'Vorheriges Projekt',
      projectsNextAria: 'Nächstes Projekt',
      projectsSwipeHint: 'Wische zur Seite, um weitere Projekte zu sehen',
      projectDetailsClose: 'Schließen',
      projectDetailsCloseAria: 'Projektdetails schließen',
      projectTechnologiesLabel: 'Technologien',
      projectEstimateLabel: 'Aufwand',
      projectBlogDetails: 'CRUD-Blog mit Registrierung, Anmeldung, Beiträgen und Kommentaren. PHP 8.3 und PDO laufen unter Apache; PostgreSQL stellt die Daten bereit und vorbereitete Abfragen übernehmen den Datenbankzugriff. Für den kostenlosen Render-Betrieb bündelt ein einzelner Docker-Webservice Apache und PostgreSQL. Das Datenverzeichnis wird beim Start neu aufgebaut und mit Demo-Inhalten befüllt; auf dem flüchtigen Render-Dateisystem sind Änderungen nicht dauerhaft. Testzugang und Konfiguration sind für eine öffentliche Demo gedacht, nicht für private Daten oder produktives Security-Hardening.',
      projectBlogEstimate: 'Mittel',
      projectMotorDetails: 'React und Vite bilden die Oberfläche, Tailwind CSS übernimmt die Styles, Express stellt die REST-API bereit und PostgreSQL speichert Nutzer, Beiträge und Uploads. Das Dockerfile baut das Frontend und kopiert es zu Express; der Entrypoint startet PostgreSQL, führt Migrationen aus und lädt Demo-Daten im selben Service. Diese Zusammenstellung vermeidet getrennte, kostenpflichtige Dienste im kostenlosen Render-Tarif. Die Datenbank nutzt flüchtigen Speicher und kann beim Austausch des Containers neu initialisiert werden. Beispiel-Secrets und Demo-Konten sind nicht für private Daten oder den produktiven Einsatz gehärtet.',
      projectMotorEstimate: 'Hoch',
      projectChatDetails: 'React erstellt den Client mit Vite; Express stellt die API bereit und Socket.IO verwaltet Präsenz und Echtzeitnachrichten. PostgreSQL, Backend und statische Dateien werden in einem Docker-Image gebündelt. Beim Start richtet der Entrypoint das Schema ein, führt Migrationen aus und lädt Demo-Unterhaltungen; dadurch werden keine kostenpflichtigen Render-Dienste benötigt. Das kostenlose Dateisystem ist flüchtig: Beim Austausch der Instanz entsteht eine saubere Datenbank mit Seed-Daten. Die Konten sind öffentlich und zu Testzwecken; der Portfolio-Deploy ist nicht für private Unterhaltungen gedacht.',
      projectChatEstimate: 'Hoch',
      projectQuizDetails: 'Eine von Express bereitgestellte Anwendung mit statischen Seiten, Authentifizierungs-Endpunkten und einer API zum Speichern des Quiz-Fortschritts. Node.js verwendet lokales SQLite und bcryptjs für Passwort-Hashes; die Datenbank wird beim Start im Anwendungscode angelegt und mit einem Testkonto versehen. Der kostenlose Render-Tarif bietet weder eine verwaltete Datenbank noch eine persistente Festplatte: Beim Ersetzen der Instanz kann die lokale Datenbank neu erstellt werden und der bisherige Fortschritt verloren gehen. Das ist ein bewusster Kompromiss für eine einfache, kostenlose Demo und keine Persistenzarchitektur für den Produktivbetrieb.',
      projectQuizEstimate: 'Leicht',
      projectPaintDetails: 'JavaFX-Desktop-Anwendung zum Zeichnen mit Formwerkzeugen, Vergrößern und Verschieben der Leinwand sowie PNG-Export. Maven verwaltet das Projekt und die JavaFX-Abhängigkeiten; beim Paketieren entsteht eine ausführbare JAR-Datei. Die Anwendung läuft lokal als einzelner Prozess ohne Remote-Backend oder Datenbank und ist daher weder von Render noch von flüchtigem Dienstspeicher abhängig. Die Schätzung umfasst eine funktionsfähige Version mit den wichtigsten Werkzeugen, nicht plattformübergreifenden Feinschliff oder signierte Distribution.',
      projectPaintEstimate: 'Leicht',

      contactEyebrow: '// kontakt',
      contactHeading: 'Kontakt aufnehmen',
      contactSubhead: 'Offen für neue Möglichkeiten im Bereich DevOps, Systemadministration und Infrastructure Engineering. Schreib mir gerne — ich freue mich, von dir zu hören.',
      contactEmailLabel: 'E-Mail',
      contactPhoneLabel: 'Telefon',
      contactLinkedinLabel: 'LinkedIn',
      contactGithubLabel: 'GitHub',
      contactLocationLabel: 'Standort',
      contactLocationValue: 'Darmstadt, Deutschland',
      contactCopyAria: 'In die Zwischenablage kopieren',
      copiedFeedback: 'Kopiert!',

      formName: 'Name',
      formNamePlaceholder: 'Dein Name',
      formEmail: 'E-Mail',
      formEmailPlaceholder: 'du@email.com',
      formSubject: 'Betreff',
      formSubjectPlaceholder: "Worum geht's?",
      formMessage: 'Nachricht',
      formMessagePlaceholder: 'Erzähl mir kurz von der Stelle oder dem Projekt …',
      formSend: 'Nachricht senden',
      formSending: 'Wird gesendet …',
      formSuccess: 'Danke für deine Nachricht — ich melde mich bald bei dir.',
      formErrorServer: 'Da ist etwas schiefgelaufen. Bitte versuch es erneut oder schreib mir direkt eine E-Mail.',
      formErrorNetwork: 'Netzwerkfehler. Bitte überprüfe deine Verbindung und versuch es erneut.',
      formErrorRequired: 'Dieses Feld ist erforderlich.',
      formErrorEmailInvalid: 'Bitte gib eine gültige E-Mail-Adresse ein.',
      formErrorMessageTooShort: 'Bitte gib etwas mehr Details an.',
      formErrorFixFields: 'Bitte korrigiere die markierten Felder, bevor du sendest.',

      footerRights: 'Alle Rechte vorbehalten.',
      backToTopAria: 'Nach oben scrollen'
    },

    /* ------------------------------------------------------------------ EN */
    en: {
      skipToContent: 'Skip to content',
      metaTitle: 'Víctor Salgado — System Administrator & DevOps Engineer',
      metaDescription: 'Portfolio of Víctor Salgado, a System Administrator and DevOps Engineer specializing in Docker, Kubernetes, CI/CD automation, and infrastructure reliability.',

      navAbout: 'About',
      navExperience: 'Experience',
      navSkills: 'Tech Stack',
      navProjects: 'Projects',
      navContact: 'Contact',
      langSwitchAria: 'Change language',
      themeToggleAria: 'Toggle color theme',
      mobileMenuAria: 'Open menu',

      heroAvailability: 'Available for new opportunities',
      heroEyebrow: 'System Administrator · DevOps Engineer',
      heroHeadline: 'I build infrastructure that just works — and automate the rest.',
      heroSubhead: 'System Administrator & DevOps Engineer specializing in containerized platforms, CI/CD pipelines, and infrastructure automation.',
      heroStatusLine: 'Currently managing production infrastructure and e-commerce systems for a company in Germany.',
      heroCtaPrimary: 'View Projects',
      heroCtaSecondary: 'Get in Touch',
      heroScrollCue: 'Scroll',

      currentStackLabel: 'Currently working with',

      aboutEyebrow: '// about',
      aboutHeading: 'About',
      aboutParagraph1: "I'm a System Administrator and DevOps Engineer based in Darmstadt, Germany, working at the intersection of infrastructure, automation, and reliability.",
      aboutParagraph2: "Day to day, that means keeping production systems healthy — and boring, in the best possible sense. I'm drawn to the parts of the job most people never see: the alert that catches a problem early, the playbook that turns hours of manual work into minutes.",
      aboutParagraph3: "I'm continuously leveling up my Kubernetes and infrastructure-as-code skills, and looking for a team where I can take on more ownership as I grow.",
      aboutFocus1: 'Automation',
      aboutFocus2: 'Reliability',
      aboutFocus3: 'Monitoring',
      aboutFocus4: 'Documentation',

      experienceEyebrow: '// experience',
      experienceHeading: 'Experience',
      experienceRole: 'System Administrator & DevOps Engineer',
      experienceCompanyPlaceholder: 'Company Name',
      experienceCurrentBadge: 'Current',
      experienceBullet1: 'Run production Docker and Kubernetes infrastructure that keeps services available around the clock.',
      experienceBullet2: 'Design GitLab CI/CD pipelines that take code from commit to production without manual steps.',
      experienceBullet3: 'Automate deployments and configuration management with Ansible, replacing manual work with repeatable playbooks.',
      experienceBullet4: 'Monitor production environments with Zabbix, catching issues before they affect users.',
      experienceBullet5: 'Administer Linux and Windows Server infrastructure across development and production environments.',
      experienceBullet6: 'Keep ERP and e-commerce platforms — JTL-Wawi and Shopware — running reliably for day-to-day operations.',
      experienceBullet7: 'Secure connectivity between environments with WireGuard.',
      experienceSecondaryLabel: 'Additional experience',
      experienceSecondaryRole: 'IT Support & Helpdesk',
      experienceSecondaryTag1: 'Helpdesk Support',
      experienceSecondaryTag2: 'Hardware & Printer Support',
      experienceEducationHeading: 'Education & Certifications',

      skillsEyebrow: '// tech-stack',
      skillsHeading: 'Tech Stack',
      skillsCategoryInfra: 'Infrastructure',
      skillsCategoryAutomation: 'Automation & CI/CD',
      skillsCategoryMonitoring: 'Monitoring',
      skillsCategoryNetworking: 'Networking',
      skillsCategoryErp: 'ERP & E-Commerce',
      skillsCategoryDev: 'Development',

      projectsEyebrow: '// projects',
      projectsHeading: 'Projects',
      projectsIntro: "A few things I've built outside of work — full-stack apps, tooling, and experiments.",
      projectsLinkCode: 'Code',
      projectsLinkDemo: 'Live Demo',
      projectsLinkDownload: 'Download',

      projectQuizTitle: 'Interactive Quiz Platform',
      projectQuizDesc: 'Full-stack quiz application with user authentication and locally stored SQLite progress tracking.',
      projectChatTitle: 'Real-Time Messaging App',
      projectChatDesc: 'Real-time chat application with WebSocket messaging, built with a component-based React frontend.',
      projectBlogTitle: 'PHP Blog Platform',
      projectBlogDesc: 'Full CRUD blog engine with authentication, comments, and prepared-statement queries.',
      projectMotorTitle: 'Motor Social',
      projectMotorDesc: 'Social platform for sharing and discovering content about the world of motor vehicles.',
      projectPaintTitle: 'JavaFX Paint Application',
      projectPaintDesc: 'Desktop drawing application with shape tools, PNG export, and canvas zoom/pan, built on the JVM.',
      projectDetailsButton: 'Technical details',
      projectsPreviousAria: 'Previous project',
      projectsNextAria: 'Next project',
      projectsSwipeHint: 'Swipe sideways to see more projects',
      projectDetailsClose: 'Close',
      projectDetailsCloseAria: 'Close project details',
      projectTechnologiesLabel: 'Technologies',
      projectEstimateLabel: 'Effort',
      projectBlogDetails: 'CRUD blog with registration, sign-in, posts, and comments. PHP 8.3 and PDO run under Apache; PostgreSQL stores the data and prepared statements handle database access. For free Render hosting, a single Docker web service bundles Apache and PostgreSQL. The data directory is rebuilt at startup and seeded with demo content; changes are not durable on Render’s ephemeral filesystem. Test access and configuration are intended for a public demo, not private data or production security hardening.',
      projectBlogEstimate: 'Medium',
      projectMotorDetails: 'React and Vite power the interface, Tailwind CSS handles styling, Express exposes the REST API, and PostgreSQL stores users, posts, and uploads. The Dockerfile builds the frontend and copies it into Express; the entrypoint starts PostgreSQL, applies migrations, and seeds demo data inside the same service. This composition avoids separate paid services on Render’s free plan. The database uses ephemeral storage and may be reinitialized when the container is replaced. Sample secrets and demo accounts are not hardened for private data or production use.',
      projectMotorEstimate: 'High',
      projectChatDetails: 'React builds the client with Vite; Express serves the API and Socket.IO handles presence and real-time messaging. PostgreSQL, the backend, and static assets are bundled into one Docker image. On startup, the entrypoint prepares the schema, applies migrations, and seeds demo conversations, avoiding paid services on Render. The free filesystem is ephemeral: replacing the instance creates a clean database with seeded data. Accounts are public test accounts; this portfolio deployment is not intended for private conversations.',
      projectChatEstimate: 'High',
      projectQuizDetails: 'An Express-served application combining static pages, authentication endpoints, and an API for saving quiz progress. Node.js uses local SQLite and bcryptjs for password hashes; the database is created by the application at startup and receives a test account. Free Render hosting provides neither a managed database nor persistent disk, so replacing the instance can recreate the local database and discard earlier progress. This is a deliberate low-cost demo trade-off, not a production persistence architecture.',
      projectQuizEstimate: 'Low',
      projectPaintDetails: 'JavaFX desktop drawing application with shape tools, canvas zoom and pan, and PNG export. Maven manages the project and JavaFX dependencies; packaging produces an executable JAR. It is a local, single-process application with no remote backend or database, so it does not depend on Render or ephemeral service storage. The estimate covers a working core feature set, not cross-platform polish or signed distribution.',
      projectPaintEstimate: 'Low',

      contactEyebrow: '// contact',
      contactHeading: 'Get in Touch',
      contactSubhead: "Open to new opportunities in DevOps, System Administration, and Infrastructure Engineering. Feel free to reach out — I'd love to hear from you.",
      contactEmailLabel: 'Email',
      contactPhoneLabel: 'Phone',
      contactLinkedinLabel: 'LinkedIn',
      contactGithubLabel: 'GitHub',
      contactLocationLabel: 'Location',
      contactLocationValue: 'Darmstadt, Germany',
      contactCopyAria: 'Copy to clipboard',
      copiedFeedback: 'Copied!',

      formName: 'Name',
      formNamePlaceholder: 'Your name',
      formEmail: 'Email',
      formEmailPlaceholder: 'you@email.com',
      formSubject: 'Subject',
      formSubjectPlaceholder: "What's this about?",
      formMessage: 'Message',
      formMessagePlaceholder: 'Tell me a bit about the role or project…',
      formSend: 'Send Message',
      formSending: 'Sending…',
      formSuccess: "Thanks for your message — I'll get back to you soon.",
      formErrorServer: 'Something went wrong. Please try again or email me directly.',
      formErrorNetwork: 'Network error. Please check your connection and try again.',
      formErrorRequired: 'This field is required.',
      formErrorEmailInvalid: 'Please enter a valid email address.',
      formErrorMessageTooShort: 'Please add a little more detail.',
      formErrorFixFields: 'Please fix the highlighted fields before sending.',

      footerRights: 'All rights reserved.',
      backToTopAria: 'Back to top'
    },

    /* ------------------------------------------------------------------ ES */
    es: {
      skipToContent: 'Saltar al contenido',
      metaTitle: 'Víctor Salgado — Administrador de Sistemas e Ingeniero DevOps',
      metaDescription: 'Portfolio de Víctor Salgado, Administrador de Sistemas e Ingeniero DevOps especializado en Docker, Kubernetes, automatización de CI/CD y fiabilidad de infraestructura.',

      navAbout: 'Sobre mí',
      navExperience: 'Experiencia',
      navSkills: 'Tech Stack',
      navProjects: 'Proyectos',
      navContact: 'Contacto',
      langSwitchAria: 'Cambiar idioma',
      themeToggleAria: 'Cambiar tema de color',
      mobileMenuAria: 'Abrir menú',

      heroAvailability: 'Disponible para nuevas oportunidades',
      heroEyebrow: 'Administrador de Sistemas · DevOps Engineer',
      heroHeadline: 'Construyo infraestructura que simplemente funciona, y automatizo el resto.',
      heroSubhead: 'Administrador de Sistemas e Ingeniero DevOps especializado en plataformas en contenedores, pipelines de CI/CD y automatización de infraestructura.',
      heroStatusLine: 'Actualmente gestiono la infraestructura de producción y los sistemas de e-commerce de una empresa en Alemania.',
      heroCtaPrimary: 'Ver proyectos',
      heroCtaSecondary: 'Contactar',
      heroScrollCue: 'Desplázate',

      currentStackLabel: 'Actualmente trabajo con',

      aboutEyebrow: '// sobre mí',
      aboutHeading: 'Sobre mí',
      aboutParagraph1: 'Soy Administrador de Sistemas e Ingeniero DevOps afincado en Darmstadt (Alemania), y trabajo en la intersección entre infraestructura, automatización y fiabilidad.',
      aboutParagraph2: 'En el día a día, eso significa mantener los sistemas en producción estables — y aburridos, en el mejor sentido posible. Me atraen las partes del trabajo que casi nadie ve: la alerta que detecta un problema a tiempo, el playbook que convierte horas de trabajo manual en minutos.',
      aboutParagraph3: 'Sigo profundizando en Kubernetes e infraestructura como código, y busco un equipo en el que pueda asumir cada vez más responsabilidad a medida que crezco.',
      aboutFocus1: 'Automatización',
      aboutFocus2: 'Fiabilidad',
      aboutFocus3: 'Monitorización',
      aboutFocus4: 'Documentación',

      experienceEyebrow: '// experiencia',
      experienceHeading: 'Experiencia',
      experienceRole: 'Administrador de Sistemas e Ingeniero DevOps',
      experienceCompanyPlaceholder: 'Nombre de la empresa',
      experienceCurrentBadge: 'Actual',
      experienceBullet1: 'Opero la infraestructura de Docker y Kubernetes en producción, garantizando disponibilidad continua.',
      experienceBullet2: 'Diseño pipelines de CI/CD en GitLab que llevan el código del commit a producción sin pasos manuales.',
      experienceBullet3: 'Automatizo despliegues y gestión de configuración con Ansible, sustituyendo trabajo manual por playbooks repetibles.',
      experienceBullet4: 'Monitorizo entornos de producción con Zabbix, detectando problemas antes de que afecten a los usuarios.',
      experienceBullet5: 'Administro infraestructura Linux y Windows Server en entornos de desarrollo y producción.',
      experienceBullet6: 'Mantengo las plataformas ERP y de e-commerce JTL-Wawi y Shopware funcionando de forma fiable para el día a día del negocio.',
      experienceBullet7: 'Aseguro la conectividad entre entornos mediante WireGuard.',
      experienceSecondaryLabel: 'Experiencia adicional',
      experienceSecondaryRole: 'Soporte IT y Helpdesk',
      experienceSecondaryTag1: 'Soporte Helpdesk',
      experienceSecondaryTag2: 'Soporte de hardware e impresoras',
      experienceEducationHeading: 'Formación y certificaciones',

      skillsEyebrow: '// tech-stack',
      skillsHeading: 'Tech Stack',
      skillsCategoryInfra: 'Infraestructura',
      skillsCategoryAutomation: 'Automatización y CI/CD',
      skillsCategoryMonitoring: 'Monitorización',
      skillsCategoryNetworking: 'Redes',
      skillsCategoryErp: 'ERP y E-Commerce',
      skillsCategoryDev: 'Desarrollo',

      projectsEyebrow: '// proyectos',
      projectsHeading: 'Proyectos',
      projectsIntro: 'Algunas cosas que he construido fuera del trabajo — aplicaciones full-stack, herramientas y experimentos.',
      projectsLinkCode: 'Código',
      projectsLinkDemo: 'Demo en vivo',
      projectsLinkDownload: 'Descargar',

      projectQuizTitle: 'Plataforma de Cuestionarios Interactiva',
      projectQuizDesc: 'Aplicación de cuestionarios full-stack con autenticación y seguimiento del progreso guardado localmente en SQLite.',
      projectChatTitle: 'Aplicación de Mensajería en Tiempo Real',
      projectChatDesc: 'Aplicación de chat en tiempo real con mensajería por WebSocket, construida con un frontend en React basado en componentes.',
      projectBlogTitle: 'Plataforma de Blog en PHP',
      projectBlogDesc: 'Motor de blog con CRUD completo, autenticación, comentarios y consultas mediante prepared statements.',
      projectMotorTitle: 'Motor Social',
      projectMotorDesc: 'Plataforma social para compartir y descubrir contenido relacionado con el mundo del motor.',
      projectPaintTitle: 'Aplicación de Dibujo JavaFX',
      projectPaintDesc: 'Aplicación de dibujo de escritorio con herramientas de formas, exportación a PNG y zoom/desplazamiento del lienzo, desarrollada sobre la JVM.',
      projectDetailsButton: 'Detalles técnicos',
      projectsPreviousAria: 'Proyecto anterior',
      projectsNextAria: 'Proyecto siguiente',
      projectsSwipeHint: 'Desliza hacia un lado para ver más proyectos',
      projectDetailsClose: 'Cerrar',
      projectDetailsCloseAria: 'Cerrar detalles del proyecto',
      projectTechnologiesLabel: 'Tecnologías',
      projectEstimateLabel: 'Esfuerzo',
      projectBlogDetails: 'Blog CRUD con registro, inicio de sesión, publicaciones y comentarios. PHP 8.3 y PDO se ejecutan en Apache; PostgreSQL almacena los datos y las consultas preparadas gestionan el acceso. Para alojarlo gratis en Render, un único servicio web Docker agrupa Apache y PostgreSQL. Al arrancar se reconstruye el directorio de datos y se cargan contenidos de demo; los cambios no son duraderos en el filesystem efímero de Render. El acceso de prueba y la configuración están pensados para una demo pública, no para datos privados ni para endurecimiento de producción.',
      projectBlogEstimate: 'Medio',
      projectMotorDetails: 'React y Vite forman la interfaz, Tailwind CSS gestiona los estilos, Express expone la API REST y PostgreSQL almacena usuarios, publicaciones y archivos. Docker compila el frontend y lo copia a Express; el entrypoint inicia PostgreSQL, aplica migraciones y carga datos de demo dentro del mismo servicio. Esta composición evita servicios de pago separados en el plan gratuito de Render. La base usa almacenamiento efímero y puede reinicializarse al sustituir el contenedor. Los secretos de ejemplo y las cuentas demo no están endurecidos para datos privados ni para producción.',
      projectMotorEstimate: 'Alto',
      projectChatDetails: 'React compila el cliente con Vite; Express sirve la API y Socket.IO gestiona la presencia y la mensajería en tiempo real. PostgreSQL, el backend y los archivos estáticos se agrupan en una imagen Docker. Al arrancar, el entrypoint prepara el esquema, aplica migraciones y carga conversaciones de demo para evitar servicios de pago en Render. El filesystem gratuito es efímero: al sustituir la instancia se crea una base limpia con datos semilla. Las cuentas son públicas y de prueba; este despliegue de portfolio no está pensado para conversaciones privadas.',
      projectChatEstimate: 'Alto',
      projectQuizDetails: 'Aplicación servida por Express que combina páginas estáticas, endpoints de autenticación y una API para guardar el progreso del cuestionario. Node.js usa SQLite local y bcryptjs para los hashes de contraseña; la aplicación crea la base al iniciar y añade una cuenta de prueba. El plan gratuito de Render no ofrece base gestionada ni disco persistente, por lo que al sustituir la instancia puede regenerarse la base local y perderse el progreso anterior. Es una decisión deliberada para mantener la demo sencilla y gratuita, no una arquitectura de persistencia de producción.',
      projectQuizEstimate: 'Bajo',
      projectPaintDetails: 'Aplicación de escritorio JavaFX para dibujar con herramientas de formas, ampliar y desplazar el lienzo y exportar imágenes PNG. Maven gestiona el proyecto y las dependencias JavaFX; el empaquetado genera un JAR ejecutable. Es una aplicación local de un solo proceso, sin backend remoto ni base de datos, por lo que no depende de Render ni de almacenamiento efímero. La estimación contempla una versión funcional con las herramientas principales, no el pulido multiplataforma ni la distribución firmada.',
      projectPaintEstimate: 'Bajo',

      contactEyebrow: '// contacto',
      contactHeading: 'Hablemos',
      contactSubhead: 'Abierto a nuevas oportunidades en DevOps, Administración de Sistemas e Ingeniería de Infraestructura. Escríbeme sin problema, me encantará saber de ti.',
      contactEmailLabel: 'Correo electrónico',
      contactPhoneLabel: 'Teléfono',
      contactLinkedinLabel: 'LinkedIn',
      contactGithubLabel: 'GitHub',
      contactLocationLabel: 'Ubicación',
      contactLocationValue: 'Darmstadt, Alemania',
      contactCopyAria: 'Copiar al portapapeles',
      copiedFeedback: '¡Copiado!',

      formName: 'Nombre',
      formNamePlaceholder: 'Tu nombre',
      formEmail: 'Correo electrónico',
      formEmailPlaceholder: 'tu@email.com',
      formSubject: 'Asunto',
      formSubjectPlaceholder: '¿De qué se trata?',
      formMessage: 'Mensaje',
      formMessagePlaceholder: 'Cuéntame un poco sobre el puesto o proyecto…',
      formSend: 'Enviar mensaje',
      formSending: 'Enviando…',
      formSuccess: 'Gracias por tu mensaje: te responderé pronto.',
      formErrorServer: 'Algo salió mal. Inténtalo de nuevo o escríbeme directamente por correo.',
      formErrorNetwork: 'Error de red. Comprueba tu conexión e inténtalo de nuevo.',
      formErrorRequired: 'Este campo es obligatorio.',
      formErrorEmailInvalid: 'Introduce una dirección de correo electrónico válida.',
      formErrorMessageTooShort: 'Añade un poco más de detalle.',
      formErrorFixFields: 'Corrige los campos marcados antes de enviar.',

      footerRights: 'Todos los derechos reservados.',
      backToTopAria: 'Volver arriba'
    }
  };

  const SUPPORTED = ['de', 'en', 'es'];
  const STORAGE_KEY = 'preferredLanguage';
  let currentLang = 'de';

  function detectLanguage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    } catch (e) { /* localStorage unavailable — fall through */ }
    const browserLang = ((navigator.language || 'de').slice(0, 2)).toLowerCase();
    if (SUPPORTED.indexOf(browserLang) !== -1) return browserLang;
    return 'de';
  }

  function t(key) {
    const dict = translations[currentLang] || translations.en;
    if (dict && Object.prototype.hasOwnProperty.call(dict, key)) return dict[key];
    if (translations.en && Object.prototype.hasOwnProperty.call(translations.en, key)) return translations.en[key];
    return key;
  }

  function applyTranslations() {
    document.documentElement.setAttribute('lang', currentLang);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });
    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      el.setAttribute('title', t(el.getAttribute('data-i18n-title')));
    });

    document.title = t('metaTitle');
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('metaDescription'));

    document.querySelectorAll('.lang-switch__option').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-lang') === currentLang);
    });
    document.querySelectorAll('[data-current-lang]').forEach(function (el) {
      el.textContent = currentLang.toUpperCase();
    });

    if (window.PortfolioMain && typeof window.PortfolioMain.renderDynamicContent === 'function') {
      window.PortfolioMain.renderDynamicContent();
    }
  }

  function setLanguage(lang) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    currentLang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
    applyTranslations();
  }

  function init() {
    currentLang = detectLanguage();
    applyTranslations();
  }

  window.I18n = {
    init: init,
    setLanguage: setLanguage,
    t: t,
    getCurrentLang: function () { return currentLang; },
    SUPPORTED: SUPPORTED
  };
})();
