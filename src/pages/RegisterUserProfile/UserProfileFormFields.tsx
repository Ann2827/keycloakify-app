import React, { useEffect, Fragment, FC, ComponentClass } from 'react';
import type { KcProps, KcContextBase, Attribute } from 'keycloakify';
import { useFormValidationSlice, getMsg } from 'keycloakify';
import { useCssAndCx } from 'tss-react';
import { useCallbackFactory } from 'powerhooks/useCallbackFactory';

type ReactComponent<Props extends Record<string, unknown>> = ((props: Props) => ReturnType<FC>) | ComponentClass<Props>;
type UserProfileFormFieldsProps = { kcContext: KcContextBase.RegisterUserProfile } & KcProps &
  Partial<Record<'BeforeField' | 'AfterField', ReactComponent<{ attribute: Attribute }>>> & {
    onIsFormSubmittableValueChange: (isFormSubmittable: boolean) => void;
  };
const UserProfileFormFields = ({ kcContext, onIsFormSubmittableValueChange, ...props }: UserProfileFormFieldsProps) => {
  const { cx, css } = useCssAndCx();

  const { advancedMsg } = getMsg(kcContext);

  const {
    formValidationState: { fieldStateByAttributeName, isFormSubmittable },
    formValidationReducer,
    attributesWithPassword,
  } = useFormValidationSlice({
    kcContext,
  });

  useEffect(() => {
    onIsFormSubmittableValueChange(isFormSubmittable);
  }, [isFormSubmittable, onIsFormSubmittableValueChange]);

  const onChangeFactory = useCallbackFactory(
    (
      [name]: [string],
      [
        {
          target: { value },
        },
      ]: [React.ChangeEvent<HTMLInputElement>],
    ) =>
      formValidationReducer({
        action: 'update value',
        name,
        newValue: value,
      }),
  );

  const onBlurFactory = useCallbackFactory(([name]: [string]) =>
    formValidationReducer({
      action: 'focus lost',
      name,
    }),
  );

  let currentGroup = '';

  return (
    <>
      {attributesWithPassword.map((attribute, i) => {
        const { group = '', groupDisplayHeader = '', groupDisplayDescription = '' } = attribute;

        const { value, displayableErrors } = fieldStateByAttributeName[attribute.name];

        const formGroupClassName = cx(
          props.kcFormGroupClass,
          displayableErrors.length > 0 && props.kcFormGroupErrorClass,
        );

        return (
          <Fragment key={i}>
            {group !== currentGroup && (currentGroup = group) !== '' && (
              <div className={formGroupClassName}>
                <div className={cx(props.kcContentWrapperClass)}>
                  <label id={`header-${group}`} className={cx(props.kcFormGroupHeader)}>
                    {advancedMsg(groupDisplayHeader) || currentGroup}
                  </label>
                </div>
                {groupDisplayDescription !== '' && (
                  <div className={cx(props.kcLabelWrapperClass)}>
                    <label id={`description-${group}`} className={`${cx(props.kcLabelClass)}`}>
                      {advancedMsg(groupDisplayDescription)}
                    </label>
                  </div>
                )}
              </div>
            )}
            <div className={formGroupClassName}>
              <div className={cx(props.kcLabelWrapperClass)}>
                <label htmlFor={attribute.name} className={cx(props.kcLabelClass)}>
                  {advancedMsg(attribute.displayName ?? '')}
                </label>
                {attribute.required && <>*</>}
              </div>
              <div className={cx(props.kcInputWrapperClass)}>
                <input
                  autoComplete={(() => {
                    switch (attribute.name) {
                      case 'password-confirm':
                      case 'password':
                        return 'new-password';
                      default:
                        return;
                    }
                  })()}
                  type={(() => {
                    switch (attribute.name) {
                      case 'password-confirm':
                      case 'password':
                        return 'password';
                      default:
                        return 'text';
                    }
                  })()}
                  id={attribute.name}
                  name={attribute.name}
                  value={value}
                  onChange={onChangeFactory(attribute.name)}
                  className={cx(props.kcInputClass)}
                  aria-invalid={displayableErrors.length > 0}
                  disabled={attribute.readOnly}
                  {...(attribute.autocomplete === undefined
                    ? {}
                    : {
                        autoComplete: attribute.autocomplete,
                      })}
                  onBlur={onBlurFactory(attribute.name)}
                />
                {displayableErrors.length > 0 && (
                  <span
                    id={`input-error-${attribute.name}`}
                    className={cx(
                      props.kcInputErrorMessageClass,
                      css({
                        position: displayableErrors.length === 1 ? 'absolute' : undefined,
                        '& > span': { display: 'block' },
                      }),
                    )}
                    aria-live='polite'
                  >
                    {displayableErrors.map(({ errorMessage }) => errorMessage)}
                  </span>
                )}
              </div>
            </div>
          </Fragment>
        );
      })}
    </>
  );
};

export default React.memo(UserProfileFormFields);
