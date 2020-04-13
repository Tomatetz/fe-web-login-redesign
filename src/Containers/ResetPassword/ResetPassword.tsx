import React, { useState, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  PageNavigationHeader,
  ContentFlexContainer,
  ContentControls,
  BoldHeader,
  Spacer,
  InputLabel,
  AlignRight,
  SpacerXSmall,
  SpacerSmall,
  ErrorLabel,
  Flex,
  SpanLink,
} from "style";
import { Input, Button } from "antd";
import { GlobalDataStoreContext } from "Stores/globalDataStore";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useHistory, Link } from "react-router-dom";
import { FooterCaption, SidebarComponent } from "Components/Sidebar";
export const ResetPassword = observer(() => {
  const globalStore = useContext(GlobalDataStoreContext);
  const history = useHistory();
  useEffect(() => {
    globalStore.clearErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [resetPasswordFormValue, setFormValue] = useState({
    email: "",
  });
  const { errors } = globalStore;
  return (
    <Flex>
      <SidebarComponent type="reset-password" />
      <ContentFlexContainer>
        <PageNavigationHeader>
          Don't have an account?{" "}
          <Link to="/sign-up">
            <SpanLink>Register now</SpanLink>
          </Link>
        </PageNavigationHeader>
        <ContentControls>
          <Link to="/">
            <SpanLink>
              <ArrowLeftOutlined /> Go back
            </SpanLink>
          </Link>
          <SpacerXSmall />
          <BoldHeader>Reset your password</BoldHeader>
          <div>
            Type in your email address below and we'll send you an email with
            instructions on how to create a new password
          </div>
          <SpacerSmall />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              globalStore
                .resetPasswordAction(resetPasswordFormValue.email)
                .then((resp) => {
                  if (resp) {
                    history.push("/confirm-reset");
                  }
                });
            }}
          >
            <InputLabel>E-mail</InputLabel>
            <Input
              className={errors.resetPassword_form! && "error-input"}
              value={resetPasswordFormValue.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormValue({
                  ...resetPasswordFormValue,
                  ...{ email: e.target.value },
                });
              }}
            />
            {errors.resetPassword_form && (
              <ErrorLabel>{errors.resetPassword_form.join(" ")}</ErrorLabel>
            )}
            <Spacer />
            <AlignRight>
              <Button htmlType="submit" type="primary">
                Reset Password
              </Button>
            </AlignRight>
          </form>
        </ContentControls>
        <FooterCaption />
      </ContentFlexContainer>
    </Flex>
  );
});
