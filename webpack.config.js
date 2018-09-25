const encore = require('@symfony/webpack-encore');

encore
  .setPublicPath('/assets')
  .setOutputPath('./dist/assets/')

  .enableSassLoader()

  .addEntry('meditor', './src/js/meditor.js')
  .addStyleEntry('meditor-theme', './src/css/meditor.scss')

  .addEntry('site', './src/js/site.js')
  .addStyleEntry('site-theme', './src/css/site.scss')

  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()

  .enableVersioning(false)
  .enableSourceMaps(!encore.isProduction())
;

module.exports = encore.getWebpackConfig();
