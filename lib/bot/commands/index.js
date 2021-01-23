import R from 'ramda';

import handleGIF from './gif';
import handleSay from './say';

export const getCommandHandler = R.cond([
  [R.equals('gif'), R.always(handleGIF)],
  [R.equals('say'), R.always(handleSay)],
  [R.T, () => null],
]);
