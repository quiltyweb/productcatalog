import React from "react";
import { Helmet } from "react-helmet";
import { PageContent } from "bumbag";

type PageContentProps = {
  title: string;
  children: JSX.Element;
  breakpoint?: string;
  isFluid?: boolean;
};
const PageWrapper: React.FunctionComponent<PageContentProps> = ({
  title = "Comercial Gattoni - seguridad industrial",
  breakpoint = "desktop",
  children,
  isFluid = true,
}): JSX.Element => {
  return (
    <PageContent breakpoint={breakpoint} isFluid={isFluid}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </PageContent>
  );
};

export default PageWrapper;
