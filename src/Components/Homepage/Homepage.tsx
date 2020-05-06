import React, { useContext, useEffect } from "react";
import compaLogo from "Assets/Icons/compa-logo-original.png";
import { AuthenticationStoreContext } from "Stores/authenticationStore";
import { useHistory } from "react-router-dom";
import { InternalLink } from "style";
export const Home = () => {
  const globalStore = useContext(AuthenticationStoreContext);
  const history = useHistory();
  useEffect(() => {
    globalStore.getAuthData().then((userLoggedIn: boolean) => {
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
        <InternalLink
          onClick={() => {
            globalStore.logoutAction().then(() => history.push("/sign-in"));
          }}
        >
          Logout
        </InternalLink>
      </div>
    </>
  );
};
