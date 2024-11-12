import { MetadataRoute } from 'next';
import { builders } from './_data';
import { Builder } from './_types';
import slugify from 'slugify';

const lastModified = '2024-11-12T14:28:18.895Z'; // new Date().toISOString()
const todayUTC = new Date();
todayUTC.setUTCHours(0, 0, 0, 0);

export default function sitemap(): MetadataRoute.Sitemap {

  const buildersData: Builder[] = builders;

  const builderUrls = buildersData.map((builder) => ({
    url: `https://publicbuilders.org/profile/${slugify(builder.name, { lower: true })}`,
    lastModified: builder.created || todayUTC.toISOString(),
  }));

  return [
    {
      url: 'https://publicbuilders.org',
      lastModified: todayUTC.toISOString(),
    },
    {
      url: 'https://publicbuilders.org/twitter',
      lastModified: todayUTC.toISOString(),
    },
    {
      url: 'https://publicbuilders.org/bluesky',
      lastModified: todayUTC.toISOString(),
    },
    {
      url: 'https://publicbuilders.org/youtube',
      lastModified: todayUTC.toISOString(),
    },
    {
      url: 'https://publicbuilders.org/github',
      lastModified: todayUTC.toISOString(),
    },
    {
      url: 'https://publicbuilders.org/join',
      lastModified,
    },
    {
      url: 'https://publicbuilders.org/resources',
      lastModified,
    },{
      url: 'https://publicbuilders.org/about',
      lastModified,
    },{
      url: 'https://publicbuilders.org/terms',
      lastModified,
    },{
      url: 'https://publicbuilders.org/privacy',
      lastModified,
    },
    ...builderUrls,
  ];
}
