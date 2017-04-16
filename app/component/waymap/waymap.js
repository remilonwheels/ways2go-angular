'use strict';

require('./_waymap.scss');

module.exports = {
  template: require('./waymap.html'),
  controller: ['$log', '$http', '$interval', 'NgMap', WayMapController],
  controllerAs: 'wayMapCtrl'
};

function WayMapController($log, $http, $interval, NgMap) {
  $log.debug('WayMapController');

  NgMap.getMap().then( map => {
    this.map = map;
    console.log(this.map);
  });

  // function searchBar() {
  //   this.map.apply(
  //     var input = document.getElementById('pac-input');
  //       var searchBox = new google.maps.places.SearchBox(input);
  // }

}
