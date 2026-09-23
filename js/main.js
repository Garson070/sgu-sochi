(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let revealObserver = null;

  const observeReveals = (nodes) => {
    const items = [...nodes].filter((el) => !el.classList.contains("is-visible"));
    if (!items.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
    }

    items.forEach((item) => revealObserver.observe(item));
  };

  const header = document.querySelector(".site-header");
  const burger = document.querySelector(".burger");
  const nav = document.querySelector("#site-nav");
  const toTop = document.querySelector(".to-top");
  const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
  const sections = [
    ...new Map(
      navLinks
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean)
        .map((section) => [section.id, section])
    ).values(),
  ].sort((a, b) => a.offsetTop - b.offsetTop);

  const closeNav = () => {
    if (!burger || !nav) return;
    burger.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  };

  burger?.addEventListener("click", () => {
    const open = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
      closeNav();
    });
  });

  const programs = [
    {
      id: "architecture",
      title: "Архитектура",
      subtitle: "Проектирование зданий и сооружений",
      form: "Очная",
      budget: true,
      price: "230 000 руб./год",
      duration: "5 лет",
    },
    {
      id: "construction",
      title: "Строительство",
      subtitle: "Промышленное и гражданское строительство",
      form: "Очная",
      budget: true,
      price: "230 000 руб./год",
      duration: "4 года",
    },
    {
      id: "landscape",
      title: "Ландшафтная архитектура",
      subtitle: "Садово-парковое и ландшафтное строительство",
      form: "Очно-заочная",
      budget: false,
      price: "95 000 руб./год",
      duration: "4 года 6 месяцев",
    },
    {
      id: "innovatics",
      title: "Инноватика",
      subtitle: "Управление инновационной деятельностью",
      form: "Очно-заочная",
      budget: false,
      price: "95 000 руб./год",
      duration: "4 года 6 месяцев",
    },
    {
      id: "applied-it",
      title: "Прикладная информатика",
      subtitle: "Цифровые технологии в бизнесе",
      form: "Очная",
      budget: true,
      price: "230 000 руб./год",
      duration: "4 года",
    },
    {
      id: "transport",
      title: "Технологии транспортных процессов",
      subtitle: "Организация перевозок и безопасность транспорта",
      form: "Очная",
      budget: false,
      price: "95 000 руб./год",
      duration: "4 года",
    },
    {
      id: "pedagogy",
      title: "Педагогическое образование",
      subtitle: "История и География",
      form: "Очная",
      budget: true,
      price: "180 000 руб./год",
      duration: "5 лет",
    },
    {
      id: "psychology-clinic",
      title: "Психология",
      subtitle: "Клиническая психология",
      form: "Очно-заочная",
      budget: true,
      price: "110 000 руб./год",
      duration: "4 года 6 месяцев",
    },
    {
      id: "psycho-pedagogy",
      title: "Психолого-педагогическое образование",
      subtitle: "Психология и педагогика дошкольного образования",
      form: "Заочная",
      budget: false,
      price: "100 000 руб./год",
      duration: "4 года",
    },
    {
      id: "defectology",
      title: "Специальное (дефектологическое) образование",
      subtitle: "Логопедия",
      form: "Заочная",
      budget: false,
      price: "100 000 руб./год",
      duration: "4 года",
    },
    {
      id: "pr-commerce",
      title: "Реклама и связи с общественностью",
      subtitle: "Реклама и связи с общественностью в коммерческой сфере",
      form: "Очная",
      budget: false,
      price: "200 000 руб./год",
      duration: "4 года",
    },
    {
      id: "pr-creative",
      title: "Реклама и связи с общественностью",
      subtitle: "Маркетинговые коммуникации в креативных индустриях",
      form: "Очная",
      budget: false,
      price: "200 000 руб./год",
      duration: "4 года",
    },
    {
      id: "service",
      title: "Сервис",
      subtitle: "Сервис инженерных систем гостинично-ресторанного комплекса",
      form: "Очная",
      budget: false,
      price: "165 000 руб./год",
      duration: "4 года",
    },
    {
      id: "hospitality",
      title: "Гостиничное дело",
      subtitle: "Менеджмент индустрии гостеприимства",
      form: "Очная",
      budget: true,
      price: "165 000 руб./год",
      duration: "4 года",
    },
    {
      id: "tourism-excursion",
      title: "Туризм",
      subtitle: "Организация экскурсионных услуг",
      form: "Заочная",
      budget: false,
      price: "110 000 руб./год",
      duration: "4 года 11 месяцев",
    },
    {
      id: "tourism-operator",
      title: "Туризм",
      subtitle: "Организация и управление туристическими услугами",
      form: "Очная",
      budget: true,
      price: "165 000 руб./год",
      duration: "4 года",
    },
    {
      id: "judicial",
      title: "Судебная и прокурорская деятельность",
      subtitle: "Судебная деятельность",
      form: "Очная",
      budget: true,
      price: "230 000 руб./год",
      duration: "5 лет",
    },
    {
      id: "law-tourism",
      title: "Юриспруденция",
      subtitle: "Правовое регулирование в сфере туризма",
      form: "Очная",
      budget: true,
      price: "230 000 руб./год",
      duration: "4 года",
    },
    {
      id: "law-civil",
      title: "Юриспруденция",
      subtitle: "Гражданско-правовой профиль",
      form: "Очно-заочная",
      budget: true,
      price: "110 000 руб./год",
      duration: "4 года 6 месяцев",
    },
    {
      id: "economy-marketing",
      title: "Экономика",
      subtitle: "Цифровой маркетинг",
      form: "Очная",
      budget: true,
      price: "260 000 руб./год",
      duration: "4 года",
    },
    {
      id: "econ-security",
      title: "Экономическая безопасность",
      subtitle: "Экономическая безопасность в цифровой экономике",
      form: "Очно-заочная",
      budget: false,
      price: "110 000 руб./год",
      duration: "5 лет 6 месяцев",
    },
    {
      id: "sport",
      title: "Физическая культура",
      subtitle: "Спортивная тренировка",
      form: "Очная",
      budget: true,
      price: "220 000 руб./год",
      duration: "4 года",
    },
  ];


  const collegePrograms = [
    {
      id: "col-design",
      title: "Дизайн (по отраслям)",
      subtitle: "Дизайн интерьера",
      form: "Очная",
      budget: true,
      price: "261 000 руб./год",
      duration: "3 года 10 месяцев",
      cover: "landscape",
    },
    {
      id: "col-transport",
      title: "Организация перевозок и управление на транспорте",
      subtitle: "Организация перевозок и управление на автомобильном транспорте",
      form: "Очная",
      budget: true,
      price: "130 000 руб./год",
      duration: "3 года 10 месяцев",
      cover: "transport",
    },
    {
      id: "col-cooking",
      title: "Поварское и кондитерское дело",
      subtitle: "Организация и ведение процессов приготовления кулинарной продукции",
      form: "Очная",
      budget: true,
      price: "150 000 руб./год",
      duration: "3 года 10 месяцев",
      cover: "hospitality",
    },
    {
      id: "col-software",
      title: "Разработка и управление программным обеспечением",
      subtitle: "Проектирование и разработка информационных систем",
      form: "Очная",
      budget: true,
      price: "160 000 руб./год",
      duration: "3 года 10 месяцев",
      cover: "applied-it",
    },
    {
      id: "col-landscape",
      title: "Садово-парковое и ландшафтное проектирование",
      subtitle: "Благоустройство и озеленение территорий и объектов",
      form: "Очная",
      budget: true,
      price: "130 000 руб./год",
      duration: "2 года 10 месяцев",
      cover: "landscape",
    },
    {
      id: "col-air-service",
      title: "Сервис на транспорте (по видам транспорта)",
      subtitle: "Сервис на воздушном транспорте",
      form: "Очная",
      budget: true,
      price: "110 000 руб./год",
      duration: "2 года 10 месяцев",
      cover: "service",
    },
    {
      id: "col-building",
      title: "Строительство и эксплуатация зданий и сооружений",
      subtitle: "Проектирование сооружений и технологических процессов",
      form: "Очная",
      budget: true,
      price: "150 000 руб./год",
      duration: "3 года 10 месяцев",
      cover: "construction",
    },
    {
      id: "col-tourism-11",
      title: "Туризм и гостеприимство (на базе 11 классов)",
      subtitle: "Гостиничная деятельность",
      form: "Очная",
      budget: false,
      price: "130 000 руб./год",
      duration: "1 год 10 месяцев",
      cover: "hospitality",
    },
    {
      id: "col-tourism-9-rest",
      title: "Туризм и гостеприимство (на базе 9 классов)",
      subtitle: "Ресторанная деятельность",
      form: "Очная",
      budget: false,
      price: "130 000 руб./год",
      duration: "2 года 10 месяцев",
      cover: "tourism-operator",
    },
    {
      id: "col-tourism-9-tour",
      title: "Туризм и гостеприимство (на базе 9 классов)",
      subtitle: "Туристская деятельность",
      form: "Очная",
      budget: false,
      price: "130 000 руб./год",
      duration: "2 года 10 месяцев",
      cover: "tourism-excursion",
    },
    {
      id: "col-accounting",
      title: "Экономика и бухгалтерский учет (по отраслям)",
      subtitle: "Бухгалтерский учет в торговле и сфере услуг",
      form: "Очная",
      budget: false,
      price: "110 000 руб./год",
      duration: "2 года 10 месяцев",
      cover: "economy-marketing",
    },
  ];

  const masterPrograms = [
    {
      id: "m-psychology-crisis",
      title: "Психология",
      subtitle: "Кризисная психология",
      form: "Очно-заочная",
      budget: false,
      price: "130 000 руб./год",
      duration: "2 года 4 месяца",
      cover: "psychology-clinic",
    },
    {
      id: "m-psycho-pedagogy",
      title: "Психолого-педагогическое образование",
      subtitle: "Менеджмент многоуровневой образовательной организации",
      form: "Очная",
      budget: true,
      price: "190 000 руб./год",
      duration: "2 года",
      note: "Всероссийский детский центр «Орлёнок» · 2 диплома (ВО — ДПО)",
      cover: "psycho-pedagogy",
    },
    {
      id: "m-service",
      title: "Сервис",
      subtitle: "Технологии инженерного сервиса",
      form: "Очная",
      budget: true,
      price: "190 000 руб./год",
      duration: "2 года",
      cover: "service",
    },
    {
      id: "m-defectology",
      title: "Специальное (дефектологическое) образование",
      subtitle:
        "Нейродефектология и комплексное сопровождение лиц с нарушениями в развитии",
      form: "Очная",
      budget: true,
      price: "190 000 руб./год",
      duration: "2 года",
      cover: "defectology",
    },
    {
      id: "m-construction",
      title: "Строительство",
      subtitle: "Строительство в прибрежных регионах",
      form: "Очная",
      budget: true,
      price: "210 000 руб./год",
      duration: "2 года",
      cover: "construction",
    },
    {
      id: "m-tourism",
      title: "Туризм",
      subtitle: "Внутренний и въездной туризм",
      form: "Очная",
      budget: true,
      price: "190 000 руб./год",
      duration: "2 года",
      cover: "tourism-operator",
    },
    {
      id: "m-economy-full",
      title: "Экономика",
      subtitle: "Финансовая и управленческая бизнес-аналитика",
      form: "Очная",
      budget: true,
      price: "190 000 руб./год",
      duration: "2 года",
      cover: "economy-marketing",
    },
    {
      id: "m-economy-distance",
      title: "Экономика",
      subtitle: "Финансовая и управленческая бизнес-аналитика",
      form: "Заочная",
      budget: true,
      price: "105 000 руб./год",
      duration: "2 года 5 месяцев",
      cover: "economy-marketing",
    },
    {
      id: "m-hospitality-strategy",
      title: "Гостиничное дело",
      subtitle: "Стратегический менеджмент в гостиничном и ресторанном бизнесе",
      form: "Очная",
      budget: true,
      price: "190 000 руб./год",
      duration: "2 года",
      cover: "hospitality",
    },
    {
      id: "m-hospitality-innov",
      title: "Гостиничное дело",
      subtitle: "Инновационные технологии индустрии гостеприимства",
      form: "Заочная",
      budget: true,
      price: "105 000 руб./год",
      duration: "2 года 5 месяцев",
      cover: "hospitality",
    },
    {
      id: "m-gmu",
      title: "Государственное и муниципальное управление",
      subtitle:
        "Технологии административного управления в государственном и муниципальном секторе",
      form: "Заочная",
      budget: true,
      price: "105 000 руб./год",
      duration: "2 года 5 месяцев",
      cover: "innovatics",
    },
    {
      id: "m-design",
      title: "Дизайн",
      subtitle: "Дизайн предметно-пространственной среды",
      form: "Очно-заочная",
      budget: false,
      price: "140 000 руб./год",
      duration: "2 года 4 месяца",
      cover: "landscape",
    },
    {
      id: "m-pedagogy-languages",
      title: "Педагогическое образование",
      subtitle: "Технологии преподавания иностранных языков в высшей школе",
      form: "Заочная",
      budget: false,
      price: "105 000 руб./год",
      duration: "2 года 5 месяцев",
      cover: "pedagogy",
    },
    {
      id: "m-pedagogy-quality",
      title: "Педагогическое образование",
      subtitle: "Управление качеством и эффективностью в профессиональном образовании",
      form: "Заочная",
      budget: false,
      price: "105 000 руб./год",
      duration: "2 года 5 месяцев",
      cover: "pedagogy",
    },
    {
      id: "m-applied-it",
      title: "Прикладная информатика",
      subtitle: "Управление данными и искусственный интеллект",
      form: "Очная",
      budget: false,
      price: "190 000 руб./год",
      duration: "2 года",
      note: "Санкт-Петербургский государственный университет · Сбер · 2 диплома (ВО — ДПО)",
      cover: "applied-it",
    },
    {
      id: "m-psychology-personality",
      title: "Психология",
      subtitle: "Психология личности",
      form: "Очно-заочная",
      budget: false,
      price: "130 000 руб./год",
      duration: "2 года 4 месяца",
      cover: "psychology-clinic",
    },
    {
      id: "m-law-private",
      title: "Юриспруденция",
      subtitle: "Современное частное право",
      form: "Заочная",
      budget: false,
      price: "105 000 руб./год",
      duration: "2 года 3 месяца",
      cover: "law-civil",
    },
    {
      id: "m-law-justice",
      title: "Юриспруденция",
      subtitle: "Юрист органов правосудия и правопорядка",
      form: "Заочная",
      budget: false,
      price: "105 000 руб./год",
      duration: "2 года 3 месяца",
      cover: "judicial",
    },
  ];

  const phdPrograms = [
    {
      id: "phd-arts",
      title: "Виды искусства (с указанием конкретного искусства)",
      subtitle: "",
      form: "Очная",
      budget: false,
      price: "250 000 руб./год",
      duration: "3 года",
      cover: "landscape",
    },
    {
      id: "phd-medicine",
      title:
        "Восстановительная медицина, спортивная медицина, лечебная физкультура, курортология и физиотерапия",
      subtitle: "",
      form: "Очная",
      budget: false,
      price: "260 000 руб./год",
      duration: "3 года",
      cover: "sport",
    },
    {
      id: "phd-management",
      title: "Менеджмент",
      subtitle: "",
      form: "Очная",
      budget: false,
      price: "250 000 руб./год",
      duration: "3 года",
      cover: "innovatics",
    },
    {
      id: "phd-prof-edu",
      title: "Методология и технология профессионального образования",
      subtitle: "",
      form: "Очная",
      budget: false,
      price: "230 000 руб./год",
      duration: "3 года",
      cover: "pedagogy",
    },
    {
      id: "phd-pedagogy",
      title: "Общая педагогика, история педагогики и образования",
      subtitle: "",
      form: "Очная",
      budget: false,
      price: "230 000 руб./год",
      duration: "3 года",
      cover: "pedagogy",
    },
    {
      id: "phd-psychology",
      title: "Общая психология, психология личности, история психологии",
      subtitle: "",
      form: "Очная",
      budget: false,
      price: "230 000 руб./год",
      duration: "3 года",
      cover: "psychology-clinic",
    },
    {
      id: "phd-adaptive-sport",
      title: "Оздоровительная и адаптивная физическая культура",
      subtitle: "",
      form: "Очная",
      budget: false,
      price: "260 000 руб./год",
      duration: "3 года",
      cover: "sport",
    },
    {
      id: "phd-ped-psychology",
      title:
        "Педагогическая психология, психодиагностика цифровых образовательных сред",
      subtitle: "",
      form: "Очная",
      budget: false,
      price: "230 000 руб./год",
      duration: "3 года",
      cover: "psycho-pedagogy",
    },
    {
      id: "phd-economy",
      title: "Региональная и отраслевая экономика",
      subtitle: "",
      form: "Очная",
      budget: false,
      price: "250 000 руб./год",
      duration: "3 года",
      cover: "economy-marketing",
    },
    {
      id: "phd-philosophy",
      title: "Социальная и политическая философия",
      subtitle: "",
      form: "Очная",
      budget: false,
      price: "230 000 руб./год",
      duration: "3 года",
      cover: "pr-commerce",
    },
    {
      id: "phd-law",
      title: "Теоретико-исторические правовые науки",
      subtitle: "",
      form: "Очная",
      budget: false,
      price: "260 000 руб./год",
      duration: "3 года",
      cover: "judicial",
    },
    {
      id: "phd-linguistics",
      title:
        "Теоретическая, прикладная и сравнительно-сопоставительная лингвистика",
      subtitle: "",
      form: "Очная",
      budget: false,
      price: "230 000 руб./год",
      duration: "3 года",
      cover: "pedagogy",
    },
    {
      id: "phd-culture",
      title: "Теория и история культуры, искусства",
      subtitle: "",
      form: "Очная",
      budget: false,
      price: "250 000 руб./год",
      duration: "3 года",
      cover: "landscape",
    },
    {
      id: "phd-sport-theory",
      title: "Теория и методика спорта",
      subtitle: "",
      form: "Очная",
      budget: false,
      price: "230 000 руб./год",
      duration: "3 года",
      cover: "sport",
    },
    {
      id: "phd-finance",
      title: "Финансы",
      subtitle: "",
      form: "Очная",
      budget: false,
      price: "250 000 руб./год",
      duration: "3 года",
      cover: "economy-marketing",
    },
  ];

  let activeLevel = "bachelor";
  const levelCatalog = {
    bachelor: programs,
    master: masterPrograms,
    phd: phdPrograms,
    college: collegePrograms,
  };
  const featuredByLevel = {
    bachelor: [
      "architecture",
      "applied-it",
      "hospitality",
      "tourism-operator",
      "law-tourism",
      "economy-marketing",
      "pedagogy",
      "psychology-clinic",
    ],
    master: [
      "m-psychology-crisis",
      "m-service",
      "m-construction",
      "m-tourism",
      "m-economy-full",
      "m-hospitality-strategy",
      "m-applied-it",
      "m-law-private",
    ],
    phd: [
      "phd-arts",
      "phd-management",
      "phd-psychology",
      "phd-economy",
      "phd-law",
      "phd-linguistics",
      "phd-sport-theory",
      "phd-finance",
    ],
    college: [
      "col-design",
      "col-software",
      "col-cooking",
      "col-building",
      "col-tourism-11",
      "col-accounting",
      "col-transport",
      "col-landscape",
    ],
  };
  const levelTitles = {
    bachelor: "Популярные направления",
    master: "Популярные программы магистратуры",
    phd: "Популярные программы аспирантуры",
    college: "Популярные программы колледжа",
  };
  const getCatalog = () => levelCatalog[activeLevel] || programs;
  const getActivePrograms = () => {
    const catalog = getCatalog();
    const featuredIds = featuredByLevel[activeLevel];
    if (!featuredIds?.length) return catalog.slice(0, 8);
    return featuredIds
      .map((id) => catalog.find((item) => item.id === id))
      .filter(Boolean);
  };
  const programsById = () =>
    Object.fromEntries(getCatalog().map((item) => [item.id, item]));
  const programsGrid = document.querySelector("#programs-grid");
  const programsCount = document.querySelector("#programs-count");
  const programsEmpty = document.querySelector("#programs-empty");

  const icons = {
    arrow: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h12M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    people: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="2.4" stroke="currentColor" stroke-width="1.5"/><circle cx="15.5" cy="8.5" r="2" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 17.5c.7-2.4 2.4-3.6 4.5-3.6s3.8 1.2 4.5 3.6M12.8 17.2c.5-1.8 1.8-2.8 3-2.8 1.4 0 2.7 1.1 3.2 2.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    money: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M13.6 8.4H11.2a2.1 2.1 0 0 0 0 4.2h1.6a2.1 2.1 0 0 1 0 4.2H9.4M12 7.2v1.2M12 15.6v1.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    calendar: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2.2" stroke="currentColor" stroke-width="1.5"/><path d="M8 3.5v3M16 3.5v3M3.5 10h17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  };

  const createCard = (program) => {
    const article = document.createElement("article");
    article.className = "program-card reveal";
    article.dataset.form = program.form;
    const cover = program.cover || program.id;

    const budgetRow = program.budget
      ? `<div class="program-card-row">
            <span class="program-card-row-icon" aria-hidden="true">${icons.people}</span>
            <span class="program-card-row-text">Есть бюджетные места</span>
          </div>`
      : "";
    const noteRow = program.note
      ? `<p class="program-card-note">${program.note}</p>`
      : "";
    const subtitleRow = program.subtitle
      ? `<p class="program-card-subtitle">${program.subtitle}</p>`
      : "";

    article.innerHTML = `
      <button type="button" class="program-open" data-program="${program.id}" aria-label="Смотреть программу: ${program.title}">
        <div class="program-card-media" aria-hidden="true">
          <img src="assets/covers/${cover}.webp" alt="" width="960" height="640" loading="lazy" decoding="async">
        </div>
        <div class="program-card-body">
          <div class="program-card-top">
            <span class="program-form-badge">${program.form}</span>
            <span class="program-card-arrow" aria-hidden="true">${icons.arrow}</span>
          </div>
          <h3>${program.title}</h3>
          ${subtitleRow}
          ${noteRow}
          <div class="program-card-rows">
            ${budgetRow}
            <div class="program-card-row">
              <span class="program-card-row-icon" aria-hidden="true">${icons.money}</span>
              <div class="program-card-row-stack">
                <span class="program-card-row-label">стоимость</span>
                <strong>${program.price}</strong>
              </div>
            </div>
            <div class="program-card-row">
              <span class="program-card-row-icon" aria-hidden="true">${icons.calendar}</span>
              <div class="program-card-row-stack">
                <span class="program-card-row-label">срок обучения</span>
                <strong>${program.duration}</strong>
              </div>
            </div>
          </div>
        </div>
      </button>
    `;

    return article;
  };

  const programsTitle = document.querySelector("#programs-title");
  const programsSection = document.querySelector("#programs");

  const renderPrograms = () => {
    if (!programsGrid) return;
    const catalog = getActivePrograms();

    if (programsTitle) {
      programsTitle.textContent = levelTitles[activeLevel] || levelTitles.bachelor;
    }

    programsGrid.innerHTML = "";
    catalog.forEach((program) => {
      programsGrid.appendChild(createCard(program));
    });

    if (programsCount) {
      programsCount.textContent = `${catalog.length} направлений`;
    }

    if (programsEmpty) {
      programsEmpty.hidden = catalog.length > 0;
    }

    programsGrid.querySelectorAll(".program-open").forEach((button) => {
      button.addEventListener("click", () => {
        openProgramModal(button.dataset.program, button);
      });
    });

    const cards = programsGrid.querySelectorAll(".reveal");
    const gridRect = programsGrid.getBoundingClientRect();
    const gridInView =
      gridRect.top < window.innerHeight * 0.92 && gridRect.bottom > 80;

    if (gridInView) {
      requestAnimationFrame(() => {
        cards.forEach((card) => card.classList.add("is-visible"));
      });
    } else {
      observeReveals(cards);
    }
  };

  const modal = document.querySelector("#program-modal");
  const modalDialog = modal?.querySelector(".program-modal-dialog");
  const modalTitle = document.querySelector("#program-modal-title");
  const modalSubtitle = document.querySelector("#program-modal-subtitle");
  const modalForm = document.querySelector("#program-modal-form");
  const modalNote = document.querySelector("#program-modal-note");
  const modalBudget = document.querySelector("#program-modal-budget");
  const modalPrice = document.querySelector("#program-modal-price");
  const modalDuration = document.querySelector("#program-modal-duration");
  const modalCta = document.querySelector("#program-modal-cta");
  const inertTargets = [
    document.querySelector(".site-header"),
    document.querySelector("#main"),
    document.querySelector(".site-footer"),
  ].filter(Boolean);
  const focusableSelector =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  let lastFocus = null;
  let closingTimer = null;

  const getModalFocusable = () =>
    [...(modalDialog?.querySelectorAll(focusableSelector) || [])].filter(
      (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true"
    );

  const setPageInert = (on) => {
    inertTargets.forEach((el) => {
      if (on) el.setAttribute("inert", "");
      else el.removeAttribute("inert");
    });
  };

  const trapModalFocus = (event) => {
    if (event.key !== "Tab" || !modal || modal.hidden) return;
    const focusables = getModalFocusable();
    if (!focusables.length) {
      event.preventDefault();
      modalDialog?.focus({ preventScroll: true });
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;

    if (event.shiftKey) {
      if (active === first || active === modalDialog || !modal.contains(active)) {
        event.preventDefault();
        last.focus();
      }
    } else if (active === last || !modal.contains(active)) {
      event.preventDefault();
      first.focus();
    }
  };

  const fillProgramModal = (data) => {
    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalForm.textContent = data.form;
    modalPrice.textContent = data.price;
    modalDuration.textContent = data.duration;
    if (data.note) {
      modalNote.hidden = false;
      modalNote.textContent = data.note;
    } else {
      modalNote.hidden = true;
      modalNote.textContent = "";
    }
    modalBudget.hidden = !data.budget;
  };

  const openProgramModal = (key, trigger) => {
    const data = programsById()[key];
    if (!modal || !data) return;

    if (closingTimer) {
      clearTimeout(closingTimer);
      closingTimer = null;
    }

    lastFocus = trigger || document.activeElement;
    fillProgramModal(data);
    modal.hidden = false;
    setPageInert(true);
    requestAnimationFrame(() => {
      modal.classList.add("is-open");
      modal.classList.remove("is-closing");
    });
    document.body.classList.add("modal-open");
    modalDialog?.focus({ preventScroll: true });
  };

  const closeProgramModal = () => {
    if (!modal || modal.hidden) return;
    modal.classList.add("is-closing");
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    setPageInert(false);

    closingTimer = setTimeout(() => {
      modal.hidden = true;
      modal.classList.remove("is-closing");
      lastFocus?.focus?.({ preventScroll: true });
      closingTimer = null;
    }, 320);
  };

  document.querySelectorAll(".level-item[data-level]").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      const level = item.dataset.level;
      if (!level) return;
      activeLevel = level;
      document.querySelectorAll(".level-item[data-level]").forEach((el) => {
        el.classList.toggle("is-active", el === item);
      });
      renderPrograms();
      if (programsSection) {
        const top =
          programsSection.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  modal?.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", closeProgramModal);
  });

  modalCta?.addEventListener("click", () => {
    closeProgramModal();
  });

  document.addEventListener("keydown", (event) => {
    if (modal && !modal.hidden) {
      trapModalFocus(event);
      if (event.key === "Escape") {
        closeProgramModal();
        return;
      }
    }
    if (event.key === "Escape") {
      closeNav();
    }
  });

  renderPrograms();

  const progressBar = document.querySelector("#scroll-progress-bar");

  const updateProgress = () => {
    if (!progressBar) return;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    progressBar.style.transform = `scaleX(${ratio})`;
  };

  const handleScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle("is-scrolled", y > 8);
    toTop?.classList.toggle("is-visible", y > 600);
    if (toTop) {
      const show = y > 600;
      toTop.tabIndex = show ? 0 : -1;
      if (show) {
        toTop.removeAttribute("aria-hidden");
        toTop.removeAttribute("inert");
      } else {
        toTop.setAttribute("aria-hidden", "true");
        toTop.setAttribute("inert", "");
      }
    }
    updateProgress();

    let current = "";
    const ordered = [...sections].sort((a, b) => a.offsetTop - b.offsetTop);
    for (const section of ordered) {
      if (section.offsetTop - 120 <= y) current = `#${section.id}`;
    }
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === current);
    });
  };

  let scrollQueued = false;
  const onScroll = () => {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(() => {
      handleScroll();
      scrollQueued = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateProgress, { passive: true });
  handleScroll();

  toTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const heroAnims = document.querySelectorAll(".hero-anim");
  if (reduceMotion) {
    heroAnims.forEach((el) => el.classList.add("is-in"));
  } else {
    requestAnimationFrame(() => {
      heroAnims.forEach((el) => el.classList.add("is-in"));
    });
  }

  observeReveals(document.querySelectorAll(".reveal"));
})();
