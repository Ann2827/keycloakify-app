import React, { useState } from 'react';
import Template from '../../modules/Template';
import type { KcProps, KcContextBase } from 'keycloakify';
import { useKcMessage } from 'keycloakify';
import { useConstCallback } from 'powerhooks/useConstCallback';
import { Input } from '../../components/Input';
import classNames from 'classnames';
import styles from './Login.module.scss';

const Login = ({ kcContext, ...props }: { kcContext: KcContextBase.Login } & KcProps) => {
  const { social, realm, url, usernameEditDisabled, login, auth, registrationDisabled } = kcContext;

  const { msg, msgStr } = useKcMessage();

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
  const onSubmit = useConstCallback(() => (setIsLoginButtonDisabled(true), true));
  const [username, setUsername] = useState('');
  const changeUsername = (newValue: string) => setUsername(newValue);
  const placeholderUsername = msgStr(
    !realm.loginWithEmailAllowed ? 'username' : !realm.registrationEmailAsUsername ? 'usernameOrEmail' : 'email',
  );
  const [password, setPassword] = useState('');
  const changePassword = (newValue: string) => setPassword(newValue);

  const formClass = classNames(styles.form);
  const fieldsClass = classNames(styles.fields);

  const formNode = (
    <form data-testid='kc-form' className={formClass} onSubmit={onSubmit} action={url.loginAction} method='post'>
      <div className={fieldsClass}>
        <Input
          name='username'
          type='text'
          onChange={changeUsername}
          value={username}
          placeholder={placeholderUsername}
        />
        <Input
          name='password'
          type='text'
          onChange={changePassword}
          value={password}
          placeholder={msgStr('password')}
        />
      </div>
    </form>
  );
  const infoNode = realm.password && realm.registrationAllowed && !registrationDisabled && (
    <div id='kc-registration'>
      <span>
        {msg('noAccount')}
        <a tabIndex={6} href={url.registrationUrl}>
          {msg('doRegister')}
        </a>
      </span>
    </div>
  );
  return (
    <Template
      {...{ kcContext, ...props }}
      doFetchDefaultThemeResources={true}
      displayInfo={social.displayInfo}
      displayWide={realm.password && social.providers !== undefined}
      headerNode={msg('doLogIn')}
      formNode={formNode}
      infoNode={infoNode}
    />
  );
};

export default React.memo(Login);

// const formNode = (
//   <div id="kc-form" className={cx(realm.password && social.providers !== undefined && props.kcContentWrapperClass)}>
//     <div
//       id="kc-form-wrapper"
//       className={cx(realm.password && social.providers && [props.kcFormSocialAccountContentClass, props.kcFormSocialAccountClass])}
//     >
//       {realm.password && (
//         <form id="kc-form-login" onSubmit={onSubmit} action={url.loginAction} method="post">
//             <div className={cx(props.kcFormGroupClass)}>
//                 <label htmlFor="username" className={cx(props.kcLabelClass)}>
//                     {!realm.loginWithEmailAllowed
//                         ? msg("username")
//                         : !realm.registrationEmailAsUsername
//                         ? msg("usernameOrEmail")
//                         : msg("email")}
//                 </label>
//                 <input
//                     tabIndex={1}
//                     id="username"
//                     // className={cx(props.kcInputClass)}
//                     name="username"
//                     defaultValue={login.username ?? ""}
//                     type="text"
//                     {...(usernameEditDisabled
//                         ? { "disabled": true }
//                         : {
//                               "autoFocus": true,
//                               "autoComplete": "off",
//                           })}
//                 />
//             </div>
//             <div className={cx(props.kcFormGroupClass)}>
//                 <label htmlFor="password" className={cx(props.kcLabelClass)}>
//                     {msg("password")}
//                 </label>
//                 <input
//                     tabIndex={2}
//                     id="password"
//                     className={cx(props.kcInputClass)}
//                     name="password"
//                     type="password"
//                     autoComplete="off"
//                 />
//             </div>
//           <div className={cx(props.kcFormGroupClass, props.kcFormSettingClass)}>
//             <div id="kc-form-options">
//               {realm.rememberMe && !usernameEditDisabled && (
//                 <div className="checkbox">
//                   <label>
//                     <input
//                       tabIndex={3}
//                       id="rememberMe"
//                       name="rememberMe"
//                       type="checkbox"
//                       {...(login.rememberMe
//                         ? {
//                           "checked": true,
//                         }
//                         : {})}
//                     />
//                     {msg("rememberMe")}
//                   </label>
//                 </div>
//               )}
//             </div>
//             <div className={cx(props.kcFormOptionsWrapperClass)}>
//               {realm.resetPasswordAllowed && (
//                 <span>
//                                                 <a tabIndex={5} href={url.loginResetCredentialsUrl}>
//                                                     {msg("doForgotPassword")}
//                                                 </a>
//                                             </span>
//               )}
//             </div>
//           </div>
//           <div id="kc-form-buttons" className={cx(props.kcFormGroupClass)}>
//             <input
//               type="hidden"
//               id="id-hidden-input"
//               name="credentialId"
//               {...(auth?.selectedCredential !== undefined
//                 ? {
//                   "value": auth.selectedCredential,
//                 }
//                 : {})}
//             />
//             <input
//               tabIndex={4}
//               className={cx(
//                 props.kcButtonClass,
//                 props.kcButtonPrimaryClass,
//                 props.kcButtonBlockClass,
//                 props.kcButtonLargeClass,
//               )}
//               name="login"
//               id="kc-login"
//               type="submit"
//               value={msgStr("doLogIn")}
//               disabled={isLoginButtonDisabled}
//             />
//           </div>
//         </form>
//       )}
//     </div>
//     {realm.password && social.providers !== undefined && (
//       <div id="kc-social-providers" className={cx(props.kcFormSocialAccountContentClass, props.kcFormSocialAccountClass)}>
//         <ul
//           className={cx(
//             props.kcFormSocialAccountListClass,
//             social.providers.length > 4 && props.kcFormSocialAccountDoubleListClass,
//           )}
//         >
//           {social.providers.map(p => (
//             <li key={p.providerId} className={cx(props.kcFormSocialAccountListLinkClass)}>
//               <a href={p.loginUrl} id={`zocial-${p.alias}`} className={cx("zocial", p.providerId)}>
//                 <span>{p.displayName}</span>
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>
//     )}
//   </div>
// );
