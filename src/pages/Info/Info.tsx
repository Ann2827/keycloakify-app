import React from 'react';
import Template from '../../modules/Template';
import type { KcProps, KcContextBase } from 'keycloakify';
import { assert, useKcMessage } from 'keycloakify';

const Info = ({ kcContext, ...props }: { kcContext: KcContextBase.Info } & KcProps) => {
  const { msg } = useKcMessage();

  assert(kcContext.message !== undefined);

  const { messageHeader, message, requiredActions, skipLink, pageRedirectUri, actionUri, client } = kcContext;

  return (
    <Template
      {...{ kcContext, ...props }}
      doFetchDefaultThemeResources={true}
      displayMessage={false}
      headerNode={messageHeader !== undefined ? <>{messageHeader}</> : <>{message.summary}</>}
      formNode={
        <div id='kc-info-message'>
          <p className='instruction'>
            {message.summary}

            {requiredActions !== undefined && (
              <b>
                {requiredActions.map((requiredAction) => msg(`requiredAction.${requiredAction}` as const)).join(',')}
              </b>
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
      }
    />
  );
};

export default React.memo(Info);
