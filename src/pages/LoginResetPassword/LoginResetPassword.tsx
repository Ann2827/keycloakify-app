import React from 'react';
import Template from '../../modules/Template';
import type { KcProps, KcContextBase } from 'keycloakify';
import { getMsg } from 'keycloakify';
import { useCssAndCx } from 'tss-react';
import { ThemeTypes } from '../../constants/theme';

const LoginResetPassword = ({
  kcContext,
  theme,
  ...props
}: { kcContext: KcContextBase.LoginResetPassword } & KcProps & { theme: ThemeTypes }) => {
  const { url, realm, auth } = kcContext;

  const { msg, msgStr } = getMsg(kcContext);
  const { cx } = useCssAndCx();

  const formNode = (
    <form id='kc-reset-password-form' className={cx(props.kcFormClass)} action={url.loginAction} method='post'>
      <div className={cx(props.kcFormGroupClass)}>
        <div className={cx(props.kcLabelWrapperClass)}>
          <label htmlFor='username' className={cx(props.kcLabelClass)}>
            {!realm.loginWithEmailAllowed
              ? msg('username')
              : !realm.registrationEmailAsUsername
              ? msg('usernameOrEmail')
              : msg('email')}
          </label>
        </div>
        <div className={cx(props.kcInputWrapperClass)}>
          <input
            type='text'
            id='username'
            name='username'
            className={cx(props.kcInputClass)}
            autoFocus
            defaultValue={auth !== undefined && auth.showUsername ? auth.attemptedUsername : undefined}
          />
        </div>
      </div>
      <div className={cx(props.kcFormGroupClass, props.kcFormSettingClass)}>
        <div id='kc-form-options' className={cx(props.kcFormOptionsClass)}>
          <div className={cx(props.kcFormOptionsWrapperClass)}>
            <span>
              <a href={url.loginUrl}>{msg('backToLogin')}</a>
            </span>
          </div>
        </div>

        <div id='kc-form-buttons' className={cx(props.kcFormButtonsClass)}>
          <input
            className={cx(
              props.kcButtonClass,
              props.kcButtonPrimaryClass,
              props.kcButtonBlockClass,
              props.kcButtonLargeClass,
            )}
            type='submit'
            value={msgStr('doSubmit')}
          />
        </div>
      </div>
    </form>
  );

  return (
    <Template
      {...{ kcContext, ...props }}
      doFetchDefaultThemeResources={true}
      displayMessage={false}
      headerNode={msg('emailForgotTitle')}
      formNode={formNode}
      infoNode={msg('emailInstruction')}
      theme={theme}
    />
  );
};

export default React.memo(LoginResetPassword);
