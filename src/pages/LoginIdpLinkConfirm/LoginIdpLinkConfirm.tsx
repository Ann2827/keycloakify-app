import React from 'react';
import Template from '../../modules/Template';
import type { KcProps, KcContextBase } from 'keycloakify';
import { getMsg } from 'keycloakify';
import { useCssAndCx } from 'tss-react';
import { ThemeTypes } from '../../constants/theme';

const LoginIdpLinkConfirm = ({
  kcContext,
  theme,
  ...props
}: { kcContext: KcContextBase.LoginIdpLinkConfirm } & KcProps & { theme: ThemeTypes }) => {
  const { url, idpAlias } = kcContext;

  const { msg } = getMsg(kcContext);
  const { cx } = useCssAndCx();

  const formNode = (
    <form id='kc-register-form' action={url.loginAction} method='post'>
      <div className={cx(props.kcFormGroupClass)}>
        <button
          type='submit'
          className={cx(
            props.kcButtonClass,
            props.kcButtonDefaultClass,
            props.kcButtonBlockClass,
            props.kcButtonLargeClass,
          )}
          name='submitAction'
          id='updateProfile'
          value='updateProfile'
        >
          {msg('confirmLinkIdpReviewProfile')}
        </button>
        <button
          type='submit'
          className={cx(
            props.kcButtonClass,
            props.kcButtonDefaultClass,
            props.kcButtonBlockClass,
            props.kcButtonLargeClass,
          )}
          name='submitAction'
          id='linkAccount'
          value='linkAccount'
        >
          {msg('confirmLinkIdpContinue', idpAlias)}
        </button>
      </div>
    </form>
  );

  return (
    <Template
      {...{ kcContext, ...props }}
      doFetchDefaultThemeResources={true}
      headerNode={msg('confirmLinkIdpTitle')}
      formNode={formNode}
      theme={theme}
    />
  );
};

export default React.memo(LoginIdpLinkConfirm);
