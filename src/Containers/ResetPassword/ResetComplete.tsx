import React from "react";
import { observer } from "mobx-react-lite";
import {
  BoldHeader,
  Spacer,
  AlignCenter,
  ContentFlexContainer,
  ContentControls,
  PageLogoHeader,
} from "style";
import { ReactComponent as LockIcon } from "Assets/Icons/password-success-icon.svg";
import { ReactComponent as UpvestLogoIcon } from "Assets/Icons/upvest-logo-blue.svg";
import { useHistory } from "react-router-dom";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
export const ResetComplete = observer(() => {
  const history = useHistory();
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
                  history.push("/");
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
