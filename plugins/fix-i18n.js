export default ({ app }, inject) => {
    if (!app.i18n) {
      app.i18n = { cookieValues: {} };
    }
  };
  