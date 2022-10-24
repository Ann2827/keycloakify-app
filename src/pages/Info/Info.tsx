import React from 'react';
import Template from '../../modules/Template';
import type { KcProps, KcContextBase } from 'keycloakify';
import { assert, getMsg } from 'keycloakify';
import { ThemeTypes } from '../../constants/theme';

const Info = ({ kcContext, theme, ...props }: { kcContext: KcContextBase.Info } & KcProps & { theme: ThemeTypes }) => {
  const { messageHeader, message, requiredActions, skipLink, pageRedirectUri, actionUri, client } = kcContext;

  const { msg } = getMsg(kcContext);

  assert(kcContext.message !== undefined);

  const formNode = (
    <div id='kc-info-message'>
      <p className='instruction'>
        {message?.summary}

        {requiredActions !== undefined && (
          <b>{requiredActions.map((requiredAction) => msg(`requiredAction.${requiredAction}` as const)).join(',')}</b>
        )}
      </p>
      {!skipLink && pageRedirectUri !== undefined ? (
        <p>
          <a href={pageRedirectUri}>{msg('backToApplication')}</a>
        </p>
      ) : actionUri !== undefined ? (
        <p>
          <a href={actionUri}>{msg('proceedWithAction')}</a>
        </p>
      ) : (
        client.baseUrl !== undefined && (
          <p>
            <a href={client.baseUrl}>{msg('backToApplication')}</a>
          </p>
        )
      )}
    </div>
  );

  return (
    <Template
      {...{ kcContext, ...props }}
      doFetchDefaultThemeResources={true}
      displayMessage={false}
      headerNode={messageHeader !== undefined ? <>{messageHeader}</> : <>{message?.summary}</>}
      formNode={formNode}
      theme={theme}
    />
  );
};

export default React.memo(Info);
