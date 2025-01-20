# Nuxt Store

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.
Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Setup

Use the following command to create a new starter project\
_npm_
```bash
npx nuxi@latest init <project-name>
```

Automate to Nuxt version 4 migration by running\
_npm_
```bash
npx codemod@latest nuxt/4/file-structure
```

Adding Tailwind CSS\
_npm_
```bash
npx nuxi@latest module add tailwindcss
```

Adding Google Fonts\
_npm_
```bash
npx nuxi@latest module add google-fonts
```

Adding nuxt icons\
_npm_
```bash
npx nuxi module add icon
```

Adding nuxt image optimizer\
_npm_
```bash
npx nuxi@latest module add image
```

Adding nuxt ui\
_npm_
```bash
npx nuxi@latest module add ui
```
## Configuration

Nuxt is an open source framework that makes web development intuitive and powerful.

Upgrade to Nuxt 4 promises significant upgrade over Nuxt 3 especially via folder structure modification.\

app.vue
```bash
<div class=>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
```
- <NuxtPage/> is a built-in component that comes with Nuxt. It lets you display top-level or nested pages located in the _pages_ directory.
- <NuxtLayout /> component is used to show layouts on pages and error pages
- <NuxtLoadingIndicator /> Display a progress bar between page navigations.

```bash
definePageMeta({
        title: "Nuxt - Login",
        description: "Login to experience Nuxt",
        layout:false,
        middleware: 'auth'
    });
```
definePageMeta is a compiler macro that you can use to set metadata for your page components located in the pages directory 

- layout property defines the layour for the page with default layout and other layout located in layout directory. With false value, layout wont be set to specific page.

- middleware property works same as layout. With respect to set value, middleware set according from the middlware located in directory. 

layout/default.vue
```bash
    <div>
        <Header />
            <slot />
        <Footer />
    </div>
```
The <slot> element is a slot outlet that indicates where the parent-provided slot content should be rendered.
The page component will be rendered in <slot/>
In this case <Header> & <Footer> components are displayed on pages with layout propery set to default