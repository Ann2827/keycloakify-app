import React, { useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import {
  useKcMessage,
  useKcLanguageTag,
  assert,
  getBestMatchAmongKcLanguageTag,
  getKcLanguageTagLabel,
} from 'keycloakify';
import type { KcContextBase, KcLanguageTag, KcTemplateProps } from 'keycloakify';
import { useCallbackFactory } from 'powerhooks/useCallbackFactory';
import { headInsert } from '../../utils';
import path from 'path';
import { useConstCallback } from 'powerhooks/useConstCallback';
import { useCssAndCx } from 'tss-react';

export type TemplateProps = {
  displayInfo?: boolean;
  displayMessage?: boolean;
  displayRequiredFields?: boolean;
  displayWide?: boolean;
  showAnotherWayIfPresent?: boolean;
  headerNode: ReactNode;
  showUsernameNode?: ReactNode;
  formNode: ReactNode;
  infoNode?: ReactNode;
  /** If you write your own page you probably want
   * to avoid pulling the default theme assets.
   */
  doFetchDefaultThemeResources: boolean;
} & { kcContext: KcContextBase } & KcTemplateProps;

const Template = (props: TemplateProps) => {
  const {
    displayInfo = false,
    displayMessage = true,
    displayRequiredFields = false,
    displayWide = false,
    showAnotherWayIfPresent = true,
    headerNode,
    showUsernameNode = null,
    formNode,
    infoNode = null,
    kcContext,
    doFetchDefaultThemeResources,
    stylesCommon,
    styles,
    scripts,
    kcHtmlClass,
    kcLoginClass,
    kcHeaderClass,
    kcHeaderWrapperClass,
  } = props;

  const { cx } = useCssAndCx();

  useEffect(() => {
    console.log('Rendering this page with react using keycloakify');
  }, []);

  const { msg } = useKcMessage();

  const { kcLanguageTag, setKcLanguageTag } = useKcLanguageTag();

  const onChangeLanguageClickFactory = useCallbackFactory(([languageTag]: [KcLanguageTag]) =>
    setKcLanguageTag(languageTag),
  );

  const onTryAnotherWayClick = useConstCallback(
    () => (document.forms['kc-select-try-another-way-form' as never].submit(), false),
  );

  const { realm, locale, auth, url, message, isAppInitiatedAction } = kcContext;

  useEffect(() => {
    if (!realm.internationalizationEnabled) {
      return;
    }

    assert(locale !== undefined);

    if (kcLanguageTag === getBestMatchAmongKcLanguageTag(locale.current)) {
      return;
    }

    window.location.href = locale.supported.find(({ languageTag }) => languageTag === kcLanguageTag)!.url;
  }, [kcLanguageTag, locale, realm.internationalizationEnabled]);

  const [isExtraCssLoaded, setExtraCssLoaded] = useReducer(() => true, false);

  useEffect(() => {
    if (!doFetchDefaultThemeResources) {
      setExtraCssLoaded();
      return;
    }

    let isUnmounted = false;
    const cleanups: (() => void)[] = [];

    const toArr = (x: string | readonly string[] | undefined) => (typeof x === 'string' ? x.split(' ') : x ?? []);

    // console.log('props.stylesCommon', props.stylesCommon)
    // console.log('props.styles', props.styles)
    Promise.all(
      [
        ...toArr(stylesCommon).map((relativePath) => path.join(url.resourcesCommonPath, relativePath)),
        ...toArr(styles).map((relativePath) => path.join(url.resourcesPath, relativePath)),
      ]
        .reverse()
        .map((href) =>
          headInsert({
            type: 'css',
            href,
            position: 'prepend',
          }),
        ),
    ).then(() => {
      if (isUnmounted) {
        return;
      }
      setExtraCssLoaded();
    });

    toArr(scripts).forEach((relativePath) =>
      headInsert({
        type: 'javascript',
        src: path.join(url.resourcesPath, relativePath),
      }),
    );

    if (kcHtmlClass !== undefined) {
      const htmlClassList = document.querySelectorAll('html')[0].classList;

      const tokens = cx(kcHtmlClass).split(' ');

      htmlClassList.add(...tokens);

      cleanups.push(() => htmlClassList.remove(...tokens));
    }

    return () => {
      isUnmounted = true;

      cleanups.forEach((f) => f());
    };
  }, [
    kcHtmlClass,
    cx,
    doFetchDefaultThemeResources,
    url.resourcesPath,
    scripts,
    styles,
    stylesCommon,
    url.resourcesCommonPath,
  ]);

  if (!isExtraCssLoaded) {
    return null;
  }

  return (
    <div className={cx(kcLoginClass)}>
      <div id='kc-header' className={cx(kcHeaderClass)}>
        <div id='kc-header-wrapper' className={cx(kcHeaderWrapperClass)}>
          {msg('loginTitleHtml', realm.displayNameHtml)}
        </div>
      </div>

      <div className={cx(props.kcFormCardClass, displayWide && props.kcFormCardAccountClass)}>
        <header className={cx(props.kcFormHeaderClass)}>
          {realm.internationalizationEnabled && (assert(locale !== undefined), true) && locale.supported.length > 1 && (
            <div id='kc-locale'>
              <div id='kc-locale-wrapper' className={cx(props.kcLocaleWrapperClass)}>
                <div className='kc-dropdown' id='kc-locale-dropdown'>
                  <a href='#' id='kc-current-locale-link'>
                    {getKcLanguageTagLabel(kcLanguageTag)}
                  </a>
                  <ul>
                    {locale.supported.map(({ languageTag }) => (
                      <li key={languageTag} className='kc-dropdown-item'>
                        <a href='#' onClick={onChangeLanguageClickFactory(languageTag)}>
                          {getKcLanguageTagLabel(languageTag)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
          {!(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
            displayRequiredFields ? (
              <div className={cx(props.kcContentWrapperClass)}>
                <div className={cx(props.kcLabelWrapperClass, 'subtitle')}>
                  <span className='subtitle'>
                    <span className='required'>*</span>
                    {msg('requiredFields')}
                  </span>
                </div>
                <div className='col-md-10'>
                  <h1 id='kc-page-title'>{headerNode}</h1>
                </div>
              </div>
            ) : (
              <h1 id='kc-page-title'>{headerNode}</h1>
            )
          ) : displayRequiredFields ? (
            <div className={cx(props.kcContentWrapperClass)}>
              <div className={cx(props.kcLabelWrapperClass, 'subtitle')}>
                <span className='subtitle'>
                  <span className='required'>*</span> {msg('requiredFields')}
                </span>
              </div>
              <div className='col-md-10'>
                {showUsernameNode}
                <div className={cx(props.kcFormGroupClass)}>
                  <div id='kc-username'>
                    <label id='kc-attempted-username'>{auth?.attemptedUsername}</label>
                    <a id='reset-login' href={url.loginRestartFlowUrl}>
                      <div className='kc-login-tooltip'>
                        <i className={cx(props.kcResetFlowIcon)}></i>
                        <span className='kc-tooltip-text'>{msg('restartLoginTooltip')}</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {showUsernameNode}
              <div className={cx(props.kcFormGroupClass)}>
                <div id='kc-username'>
                  <label id='kc-attempted-username'>{auth?.attemptedUsername}</label>
                  <a id='reset-login' href={url.loginRestartFlowUrl}>
                    <div className='kc-login-tooltip'>
                      <i className={cx(props.kcResetFlowIcon)}></i>
                      <span className='kc-tooltip-text'>{msg('restartLoginTooltip')}</span>
                    </div>
                  </a>
                </div>
              </div>
            </>
          )}
        </header>
        <div id='kc-content'>
          <div id='kc-content-wrapper'>
            {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
            {displayMessage && message !== undefined && (message.type !== 'warning' || !isAppInitiatedAction) && (
              <div className={cx('alert', `alert-${message.type}`)}>
                {message.type === 'success' && <span className={cx(props.kcFeedbackSuccessIcon)}></span>}
                {message.type === 'warning' && <span className={cx(props.kcFeedbackWarningIcon)}></span>}
                {message.type === 'error' && <span className={cx(props.kcFeedbackErrorIcon)}></span>}
                {message.type === 'info' && <span className={cx(props.kcFeedbackInfoIcon)}></span>}
                <span
                  className='kc-feedback-text'
                  dangerouslySetInnerHTML={{
                    __html: message.summary,
                  }}
                />
              </div>
            )}
            {formNode}
            {auth !== undefined && auth.showTryAnotherWayLink && showAnotherWayIfPresent && (
              <form
                id='kc-select-try-another-way-form'
                action={url.loginAction}
                method='post'
                className={cx(displayWide && props.kcContentWrapperClass)}
              >
                <div
                  className={cx(displayWide && [props.kcFormSocialAccountContentClass, props.kcFormSocialAccountClass])}
                >
                  <div className={cx(props.kcFormGroupClass)}>
                    <input type='hidden' name='tryAnotherWay' value='on' />
                    <a href='#' id='try-another-way' onClick={onTryAnotherWayClick}>
                      {msg('doTryAnotherWay')}
                    </a>
                  </div>
                </div>
              </form>
            )}
            {displayInfo && (
              <div id='kc-info' className={cx(props.kcSignUpClass)}>
                <div id='kc-info-wrapper' className={cx(props.kcInfoAreaWrapperClass)}>
                  {infoNode}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Template);
