import React from "react";
import { observer } from "mobx-react-lite";
import {
  BoldHeader,
  Spacer,
  AlignCenter,
  ContentFlexContainer,
  ContentControls,
  PageLogoHeader,
  NavLogo,
} from "style";
import { ReactComponent as LockIcon } from "Assets/Icons/password-success-icon.svg";
import compaLogo from "Assets/Icons/compa-logo-original.png";
import { useHistory } from "react-router-dom";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
export const ResetComplete = observer(() => {
  const history = useHistory();
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
          <AlignCenter>
            <>
              <LockIcon />
              <Spacer />
              <BoldHeader>New password set</BoldHeader>
              <Spacer />
              Your new password has been set.
              <br />
              You can now sign into your account using your new password
              <Spacer />
              <Button
                type="primary"
                onClick={() => {
                  history.push("/sign-in");
                }}
              >
                Go to login <ArrowRightOutlined />
              </Button>
            </>
          </AlignCenter>
        </ContentControls>
      </ContentFlexContainer>
    </div>
  );
});
