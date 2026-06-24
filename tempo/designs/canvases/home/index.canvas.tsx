// @tempo-home — Tempo home canvas (the workspace Run button opens this). Managed marker; do not remove.
//
// One storyboard rendering your app's home route ("/"). Run (workspace header)
// opens this canvas beside your app's dev-server logs. Set the app dev command
// (set_app_dev_command) so the "/" route renders here.

import type { TempoPage, TempoRouteStoryboard } from "tempo-sdk";

const page: TempoPage = {
  name: "Home",
};

export default page;

export const Home: TempoRouteStoryboard = {
  route: "/",
  name: "Home (/)",
  layout: { x: 0, y: 0, width: 1280, height: 832 },
};
