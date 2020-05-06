import React, { useContext, useEffect } from "react";
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
import { AuthenticationStoreContext } from "Stores/authenticationStore";
import { ReactComponent as InboxIcon } from "Assets/Icons/inbox-icon.svg";
import compaLogo from "Assets/Icons/compa-logo-original.png";

import { useHistory } from "react-router-dom";
export const ConfirmEmail = observer(() => {
  const globalStore = useContext(AuthenticationStoreContext);
  const history = useHistory();
  useEffect(() => {
    if (!globalStore.userEmail) history.push("/");
    return () => {
      globalStore.userEmail = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
            <InboxIcon />
            <Spacer />
            <BoldHeader>Confirm your E-mail</BoldHeader>
            <Spacer />
            We have sent a verification mail to
            <div>{globalStore.userEmail}.</div>
            Activate your account with the link in the message.
          </AlignCenter>
        </ContentControls>
      </ContentFlexContainer>
    </div>
  );
});
