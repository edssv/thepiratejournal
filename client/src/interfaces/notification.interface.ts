export interface Notification {
  action_key: string;
  createdAt: number;
  actor: {
    id: string;
    username: string;
    avatar: string;
  };
}
