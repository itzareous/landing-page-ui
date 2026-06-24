import type { TempoPage, TempoStoryboard, TempoRouteStoryboard } from 'tempo-sdk';
import Desktop2 from './Desktop';
import Hero2 from './Hero';
import Mobile2 from './Mobile';

const page: TempoPage = {
  name: "Lythe Landing",
};

export default page;

export const Desktop: TempoStoryboard = {
  render: () => <Desktop2 />,
  name: "Desktop — Full Page",
  layout: { x: 0, y: 0, width: 100, height: 12268 },
};

export const Mobile: TempoStoryboard = {
  render: () => <Mobile2 />,
  name: "Mobile — Full Page",
  layout: { x: 1490, y: 0, width: 430, height: 9200 },
};

export const Hero: TempoStoryboard = {
  render: () => <Hero2 />,
  name: "Hero — Desktop",
  layout: { x: 0, y: 6550, width: 1440, height: 1009 },
};
