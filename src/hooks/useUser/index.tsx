import { useContext } from 'react';
import { UserContext, UserContextType } from './../../context/user/index';

const useUser = (): UserContextType => {
  const context = useContext<UserContextType | null>(UserContext);
  return context as UserContextType;
};

export default useUser;
