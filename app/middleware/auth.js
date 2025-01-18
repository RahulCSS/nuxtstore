export default defineNuxtRouteMiddleware(() => {
    const authToken = 'authToken'; 
    if (!localStorage.getItem(authToken)) {
        return navigateTo('/login');
      }
  })