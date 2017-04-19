'use strict';

require('./_message-thumbnail.scss');

module.exports = {
  template: require('./message-thumbnail.html'),
  controller: ['$q', '$log', 'profileService', 'messageService', MessageThumbnailController],
  controllerAs: 'messagethumbnailCtrl',
  bindings: {
    incoming: '='
  }
};

function MessageThumbnailController($q, $log, profileService, messageService) { // eslint-line-disable
  $log.debug('MessageThumbnailController');

  this.messages = [];
  profileService.fetchProfile()
  .then((profile) => {
    this.profile = profile;
    return messageService.fetchMessages();
  })
  .catch(() => {
    this.profile = {_id: '123'};
    return messageService.fetchMessages();
  })
  .then((messages) => {
    this.messages = messages;
    this.messages.push({title:'Hi!', text: 'TEST Incoming: Are you there?', timestamp: '3:22am',
             toProfileId: this.profile._id, fromProfileId: 'foo'});
    this.messages.push({title:'Hi!', text: 'TEST Outgoing: Are you there?', timestamp: '3:22am',
             fromProfileId: this.profile._id, toProfileId: 'foo'});

    if (this.incoming) {
      this.messages = this.messages.filter((msg) => (msg.toProfileId == this.profile._id));
    } else {
      this.messages = this.messages.filter((msg) => (msg.fromProfileId == this.profile._id));
    }
  })
  .catch((err) => {
    $log.error(err.message);
    return $q.reject(err);
  });
}
