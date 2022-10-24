import React from 'react';
import Template from '../../modules/Template';
import type { KcProps, KcContextBase } from 'keycloakify';
import { getMsg, kcMessages, useDownloadTerms } from 'keycloakify';
import { useCssAndCx } from 'tss-react';
import tos_fr_url from './tos_fr.md';
import tos_en_url from './tos_en.md';
import { ThemeTypes } from '../../constants/theme';

const Terms = ({
  kcContext,
  theme,
  ...props
}: { kcContext: KcContextBase.Terms } & KcProps & { theme: ThemeTypes }) => {
  const { url } = kcContext;

  const { msg, msgStr } = getMsg(kcContext);
  const { cx } = useCssAndCx();

  useDownloadTerms({
    kcContext,
    downloadTermMarkdown: async ({ currentKcLanguageTag }) => {
      kcMessages[currentKcLanguageTag].termsTitle = '';

      const markdownString = await fetch(
        (() => {
          switch (currentKcLanguageTag) {
            case 'fr':
              return tos_fr_url;
            default:
              return tos_en_url;
          }
        })(),
      ).then((response) => response.text());

      return markdownString;
    },
  });

  const formNode = (
    <>
      <div id='kc-terms-text'>{msg('termsText')}</div>
      <form className='form-actions' action={url.loginAction} method='POST'>
        <input
          className={cx(
            props.kcButtonClass,
            props.kcButtonClass,
            props.kcButtonClass,
            props.kcButtonPrimaryClass,
            props.kcButtonLargeClass,
          )}
          name='accept'
          id='kc-accept'
          type='submit'
          value={msgStr('doAccept')}
        />
        <input
          className={cx(props.kcButtonClass, props.kcButtonDefaultClass, props.kcButtonLargeClass)}
          name='cancel'
          id='kc-decline'
          type='submit'
          value={msgStr('doDecline')}
        />
      </form>
      <div className='clearfix' />
    </>
  );

  return (
    <Template
      {...{ kcContext, ...props }}
      doFetchDefaultThemeResources={true}
      displayMessage={false}
      headerNode={msg('termsTitle')}
      formNode={formNode}
      theme={theme}
    />
  );
};

export default React.memo(Terms);
