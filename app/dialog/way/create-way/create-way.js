'use strict';

require('./_create-way.scss');

module.exports = {
  template: require('./create-way.html'),
  controller: ['$log', '$mdDialog', '$mdToast','wayService', CreateWayController],
  controllerAs: 'createWayCtrl'
};

function CreateWayController($log, $mdDialog, $mdToast, wayService) {
  $log.debug('CreateWayController');

  this.way = {};
  this.way.recurringDayOfWeek = [];

  this.daysOfWeek = ['M', 'T', 'W', 'R', 'F', 'Sa', 'Su'];
  this.isPM = true;
  const dayMap = { M: 0, T: 1, W: 2, R: 3, F: 4, Sa: 5, Su: 6 };

  this.isLoading = false;

  this.createWaySubmit = function() {
    this.isLoading = true;
    wayService.createWay(this.way)
    .then( () => {
      $mdToast.showSimple('Made a Way was successful');
      this.isLoading = false;
      this.way = {};
      this.way.recurringDayOfWeek = [];
      $mdDialog.hide();
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
