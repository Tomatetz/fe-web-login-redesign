import React from "react";
import { ContentFooter } from "style";

import compaLogoBlack from "Assets/Icons/compa-black400w.png";
export const FooterCaption = () => {
  return (
    <ContentFooter>
      <img style={{ height: "inherit" }} src={compaLogoBlack} alt="" />
    </ContentFooter>
  );
};
