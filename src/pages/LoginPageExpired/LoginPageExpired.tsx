import React from 'react';
import Template from '../../modules/Template';
import { KcProps, KcContextBase, getMsg } from 'keycloakify';
import { ThemeTypes } from '../../constants/theme';

const LoginPageExpired = ({
  kcContext,
  theme,
  ...props
}: { kcContext: KcContextBase.LoginPageExpired } & KcProps & { theme: ThemeTypes }) => {
  const { url } = kcContext;

  const { msg } = getMsg(kcContext);

  const formNode = (
    <>
      <p id='instruction1' className='instruction'>
        {msg('pageExpiredMsg1')}
        <a id='loginRestartLink' href={url.loginRestartFlowUrl}>
          {msg('doClickHere')}
        </a>{' '}
        .<br />
        {msg('pageExpiredMsg2')}{' '}
        <a id='loginContinueLink' href={url.loginAction}>
          {msg('doClickHere')}
        </a>{' '}
        .
      </p>
    </>
  );

  return (
    <Template
      {...{ kcContext, ...props }}
      doFetchDefaultThemeResources={true}
      displayMessage={false}
      headerNode={msg('pageExpiredTitle')}
      formNode={formNode}
      theme={theme}
    />
  );
};

export default React.memo(LoginPageExpired);
