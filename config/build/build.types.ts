export type BuildPathsType = {
  entry: string;
  output: string;
  public: string;
  htmlTemplate: string;
  src: string;
};
export type BuildModeType = 'development' | 'production';

export type BuildOptionsType = {
  port?: number;
  mode: BuildModeType;
  paths: BuildPathsType;
};
