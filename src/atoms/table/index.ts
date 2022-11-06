import { atom } from 'recoil';

export const tableState = atom<any>({
  key: 'tableState',
  default: [],
});
