import path from 'path';

// types
import { BuildModeType } from './config/build/build.types';

// helpers
import { getBuildConfig } from './config/build/build-config';

type EnvVariables = {
  mode?: BuildModeType;
  port?: number;
};

export default (env: EnvVariables) => {
  const config = getBuildConfig({
    mode: env.mode ?? 'development',
    port: env.port,
    paths: {
      entry: path.resolve(__dirname, 'src', 'index.tsx'),
      src: path.resolve(__dirname, 'src'),
      output: path.resolve(__dirname, 'build'),
      htmlTemplate: path.resolve(__dirname, 'public', 'index.html'),
      public: path.resolve(__dirname, 'public'),
    },
  });

  return config;
};
