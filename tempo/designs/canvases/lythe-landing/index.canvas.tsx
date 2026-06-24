import type { TempoPage, TempoStoryboard, TempoRouteStoryboard } from 'tempo-sdk';
import Desktop2 from './Desktop';
import Hero2 from './Hero';
import Mobile2 from './Mobile';
import {
  NavShowcase, LogoShowcase, VoiceShowcase, ChatShowcase, EvalShowcase,
  IntegrationsShowcase, OpenSourceShowcase, FinalCtaShowcase, FooterShowcase,
} from './LytheLanding';

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
  layout: { x: 0, y: 6550, width: 100, height: 1697 },
};

/* ---- section-by-section breakdown (column beside the full page) ---- */
export const SecNav: TempoStoryboard = {
  render: () => <NavShowcase />,
  name: "01 · Nav",
  layout: { x: 2050, y: 0, width: 1280, height: 130 },
};

export const SecSocialProof: TempoStoryboard = {
  render: () => <LogoShowcase />,
  name: "02 · Social proof",
  layout: { x: 2050, y: 210, width: 1280, height: 300 },
};

export const SecVoice: TempoStoryboard = {
  render: () => <VoiceShowcase />,
  name: "03 · Voice Agent SDK",
  layout: { x: 2050, y: 590, width: 1280, height: 880 },
};

export const SecChat: TempoStoryboard = {
  render: () => <ChatShowcase />,
  name: "04 · Chat Agent SDK",
  layout: { x: 2050, y: 1550, width: 1280, height: 880 },
};

export const SecEval: TempoStoryboard = {
  render: () => <EvalShowcase />,
  name: "05 · Evaluation & observability",
  layout: { x: 2050, y: 2510, width: 1280, height: 1240 },
};

export const SecIntegrations: TempoStoryboard = {
  render: () => <IntegrationsShowcase />,
  name: "06 · Integrations",
  layout: { x: 2050, y: 3830, width: 1280, height: 1080 },
};

export const SecOpenSource: TempoStoryboard = {
  render: () => <OpenSourceShowcase />,
  name: "07 · Open source",
  layout: { x: 2050, y: 4990, width: 1280, height: 960 },
};

export const SecFinalCta: TempoStoryboard = {
  render: () => <FinalCtaShowcase />,
  name: "08 · Final CTA",
  layout: { x: 2050, y: 6030, width: 1280, height: 640 },
};

export const SecFooter: TempoStoryboard = {
  render: () => <FooterShowcase />,
  name: "09 · Footer",
  layout: { x: 2050, y: 6750, width: 1280, height: 740 },
};
