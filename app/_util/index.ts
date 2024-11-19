import { WithContext, BreadcrumbList } from "schema-dts";

// Shared breadcrumb JSON-LD
export const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://publicbuilders.org",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Projects",
      item: "https://publicbuilders.org/projects",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Resources",
      item: "https://publicbuilders.org/resources",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Join",
      item: "https://publicbuilders.org/join",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Top Public Builders on Twitter",
      item: "https://publicbuilders.org/twitter",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "Top Public Builders on Bluesky",
      item: "https://publicbuilders.org/bluesky",
    },
    {
      "@type": "ListItem",
      position: 7,
      name: "Top Public Builders on GitHub",
      item: "https://publicbuilders.org/github",
    },
    {
      "@type": "ListItem",
      position: 8,
      name: "Top Public Builders on YouTube",
      item: "https://publicbuilders.org/youtube",
    },
  ],
};
