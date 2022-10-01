import { useContext } from 'react';
import { UserContext } from './../../context/user/index';

const useUser = (): any => {
  const context = useContext(UserContext);
  return context;
};

export default useUser;
