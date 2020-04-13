import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  BoldHeader,
  Spacer,
  AlignCenter,
  ContentFlexContainer,
  ContentControls,
  PageLogoHeader,
  LoadingStateWrapper,
  SpanLink,
} from "style";
import { GlobalDataStoreContext } from "Stores/globalDataStore";
import { ReactComponent as MailIcon } from "Assets/Icons/email-verfiied-icon.svg";
import { ReactComponent as ErrorIcon } from "Assets/Icons/error-icon.svg";
import { ReactComponent as UpvestLogoIcon } from "Assets/Icons/upvest-logo-blue.svg";
import { useHistory, useLocation, Link } from "react-router-dom";
import { Button, Spin } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
export const SignUpComplete = observer(() => {
  const globalStore = useContext(GlobalDataStoreContext);
  const history = useHistory();
  let location = useLocation();
  const [loading, toggleLoadingState] = useState(true);
  const [activationSuccess, toggleActivationStatus] = useState(true);
  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");
    globalStore.activateAccount(token!).then((resp) => {
      toggleActivationStatus(resp);
      toggleLoadingState(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
            {loading ? (
              <LoadingStateWrapper>
                <Spin size="large" />
              </LoadingStateWrapper>
            ) : activationSuccess ? (
              <>
                <MailIcon />
                <Spacer />
                <BoldHeader>Sign up complete</BoldHeader>
                <Spacer />
                Your email address has now been verified, You can now sign into
                your account using your email address and password
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
            ) : (
              <>
                <ErrorIcon />
                <BoldHeader>
                  Opps! An error has occured please try again or{" "}
                  <Link to="/">
                    <SpanLink>sign in</SpanLink>
                  </Link>
                </BoldHeader>
              </>
            )}
          </AlignCenter>
        </ContentControls>
      </ContentFlexContainer>
    </div>
  );
});
