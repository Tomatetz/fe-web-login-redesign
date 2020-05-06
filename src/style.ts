import styled from "styled-components";

export const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 5px;
  color: #212b36;
`;

export const InputPostfix = styled.div`
  color: rgb(99, 115, 129);
  font-size: 14px;
  margin-bottom: 24px;
  margin-top: 12px;
`;

export const AlignCenter = styled.div`
  text-align: center;
`;

export const AlignRight = styled.div`
  text-align: right;
`;

export const BoldHeader = styled.header`
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 8px;
`;

export const TextHeader = styled.header`
  color: rgba(44, 45, 47, 1);
  font-size: 16px;
  font-weight: 500;
  line-height: 32px;
  color: #000;
`;

export const TextSubHeader = styled.header`
  color: rgba(44, 45, 47, 1);
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
`;

export const TextBody = styled.div`
  color: rgba(44, 45, 47, 1);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
`;

export const SubTitle = styled.header`
  font-size: 16px;
  font-weight: 500;
  line-height: 32px;
  color: #000;
`;

export const SubTitleDetails = styled.header`
  color: rgb(99, 115, 129);
  font-size: 14px;
  font-weight: 400;
`;

export const ExternalLink = styled.a`
  font-size: 14px;
  font-weight: 400;
  color: #fe3f43;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const FlexSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FlexChildAlignEnd = styled.div`
  align-self: flex-end;
`;

export const Spacer = styled.div`
  margin-top: 28px;
`;

export const SpacerXLarge = styled.div`
  margin-top: 56px;
`;

export const SpacerSmall = styled.div`
  margin-top: 18px;
`;

export const SpacerXSmall = styled.div`
  margin-top: 10px;
`;

export const FullWidthDiv = styled.div`
  width: 100%;
`;

export const ButtonWithDivider = styled.span`
  margin-left: 8px;
`;

export const MobileOnly = styled.div`
  @media (min-width: 800px) {
    display: none;
  }
`;

export const DesktopOnly = styled.div`
  @media (max-width: 800px) {
    display: none;
  }
`;

export const DividerLine = styled.div`
  width: 100%;
  background-color: #dfe3e8;
  height: 1px;
`;

export const ErrorLabel = styled.label`
  color: #d01717;
  font-size: 13px;
`;
export const PositionAbsolut = styled.div`
  position: absolute;
`;

export const PageNavigationHeader = styled.header`
  text-align: center;
  margin-top: 20px;
`;

export const PageLogoHeader = styled.header`
  padding: 43px 124px 0 124px;
  text-align: left;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  @media (min-width: 800px) {
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: space-between;
    min-height: 700px;
  }
`;

export const ContentFlexContainer = styled.div`
  width: 100%;
  height: 100vh;
  @media (min-width: 800px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const ContentControls = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  padding: 32px 8px;
  @media (min-width: 800px) {
    align-self: center;
    width: 370px;
    padding: 32px 24px;
  }
`;

export const ContentControlsFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ContentFooter = styled.div`
  align-self: end;
  color: #637381;
  font-size: 12px;
  margin: 0 auto;
  padding: 0 24px;
  height: 20px;
  margin-bottom: 20px;
`;

export const LoadingStateWrapper = styled.div`
  text-align: center;
  margin-top: 100px;
`;

export const InternalLink = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #fe3f43;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const SpanLink = styled.span`
  font-weight: 400;
  color: #fe3f43;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const Sidebar = styled.aside`
  background-color: #06438f;
  display: block;
  height: 100vh;
  min-height: 740px;
  padding: 43px 84px;
  position: relative;
  width: 476px;
  @media (max-width: 800px) {
    display: none;
  }
`;
export const SidebarText = styled.div`
  width: 370px;
  color: rgb(255, 255, 255);
  position: relative;
  top: calc(30% - 30px);
`;
export const SidebarFooter = styled.div`
  bottom: 0;
  padding-left: 35px;
  position: absolute;
  right: 0;
  width: 100%;
  @media (max-width: 800px) {
    display: none;
  }
`;
export const Flex = styled.div`
  display: flex;
`;

export const NavLogo = styled.img`
  height: 50px;
  cursor: pointer;
`;
