import { Configuration } from 'webpack';

// types
import { BuildOptionsType } from './build.types';

export function getBuildResolve(options: BuildOptionsType): Configuration['resolve'] {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': options.paths.src,
    },
  };
}
