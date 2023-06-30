import React from "react";
import "./StyleLayoutPage.scss";
import TitlePage from "./TitlePage";
import Footer from "./FooterPage";

type Props = {
  children?: any;
  content?: string;
  Title?: string;
  Icon?: boolean;
  TitleHover?: string;
  LinkPage?: string;
  PageTitle?: string;
};
const LayoutPage = ({
  children,
  content,
  TitleHover,
  Icon,
  PageTitle,
  LinkPage,
}: Props) => {
  document.title = PageTitle || "";
  return (
    <div className="LayoutPage">
      <div className="HeaderlayoutPage">
        <TitlePage
          content={content}
          Title={TitleHover}
          Icon={Icon}
          LinkPage={LinkPage}
        />
      </div>
      <div className="MainPage">{children}</div>
      <div className="FooterPage">
        <Footer />
      </div>
    </div>
  );
};
export default LayoutPage;
