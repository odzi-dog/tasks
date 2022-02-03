const typography = require('@tailwindcss/typography');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontSize: {
				'extra-xs': [
					'0.6rem',
					{
						lineHeight: '0.6rem'
					}
				]
			}
		}
	},

	plugins: [typography]
};

module.exports = config;
