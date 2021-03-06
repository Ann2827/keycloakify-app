import React, { useMemo, useState } from 'react';
import Template from '../../modules/Template';
import type { KcProps, KcContextBase, Attribute } from 'keycloakify';
import { useKcMessage } from 'keycloakify';
import { useCssAndCx } from 'tss-react';
import UserProfileFormFields from './UserProfileFormFields';

const RegisterUserProfile = ({ kcContext, ...props_ }: { kcContext: KcContextBase.RegisterUserProfile } & KcProps) => {
  const { url, messagesPerField, recaptchaRequired, recaptchaSiteKey } = kcContext;

  const { msg, msgStr } = useKcMessage();

  const { cx, css } = useCssAndCx();

  const props = useMemo(
    () => ({
      ...props_,
      kcFormGroupClass: cx(props_.kcFormGroupClass, css({ marginBottom: 20 })),
    }),
    [cx, css, props_],
  );

  const [isFomSubmittable, setIsFomSubmittable] = useState(false);

  return (
    <Template
      {...{ kcContext, ...props }}
      displayMessage={messagesPerField.exists('global')}
      displayRequiredFields={true}
      doFetchDefaultThemeResources={true}
      headerNode={msg('registerTitle')}
      formNode={
        <form id='kc-register-form' className={cx(props.kcFormClass)} action={url.registrationAction} method='post'>
          <UserProfileFormFields
            kcContext={kcContext}
            onIsFormSubmittableValueChange={setIsFomSubmittable}
            {...props}
          />
          {recaptchaRequired && (
            <div className='form-group'>
              <div className={cx(props.kcInputWrapperClass)}>
                <div className='g-recaptcha' data-size='compact' data-sitekey={recaptchaSiteKey} />
              </div>
            </div>
          )}
          <div className={cx(props.kcFormGroupClass)}>
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
                value={msgStr('doRegister')}
                disabled={!isFomSubmittable}
              />
            </div>
          </div>
        </form>
      }
    />
  );
};

export default React.memo(RegisterUserProfile);
