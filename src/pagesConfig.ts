import { KcContextBase } from 'keycloakify';
import { VIEW_DEMO_THEME1, VIEW_DEMO_THEME2, ViewTypes } from './constants/view';

/**
 * Path examples:
 * theme1 login form - /login
 * theme1 another view variant for login form - /login-2
 * theme2 login form - /login-theme2
 * theme2 another view variant for login form - /login-theme2-2
 * theme1 register-user-profile from - /register-user-profile
 * theme1 register-user-profile another view variant for this form - /register-user-profile-2
 */

type TOtherTheme = {
  view: ViewTypes;
  postfixes?: string[]; // postfixes for additional path
};
export type TPage = {
  name: string;
  template: KcContextBase['pageId'];
  description: string;
  view: ViewTypes;
  postfixes?: string[]; // postfixes for additional path (another view variant for this form)
  theme2?: TOtherTheme;
  // theme3?: TOtherTheme;
};
type TPagesKeys =
  | 'login'
  | 'register'
  | 'registerUserProfile'
  | 'info'
  | 'error'
  | 'loginResetPassword'
  | 'loginVerifyEmail'
  | 'terms'
  | 'loginOtp'
  | 'loginUpdateProfile'
  | 'loginIdpLinkConfirm'
  | 'loginConfigTotp'
  | 'loginUpdatePassword'
  | 'loginIdpLinkEmail'
  | 'loginPageExpired';
export type TPagesConfig = {
  [K in TPagesKeys]: TPage;
};

export const pagesConfig: TPagesConfig = {
  login: {
    name: 'login',
    template: 'login.ftl',
    description: 'Log In form.',
    view: VIEW_DEMO_THEME1,
    postfixes: ['2'],
    theme2: {
      view: VIEW_DEMO_THEME2,
    },
  },
  register: {
    name: 'register',
    template: 'register.ftl',
    description: 'Register form.',
    view: VIEW_DEMO_THEME1,
    theme2: {
      view: VIEW_DEMO_THEME2,
    },
  },
  registerUserProfile: {
    name: 'register-user-profile',
    template: 'register-user-profile.ftl',
    description: 'Experimental feat. The list of fields is configured in Keycloak.',
    view: VIEW_DEMO_THEME1,
    theme2: {
      view: VIEW_DEMO_THEME2,
    },
  },
  info: {
    name: 'info',
    template: 'info.ftl',
    description: 'Info page.',
    view: VIEW_DEMO_THEME1,
    theme2: {
      view: VIEW_DEMO_THEME2,
    },
  },
  error: {
    name: 'error',
    template: 'error.ftl',
    description: 'Error page.',
    view: VIEW_DEMO_THEME1,
    theme2: {
      view: VIEW_DEMO_THEME2,
    },
  },
  loginResetPassword: {
    name: 'login-reset-password',
    template: 'login-reset-password.ftl',
    description: 'Reset password form.',
    view: VIEW_DEMO_THEME1,
    theme2: {
      view: VIEW_DEMO_THEME2,
    },
  },
  loginVerifyEmail: {
    name: 'login-verify-email',
    template: 'login-verify-email.ftl',
    description: 'An email has been sent to you with a link to the confirmation registration.',
    view: VIEW_DEMO_THEME1,
    theme2: {
      view: VIEW_DEMO_THEME2,
    },
  },
  terms: {
    name: 'terms',
    template: 'terms.ftl',
    description: 'Terms',
    view: VIEW_DEMO_THEME1,
    theme2: {
      view: VIEW_DEMO_THEME2,
    },
  },
  loginOtp: {
    name: 'login-otp',
    template: 'login-otp.ftl',
    description: 'Form for entering the 2fa code.',
    view: VIEW_DEMO_THEME1,
    theme2: {
      view: VIEW_DEMO_THEME2,
    },
  },
  loginUpdateProfile: {
    name: 'login-update-profile',
    template: 'login-update-profile.ftl',
    description:
      'The user data update form appears when registering via the social network or when enabling this required action.',
    view: VIEW_DEMO_THEME1,
    theme2: {
      view: VIEW_DEMO_THEME2,
    },
  },
  loginIdpLinkConfirm: {
    name: 'login-idp-link-confirm',
    template: 'login-idp-link-confirm.ftl',
    description: 'Linking a social provider account with a regular account',
    view: VIEW_DEMO_THEME1,
    theme2: {
      view: VIEW_DEMO_THEME2,
    },
  },
  loginConfigTotp: {
    name: 'login-config-totp',
    template: 'login-config-totp.ftl',
    description: 'Adding 2fa devices.',
    view: VIEW_DEMO_THEME1,
    theme2: {
      view: VIEW_DEMO_THEME2,
    },
  },
  loginUpdatePassword: {
    name: 'login-update-password',
    template: 'login-update-password.ftl',
    description: 'Update password form (required action).',
    view: VIEW_DEMO_THEME1,
    theme2: {
      view: VIEW_DEMO_THEME2,
    },
  },
  loginIdpLinkEmail: {
    name: 'login-idp-link-email',
    template: 'login-idp-link-email.ftl',
    description: 'An email has been sent to you with a link to confirm the linking of accounts.',
    view: VIEW_DEMO_THEME1,
    theme2: {
      view: VIEW_DEMO_THEME2,
    },
  },
  loginPageExpired: {
    name: 'login-page-expired',
    template: 'login-page-expired.ftl',
    description: 'Page has expired.',
    view: VIEW_DEMO_THEME1,
    theme2: {
      view: VIEW_DEMO_THEME2,
    },
  },
};

export const pagesArray: TPage[] = Object.values(pagesConfig);

export type TAllPages = {
  name: string;
  template: KcContextBase['pageId'];
  view: ViewTypes;
};
export const getAllPages = (): TAllPages[] => {
  const pages: TAllPages[] = [];
  (Object.keys(pagesConfig) as Array<keyof typeof pagesConfig>).forEach((key) => {
    const page: TPage = pagesConfig[key];
    pages.push({ name: page.name, view: page.view, template: page.template });
    if (page.postfixes) {
      page.postfixes.forEach((postfix) => {
        pages.push({ name: `${page.name}-${postfix}`, view: page.view, template: page.template });
      });
    }
    if (page.theme2) {
      pages.push({ name: `${page.name}-theme2`, view: page.theme2.view, template: page.template });
    }
    if (page.theme2 && page.theme2.postfixes) {
      page.theme2.postfixes.forEach((postfix) => {
        // @ts-ignore
        pages.push({ name: `${page.name}-theme2-${postfix}`, view: page.theme2.view, template: page.template });
      });
    }
  });
  return pages;
};
