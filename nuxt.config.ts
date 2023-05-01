// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxtjs/tailwindcss'],
	app: {
		head: {
			title: 'Rest Countries Nuxt',
			meta: [{ name: 'description', content: 'List of all countries' }],
			link: [
				{
					rel: 'preconnect',
					href: 'https://fonts.googleapis.com'
				},
				{
					rel: 'preconnect',
					href: 'https://fonts.gstatic.com',
					crossorigin: ''
				},
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap'
				}
			]
		}
	}
})
