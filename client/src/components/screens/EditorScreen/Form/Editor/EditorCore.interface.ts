type OutputData = any;

export interface EditorCore {
  destroy(): Promise<void>;

  clear(): Promise<void>;

  save(): Promise<OutputData>;

  render(data: OutputData): Promise<void>;
}
