import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  BoldHeader,
  Spacer,
  ContentFlexContainer,
  ContentControls,
  PageLogoHeader,
  ErrorLabel,
  InputPostfix,
  InputLabel,
  AlignRight,
  NavLogo,
} from "style";
import { AuthenticationStoreContext } from "Stores/authenticationStore";
import compaLogo from "Assets/Icons/compa-logo-original.png";
import { useHistory } from "react-router-dom";
import { Input, Button } from "antd";
export const NewPasswordForm = observer(() => {
  const authenticationStore = useContext(AuthenticationStoreContext);
  const history = useHistory();

  useEffect(() => {
    authenticationStore.clearErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [resetPasswordFormValue, setFormValue] = useState({
    code: "",
    password: "",
    confirmPassword: "",
  });
  const { errors } = authenticationStore;
  return (
    <div>
      <PageLogoHeader>
        <NavLogo
          src={compaLogo}
          alt=""
          onClick={() => {
            history.push("/sign-in");
          }}
        />
      </PageLogoHeader>
      <ContentFlexContainer>
        <ContentControls>
          <BoldHeader>Setup new password</BoldHeader>
          {errors.resetPassword_detail && (
            <ErrorLabel>{errors.resetPassword_detail}</ErrorLabel>
          )}
          <Spacer />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (
                resetPasswordFormValue.password ===
                resetPasswordFormValue.confirmPassword
              ) {
                authenticationStore
                  .setupNewPasswordAction(
                    resetPasswordFormValue.code,
                    resetPasswordFormValue.password
                  )
                  .then((resp) => {
                    if (resp) {
                      history.push("/reset-complete");
                    }
                  });
              } else {
                errors.resetPassword_form_confirm_password = [
                  "Re-enter your password confirmation so it matches your password.",
                ];
              }
            }}
          >
            <InputLabel>Verification code</InputLabel>
            <Input
              className={errors.resetPassword_form_code! && "error-input"}
              value={resetPasswordFormValue.code}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                delete errors.resetPassword_form_code;
                setFormValue({
                  ...resetPasswordFormValue,
                  ...{ code: e.target.value },
                });
              }}
            />
            {errors.resetPassword_form_code && (
              <ErrorLabel>
                {errors.resetPassword_form_code.join(" ")}
              </ErrorLabel>
            )}
            <Spacer />
            <InputLabel>New password</InputLabel>
            <Input.Password
              className={errors.resetPassword_form_password! && "error-input"}
              value={resetPasswordFormValue.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                delete errors.resetPassword_form_password;
                setFormValue({
                  ...resetPasswordFormValue,
                  ...{ password: e.target.value },
                });
              }}
            />
            {errors.resetPassword_form_password && (
              <ErrorLabel>
                {errors.resetPassword_form_password.join(" ")}
              </ErrorLabel>
            )}
            <InputPostfix>
              Use 8 or more characters with a mix of letters and numbers.
            </InputPostfix>
            <InputLabel>Confirm password</InputLabel>
            <Input.Password
              className={
                errors.resetPassword_form_confirm_password! && "error-input"
              }
              value={resetPasswordFormValue.confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                delete errors.resetPassword_form_confirm_password;
                setFormValue({
                  ...resetPasswordFormValue,
                  ...{ confirmPassword: e.target.value },
                });
              }}
            />
            {errors.resetPassword_form_confirm_password && (
              <ErrorLabel>
                {errors.resetPassword_form_confirm_password.join(" ")}
              </ErrorLabel>
            )}
            <Spacer />
            <AlignRight>
              <Button htmlType="submit" type="primary">
                Set new password
              </Button>
            </AlignRight>
          </form>
        </ContentControls>
      </ContentFlexContainer>
    </div>
  );
});
