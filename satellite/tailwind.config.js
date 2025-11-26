/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				'ember-and-fire': ['Ember and Fire', 'sans-serif'],
				'dream-planner': ['DREAM PLANNER', 'sans-serif'],
				'amatic-sc': ['Amatic SC', 'sans-serif'],
				'mada': ['Mada', 'sans-serif']
			}
		}
	},
	plugins: []
};
