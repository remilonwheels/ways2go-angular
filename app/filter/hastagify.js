'use strict';

module.exports = function() {
  return function(input) {
    if (!input) return 'coolhashtagbruh';

    let stringInput = input;
    if (stringInput !== typeof 'string') stringInput = input.toString();

    let hashtag = stringInput.match(/[\w]/g);
    if (hashtag) return `#${hashtag.join('')}`;

    return 'invalid hashtag';
  };
};
