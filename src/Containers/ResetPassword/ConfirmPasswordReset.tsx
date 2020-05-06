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
} from "style";
import { GlobalDataStoreContext } from "Stores/globalDataStore";
import { ReactComponent as InboxIcon } from "Assets/Icons/inbox-icon.svg";
import { ReactComponent as UpvestLogoIcon } from "Assets/Icons/upvest-logo-blue.svg";
import { useHistory } from "react-router-dom";
export const ConfirmPasswordReset = observer(() => {
  const globalStore = useContext(GlobalDataStoreContext);
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
