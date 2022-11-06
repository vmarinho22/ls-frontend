import { User } from './user';

export interface Training {
  id: number;
  name: string;
  description?: string;
  validity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TrainingHistory {
  id: number;
  user: User;
  training: Training;
  endedIn: Date;
  certificateUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}
