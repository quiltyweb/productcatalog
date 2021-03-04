import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga";

import { PageContent } from "bumbag";
import { useLocation } from "react-router-dom";

type PageContentProps = {
  children: JSX.Element;
  title?: string;
  breakpoint?: string;
  isFluid?: boolean;
};
const PageWrapper: React.FunctionComponent<PageContentProps> = ({
  title = "Comercial Gattoni - seguridad industrial",
  breakpoint = "desktop",
  children,
  isFluid = true,
}): JSX.Element => {
  const location = useLocation();
  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  return (
    <PageContent breakpoint={breakpoint} isFluid={isFluid} padding="major-1">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </PageContent>
  );
};

export default PageWrapper;
