import React, { useEffect } from 'react';
import { defaultKcProps, getKcContext } from 'keycloakify';
import PageList from './PageList';
import './kcMessagesExtension';
import mockData from '../../mocks';
import { ModeTypes } from '../../constants/mode';
import { TAllPages } from '../../pagesConfig';
import useTheme from '../../hooks/theme.hook';
import { useCssAndCx } from 'tss-react';
import { THEME_THEME2 } from '../../constants/theme';

const Page = ({ mode, config }: { mode: ModeTypes; config?: TAllPages }) => {
  const { kcContext } = getKcContext(mockData(config));

  const { current } = useTheme(mode, config?.view);
  const { css, cx } = useCssAndCx();

  useEffect(() => {
    if (kcContext !== undefined) console.log(kcContext);
  }, [kcContext]);

  if (kcContext === undefined) {
    throw new Error('Keycloak context not found.');
  }

  const theme2 = {
    kcHtmlClass: css({ background: 'darkgrey' }),
    kcLoginClass: cx('login-pf-page', css({ height: '100%', background: 'darkgrey' })),
  };
  const KcProps = current === THEME_THEME2 ? { ...defaultKcProps, ...theme2 } : defaultKcProps;

  return <PageList kcContext={kcContext} theme={current} {...KcProps} />;
};

export default Page;
