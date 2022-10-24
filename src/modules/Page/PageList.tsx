import React from 'react';
import type { KcContextBase, KcProps } from 'keycloakify';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import RegisterUserProfile from '../../pages/RegisterUserProfile';
import Info from '../../pages/Info';
import Error from '../../pages/Error';
import LoginResetPassword from '../../pages/LoginResetPassword';
import LoginVerifyEmail from '../../pages/LoginVerifyEmail';
import Terms from '../../pages/Terms';
import LoginOtp from '../../pages/LoginOtp';
import LoginUpdateProfile from '../../pages/LoginUpdateProfile';
import LoginIdpLinkConfirm from '../../pages/LoginIdpLinkConfirm';
import LoginConfigTotp from '../../pages/LoginConfigTotp';
import LoginUpdatePassword from '../../pages/LoginUpdatePassword/LoginUpdatePassword';
import LoginIdpLinkEmail from '../../pages/LoginIdpLinkEmail/LoginIdpLinkEmail';
import LoginPageExpired from '../../pages/LoginPageExpired/LoginPageExpired';
import { pagesConfig } from '../../pagesConfig';
import { ThemeTypes } from '../../constants/theme';

const PageList = ({ kcContext, theme, ...props }: { kcContext: KcContextBase } & KcProps & { theme: ThemeTypes }) => {
  switch (kcContext.pageId) {
    case pagesConfig.login.template:
      return <Login {...{ kcContext: kcContext as KcContextBase.Login, ...props, theme }} />;
    case pagesConfig.register.template:
      return <Register {...{ kcContext: kcContext as KcContextBase.Register, ...props, theme }} />;
    case pagesConfig.registerUserProfile.template:
      return (
        <RegisterUserProfile {...{ kcContext: kcContext as KcContextBase.RegisterUserProfile, ...props, theme }} />
      );
    case pagesConfig.info.template:
      return <Info {...{ kcContext: kcContext as KcContextBase.Info, ...props, theme }} />;
    case pagesConfig.error.template:
      return <Error {...{ kcContext: kcContext as KcContextBase.Error, ...props, theme }} />;
    case pagesConfig.loginResetPassword.template:
      return <LoginResetPassword {...{ kcContext: kcContext as KcContextBase.LoginResetPassword, ...props, theme }} />;
    case pagesConfig.loginVerifyEmail.template:
      return <LoginVerifyEmail {...{ kcContext: kcContext as KcContextBase.LoginVerifyEmail, ...props, theme }} />;
    case pagesConfig.terms.template:
      return <Terms {...{ kcContext: kcContext as KcContextBase.Terms, ...props, theme }} />;
    case pagesConfig.loginOtp.template:
      return <LoginOtp {...{ kcContext: kcContext as KcContextBase.LoginOtp, ...props, theme }} />;
    case pagesConfig.loginUpdateProfile.template:
      return <LoginUpdateProfile {...{ kcContext: kcContext as KcContextBase.LoginUpdateProfile, ...props, theme }} />;
    case pagesConfig.loginIdpLinkConfirm.template:
      return (
        <LoginIdpLinkConfirm {...{ kcContext: kcContext as KcContextBase.LoginIdpLinkConfirm, ...props, theme }} />
      );
    case pagesConfig.loginConfigTotp.template:
      return <LoginConfigTotp {...{ kcContext: kcContext as KcContextBase.LoginConfigTotp, ...props, theme }} />;
    case pagesConfig.loginUpdatePassword.template:
      return (
        <LoginUpdatePassword {...{ kcContext: kcContext as KcContextBase.LoginUpdatePassword, ...props, theme }} />
      );
    case pagesConfig.loginIdpLinkEmail.template:
      return <LoginIdpLinkEmail {...{ kcContext: kcContext as KcContextBase.LoginIdpLinkEmail, ...props, theme }} />;
    case pagesConfig.loginPageExpired.template:
      return <LoginPageExpired {...{ kcContext: kcContext as KcContextBase.LoginPageExpired, ...props, theme }} />;
    default:
      return null;
  }
};

export default React.memo(PageList);
