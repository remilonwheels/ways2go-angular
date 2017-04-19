'use strict';

require('./_view-way.scss');

module.exports = {
  template: require('./view-way.html'),
  controller: ['$log', '$mdDialog', '$mdToast','wayService', 'way', '$scope', ViewWayController],
  controllerAs: 'viewWayCtrl'
};

function ViewWayController($log, $mdDialog, $mdToast, wayService, way, $scope) {

  this.way = wayService.getOneWay(way._id);
  this.title = this.way.name || 'Way'; 

  this.daysOfWeek = ['M', 'T', 'W', 'R', 'F', 'Sa', 'Su'];
  this.isPM = true;
  const dayMap = { M: 0, T: 1, W: 2, R: 3, F: 4, Sa: 5, Su: 6 };

  this.isLoading = false;

  this.editWaySubmit = function() {
    this.isLoading = true;

    if (this.hour12) {
      this.way['startTime.hour'] = this.hour12;
      if (this.ampm === 'pm') {
        this.way['startTime.hour'] += 12;
      }
    }

    this.way['startTime.minutes'] = this.way.startTime.minutes;
    delete this.way.startTime;

    console.log('this.way before api call', this.way);

    wayService.editWay(this.way)
    .then( res => {
      console.log(res);
      $mdToast.showSimple('Changed Way Successfully');
      this.isLoading = false;

      $mdDialog.hide();
      // $scope.apply();


      // this.way = updatedWay;
      // this.way.startLocation = updatedWay.startLocation.fullAddress;
      // this.way.endLocation = updatedWay.endLocation.fullAddress;
      // .then( updatedWay => {
      //   // $scope.$apply();
      // });
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
