# Rest Coutries

This challange is based on [these descriptions](https://alibaba-rest-countries.vercel.app/).

## Demo

Here is the static version of the app deployed on netlify: [https://rest-countries-nuxt.netlify.app/](https://rest-countries-nuxt.netlify.app/)

If you want to see universal version you can use docker. It is served on `:3000`.

```bash
docker-compose up
```

## Run Local

Make sure to install the dependencies. I suggest you use pnpm for better performance:

```bash
# pnpm
pnpm install

# Run dev server
pnpm run dev
```

The development server is on `http://localhost:3000`

## More on development

Since we wanted the app to be severe side rendered, I chose NuxtJS. For styles it uses TailwindCSS.

It's basically two pages:

- index: list of all coutries which is searchable and could be filtered by region
- details: contains details of a country on this path `/country/:common-name`

### Main features

- [x] See all countries from the API on the homepage
- [x] Search for a country using an input field
- [x] Filter countries by region
- [x] Click on a country to see more detailed information on a separate page (client-side routing)
- [x] Clicking on border countries on the detail page should link the user to the detail of those countries

### Project bonuses

- [x] Bonus: Toggle the color scheme between light and dark mode without using any 3rd party libraries (for dark mode it uses [@nuxtjs/color-mode](https://color-mode.nuxtjs.org/))
- [x] Bonus: Searching using the keywords Grmany or Grmny should also work (implemented by using awsome [match-sorter](https://github.com/kentcdodds/match-sorter) lib)
- [ ] Bonus: Add sort functionality for both Population and Country Name (todo)
- [x] Bonus: Make all content server-side rendered and also have a fallback if the server-side render faces an error (Well, it's nuxt so it's all ssr, but we're missing custom 404 page. I would call it a semi-todo!)
- [ ] Bonus: Collect analytical data (in whichever way you prefer) using Google Analytics (todo)
- [x] Bonus: Make sure styles are loaded whenever they're really needed. e.g., The styles for the details page don't load on the homepage (styles are done using tailwind, so it's within component templates)
- [x] Bonus: Make sure the ratio for the country flags is 4:3 or any other ratio you find suitable (I went for 16:10)
- [x] Bonus: Dockerize your application by creating an efficient Dockerfile
- [ ] Bonus: Add unit tests for components (todo)
- [x] Bonus: Store the filters in the URL query strings and sync it with the component filter object
- [ ] Bonus: Add lazy loading for country images and list (todo)
