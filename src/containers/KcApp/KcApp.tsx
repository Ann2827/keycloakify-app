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

const KcApp = ({ kcContext, ...props }: { kcContext: KcContextBase } & KcProps) => {
  switch (kcContext.pageId) {
    case 'login.ftl':
      return <Login {...{ kcContext, ...props }} />;
    case 'register.ftl':
      return <Register {...{ kcContext, ...props }} />;
    case 'register-user-profile.ftl':
      return <RegisterUserProfile {...{ kcContext, ...props }} />;
    case 'info.ftl':
      return <Info {...{ kcContext, ...props }} />;
    case 'error.ftl':
      return <Error {...{ kcContext, ...props }} />;
    case 'login-reset-password.ftl':
      return <LoginResetPassword {...{ kcContext, ...props }} />;
    case 'login-verify-email.ftl':
      return <LoginVerifyEmail {...{ kcContext, ...props }} />;
    case 'terms.ftl':
      return <Terms {...{ kcContext, ...props }} />;
    case 'login-otp.ftl':
      return <LoginOtp {...{ kcContext, ...props }} />;
    case 'login-update-profile.ftl':
      return <LoginUpdateProfile {...{ kcContext, ...props }} />;
    case 'login-idp-link-confirm.ftl':
      return <LoginIdpLinkConfirm {...{ kcContext, ...props }} />;
  }
};

export default React.memo(KcApp);
