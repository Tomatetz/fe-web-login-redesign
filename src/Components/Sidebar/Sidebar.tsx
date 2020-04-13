import React from "react";
import { Sidebar, SidebarText, BoldHeader, Spacer, SidebarFooter } from "style";
import { ReactComponent as UpvestLogoIcon } from "Assets/Icons/upvest-logo-white.svg";
import sidebarImage from "Assets/Icons/signup-left-illustration.png";
import { CheckCircleFilled } from "@ant-design/icons";
import { SidebarListItem } from "./style";

interface SidebarProps {
  type?: string;
}
export const SidebarComponent = ({ type }: SidebarProps) => {
  const TextList = () => {
    return (
      <ul>
        {type ? (
          type === "sign-up" ? (
            <>
              <SidebarListItem>
                <CheckCircleFilled className="sidebar-icon" />
                Integrate Upvest APIs into your apps and start building on
                blockchain today
              </SidebarListItem>
              <SidebarListItem>
                <CheckCircleFilled className="sidebar-icon" />
                Store, recover, transact, track and manage any blockchain asset
                securely
              </SidebarListItem>
              <SidebarListItem>
                <CheckCircleFilled className="sidebar-icon" />
                Get access to multiple blockchains via one unified API
              </SidebarListItem>
            </>
          ) : (
            <SidebarListItem>
              No worries we can help you restore it in no time
            </SidebarListItem>
          )
        ) : (
          <SidebarListItem>
            This will take you straight to your account dashboard where you can
            access your API credentials
          </SidebarListItem>
        )}
      </ul>
    );
  };
  const headerText = type
    ? type === "sign-up"
      ? "With a free developer account, you can:"
      : "Forget your password?"
    : "Welcome Back!";
  return (
    <Sidebar>
      <UpvestLogoIcon />
      <SidebarText>
        <BoldHeader>{headerText}</BoldHeader>
        <Spacer />
        <div>
          <TextList />
        </div>
      </SidebarText>
      <SidebarFooter>
        <img src={sidebarImage} alt="" />
      </SidebarFooter>
    </Sidebar>
  );
};
