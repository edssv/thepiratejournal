export type AppConfig = {
  nodeEnv: string;
  name: string;
  workingDirectory: string;
  clientDomain?: string;
  serverDomain: string;
  dashboardDomain: string;
  port: number;
  apiPrefix: string;
  assetsPrefix: string;
  fallbackLanguage: string;
  headerLanguage: string;
  uploadFolder: string;
};

export type AuthConfig = {
  secret?: string;
  refreshSecret?: string;
  expires?: string;
  refreshExpires?: string;
};

export type DatabaseConfig = {
  url?: string;
  type?: string;
  host?: string;
  port?: number;
  password?: string;
  name?: string;
  username?: string;
  synchronize?: boolean;
  maxConnections: number;
  sslEnabled?: boolean;
  rejectUnauthorized?: boolean;
  ca?: string;
  key?: string;
  cert?: string;
};

export type FileConfig = {
  uploadFolder: string;
  maxFileSize: number;
};

export type GoogleConfig = {
  clientId?: string;
  clientSecret?: string;
};

export type MailConfig = {
  port: number;
  host?: string;
  user?: string;
  password?: string;
  defaultEmail?: string;
  defaultName?: string;
  ignoreTLS: boolean;
  secure: boolean;
  requireTLS: boolean;
};

export type AllConfigType = {
  app: AppConfig;
  auth: AuthConfig;
  database: DatabaseConfig;
  file: FileConfig;
  google: GoogleConfig;
  mail: MailConfig;
};
