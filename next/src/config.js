export default {
    publicApiUrl: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
    dockerApiUrl: process.env.NEXT_DOCKER_STRAPI_URL || 'http://localhost:1337',
    types: [
        {
            id: 'pattern',
            label: 'Interaction pattern'
        },
        {
            id: 'case',
            label: 'Case/application'
        },
        {
            id: 'device',
            label: 'Head mounted device'
        },
        {
            id: 'peripheral',
            label: 'Peripheral'
        },
        {
            id: 'glossary',
            label: 'Glossary',
        },
        {
            id: 'tool',
            label: 'Software'
        }
    ],
    categories: [
        {
            id: 'all',
            label: 'All',
            value: null,
            placeholder: 'Search everything'
        },
        {
            id: 'patterns',
            label: 'Patterns',
            value: 'patterns',
            placeholder: 'Search patterns'
        },
        {
            id: 'glossary',
            label: 'Glossary',
            value: 'glossary',
            placeholder: 'Search glossary'
        },
        {
            id: 'hardware',
            label: 'Hardware',
            value: 'hardware',
            placeholder: 'Search hardware'
        },
        {
            id: 'software',
            label: 'Software',
            value: 'software',
            placeholder: 'Search software'
        },
        {
            id: 'cases',
            label: 'Cases',
            value: 'cases',
            placeholder: 'Search cases/applications'
        }
    ]
}
