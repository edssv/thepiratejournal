interface File {
  ref: string;
  url: string;
}

interface Data {
  text: string;
  level: number;
  file: File;
  caption: string;
  stretched: boolean;
  withBorder: boolean;
  withBackground: boolean;
  items: [string];
  style: string;
}

export interface Block {
  id: string;
  type: string;
  data: Data;
}
