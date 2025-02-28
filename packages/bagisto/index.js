export default function (moduleOptions) {
    const options = {
      ...this.options.bagisto,
      ...moduleOptions
    };
  
    // Inject API client into the Nuxt context
    this.addPlugin({
      src: require.resolve('./plugin.js'),
      fileName: 'bagisto.js',
      options
    });
}
