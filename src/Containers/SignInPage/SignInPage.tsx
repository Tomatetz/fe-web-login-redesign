import React, { useState, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  PageNavigationHeader,
  ContentFlexContainer,
  ContentControls,
  BoldHeader,
  Spacer,
  InputLabel,
  ContentControlsFooter,
  ErrorLabel,
  Flex,
  SpanLink,
} from "style";
import { Input, Button } from "antd";
import { GlobalDataStoreContext } from "Stores/globalDataStore";
import { useHistory, Link } from "react-router-dom";
import { FooterCaption } from "Components/Sidebar";
export const SignInPage = observer(() => {
  const globalStore = useContext(GlobalDataStoreContext);
  const history = useHistory();
  useEffect(() => {
    globalStore.clearErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [signInFormValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const { errors } = globalStore;
  return (
    <Flex>
      {/* <SidebarComponent /> */}
      <ContentFlexContainer>
        <PageNavigationHeader>
          Don't have an account?{" "}
          <Link to="/sign-up">
            <SpanLink>Register now</SpanLink>
          </Link>
        </PageNavigationHeader>
        <ContentControls>
          <BoldHeader>Log in to your Compa Account</BoldHeader>
          <Spacer />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              globalStore
                .signInAction(signInFormValue.email, signInFormValue.password)
                .then((response) => {
                  if (response.two_factor_enabled) {
                    history.push("/verify-otp");
                  } else {
                    debugger;
                  }
                });
            }}
          >
            <InputLabel>E-mail</InputLabel>
            <Input
              autoFocus
              className={errors.signIn_form! && "error-input"}
              value={signInFormValue.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                delete errors.signIn_form;
                setFormValue({
                  ...signInFormValue,
                  ...{ email: e.target.value },
                });
              }}
            />
            <Spacer />
            <InputLabel>Account password</InputLabel>
            <Input.Password
              className={errors.signIn_form! && "error-input"}
              value={signInFormValue.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                delete errors.signIn_form;
                setFormValue({
                  ...signInFormValue,
                  ...{ password: e.target.value },
                });
              }}
            />
            {errors.signIn_form && (
              <ErrorLabel>{errors.signIn_form.join(" ")}</ErrorLabel>
            )}
            <Spacer />
            <ContentControlsFooter>
              <Link to="/reset-password">
                <SpanLink>Forgot password?</SpanLink>
              </Link>
              <Button htmlType="submit" type="primary">
                Log in
              </Button>
            </ContentControlsFooter>
          </form>
        </ContentControls>
        <FooterCaption />
      </ContentFlexContainer>
    </Flex>
  );
});
