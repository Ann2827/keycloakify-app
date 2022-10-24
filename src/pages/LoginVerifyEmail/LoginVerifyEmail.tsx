import React from 'react';
import Template from '../../modules/Template';
import type { KcProps, KcContextBase } from 'keycloakify';
import { getMsg } from 'keycloakify';
import { ThemeTypes } from '../../constants/theme';

const LoginVerifyEmail = ({
  kcContext,
  theme,
  ...props
}: { kcContext: KcContextBase.LoginVerifyEmail } & KcProps & { theme: ThemeTypes }) => {
  const { url } = kcContext;

  const { msg } = getMsg(kcContext);

  const formNode = (
    <>
      <p className='instruction'>{msg('emailVerifyInstruction1')}</p>
      <p className='instruction'>
        {msg('emailVerifyInstruction2')}
        <a href={url.loginAction}>{msg('doClickHere')}</a>
        {msg('emailVerifyInstruction3')}
      </p>
    </>
  );

  return (
    <Template
      {...{ kcContext, ...props }}
      doFetchDefaultThemeResources={true}
      displayMessage={false}
      headerNode={msg('emailVerifyTitle')}
      formNode={formNode}
      theme={theme}
    />
  );
};

export default React.memo(LoginVerifyEmail);
