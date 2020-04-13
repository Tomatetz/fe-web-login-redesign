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
} from "style";
import { GlobalDataStoreContext } from "Stores/globalDataStore";
import { ReactComponent as UpvestLogoIcon } from "Assets/Icons/upvest-logo-blue.svg";
import { useHistory, useLocation } from "react-router-dom";
import { Input, Button } from "antd";
export const NewPasswordForm = observer(() => {
  const globalStore = useContext(GlobalDataStoreContext);
  const history = useHistory();
  let location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  const uid = new URLSearchParams(location.search).get("uid");
  useEffect(() => {
    globalStore.clearErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [resetPasswordFormValue, setFormValue] = useState({
    password: "",
    confirmPassword: "",
  });
  const { errors } = globalStore;
  return (
    <div>
      <PageLogoHeader>
        <UpvestLogoIcon
          className="clickable"
          onClick={() => {
            history.push("/");
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
                globalStore
                  .setupNewPasswordAction(
                    uid!,
                    token!,
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
              Use 10 or more characters with a mix of letters and numbers.
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
