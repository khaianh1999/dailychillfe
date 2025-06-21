export default ({ app }) => {
    // This function will run every time the route changes
    app.router.afterEach((to) => {
      if (typeof window.gtag === 'function') {
        window.gtag('config', 'AW-17241850637', {
          page_path: to.fullPath,
        });
        console.log('gtag sent:', to.fullPath);
      }
    });
};
