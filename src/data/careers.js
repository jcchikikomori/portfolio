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
        id: 'accenture',
        company: 'Accenture',
        description: '',
        dates: '2022-present',
        url: 'https://accenture.com',
        imgClass: 'placeholder',
        logo: null,
        logoDark: null,
        platforms: [],
        clickAction: 'url',
        alertMsg: null,
        screenshots: [],
    },
    {
        id: 'chatgenie',
        company: 'Chatgenie.ph',
        description:
            'Developed some integrations for Chatgenie.ph Such as GCash (GLife), Viber, Facebook & Instagram',
        dates: '2019-2022',
        url: 'https://chatgenie.ph',
        imgClass: 'chatgenie',
        logo: null,
        logoDark: null,
        platforms: [],
        clickAction: 'url',
        alertMsg: null,
        screenshots: ['/img/projects/chatgenie.png'],
    },
    {
        id: 'hello-php',
        company: 'hello-php',
        description: 'For protyping PHP app with user authentication',
        dates: '2017-present',
        url: null,
        imgClass: 'hello-php',
        logo: null,
        logoDark: null,
        platforms: [],
        clickAction: 'alert',
        alertMsg: 'Preview not available anymore.',
        screenshots: [],
    },
    {
        id: 'gcash-miniprogram',
        company: 'GCash Mini Program',
        description: 'For serving Chatgenie merchants for GLife',
        dates: '2020-2022',
        url: 'https://miniprogram.gcash.com',
        imgClass: 'gcash-miniprogram',
        logo: null,
        logoDark: null,
        platforms: [],
        clickAction: 'url',
        alertMsg: null,
        screenshots: ['/img/projects/miniprogram.png'],
    },
    {
        id: 'covemanila',
        company: 'Cove Manila WordPress Project',
        description: '',
        dates: '2019',
        url: null,
        imgClass: 'covemanila',
        logo: null,
        logoDark: null,
        platforms: [],
        clickAction: 'alert',
        alertMsg: 'Preview not available anymore.',
        screenshots: ['/img/projects/covemanila.png'],
    },
    {
        id: 'mcdelivery',
        company: 'McDelivery PH for Android',
        description: '',
        dates: '2019 - 2021',
        url: 'https://web.archive.org/web/20191228231219if_/https://www.mcdelivery.com.ph/',
        imgClass: 'mcdelivery',
        logo: null,
        logoDark: null,
        platforms: [],
        clickAction: 'url',
        alertMsg: null,
        screenshots: ['/img/projects/mcdelivery.png'],
    },
]
