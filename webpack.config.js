const encore = require('@symfony/webpack-encore');

encore
  .setPublicPath('/assets')
  .setOutputPath('./dist/assets/')

  .enableVueLoader()
  .enableSassLoader(options => {
    options.implementation = require('sass');
  })

  .addEntry('meditor', './src/js/meditor.js')
  .addStyleEntry('meditor-theme', './src/css/meditor.scss')

  .addEntry('site', './src/js/site.js')
  .addStyleEntry('site-theme', './src/css/site.scss')

  .configureBabelPresetEnv((config) => {
    config.useBuiltIns = 'entry';
    config.corejs = 3;
  })

  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()

  .disableSingleRuntimeChunk()
  .enableVersioning(false)
  .enableSourceMaps(!encore.isProduction())
;

module.exports = encore.getWebpackConfig();
