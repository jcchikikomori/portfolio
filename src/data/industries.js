/**
 * @typedef {Object} Skill
 * @property {string} name - Skill display name
 * @property {string} icon - Bootstrap Icons class name (bi-*)
 */

/**
 * @typedef {Object} Project
 * @property {string} name - Project display name
 * @property {string} careerId - Reference to career.id
 * @property {string} description - Brief project description
 * @property {Skill[]} skills - Array of skills used in the project
 */

/**
 * @typedef {Object} Industry
 * @property {string} name - Industry display name
 * @property {string} icon - Bootstrap Icons class name (bi-*)
 * @property {Project[]} projects - Array of projects in this industry
 */

/** @type {Industry[]} */
export const industries = [
  {
    name: 'E-Commerce',
    icon: 'bi-cart',
    projects: [
      {
        name: 'Chatgenie.ph Platform',
        careerId: 'chatgenie',
        description: 'Multi-platform e-commerce with GCash Mini Program integration',
        skills: [
          { name: 'Vue.js', icon: 'bi-filetype-js' },
          { name: 'REST API', icon: 'bi-arrow-left-right' },
          { name: 'GCash Integration', icon: 'bi-wallet' },
          { name: 'Mini Program', icon: 'bi-phone' },
        ],
      },
      {
        name: 'McDelivery PH App',
        careerId: 'mcdelivery',
        description: 'Android food delivery application with real-time order tracking',
        skills: [
          { name: 'Android', icon: 'bi-android' },
          { name: 'Java', icon: 'bi-filetype-java' },
          { name: 'REST API', icon: 'bi-arrow-left-right' },
          { name: 'Payment Gateway', icon: 'bi-credit-card' },
        ],
      },
    ],
  },
  {
    name: 'Online Payment',
    icon: 'bi-credit-card',
    projects: [
      {
        name: 'GCash Mini Program',
        careerId: 'gcash-miniprogram',
        description: 'Payment integration system for GCash GLife merchant platform',
        skills: [
          { name: 'Mini Program', icon: 'bi-phone' },
          { name: 'JavaScript', icon: 'bi-code-slash' },
          { name: 'Payment Systems', icon: 'bi-cash' },
          { name: 'API Integration', icon: 'bi-plug' },
        ],
      },
      {
        name: 'Chatgenie Payment Gateway',
        careerId: 'chatgenie',
        description: 'Multi-channel payment processing for Viber, FB, and Instagram',
        skills: [
          { name: 'Node.js', icon: 'bi-hdd-network' },
          { name: 'Payment Gateway', icon: 'bi-credit-card' },
          { name: 'API Design', icon: 'bi-diagram-3' },
          { name: 'Database', icon: 'bi-database' },
        ],
      },
    ],
  },
  {
    name: 'B2B',
    icon: 'bi-building',
    projects: [
      {
        name: 'Enterprise Cloud Solutions',
        careerId: 'accenture',
        description: 'Cloud infrastructure and consulting for enterprise clients',
        skills: [
          { name: 'AWS', icon: 'bi-cloud' },
          { name: 'Cloud Architecture', icon: 'bi-hdd-network' },
          { name: 'Consulting', icon: 'bi-people' },
          { name: 'DevOps', icon: 'bi-gear' },
        ],
      },
      {
        name: 'Cove Manila CMS',
        careerId: 'covemanila',
        description: 'WordPress-based content management system for hospitality industry',
        skills: [
          { name: 'WordPress', icon: 'bi-wordpress' },
          { name: 'PHP', icon: 'bi-filetype-php' },
          { name: 'MySQL', icon: 'bi-database' },
          { name: 'Web Development', icon: 'bi-globe' },
        ],
      },
    ],
  },
  {
    name: 'Inventory Management',
    icon: 'bi-box-seam',
    projects: [
      {
        name: 'Chatgenie Merchant Dashboard',
        careerId: 'chatgenie',
        description: 'Real-time inventory tracking and order management system',
        skills: [
          { name: 'Vue.js', icon: 'bi-filetype-js' },
          { name: 'Database', icon: 'bi-database' },
          { name: 'Real-time', icon: 'bi-lightning' },
          { name: 'Analytics', icon: 'bi-graph-up' },
        ],
      },
      {
        name: 'Open Source Inventory Tools',
        careerId: 'hello-php',
        description: 'PHP-based inventory management prototype with authentication',
        skills: [
          { name: 'PHP', icon: 'bi-filetype-php' },
          { name: 'MySQL', icon: 'bi-database' },
          { name: 'Authentication', icon: 'bi-shield-lock' },
          { name: 'Open Source', icon: 'bi-github' },
        ],
      },
    ],
  },
];
