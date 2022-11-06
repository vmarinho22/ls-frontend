export interface Permission {
  id: number;
  title: string;
  permissionLevel?: PermissionsLevel[];
}

export interface PermissionsLevel {
  id: number;
  page: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  permissionId: number;
  createdAt: Date;
  updatedAt: Date;
}
