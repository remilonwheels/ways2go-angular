'use strict';

module.exports = ['$mdThemingProvider', appStyleConfig];

function appStyleConfig($mdThemingProvider) {
  let themes = {
    blueGreyPrmCyanAcc: {
      themeName: 'greyBluePrmCyanAcc',
      primaryPalette: 'blue-grey',
      accentPalette: 'cyan',
      warnPalette: 'red',
      backgroundPalette: 'grey'
    },
  };

  for (let theme in themes) {
    $mdThemingProvider
    .theme(theme)
    .primaryPalette(themes[theme].primaryPalette)
    .accentPalette(themes[theme].accentPalette)
    .warnPalette(themes[theme].warnPalette)
    .backgroundPalette(themes[theme].backgroundPalette);
  }

  $mdThemingProvider.theme('default')
    .dark();

  $mdThemingProvider.setDefaultTheme('default');
}
