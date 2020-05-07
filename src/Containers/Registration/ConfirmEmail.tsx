import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  BoldHeader,
  Spacer,
  AlignCenter,
  ContentFlexCenterContainer,
  ContentControls,
  SpanLink,
} from "style";
import { AuthenticationStoreContext } from "Stores/authenticationStore";
import { ArrowLeftOutlined } from "@ant-design/icons";
import compaLogo from "Assets/Icons/compa-logo-original.png";

import { useHistory, Link } from "react-router-dom";
export const ConfirmEmail = observer(() => {
  const authenticationStore = useContext(AuthenticationStoreContext);
  const history = useHistory();
  useEffect(() => {
    if (!authenticationStore.userEmail) history.push("/");
    return () => {
      authenticationStore.userEmail = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <ContentFlexCenterContainer>
        <ContentControls>
          <AlignCenter>
            <div>
              <img style={{ height: "150px" }} src={compaLogo} alt="" />
            </div>
            <Spacer />
            <BoldHeader>Confirm your E-mail</BoldHeader>
            <Spacer />
            We have sent a verification mail to
            <div>{authenticationStore.userEmail}.</div>
            Activate your account with the link in the message.
          </AlignCenter>
          <Spacer />
          <Link to="/sign-in">
            <SpanLink>
              <ArrowLeftOutlined /> Go back
            </SpanLink>
          </Link>
        </ContentControls>
      </ContentFlexCenterContainer>
    </div>
  );
});
