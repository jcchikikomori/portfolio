/**
 * @typedef {Object} Career
 * @property {string} id - Unique identifier (kebab-case)
 * @property {string} company - Display name
 * @property {string} description - Role/project description (may be empty)
 * @property {string} dates - Date range string
 * @property {string|null} url - External URL or null
 * @property {string} imgClass - Legacy CSS class for background-image
 * @property {string|null} logo - Light mode logo path relative to public/ or null
 * @property {string|null} logoDark - Dark mode logo path or null
 * @property {string[]} platforms - Bootstrap Icons class names with 'bi-' prefix
 * @property {'url'|'alert'} clickAction - Card click behavior
 * @property {string|null} alertMsg - Alert message when clickAction is 'alert'
 * @property {string[]} screenshots - Screenshot image paths relative to public/
 */

/** @type {Career[]} */
export const careers = [
  {
    id: "accenture",
    company: "Accenture",
    description: "",
    dates: "2022-present",
    url: "https://accenture.com",
    imgClass: "placeholder",
    logo: "https://logo.clearbit.com/accenture.com",
    logoDark: "https://logo.clearbit.com/accenture.com",
    platforms: ["bi-cloud", "bi-globe", "bi-code-square"],
    clickAction: "url",
    alertMsg: null,
    screenshots: [],
  },
  {
    id: "chatgenie",
    company: "Chatgenie.ph",
    description:
      "Developed some integrations for Chatgenie.ph Such as GCash (GLife), Viber, Facebook & Instagram",
    dates: "2019-2022",
    url: "https://chatgenie.ph",
    imgClass: "chatgenie",
    logo: "https://cdn.prod.website-files.com/618148f48ea937a5e5ae1e3c/6182137b7c8e740cf4b52fdb_logo-chatgenie.png",
    logoDark:
      "https://cdn.prod.website-files.com/618148f48ea937a5e5ae1e3c/6182137b7c8e740cf4b52fdb_logo-chatgenie.png",
    platforms: ["bi-globe", "bi-phone", "bi-cart"],
    clickAction: "url",
    alertMsg: null,
    screenshots: ["/img/projects/chatgenie.png"],
  },
  {
    id: "hello-php",
    company: "hello-php",
    description: "For protyping PHP app with user authentication",
    dates: "2017-present",
    url: null,
    imgClass: "hello-php",
    logo: "https://www.php.net/images/logos/new-php-logo.svg",
    logoDark: "https://www.php.net/images/logos/new-php-logo.svg",
    platforms: ["bi-filetype-php", "bi-database"],
    clickAction: "alert",
    alertMsg: "Preview not available anymore.",
    screenshots: [],
  },
  {
    id: "gcash-miniprogram",
    company: "GCash Mini Program",
    description: "For serving Chatgenie merchants for GLife",
    dates: "2020-2022",
    url: "https://miniprogram.gcash.com",
    imgClass: "gcash-miniprogram",
    logo: "https://gw.alipayobjects.com/zos/bmw-prod/f0658042-73e7-4ad7-b970-bc0117d94f4e.svg",
    logoDark:
      "https://gw.alipayobjects.com/zos/bmw-prod/f0658042-73e7-4ad7-b970-bc0117d94f4e.svg",
    platforms: ["bi-phone", "bi-wallet"],
    clickAction: "url",
    alertMsg: null,
    screenshots: ["/img/projects/miniprogram.png"],
  },
  {
    id: "covemanila",
    company: "Cove Manila WordPress Project",
    description: "",
    dates: "2019",
    url: null,
    imgClass: "covemanila",
    logo: "https://logo.clearbit.com/okadamanila.com",
    logoDark: "https://logo.clearbit.com/okadamanila.com",
    platforms: ["bi-wordpress", "bi-globe"],
    clickAction: "alert",
    alertMsg: "Preview not available anymore.",
    screenshots: ["/img/projects/covemanila.png"],
  },
  {
    id: "mcdelivery",
    company: "McDelivery PH for Android",
    description: "",
    dates: "2019 - 2021",
    url: "https://web.archive.org/web/20191228231219if_/https://www.mcdelivery.com.ph/",
    imgClass: "mcdelivery",
    logo: "https://logo.clearbit.com/mcdonalds.com",
    logoDark: "https://logo.clearbit.com/mcdonalds.com",
    platforms: ["bi-android", "bi-phone"],
    clickAction: "url",
    alertMsg: null,
    screenshots: ["/img/projects/mcdelivery.png"],
  },
];
