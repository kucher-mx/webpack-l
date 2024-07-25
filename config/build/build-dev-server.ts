import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

// types
import { BuildOptionsType } from './build.types';

export function getBuildDevServer(options: BuildOptionsType): DevServerConfiguration {
  return {
    port: options.port ?? 3000,
    open: true,
    // для спа треба history API тому що всі переходи обробляє js через history api
    historyApiFallback: true,
  };
}
