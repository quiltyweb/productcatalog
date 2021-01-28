import React from "react";
import { Heading, PageContent, List, Paragraph } from "bumbag";

type ContentListProps = {
  title: string;
  description: string;
  links: Array<{ href: string; label: string }>;
};

export const ContentList: React.FunctionComponent<ContentListProps> = ({
  title,
  description,
  links,
}) => {
  return (
    <PageContent breakpoint="desktop">
      <Heading use="h2" fontSize="400" paddingBottom="1rem">
        {title}
      </Heading>
      <Paragraph paddingBottom="2rem">{description}</Paragraph>
      <List style={{ listStyle: "disc" }}>
        {links.map(({ href, label }) => (
          <List.Item paddingBottom="1rem" key={label}>
            <a target="_blank" rel="noopener noreferrer" href={href}>
              {label}
            </a>
          </List.Item>
        ))}
      </List>
    </PageContent>
  );
};
