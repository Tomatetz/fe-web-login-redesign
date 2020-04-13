import * as React from "react";
import { Route } from "react-router-dom";
import {
  SignInPage,
  RequestOneTimePassword,
  RequestBackupCodes,
} from "Containers/SignInPage";
import {
  RegistrationPage,
  ConfirmEmail,
  SignUpComplete,
} from "Containers/Registration";
import {
  ResetPassword,
  ConfirmPasswordReset,
  NewPasswordForm,
  ResetComplete,
} from "Containers/ResetPassword";

export const Routes = () => (
  <>
    <Route exact path={"/"} component={SignInPage} />
    <Route exact path={"/sign-up"} component={RegistrationPage} />
    <Route exact path={"/confirm"} component={ConfirmEmail} />
    <Route path={"/activate"} component={SignUpComplete} />
    <Route exact path={"/reset-password"} component={ResetPassword} />
    <Route exact path={"/confirm-reset"} component={ConfirmPasswordReset} />
    <Route path={"/password"} component={NewPasswordForm} />
    <Route exact path={"/reset-complete"} component={ResetComplete} />
    <Route exact path={"/verify-otp"} component={RequestOneTimePassword} />
    <Route exact path={"/backup"} component={RequestBackupCodes} />
  </>
);
