/**
 * @typedef {Object} Industry
 * @property {string} name - Industry display name
 * @property {string} icon - Bootstrap Icons class name
 * @property {string[]} companyIds - Array of career.id values
 */

/** @type {Industry[]} */
export const industries = [
    {
        name: 'Fintech',
        icon: 'bi-currency-exchange',
        companyIds: ['gcash-miniprogram', 'chatgenie'],
    },
    {
        name: 'IT Consulting',
        icon: 'bi-building',
        companyIds: ['accenture'],
    },
    {
        name: 'E-Commerce',
        icon: 'bi-cart',
        companyIds: ['chatgenie'],
    },
    {
        name: 'Food Delivery',
        icon: 'bi-truck',
        companyIds: ['mcdelivery'],
    },
    {
        name: 'Hospitality',
        icon: 'bi-house-door',
        companyIds: ['covemanila'],
    },
    {
        name: 'Open Source',
        icon: 'bi-code-slash',
        companyIds: ['hello-php'],
    },
]
