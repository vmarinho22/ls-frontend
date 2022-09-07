export interface User {
  id: number;
  username: string;
  email: string;
  isBlocked: boolean;
  permissionId: number;
  createdAt: Date;
  updatedAt: Date;
}
