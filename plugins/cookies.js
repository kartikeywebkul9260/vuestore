export default ({ app }) => {
    // Ensure the i18n object exists
    if (!app.i18n) {
      app.i18n = {};
    }
    
    // Ensure cookieValues exists
    if (!app.i18n.cookieValues) {
      app.i18n.cookieValues = {};
    }
}