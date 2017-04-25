'use strict';

require('./_view-way.scss');

const viewOneProfileComponent = require('../../../dialog/profile/view-one-profile/view-one-profile.js');

module.exports = {
  template: require('./view-way.html'),
  controller: ['$log', '$mdDialog', '$mdToast','wayService', 'way', '$scope', 'messageService', 'profileService', '$mdMedia', ViewWayController],
  controllerAs: 'viewWayCtrl'
};

function ViewWayController($log, $mdDialog, $mdToast, wayService, way, $scope, messageService, profileService, $mdMedia) {

  this.way = wayService.getOneWay(way._id);
  console.log('this way view way', this.way);
  profileService.fetchProfile()
  .then( profile => {
    this.profile = profile;
  });

  console.log(this.way);
  this.name = this.way.name || 'Way';

  this.way.startLocation = way.startLocation.fullAddress ? way.startLocation.fullAddress : way.startLocation;
  this.way.endLocation = way.endLocation.fullAddress ? way.endLocation.fullAddress : way.endLocation;


  console.log('wayer 0', this.way.wayerz[0]);

  // this.daysOfWeek = ['M', 'T', 'W', 'R', 'F', 'Sa', 'Su'];
  this.isPM = true;
  // const dayMap = { M: 0, T: 1, W: 2, R: 3, F: 4, Sa: 5, Su: 6 };
  const dayMap = { '0': 'Monday', '1':'Tuesday', '2':'Wednesday', '3': 'Thursday', '4': 'Friday', '5': 'Saturday', '6': 'Sunday'};

  let dayArray = [];

  if (this.way.recurringDayOfWeek) {
    this.way.recurringDayOfWeek.forEach( i => {
      dayArray.push(`${dayMap[i]} `);
    });
  }

  if (this.way.oneTimeDate) {
    this.oneTimeDate = new Date(this.way.oneTimeDate);
  }

  if (this.way.hour) {
    if (this.way.hour > 12) {
      this.hour = this.way.hour - 12;
      this.ampm = 'pm';
    } else {
      this.hour = this.way.hour;
      this.ampm = 'am';
    }
    this.minutes = this.way.minutes;
  }

  this.dayArray = dayArray;

  console.log(this.dayArray);

  this.isLoading = false;

  this.viewProfile = function($event, bindFlag, profile) {
    const dialogConfig = {
      fullscreen: !$mdMedia('gt-sm'),
      targetEvent: $event,
      // scope: $scope.$new(bindFlag),
      resolve: {
        profile: function() {
          return profile;
        }
      },
    };
    $mdDialog.show(Object.assign(viewOneProfileComponent, dialogConfig));
  };

  this.joinSubmit = function() {
    this.isLoading = true;

    console.log(this.way);

    const joinMessage = {
      subject: `${this.profile.displayName} wants to join your way!`,
      text: `Please add me to way ${this.way._id}`,
      toProfileID: this.way.wayerz[0]._id
    };


    messageService.createMessage(joinMessage)
    .then( res => {
      $mdToast.showSimple('Request to Join Sent Successfully!');
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
