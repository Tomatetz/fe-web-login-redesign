import React, { useState, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  PageNavigationHeader,
  ContentFlexContainer,
  ContentControls,
  BoldHeader,
  Spacer,
  InputLabel,
  ErrorLabel,
  SpacerXSmall,
  SpacerSmall,
  AlignRight,
  Flex,
  SpanLink,
} from "style";
import { Input, Button } from "antd";
import { AuthenticationStoreContext } from "Stores/authenticationStore";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { urlList } from "Assets/Constants/urls";
import { FooterCaption } from "Components/Sidebar";
import { Link } from "react-router-dom";
export const RequestBackupCodes = observer(() => {
  const authenticationStore = useContext(AuthenticationStoreContext);
  useEffect(() => {
    authenticationStore.clearErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [backupCodeFormValue, setFormValue] = useState({
    backupCode: "",
  });
  const { errors } = authenticationStore;
  const { backupCode } = backupCodeFormValue;
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
          <Link to="/verify-otp">
            <SpanLink>
              <ArrowLeftOutlined /> Go back
            </SpanLink>
          </Link>
          <SpacerXSmall />
          <BoldHeader>Recover your account</BoldHeader>
          <div>
            Enter the backup code you received when two-factor authentication
            was enabled
          </div>
          <SpacerSmall />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              authenticationStore
                .verifyOtpAction(backupCode)
                .then((response) => {
                  if (response) {
                    window.location.href = urlList.APP_URL;
                  }
                });
            }}
          >
            <InputLabel>Backup Code</InputLabel>
            <Input
              className={errors.verify_otp_form! && "error-input"}
              value={backupCode}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                delete errors.verify_otp_form;
                setFormValue({
                  ...backupCodeFormValue,
                  ...{ backupCode: e.target.value },
                });
              }}
            />
            {errors.verify_otp_form && (
              <ErrorLabel>{errors.verify_otp_form.join(" ")}</ErrorLabel>
            )}
            <Spacer />
            <AlignRight>
              <Button htmlType="submit" type="primary">
                Continue
              </Button>
            </AlignRight>
          </form>
        </ContentControls>
        <FooterCaption />
      </ContentFlexContainer>
    </Flex>
  );
});
