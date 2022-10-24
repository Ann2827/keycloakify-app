import { MODE_BUILD_THEME1, MODE_BUILD_THEME2, MODE_DEMO, ModeTypes } from '../constants/mode';
import { VIEW_DEMO_THEME1, VIEW_DEMO_THEME2, ViewTypes } from '../constants/view';
import { THEME_DEFAULT, THEME_THEME1, THEME_THEME2, ThemeTypes } from '../constants/theme';
import { useMemo } from 'react';

const getTheme = (mode: ModeTypes, view?: ViewTypes): ThemeTypes => {
  let theme = THEME_DEFAULT;

  if (mode === MODE_BUILD_THEME1 || (mode === MODE_DEMO && view === VIEW_DEMO_THEME1)) {
    theme = THEME_THEME1;
  }

  if (mode === MODE_BUILD_THEME2 || (mode === MODE_DEMO && view === VIEW_DEMO_THEME2)) {
    theme = THEME_THEME2;
  }

  return theme;
};

const useTheme = (mode: ModeTypes, view?: ViewTypes): { current: ThemeTypes; list: ThemeTypes[] } => {
  return {
    current: useMemo(() => getTheme(mode, view), [mode, view]),
    list: [THEME_THEME1, THEME_THEME2],
  };
};

export default useTheme;
