// react-router.config.ts
import routes from "./app/routes.ts";
import type { Config } from "@react-router/dev/config";

interface CustomConfig extends Config {
  routes: any;
  buildDirectory?: string;
  serverBuildPath?: string;
  publicPath?: string;
}

const config: CustomConfig = {
  routes,
  appDirectory: "app",
  buildDirectory: "dist/client", // change to dist/client for Vercel static serve
  ssr: true,                    // disable SSR for client-side only deployment
  publicPath: "/assets/",
};


export default config;
