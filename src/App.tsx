import React, { useEffect } from 'react';
import { defaultKcProps, getKcContext, kcMessages, useKcLanguageTag } from 'keycloakify';
import tos_fr_url from './tos_fr.md';
import tos_en_url from './tos_en.md';
import KcApp from './containers/KcApp';
import './kcMessagesExtension';

// TODO: tss-react to remove

const { kcContext } = getKcContext({
  /* Uncomment to test th<e login page for development */
  // mockPageId: 'login.ftl',
});

if (kcContext !== undefined) {
  console.log(kcContext);
}

const App: React.FC = () => {
  const { kcLanguageTag } = useKcLanguageTag();

  //Lazily download the therms and conditions in the appropriate language
  //if we are on the terms.ftl page.
  useEffect(() => {
    if (kcContext!.pageId !== 'terms.ftl') {
      return;
    }

    kcMessages[kcLanguageTag].termsTitle = '';

    fetch(
      (() => {
        switch (kcLanguageTag) {
          case 'fr':
            return tos_fr_url;
          default:
            return tos_en_url;
        }
      })(),
    )
      .then((response) => response.text())
      .then((rawMarkdown) => (kcMessages[kcLanguageTag].termsText = rawMarkdown));
  }, [kcLanguageTag]);

  if (kcContext === undefined) {
    // throw new Error();
    return <div>error</div>;
  }

  return (
    <KcApp kcContext={kcContext} {...{ ...defaultKcProps }} />
  );
};

export default App;

// const kcContext2 = {
//   pageId: "login.ftl",
//   social: {displayInfo: false},
//   realm: {
//     actionTokenGeneratedByUserLifespanMinutes: "5",
//     displayName: "myrealm",
//     displayNameHtml: "myrealm",
//     editUsernameAllowed: false,
//     identityFederationEnabled: false,
//     idpVerifyAccountLinkActionTokenLifespanMinutes: "5",
//     internationalizationEnabled: false,
//     loginWithEmailAllowed: true,
//     name: "myrealm",
//     password: true,
//     registrationAllowed: false,
//     registrationEmailAsUsername: false,
//     rememberMe: false,
//     resetCredentialsActionTokenLifespanMinutes: "5",
//     resetPasswordAllowed: false,
//     verifyEmailActionTokenLifespanMinutes: "5",
//   },
//   url: {
//     firstBrokerLoginUrl: "/auth/realms/myrealm/login-actions/first-broker-login?client_id=account-console&tab_id=Yy7hgvwlMkY",
//     loginAction: "http://localhost:8080/auth/realms/myrealm/login-actions/authenticate?session_code=1UmJiRgeYXA9_wEZFnlzKSabOa9rAS-E5TiwPLLBTno&execution=61e632f9-6f65-4851-825f-dcb7f22a4a6b&client_id=account-console&tab_id=Yy7hgvwlMkY",
//     loginResetCredentialsUrl: "/auth/realms/myrealm/login-actions/reset-credentials?client_id=account-console&tab_id=Yy7hgvwlMkY",
//     loginRestartFlowUrl: "/auth/realms/myrealm/login-actions/restart?client_id=account-console&tab_id=Yy7hgvwlMkY",
//     loginUrl: "/auth/realms/myrealm/login-actions/authenticate?client_id=account-console&tab_id=Yy7hgvwlMkY",
//     oauth2DeviceVerificationAction: "/auth/realms/myrealm/login-actions/authenticate",
//     oauthAction: "/auth/realms/myrealm/login-actions/authenticate",
//     registrationAction: "http://localhost:8080/auth/realms/myrealm/login-actions/authenticate?session_code=1UmJiRgeYXA9_wEZFnlzKSabOa9rAS-E5TiwPLLBTno&execution=61e632f9-6f65-4851-825f-dcb7f22a4a6b&client_id=account-console&tab_id=Yy7hgvwlMkY",
//     registrationUrl: "/auth/realms/myrealm/login-actions/registration?client_id=account-console&tab_id=Yy7hgvwlMkY",
//     resourcesCommonPath: "/auth/resources/iooti/common/keycloak",
//     resourcesPath: "/auth/resources/iooti/login/keycloakify-demo-app",
//     resourcesUrl: "/auth/resources/iooti?client_id=account-console&tab_id=Yy7hgvwlMkY/login/keycloakify-demo-app",
//   },
//   usernameEditDisabled: undefined,
//   login: {},
//   auth: {
//     authenticationSelections: [
//       {
//         authExecId: "61e632f9-6f65-4851-825f-dcb7f22a4a6b",
//         authenticationExecution: {
//           alternative: false,
//           authenticator: "auth-username-password-form",
//           authenticatorFlow: false,
//           conditional: false,
//           disabled: false,
//           enabled: true,
//           id: "61e632f9-6f65-4851-825f-dcb7f22a4a6b",
//           parentFlow: "ed16e4ae-6855-41ae-af14-d7e410beef0d",
//           priority: "10",
//           required: true,
//           requirement: {declaringClass: {},},
//         },
//         displayName: "auth-username-password-form-display-name",
//         helpText: "auth-username-password-form-help-text",
//         iconCssClass: "kcAuthenticatorDefaultClass",
//       }
//     ]
//   },
//   registrationDisabled: undefined,
// };
