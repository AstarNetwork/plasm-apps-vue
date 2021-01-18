const defaultTheme = require('tailwindcss/defaultTheme');

const whitelist = [
    'gray',
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'blue',
    'purple',
    'pink',
].reduce(
    (result, color) =>
        result.push(`text-${color}-600`, `bg-${color}-600`, `bg-${color}-500`) && result,
    [],
);

module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
        defaultLineHeights: true,
        standardFontWeights: true,
    },
    purge: {
        layers: ['utilities'],
        enabled: process.env.NODE_ENV === 'production',
        content: ['./public/index.html', './src/**/*.{vue, js}'],
        options: {
            whitelist,
        },
    },
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
        },
        fontSize: {
            xs: ['0.75rem', { lineHeight: '1rem' }],
            sm: ['0.875rem', { lineHeight: '1.25rem' }],
            base: ['1rem', { lineHeight: '1.5rem' }],
            lg: ['1.125rem', { lineHeight: '1.75rem' }],
            xl: ['1.25rem', { lineHeight: '1.75rem' }],
            '2xl': ['1.5rem', { lineHeight: '2rem' }],
            '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
            '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
            '5xl': ['3rem', { lineHeight: '1' }],
            '6xl': ['4rem', { lineHeight: '1' }],
        },
    },
    plugins: [require('@tailwindcss/custom-forms')],
};
