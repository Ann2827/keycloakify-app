import React from 'react';
import Template from '../../modules/Template';
import { KcProps, KcContextBase, getMsg } from 'keycloakify';
import { ThemeTypes } from '../../constants/theme';

const LoginIdpLinkEmail = ({
  kcContext,
  theme,
  ...props
}: { kcContext: KcContextBase.LoginIdpLinkEmail } & KcProps & { theme: ThemeTypes }) => {
  const { url, realm, brokerContext, idpAlias } = kcContext;

  const { msg } = getMsg(kcContext);

  const formNode = (
    <>
      <p id='instruction1' className='instruction'>
        {msg('emailLinkIdp1', idpAlias, brokerContext.username, realm.displayName)}
      </p>
      <p id='instruction2' className='instruction'>
        {msg('emailLinkIdp2')} <a href={url.loginAction}>{msg('doClickHere')}</a> {msg('emailLinkIdp3')}
      </p>
      <p id='instruction3' className='instruction'>
        {msg('emailLinkIdp4')} <a href={url.loginAction}>{msg('doClickHere')}</a> {msg('emailLinkIdp5')}
      </p>
    </>
  );

  return (
    <Template
      {...{ kcContext, ...props }}
      doFetchDefaultThemeResources={true}
      headerNode={msg('emailLinkIdpTitle', idpAlias)}
      formNode={formNode}
      theme={theme}
    />
  );
};

export default React.memo(LoginIdpLinkEmail);
