import variable from '../variables/platform';

import { COLORS } from '../variables/styles';

export default (variables = variable) => {
  const contentTheme = {
    '.padder': {
      padding: variables.contentPadding,
    },
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    'NativeBase.Segment': {
      borderWidth: 0,
      backgroundColor: COLORS.backgroundColor,
    },
  };

  return contentTheme;
};
