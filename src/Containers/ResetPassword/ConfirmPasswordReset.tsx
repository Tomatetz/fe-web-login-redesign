import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  BoldHeader,
  Spacer,
  AlignCenter,
  ContentFlexContainer,
  ContentControls,
  PageLogoHeader,
  InternalLink,
  SpacerXSmall,
  NavLogo,
} from "style";
import { AuthenticationStoreContext } from "Stores/authenticationStore";
import { ReactComponent as InboxIcon } from "Assets/Icons/inbox-icon.svg";
import { useHistory } from "react-router-dom";
import compaLogo from "Assets/Icons/compa-logo-original.png";
export const ConfirmPasswordReset = observer(() => {
  const globalStore = useContext(AuthenticationStoreContext);
  const history = useHistory();
  useEffect(() => {
    if (!globalStore.userEmail) history.push("/sign-in");
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
            <BoldHeader>Check your E-mail</BoldHeader>
            <Spacer />
            We just emailed you instructions on how to reset your password
            <SpacerXSmall />
            <InternalLink
              onClick={() => {
                globalStore.resetPasswordAction(globalStore.userEmail);
              }}
            >
              Resend email
            </InternalLink>
            <SpacerXSmall />
            Didn’t receive the email? Check your spam filter for an email from
            noreply@compa.co
          </AlignCenter>
        </ContentControls>
      </ContentFlexContainer>
    </div>
  );
});
