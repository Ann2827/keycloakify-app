import React from 'react';
import Template from '../../modules/Template';
import type { KcProps, KcContextBase } from 'keycloakify';
import { getMsg } from 'keycloakify';
import { ThemeTypes } from '../../constants/theme';

const Error = ({
  kcContext,
  theme,
  ...props
}: { kcContext: KcContextBase.Error } & KcProps & { theme: ThemeTypes }) => {
  const { message, client } = kcContext;

  const { msg } = getMsg(kcContext);

  const formNode = (
    <div id='kc-error-message'>
      <p className='instruction'>{message.summary}</p>
      {client !== undefined && client.baseUrl !== undefined && (
        <p>
          <a id='backToApplication' href={client.baseUrl}>
            {msg('backToApplication')}
          </a>
        </p>
      )}
    </div>
  );

  return (
    <Template
      {...{ kcContext, ...props }}
      doFetchDefaultThemeResources={true}
      displayMessage={false}
      headerNode={msg('errorTitle')}
      formNode={formNode}
      theme={theme}
    />
  );
};

export default React.memo(Error);
