import React, { useState, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  PageNavigationHeader,
  ExternalLink,
  ContentFlexContainer,
  ContentControls,
  BoldHeader,
  Spacer,
  InputLabel,
  ErrorLabel,
  InputPostfix,
  AlignRight,
  Flex,
} from "style";
import { Input, Button } from "antd";
import { AuthenticationStoreContext } from "Stores/authenticationStore";
import { useHistory, Link } from "react-router-dom";
import { FooterCaption } from "Components/Sidebar";
export const RegistrationPage = observer(() => {
  const globalStore = useContext(AuthenticationStoreContext);
  const history = useHistory();
  useEffect(() => {
    globalStore.clearErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [signUpFormValue, setFormValue] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { errors } = globalStore;
  return (
    <Flex>
      {/* <SidebarComponent type="sign-up" /> */}
      <ContentFlexContainer>
        <PageNavigationHeader>
          Already have an account?{" "}
          <Link to="/sign-in">
            <ExternalLink>Log in</ExternalLink>
          </Link>
        </PageNavigationHeader>
        <ContentControls>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (
                signUpFormValue.password === signUpFormValue.confirmPassword
              ) {
                globalStore
                  .registrationAction(
                    signUpFormValue.email,
                    signUpFormValue.password
                  )
                  .then((isSuccess) => {
                    if (isSuccess) history.push("/confirm");
                  });
              } else {
                errors.signUp_form_confirm_password = [
                  "Re-enter your password confirmation so it matches your password.",
                ];
              }
            }}
          >
            <BoldHeader>Register for an Compa account</BoldHeader>
            <Spacer />
            <InputLabel>E-mail</InputLabel>
            <Input
              autoFocus
              className={errors.signUp_form_email! && "error-input"}
              value={signUpFormValue.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                delete errors.signUp_form_password;
                setFormValue({
                  ...signUpFormValue,
                  ...{ email: e.target.value },
                });
              }}
            />
            {errors.signUp_form_email && (
              <ErrorLabel>{errors.signUp_form_email.join(" ")}</ErrorLabel>
            )}
            <Spacer />
            <InputLabel>Account password</InputLabel>
            <Input.Password
              className={errors.signUp_form_password! && "error-input"}
              value={signUpFormValue.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                delete errors.signUp_form_password;
                setFormValue({
                  ...signUpFormValue,
                  ...{ password: e.target.value },
                });
              }}
            />
            {errors.signUp_form_password && (
              <ErrorLabel>{errors.signUp_form_password.join(" ")}</ErrorLabel>
            )}
            <InputPostfix>
              Use 8 or more characters with a mix of letters and numbers.
            </InputPostfix>
            <InputLabel>Confirm password</InputLabel>
            <Input.Password
              className={errors.signUp_form_confirm_password! && "error-input"}
              value={signUpFormValue.confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                delete errors.signUp_form_confirm_password;
                setFormValue({
                  ...signUpFormValue,
                  ...{ confirmPassword: e.target.value },
                });
              }}
            />
            {errors.signUp_form_confirm_password && (
              <ErrorLabel>
                {errors.signUp_form_confirm_password.join(" ")}
              </ErrorLabel>
            )}
            <Spacer />
            <AlignRight>
              <Button htmlType="submit" type="primary">
                Register now
              </Button>
            </AlignRight>
          </form>
        </ContentControls>
        <FooterCaption />
      </ContentFlexContainer>
    </Flex>
  );
});
