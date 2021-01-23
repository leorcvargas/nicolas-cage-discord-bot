import R from 'ramda';

import handleGIF from './gif';

export const getCommandHandler = R.cond([
  [R.equals('gif'), R.always(handleGIF)],
  [R.T, () => null],
]);
