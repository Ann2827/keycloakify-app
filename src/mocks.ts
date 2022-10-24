import { KcContextBase } from 'keycloakify';
import { pagesConfig, TAllPages } from './pagesConfig';

const providers: KcContextBase.Login['social']['providers'] = [
  {
    loginUrl: 'loginUrl',
    alias: 'google',
    providerId: 'google',
    displayName: 'google',
  },
  {
    loginUrl: 'loginUrl',
    alias: 'facebook',
    providerId: 'facebook',
    displayName: 'facebook',
  },
  {
    loginUrl: 'loginUrl',
    alias: 'linkedin',
    providerId: 'linkedin',
    displayName: 'linkedin',
  },
  {
    loginUrl: 'loginUrl',
    alias: 'yandex',
    providerId: 'yandex',
    displayName: 'yandex',
  },
  {
    loginUrl: 'loginUrl',
    alias: 'vk',
    providerId: 'vk',
    displayName: 'vk',
  },
  {
    loginUrl: 'loginUrl',
    alias: 'ok',
    providerId: 'ok',
    displayName: 'ok',
  },
];

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
const mockData = (
  config?: TAllPages,
): {
  mockPageId?: KcContextBase['pageId'];
  mockData?: DeepPartial<KcContextBase>[];
} => {
  if (!config) return {};
  switch (config.name) {
    case 'login':
      return {
        mockPageId: pagesConfig.login.template,
        mockData: [
          // @ts-ignore
          {
            pageId: pagesConfig.login.template,
            social: {
              providers: providers,
            },
            realm: {
              loginWithEmailAllowed: true,
              registrationEmailAsUsername: true,
            },
          },
        ],
      };
    case 'login-2':
      return {
        mockPageId: pagesConfig.login.template,
        mockData: [
          // @ts-ignore
          {
            pageId: pagesConfig.login.template,
            social: {
              providers: providers,
            },
            message: undefined,
            auth: {
              showTryAnotherWayLink: true,
            },
          },
        ],
      };
    case 'login-theme2':
      return {
        mockPageId: pagesConfig.login.template,
        mockData: [
          // @ts-ignore
          {
            pageId: pagesConfig.login.template,
            social: {
              providers: providers,
            },
            message: undefined,
            // auth: {
            //   showTryAnotherWayLink: true,
            // },
          },
        ],
      };
    case 'register':
      return {
        mockPageId: pagesConfig.register.template,
        mockData: [
          {
            pageId: pagesConfig.register.template,
            social: {
              providers: providers,
            },
            realm: {
              registrationEmailAsUsername: true,
            },
          },
        ],
      };
    case 'register-theme2':
      return {
        mockPageId: pagesConfig.register.template,
        mockData: [
          {
            pageId: pagesConfig.register.template,
            social: {
              providers: providers,
            },
          },
        ],
      };
    case 'login-update-password':
      return {
        mockPageId: pagesConfig.loginUpdatePassword.template,
        mockData: [
          {
            pageId: pagesConfig.loginUpdatePassword.template,
            isAppInitiatedAction: true,
          },
        ],
      };
    case 'login-reset-password':
      return {
        mockPageId: pagesConfig.loginResetPassword.template,
        mockData: [
          // @ts-ignore
          {
            pageId: pagesConfig.loginResetPassword.template,
            realm: {
              loginWithEmailAllowed: true,
              registrationEmailAsUsername: true,
            },
          },
        ],
      };
    default:
      return {
        mockPageId: config.template,
      };
  }
};

export default mockData;
