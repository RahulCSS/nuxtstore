export default defineNuxtRouteMiddleware(() => {
    if (import.meta.client) {
        const authToken = 'authToken';  
    if (!localStorage.getItem(authToken)) {
        return navigateTo('/login');
      }
    }
  })