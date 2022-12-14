import { UserTypeContext } from '@globalTypes/user';
import persistAtom from '@lib/recoilPersist';
import { atom } from 'recoil';

export const userState = atom<UserTypeContext>({
  key: 'userState',
  default: {
    id: 0,
    name: '',
    email: '',
    about: '',
    profilePicture: '',
    role: '',
    isSuperAdmin: false,
    permission: {
      id: 0,
      title: '',
    },
  },
  effects_UNSTABLE: [persistAtom],
});

export const selectedUserState = atom<number | null>({
  key: 'selectedUserState',
  default: null,
});

export const userDrawerState = atom<boolean>({
  key: 'userDrawerState',
  default: false,
});
