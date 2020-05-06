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
  SpacerXSmall,
  Flex,
  SpanLink,
} from "style";
import { Input, Button } from "antd";
import { AuthenticationStoreContext } from "Stores/authenticationStore";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { urlList } from "Assets/Constants/urls";
import { FooterCaption } from "Components/Sidebar";
import { Link } from "react-router-dom";
export const RequestOneTimePassword = observer(() => {
  const globalStore = useContext(AuthenticationStoreContext);

  useEffect(() => {
    globalStore.clearErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [oneTimePasswordFormValue, setFormValue] = useState({
    twoFactorAuthenticationCode: "",
  });
  const { errors } = globalStore;
  const { twoFactorAuthenticationCode } = oneTimePasswordFormValue;
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
          <Link to="/sign-up">
            <SpanLink>
              <ArrowLeftOutlined /> Go back
            </SpanLink>
          </Link>
          <SpacerXSmall />
          <BoldHeader>Two-Factor Authentication</BoldHeader>
          <Spacer />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              globalStore
                .verifyOtpAction(twoFactorAuthenticationCode)
                .then((response) => {
                  if (response) {
                    window.location.href = urlList.APP_URL;
                  }
                });
            }}
          >
            <InputLabel>Authentication Code</InputLabel>
            <Input
              className={errors.verify_otp_form! && "error-input"}
              value={twoFactorAuthenticationCode}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                delete errors.verify_otp_form;
                setFormValue({
                  ...oneTimePasswordFormValue,
                  ...{ twoFactorAuthenticationCode: e.target.value },
                });
              }}
            />
            {errors.verify_otp_form && (
              <ErrorLabel>{errors.verify_otp_form.join(" ")}</ErrorLabel>
            )}
            <Spacer />
            <ContentControlsFooter>
              <Link to="/backup">
                <SpanLink>Don’t have your device?</SpanLink>
              </Link>
              <Button
                htmlType="submit"
                type="primary"
                disabled={twoFactorAuthenticationCode.length < 6}
              >
                Verify
              </Button>
            </ContentControlsFooter>
          </form>
        </ContentControls>
        <FooterCaption />
      </ContentFlexContainer>
    </Flex>
  );
});
