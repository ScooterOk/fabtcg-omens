module.exports = {
  input: [
    'src/**/*.{js,ts,jsx,tsx}',
    'src/**/*.{html,hbs,handlebars}',
  ],
  output: './',
  options: {
    debug: false,
    removeUnusedKeys: false,
    sort: true,
    func: {
      list: ['t', 'i18next.t'],
      extensions: ['.js', '.ts', '.jsx', '.tsx'],
    },
    lngs: ['en', 'ja'],
    defaultLng: 'en',
    resource: {
      loadPath: 'locales/{{lng}}.json',
      savePath: 'locales/{{lng}}.json',
      jsonIndent: 2,
    },
    ns: ['translation'],
    defaultNs: 'translation',
    keySeparator: false,
    nsSeparator: false,
  },
}
