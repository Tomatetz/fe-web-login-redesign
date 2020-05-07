import React, { useContext, useEffect } from "react";
import compaLogo from "Assets/Icons/compa-logo-original.png";
import { AuthenticationStoreContext } from "Stores/authenticationStore";
import { useHistory } from "react-router-dom";
import { InternalLink } from "style";
import { GlobalStoreContext } from "Stores/globalStore";
import { observer } from "mobx-react-lite";
export const Home = observer(() => {
  const authenticationStore = useContext(AuthenticationStoreContext);
  const globalStore = useContext(GlobalStoreContext);
  const history = useHistory();
  useEffect(() => {
    authenticationStore.getAuthData().then((userLoggedIn: boolean) => {
      if (!userLoggedIn) history.push("/sign-in");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div>
          <img src={compaLogo} alt="" />
        </div>
        <div>SUCCESS!!!</div>
        <div>Welcome {globalStore.userEmail}</div>
        <InternalLink
          onClick={() => {
            authenticationStore
              .logoutAction()
              .then(() => history.push("/sign-in"));
          }}
        >
          Logout
        </InternalLink>
      </div>
    </>
  );
});
