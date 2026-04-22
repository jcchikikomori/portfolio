/**
 * Career/Employment History Data
 *
 * Contains only employment history (companies worked for).
 * Individual projects are stored in projects.ts
 */

import { Career } from '@/types/index.ts';

export const careers: Career[] = [
  {
    id: 'engagia',
    company: 'Engagia',
    description:
      'The most complete, easiest to use and end to end integrated sales force automation system designed for consumer goods',
    dates: '2017 - 2019',
    url: 'https://engagia.com/',
    logo: '/img/logos/engagia-logo.png',
    logoDark: '/img/logos/engagia-logo.png',
    platforms: ['bi-filetype-php', 'bi-database', 'bi-android', 'bi-phone'],
    logoCopyrightNotice: 'Logo © Engagia & Trade Dynamics Consulting. All rights reserved.',
  },
  {
    id: 'gorated',
    company: 'Gorated',
    description: 'SaaS consultancy startup helping companies build solutions',
    dates: '2019 - 2022',
    url: null,
    logo: null,
    logoDark: null,
    platforms: ['bi-globe', 'bi-phone', 'bi-cart'],
  },
  {
    id: 'chatgenie',
    company: 'Chatgenie.ph',
    description:
      'Developed integrations for Chatgenie.ph such as GCash (GLife), Viber, Facebook & Instagram. Also worked on GCash Mini Program and various B2B projects.',
    dates: '2019 - 2022',
    url: 'https://chatgenie.ph',
    logo: 'https://cdn.prod.website-files.com/618148f48ea937a5e5ae1e3c/6182137b7c8e740cf4b52fdb_logo-chatgenie.png',
    logoDark:
      'https://cdn.prod.website-files.com/618148f48ea937a5e5ae1e3c/6182137b7c8e740cf4b52fdb_logo-chatgenie.png',
    platforms: ['bi-globe', 'bi-phone', 'bi-cart', 'bi-wallet'],
    logoCopyrightNotice: 'Logo © Chatgenie. All rights reserved.',
  },
  {
    id: 'accenture',
    company: 'Accenture',
    description: 'Cloud infrastructure and consulting for enterprise clients',
    dates: '2022 - present',
    url: 'https://accenture.com',
    logo: '/img/logos/acn-logo-big.png',
    logoDark: '/img/logos/acn-logo-big-dark.png',
    platforms: ['bi-cloud', 'bi-globe', 'bi-code-square'],
    logoCopyrightNotice: 'Logo © Accenture Inc., All rights reserved.',
  },
];
