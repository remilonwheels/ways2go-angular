'use strict';

require('./_create-way.scss');

module.exports = {
  template: require('./create-way.html'),
  controller: ['$log', '$mdDialog', 'wayService', 'items',  CreateWayController],
  controllerAs: 'createWayCtrl'
};

function CreateWayController($log, $mdDialog, wayService, items) {
  $log.debug('CreateWayController');

  this.way = {};
  this.way.recurringDayOfWeek = [];

  this.daysOfWeek = ['M', 'T', 'W', 'R', 'F', 'Sa', 'Su'];
  this.isPM = true;
  const dayMap = {
    M: 0,
    T: 1,
    W: 2,
    R: 3,
    F: 4,
    Sa: 5,
    Su: 6
  };

  this.isLoading = false;

  this.createWaySubmit = function() {
    this.isLoading = true;
    console.log(this.way);
    wayService.createWay(this.way)
    .then( way => {
      $log.log(way);
      this.isLoading = false;
    })
    .catch( err => {
      console.log('err caught:', err);
    });

    $log.log(this.way);
  };

  this.items = items;

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
