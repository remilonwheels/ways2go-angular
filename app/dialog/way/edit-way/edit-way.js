'use strict';

require('./_edit-way.scss');

module.exports = {
  template: require('./edit-way.html'),
  controller: ['$log', '$mdDialog', '$mdToast','wayService', 'way', 'profileService', '$scope', EditWayController],
  controllerAs: 'editWayCtrl'
};

function EditWayController($log, $mdDialog, $mdToast, wayService, way, profileService, $scope) {
  this.way = wayService.getOneWay(way._id);

  this.startLocation = displayLocation(way.startLocation);
  this.endLocation = displayLocation(way.endLocation);

  if (this.way.oneTimeDate) this.way.oneTimeDate = new Date(this.way.oneTimeDate);

  if (this.way.hour) {
    if (this.way.hour > 12) {
      this.hour12 = this.way.hour - 12;
      this.ampm = 'pm';
    } else {
      this.ampm = 'am';
      this.hour12 = this.way.hour;
    }
  }

  this.daysOfWeek = ['M', 'T', 'W', 'R', 'F', 'Sa', 'Su'];
  this.isPM = true;
  const dayMap = { M: 0, T: 1, W: 2, R: 3, F: 4, Sa: 5, Su: 6 };

  console.log('this in edit load', this);

  this.isLoading = false;
  this.isLoadingDelete = false;

  this.wayerToAdd = null;
  this.allProfiles = null;
  this.loadAllProfiles = function() {
    profileService.fetchAllProfiles()
    .then( profiles => {
      this.allProfiles = profiles;
    })
    .catch( err => $log.debug(err));
  };

  this.addWayerSubmit = function() {
    this.isLoadingWayer = true;

    wayService.addWayer(this.way._id, this.wayerToAdd._id)
    .then( wayer => {
      $mdToast.showSimple(`Added Wayer Successfully`);
      this.isLoadingWayer = false;

      $mdDialog.hide();
    });
  };

  this.deleteWaySubmit = function() {
    this.isLoadingDelete = true;

    wayService.deleteWay(this.way._id)
    .then( res => {
      console.log(res);
      $mdToast.showSimple('Deleted Way Successfully');
      this.isLoading = false;

      $mdDialog.hide();
    })
    .catch( err => {
      $mdToast.showSimple(err.data);
      this.isLoading = false;
    });
  };

  this.editWaySubmit = function() {
    this.isLoading = true;

    if (this.hour12) {
      this.way.hour = this.hour12;
      if (this.ampm === 'pm') {
        this.way.hour += 12;
      }
    }

    console.log('this.way before api call', this.way);

    wayService.editWay(this.way)
    .then( res => {
      console.log(res);
      $mdToast.showSimple('Changed Way Successfully');
      this.isLoading = false;

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

function displayLocation({street, city, state}) {
  return `${street ? street : ''} ${city}, ${state}`;
}
