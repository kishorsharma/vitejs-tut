export default function auth({ next, router }) {
    console.log('Middleware is called');
    if (!localStorage.getItem('jwt')) {
      return router.push({ name: 'login' });
    }
  
    return next();
  }