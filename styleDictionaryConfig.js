const StyleDictionary = require('style-dictionary').extend({
  source: ['./global.json'],
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: '',
      files: [{
        destination: 'variables.scss',
        format: 'scss/variables'
      }]
    }
  }
});

StyleDictionary.buildAllPlatforms();