export interface User {
  id: number;
  username: string;
  email: string;
  isBlocked: boolean;
  permissionId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Profile {
  id: number;
  name: string;
  about: string;
  userPicture: string;
  backgroundPicture: string;
  birthDate: Date;
  naturalness: string;
  roleId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}
