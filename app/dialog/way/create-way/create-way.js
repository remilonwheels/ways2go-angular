'use strict';

require('./_create-way.scss');

module.exports = {
  template: require('./create-way.html'),
  controller: ['$log', '$mdDialog', '$mdToast','wayService', '$scope', 'NgMap', CreateWayController],
  controllerAs: 'createWayCtrl'
};

function CreateWayController($log, $mdDialog, $mdToast, wayService, $scope, NgMap) {
  $log.debug('CreateWayController');

  this.way = {};
  this.way.recurringDayOfWeek = [];

  this.daysOfWeek = ['M', 'T', 'W', 'R', 'F', 'Sa', 'Su'];
  this.ampm = '';
  const dayMap = { M: 0, T: 1, W: 2, R: 3, F: 4, Sa: 5, Su: 6 };

  this.isLoading = false;

  this.createWaySubmit = function() {
    this.isLoading = true;

    if (this.hour12) {
      if (this.ampm === 'pm') this.way.hour = 12 + this.hour12;
      else this.way.hour = this.hour12;
    }


    wayService.createWay(this.way)
    .then( way => {
      $mdToast.showSimple('Made a Way successfully');
      $scope.$emit('wayModify');
      this.isLoading = false;
      this.way = {};
      this.way.recurringDayOfWeek = [];

      NgMap.getMap()
      .then( map => {

        let start = new
        google.maps.LatLng(Number(way.startLocation.lat), Number(way.startLocation.lng));
        let end = new google.maps.LatLng(Number(way.endLocation.lat), Number(way.endLocation.lng));

        console.log(start);
        console.log(end);

        let bounds = new google.maps.LatLngBounds();
        bounds.extend(start);
        bounds.extend(end);
        map.fitBounds(bounds);

        $mdDialog.hide();
      });
    })
    .catch( err => {
      $mdToast.showSimple(err.data);
      this.isLoading = false;
    });

    $log.log(this.way);
  };

  this.closeDialog = function() {
    $mdDialog.hide();
  };

  this.exists = function (item, list) {
    return list.indexOf(dayMap[item]) > -1;
  };

  this.toggle = function (item, list) {
    var idx = list.indexOf(dayMap[item]);
    if (idx > -1) {
      list.splice(idx, 1);
    }
    else {
      list.push(dayMap[item]);
    }
  };
}
